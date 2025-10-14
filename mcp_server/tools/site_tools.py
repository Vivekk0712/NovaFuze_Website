import os
import re
import json
from typing import Dict, List, Optional, Any

_site_facts: Dict[str, str] = {}
_structural_awareness: Dict[str, Any] = {}
_functional_awareness: Dict[str, Any] = {}

FRONTEND_ROOT_RELATIVE = os.path.join('..', '..', 'NovaFuze_web')

CONTACT_FILE_CANDIDATES = [
    os.path.join('src', 'components', 'SupportWidget.tsx'),
    os.path.join('src', 'components', 'Footer.tsx'),
    os.path.join('src', 'pages', 'ContactPage.tsx'),
    'humans.txt',
    'README.md',
    'README_SEO.md',
    'robots.txt'
]

STRUCTURAL_FILES = [
    os.path.join('src', 'components', 'Router.tsx'),
    os.path.join('src', 'App.tsx'),
    os.path.join('src', 'main.tsx'),
    os.path.join('src', 'index.html')
]

FUNCTIONAL_FILES = [
    os.path.join('src', 'components'),
    os.path.join('src', 'pages'),
    os.path.join('src', 'hooks'),
    os.path.join('src', 'services')
]

EMAIL_REGEX = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE_REGEX = re.compile(r"(?:(?:\+?\d{1,3})?[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}")
URL_REGEX = re.compile(r"https?://[^\s\"')]+")

# Route patterns
ROUTE_PATTERN = re.compile(r'case\s+["\']([^"\']+)["\']', re.IGNORECASE)
COMPONENT_PATTERN = re.compile(r'return\s+<(\w+)', re.IGNORECASE)
BUTTON_PATTERN = re.compile(r'<Button[^>]*onClick[^>]*>([^<]+)</Button>', re.IGNORECASE)
LINK_PATTERN = re.compile(r'href=["\']([^"\']+)["\']', re.IGNORECASE)


def _read_file_if_exists(path: str) -> Optional[str]:
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    except Exception:
        return None


def _scan_directory_for_components(dir_path: str) -> List[Dict[str, str]]:
    """Scan directory for React components and extract their functionality."""
    components = []
    if not os.path.exists(dir_path):
        return components
    
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                file_path = os.path.join(root, file)
                content = _read_file_if_exists(file_path)
                if not content:
                    continue
                
                # Extract component name
                component_name = file.replace('.tsx', '').replace('.ts', '').replace('.jsx', '').replace('.js', '')
                
                # Extract functionality
                buttons = BUTTON_PATTERN.findall(content)
                links = LINK_PATTERN.findall(content)
                
                # Extract props/state
                props_match = re.search(r'interface\s+(\w+)Props[^{]*{([^}]+)}', content, re.DOTALL)
                props = []
                if props_match:
                    props = [line.strip() for line in props_match.group(2).split('\n') if line.strip() and ':' in line]
                
                components.append({
                    'name': component_name,
                    'file': file_path,
                    'buttons': buttons,
                    'links': links,
                    'props': props[:5]  # Limit to first 5 props
                })
    
    return components


def load_structural_awareness(project_root: Optional[str] = None) -> Dict[str, Any]:
    """Extract structural information: pages, routes, layout."""
    global _structural_awareness
    _structural_awareness = {}
    
    root = project_root or os.path.abspath(os.path.join(os.path.dirname(__file__), FRONTEND_ROOT_RELATIVE))
    
    pages = []
    routes = []
    
    # Scan Router.tsx for routes
    router_path = os.path.join(root, 'src', 'components', 'Router.tsx')
    router_content = _read_file_if_exists(router_path)
    if router_content:
        # Extract route cases
        route_matches = ROUTE_PATTERN.findall(router_content)
        routes = list(set(route_matches))
        
        # Extract page components
        component_matches = COMPONENT_PATTERN.findall(router_content)
        pages = list(set(component_matches))
    
    # Scan pages directory
    pages_dir = os.path.join(root, 'src', 'pages')
    if os.path.exists(pages_dir):
        for file in os.listdir(pages_dir):
            if file.endswith(('.tsx', '.ts')):
                page_name = file.replace('.tsx', '').replace('.ts', '')
                pages.append(page_name)
    
    _structural_awareness = {
        'routes': routes,
        'pages': pages,
        'layout': {
            'has_header': 'Header' in (router_content or ''),
            'has_footer': 'Footer' in (router_content or ''),
            'has_sidebar': 'Sidebar' in (router_content or ''),
            'has_navigation': 'Navigation' in (router_content or '')
        }
    }
    
    return _structural_awareness


def load_functional_awareness(project_root: Optional[str] = None) -> Dict[str, Any]:
    """Extract functional information: components, actions, APIs."""
    global _functional_awareness
    _functional_awareness = {}
    
    root = project_root or os.path.abspath(os.path.join(os.path.dirname(__file__), FRONTEND_ROOT_RELATIVE))
    
    components = []
    apis = []
    services_info = []
    company_info = []
    
    # Scan components directory
    components_dir = os.path.join(root, 'src', 'components')
    if os.path.exists(components_dir):
        components.extend(_scan_directory_for_components(components_dir))
    
    # Scan pages directory
    pages_dir = os.path.join(root, 'src', 'pages')
    if os.path.exists(pages_dir):
        components.extend(_scan_directory_for_components(pages_dir))
    
    # Scan services for API endpoints
    services_dir = os.path.join(root, 'src', 'services')
    if os.path.exists(services_dir):
        for file in os.listdir(services_dir):
            if file.endswith(('.ts', '.js')):
                file_path = os.path.join(services_dir, file)
                content = _read_file_if_exists(file_path)
                if content:
                    # Extract API calls
                    api_matches = re.findall(r'api\.(get|post|put|delete|patch)\(["\']([^"\']+)["\']', content, re.IGNORECASE)
                    for method, endpoint in api_matches:
                        apis.append(f"{method.upper()} {endpoint}")
    
    # Extract services information from ServicesSection
    services_file = os.path.join(root, 'src', 'components', 'ServicesSection.tsx')
    services_content = _read_file_if_exists(services_file)
    if services_content:
        # Extract service titles and descriptions
        service_matches = re.findall(r'title:\s*["\']([^"\']+)["\']', services_content)
        desc_matches = re.findall(r'description:\s*["\']([^"\']+)["\']', services_content)
        price_matches = re.findall(r'price:\s*["\']([^"\']+)["\']', services_content)
        
        for i, title in enumerate(service_matches):
            service_info = {'title': title}
            if i < len(desc_matches):
                service_info['description'] = desc_matches[i]
            if i < len(price_matches):
                service_info['price'] = price_matches[i]
            services_info.append(service_info)
    
    # Extract company information from HeroSection
    hero_file = os.path.join(root, 'src', 'components', 'HeroSection.tsx')
    hero_content = _read_file_if_exists(hero_file)
    if hero_content:
        # Extract headline, description, stats
        headline_match = re.search(r'headline:\s*["\']([^"\']+)["\']', hero_content)
        desc_match = re.search(r'description:\s*["\']([^"\']+)["\']', hero_content)
        
        if headline_match:
            company_info.append(f"Headline: {headline_match.group(1)}")
        if desc_match:
            company_info.append(f"Description: {desc_match.group(1)}")
    
    _functional_awareness = {
        'components': components[:20],  # Limit to first 20 components
        'apis': list(set(apis)),
        'services': services_info,
        'company_info': company_info,
        'features': {
            'authentication': 'useAuth' in str(components),
            'file_upload': 'FileUpload' in str(components),
            'admin_panel': 'AdminPage' in str(components),
            'chat': 'chat' in str(components).lower()
        }
    }
    
    return _functional_awareness


def load_site_facts(project_root: Optional[str] = None) -> Dict[str, str]:
    """Scan selected frontend files to extract email, phone, and links."""
    global _site_facts
    _site_facts = {}

    root = project_root or os.path.abspath(os.path.join(os.path.dirname(__file__), FRONTEND_ROOT_RELATIVE))

    emails: List[str] = []
    phones: List[str] = []
    links: List[str] = []

    for rel in CONTACT_FILE_CANDIDATES:
        abs_path = os.path.join(root, rel)
        content = _read_file_if_exists(abs_path)
        if not content:
            continue
        emails.extend(EMAIL_REGEX.findall(content))
        phones.extend(PHONE_REGEX.findall(content))
        links.extend(URL_REGEX.findall(content))

    # Normalize & dedupe
    def _unique(seq: List[str]) -> List[str]:
        seen = set()
        out = []
        for x in seq:
            x_norm = x.strip()
            if not x_norm:
                continue
            if x_norm in seen:
                continue
            seen.add(x_norm)
            out.append(x_norm)
        return out

    emails = _unique(emails)
    phones = _unique(phones)
    links = _unique(links)

    # Keep only plausible phone numbers (>= 7 digits)
    phones = [p for p in phones if sum(c.isdigit() for c in p) >= 7]

    _site_facts = {
        'emails': ", ".join(emails) if emails else "",
        'phones': ", ".join(phones) if phones else "",
        'links': ", ".join(links) if links else "",
    }
    return _site_facts


def get_site_facts() -> Dict[str, str]:
    return _site_facts.copy() if _site_facts else {}


def get_structural_awareness() -> Dict[str, Any]:
    return _structural_awareness.copy() if _structural_awareness else {}


def get_functional_awareness() -> Dict[str, Any]:
    return _functional_awareness.copy() if _functional_awareness else {}


def get_ui_context() -> str:
    """Get combined UI context for the AI."""
    structural = get_structural_awareness()
    functional = get_functional_awareness()
    facts = get_site_facts()
    
    context_parts = []
    
    # Company information
    if functional.get('company_info'):
        context_parts.append("Company Information:")
        for info in functional['company_info']:
            context_parts.append(f"- {info}")
    
    # Services information
    if functional.get('services'):
        context_parts.append("\nServices Offered:")
        for service in functional['services']:
            service_text = f"- {service['title']}"
            if service.get('description'):
                service_text += f": {service['description']}"
            if service.get('price'):
                service_text += f" ({service['price']})"
            context_parts.append(service_text)
    
    # Structural info
    if structural.get('routes'):
        context_parts.append(f"\nAvailable pages/routes: {', '.join(structural['routes'])}")
    
    if structural.get('layout'):
        layout = structural['layout']
        layout_features = [k for k, v in layout.items() if v]
        if layout_features:
            context_parts.append(f"Layout features: {', '.join(layout_features)}")
    
    # Functional info
    if functional.get('features'):
        features = [k for k, v in functional['features'].items() if v]
        if features:
            context_parts.append(f"Website features: {', '.join(features)}")
    
    if functional.get('apis'):
        context_parts.append(f"Available API endpoints: {', '.join(functional['apis'][:5])}")
    
    # Contact facts
    if facts.get('emails'):
        context_parts.append(f"Contact emails: {facts['emails']}")
    if facts.get('phones'):
        context_parts.append(f"Contact phones: {facts['phones']}")
    
    return "\n".join(context_parts) if context_parts else ""