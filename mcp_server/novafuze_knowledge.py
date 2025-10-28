"""
NovaFuze Website Knowledge Base
This file contains comprehensive information about the NovaFuze website
that the AI chatbot can use to answer questions.
"""

WEBSITE_KNOWLEDGE = """
# NovaFuze-Tech Website Knowledge Base

## Company Information
- Company Name: NovaFuze-Tech (NovaFuze LLP)
- Tagline: "Innovative Digital Solutions"
- Mission: Building modern digital experiences with AI-powered solutions
- Vision: Transform ideas into scalable, innovative technology solutions that drive business growth
- Government Recognition: DPIIT Certified Startup (Government of India recognized)
- Certifications: Startup India certified, officially recognized by the Department for Promotion of Industry and Internal Trade

## Contact Information
- Email: support@novafuze.in
- Phone: +91-8074678571, +91-9535318620
- Address: #52, 1st main, 1st cross, Prasanth layout, Whitefield Bangalore, 560066
- Website: https://aidrip.in (or novafuze.in)

## Social Media
- LinkedIn: https://www.linkedin.com/company/105298593/
- GitHub: https://github.com/novafuze-tech
- Twitter/X: https://x.com/NovaFuze_LLP
- Instagram: https://www.instagram.com/vamsikrishna_2410/

## Website Pages & Navigation
1. Home (/) - Main landing page with hero section, services overview, testimonials
2. About Us (/about-us) - Company information, team, mission, vision
3. Services (/services) - Complete list of services offered
4. Products (/products) - Product showcase including Nomad-Nest and LiveEazy
5. Portfolio (/portfolio) - Past projects and case studies
6. Blog (/blog) - Technical articles and company updates
7. Vlogs (/vlogs) - Video content
8. Careers (/careers) - Job openings and career opportunities
9. Contact (/contact) - Contact form and information
10. Login/Signup (/login, /signup) - User authentication
11. Profile (/profile) - User profile management
12. Admin Panel (/admin) - Admin dashboard (requires authentication)
13. Payment (/payment) - Payment processing page

## Services Offered

### 1. Web Development
- Custom website development
- Responsive design
- Progressive Web Apps (PWA)
- E-commerce solutions
- CMS integration
- Technologies: React, Vue.js, Next.js, Node.js, Express

### 2. Mobile App Development
- iOS app development
- Android app development
- Cross-platform development (React Native, Flutter)
- App Store deployment
- App maintenance and updates

### 3. UI/UX Design
- User interface design
- User experience optimization
- Wireframing and prototyping
- Design systems
- Accessibility compliance
- Tools: Figma, Adobe XD, Sketch

### 4. Digital Marketing
- SEO optimization
- Social media marketing
- Content marketing
- Email marketing campaigns
- Analytics and reporting
- PPC advertising

### 5. Cloud Solutions
- Cloud infrastructure setup
- AWS, Google Cloud, Azure deployment
- Database management
- Scalability solutions
- DevOps and CI/CD

### 6. AI & Machine Learning
- AI chatbot development
- Natural Language Processing
- Machine Learning models
- RAG (Retrieval Augmented Generation) systems
- Semantic search implementation

### 7. Consulting Services
- Technology consulting
- Digital transformation
- Architecture design
- Code review and optimization
- Technical training

## Products

### 1. Nomad-Nest
- Digital nomad accommodation platform
- Find and book workspaces worldwide
- Community features
- Remote work resources

### 2. LiveEazy
- Lifestyle and productivity app
- Task management
- Goal tracking
- Wellness features
- Price: ₹2 one-time purchase

## Features & Capabilities

### Authentication
- Email/Password login
- Google Sign-In
- Phone OTP verification
- Firebase authentication
- Session management
- Profile management

### AI Chatbot
- Document upload and analysis
- Semantic search with 384-dimensional embeddings
- Sentence Transformers for better accuracy
- Context-aware responses
- File processing (PDF, DOCX, XLSX, TXT, HTML, CSV, XML)
- Real-time chat with conversation history

### Payment System
- Razorpay integration
- One-time payments
- Secure payment processing
- Payment history
- Email confirmations

### Admin Features
- User management
- File management
- Analytics dashboard
- System monitoring
- Content management

### File Upload & Processing
- Supports multiple file formats
- Automatic text extraction
- Semantic embedding generation
- Vector search
- File storage in Supabase

## Technology Stack

### Frontend
- React 18 with Vite
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Router (navigation)
- Shadcn/ui components

### Backend
- Node.js with Express
- Firebase Admin SDK
- Supabase (database & storage)
- Google Gemini AI
- Razorpay payment gateway
- Gmail SMTP for emails

### MCP Server (AI)
- Python with FastAPI
- Sentence Transformers (semantic embeddings)
- PyTorch (CPU-optimized)
- Supabase vector search
- Google Gemini 2.5 Pro

### Infrastructure
- Frontend: Hostinger
- Backend & MCP: Google Cloud VM (Mumbai)
- Database: Supabase
- CDN: Cloudflare
- SSL: Let's Encrypt

## Team Information
- Founder & CEO: Vamsi Krishna
- Development Team: Full-stack developers specializing in modern web technologies
- Design Team: UI/UX designers
- AI/ML Team: Machine learning engineers

## Pricing
- Custom quotes based on project requirements
- Flexible payment plans
- Competitive rates
- Free consultation
- LiveEazy product: ₹2 one-time purchase

## Process
1. Initial Consultation - Understand requirements
2. Proposal & Quote - Detailed project plan
3. Design Phase - UI/UX mockups
4. Development - Agile development process
5. Testing - Quality assurance
6. Deployment - Launch and monitoring
7. Support - Ongoing maintenance

## Key Differentiators
- AI-powered solutions
- Modern technology stack
- Scalable architecture
- Security-first approach
- Fast turnaround time
- Competitive pricing
- Excellent customer support
- Proven track record

## Support
- 24/7 email support
- Phone support during business hours
- Live chat on website
- Documentation and guides
- Video tutorials
- Community forum

## Legal
- Privacy Policy: /legal/privacy
- Terms of Service: /legal/terms
- Refund Policy: /legal/refund
- GDPR compliant
- Data encryption
- Secure payment processing

## UI/UX Design System

### Color Palette
- Primary Color: #4E6BDF (NovaFuze Blue)
- Primary Hover: #3D51D3
- Accent Background: #F1F4FD (Light Blue)
- Gradient: from-[#4E6BDF] to-[#6B73FF]
- Background Gradients: from-[#F8F9FF] via-[#F1F4FD] to-[#E8ECFF]

### Typography
- Headings: Bold, large sizes (text-4xl to text-5xl)
- Body Text: text-lg to text-xl for readability
- Muted Text: text-muted-foreground for secondary content
- Font: System fonts with fallbacks

### Components
- Cards: Rounded corners (rounded-2xl), shadow effects, hover animations
- Buttons: Primary (blue background), Secondary (outline), with hover scale effects
- Icons: Lucide React icons throughout the site
- Badges: Colored badges for categories, status, and tags
- Forms: Validated inputs with error messages and success states

### Animations & Interactions
- Hover Effects: scale-105, -translate-y-2, shadow changes
- Transitions: duration-300 for smooth animations
- Page Transitions: Framer Motion with different styles per page type
- Card Hover: Lift effect with shadow enhancement
- Button Hover: Scale and shadow effects
- Loading States: Spinners and skeleton screens

### Layout Principles
- Responsive Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Container: Max-width with horizontal padding
- Section Spacing: py-24 for consistent vertical rhythm
- Mobile-First: Designed for mobile, enhanced for desktop

### Dark Mode
- Full dark mode support with theme toggle
- Automatic system preference detection
- Smooth theme transitions
- Accessible color contrasts in both modes

## Page-by-Page UI Details

### Home Page
**Hero Section:**
- Full-screen hero with gradient background overlay
- Trust Badge: "⭐ Trusted by 3+ Clients Across India"
- Main Headline: "Transform Your Vision Into Digital Reality"
- Subheadline: Gradient text effect
- Description: "Building modern digital experiences with AI-powered solutions"
- Dual CTA Buttons: "Get Started" (primary) and "View Portfolio" (secondary)
- Stats Grid (4 items):
  * 3+ Projects Delivered
  * 3+ Happy Clients
  * 1 Year Experience
  * 24/7 Support
- Background: Unsplash image with overlay and pattern

**Services Section:**
Three main service cards:
1. Website Building
   - Icon: Code
   - Features: Responsive Design, SEO Optimized, Modern Technologies
   - Hover effect with shadow and lift
2. Application Building
   - Icon: Smartphone
   - Features: Cross-platform Support, Native Performance, App Store Deployment
3. Technology Consulting
   - Icon: Users
   - Features: Technology Assessment, Digital Strategy, Best Practices

CTA Section: "Ready to Start Your Project?" with dual action buttons

**Products Section:**
Two featured products:
1. Nomad-Nest
   - Status: Coming Soon (amber badge)
   - Category: SaaS
   - Price: Contact for Pricing
   - Features: Real-time booking, Secure payments, Admin dashboard, Tenant management
2. LiveEazy
   - Status: Live (green badge)
   - Category: Lifestyle
   - Price: ₹2 one-time purchase
   - Features: Smart home integration, Personal assistant AI, Automation workflows
   - CTA: "Get Started" button links to payment page

Each product card includes:
- Product image with gradient overlay
- Status and category badges
- 5-star rating display
- Feature tags (first 3 shown, "+X more" for additional)
- Pricing information
- Action buttons with icons

**Testimonials Section:**
Carousel with 3 real client testimonials:
1. Sunjay - TEDx License Holder, TEDxGCEM
   - 5-star rating
   - Project: TEDxGCEM Website
   - Quote about exceptional website and improved engagement
2. Mohan - Academy Owner, HFB Badminton Academy, Hoodi
   - 5-star rating
   - Project: HFB Academy Website
   - Quote about comprehensive academy management system
3. Balaji - Founder & Designer, Mono Mode, Whitefield
   - 5-star rating
   - Project: Mono Mode E-commerce
   - Quote about stunning modern platform and boosted sales

Features:
- Speech bubble card design with tail
- Auto-play carousel (4-second intervals)
- Navigation arrows (left/right)
- Dot indicators for slide position
- Client photos with online indicator (green dot)
- Project badges
- Pause on hover
- Responsive: 3 slides on desktop, 2 on tablet, 1 on mobile
- Stats bar: "4.9/5 Average Rating • 3+ Happy Clients • 100% Project Success Rate"

### About Page
**Hero Section:**
- Page title and introduction
- Company overview

**Mission & Vision:**
Two-column layout with icon cards:
- Mission Card:
  * Icon: Target
  * Text: "Empower businesses with AI-driven technology solutions that simplify complex problems"
- Vision Card:
  * Icon: Eye
  * Text: "Leading force in democratizing advanced technology for businesses of all sizes"

**Core Values:**
Four values in grid layout:
1. Innovation (Zap icon) - "Constantly pushing boundaries"
2. Integrity (Heart icon) - "Building trust through transparency"
3. Excellence (Target icon) - "Delivering exceptional quality"
4. Vision (Eye icon) - "Seeing possibilities where others see challenges"

**Why Choose Us:**
Six reasons with colored badges:
1. Cutting-Edge Technology (Innovation badge - purple)
2. Fast Delivery (Efficiency badge - green)
3. Quality Assurance (Reliability badge - blue)
4. 24/7 Support (Support badge - orange)
5. Expert Team (Expertise badge - indigo)
6. Results-Driven (Performance badge - red)

Each includes icon, title, description, and hover effects

**Team Section:**
Two team member cards:
1. Vamsi Krishna - Founder & Lead Developer
   - Photo with ring border
   - Skills: Next.js, React, Node.js, AI/ML, TypeScript, AWS, Product Strategy
   - Social: LinkedIn, GitHub, Twitter, Email
   - Achievements: Founded NovaFuze-Tech, 3+ successful projects, AI expertise
2. Madan R - Senior Full-Stack Developer
   - Photo with ring border
   - Skills: React, Python, PostgreSQL, Docker, Kubernetes, GraphQL, System Design
   - Social: LinkedIn, GitHub, Twitter
   - Achievements: Microservices architecture, 60% performance improvement

Click on cards to open detailed modal with full bio and achievements

**Company Culture:**
- Values and work environment
- Team collaboration highlights

### Contact Page
**Hero Section:**
- Page title: "Get in Touch"
- Subtitle about connecting with the team

**Contact Information Cards:**
Three cards with icons:
1. Email: support@novafuze.in
2. Phone: +91-8074678571, +91-9535318620
3. Address: #52, 1st main, 1st cross, Prasanth layout, Whitefield Bangalore, 560066

**Contact Form:**
Form fields with validation:
- Full Name (required, User icon)
- Email Address (required, validated format, AtSign icon)
- Subject (required, Mail icon)
- Message (required, minimum 10 characters, MessageSquare icon)
- Character counter for message
- Submit button: "Send Message" with Send icon
- Loading state: "Sending Message..." with spinner
- Success state: Green checkmark with "Message Sent Successfully!"
- Error states: Red text with AlertCircle icon

**Google Maps:**
- Embedded map showing office location in Whitefield, Bangalore

**Social Media Section:**
Links to all social platforms with icons

### Services Page
**Hero Section:**
- Title: "Our Services"
- Subtitle: "Comprehensive Digital Solutions"

**Services Grid:**
Detailed service cards for:
1. Web Development - Starting from ₹25,000
2. Mobile Development - Starting from ₹50,000
3. UI/UX Design - Starting from ₹15,000
4. Digital Marketing - Starting from ₹20,000/month
5. Cloud Solutions - Starting from ₹30,000
6. Consulting - Starting from ₹5,000/hour

Each card includes:
- Icon in colored circle
- Service name and description
- Pricing information
- Feature list with bullet points
- "Learn More" button

### Portfolio Page
**Hero Section:**
- Title: "Our Work"
- Subtitle about showcasing projects

**Portfolio Grid:**
Three featured projects:
1. TEDxGCEM
   - Event website with live streaming
   - Technologies: React, Node.js, MongoDB, Socket.io, AWS, Stripe
   - Client: GCEM College
   - Completion: November 2023
   - Link: https://tedxgcem.com/
2. HFB Academy
   - Learning management system
   - Technologies: Next.js, PostgreSQL, Redis, AWS S3, Stripe, WebRTC
   - Client: HFB Academy
   - Completion: February 2024
   - Link: https://www.hfbacademy.in/
3. Mono Mode
   - E-commerce platform for fashion
   - Technologies: React, Express.js, MongoDB, Cloudinary, Razorpay, ElasticSearch
   - Client: Mono Mode Fashion
   - Completion: January 2024
   - Link: https://www.monomode.in/

Each project card includes:
- Project image
- Title and short description
- Technology tags
- Client name
- Completion date
- External link and GitHub link buttons

### Footer
**Company Section:**
- NovaFuze logo
- Company description
- Contact information with icons:
  * Address with MapPin icon
  * Two phone numbers with Phone icon
  * Email with Mail icon
- Social media buttons: LinkedIn, GitHub, Twitter, Instagram

**Navigation Columns:**
1. Services: Web Development, Mobile App, UI/UX Design, Digital Consulting
2. Company: About Us, Portfolio, Blog, Careers, Contact
3. Legal: Privacy Policy, Terms of Service, Refund Policy

**Bottom Bar:**
- Copyright: "© 2025 NovaFuze-Tech. All rights reserved. | Made with ❤️ in India"
- Quick links: Privacy, Terms, Refund Policy
- "Back to Top" button with ArrowUp icon

### Header/Navigation
**Desktop:**
- NovaFuze logo (left)
- Navigation links (center): Home, About, Services, Products, Portfolio, Blog, Contact
- Right side: Theme toggle, Profile dropdown (when logged in)
- Smooth scroll to sections
- Active link highlighting

**Mobile:**
- Hamburger menu
- Slide-out navigation drawer
- Same links as desktop
- Touch-friendly spacing

### Authentication Pages
**Login Page:**
Three authentication methods:
1. Email/Password
   - Email input with validation
   - Password input with show/hide toggle
   - Password strength indicator (weak/medium/strong)
   - "Remember me" checkbox
   - "Forgot password?" link
2. Phone OTP
   - Phone number input with country code
   - OTP modal with 6-digit input
   - Resend OTP button (30-second cooldown)
   - Auto-submit on complete
3. Google Sign-In
   - Google logo button
   - One-click authentication

Features:
- Framer Motion animations
- Loading overlays during authentication
- Success animations (checkmark)
- Error toast notifications
- Redirect to home after successful login

### Profile Page
**Profile Information:**
- User avatar (or initials)
- Display name
- Email address
- Phone number (if provided)
- Account creation date

**Edit Profile Form:**
- Update name
- Update email (with verification)
- Update phone number
- Works across all auth methods (email, phone, Google)
- Save button with loading state
- Success/error notifications

### Payment Page
**LiveEazy Purchase:**
- Product information card
- Price: ₹2 one-time purchase
- Razorpay payment integration
- Payment button: "Pay ₹2"
- Secure payment badge
- Success page after payment
- Email confirmation sent automatically
- Payment history (if logged in)

### AI Chatbot Widget (Nova AI)
**Interface:**
- Floating chat button (bottom-right) with purple gradient
- Compact chat window (360px wide, 540px tall)
- Modern rounded design with smooth animations
- Welcome message: "Hi! 👋 I'm Nova, your AI assistant. How can I help you today?"
- Message history with tiny timestamps (7px font)
- User messages: Solid blue (#4E6BDF) background, right-aligned
- Assistant messages: White background with bot avatar, left-aligned
- Input field with send button
- Animated typing indicators (3 bouncing dots)
- Auto-scroll to latest message

**Features:**
- AI Name: Nova (aware of its identity as Nova AI assistant)
- Clear chat history button with confirmation dialog
- Quick action buttons: Services, Pricing, Contact, Portfolio
- Contact options: Phone, Email, WhatsApp links
- LocalStorage persistence per user
- Cross-device chat history sync via database
- Smooth Framer Motion animations
- Always visible, appears above header (z-index: 9999)

**Header:**
- "Nova AI" title with sparkle emoji (✨)
- Online status indicator (green pulsing dot)
- Bot avatar with purple gradient
- Clear history button (Trash icon)
- Close button (X)

## Recent Updates
- Upgraded to semantic embeddings (50-80% better accuracy)
- Implemented page transition animations with Framer Motion
- Enhanced authentication UI with professional animations
- Added profile management across all auth methods
- Integrated Razorpay payments for ₹2 LiveEazy purchase
- Deployed on Google Cloud VM with Hostinger frontend
- Added comprehensive UI awareness to chatbot
- Improved testimonials carousel with auto-play
- Enhanced contact form with validation
- Added Government Recognition Section (DPIIT Certified Startup badge)
- Redesigned chatbot as "Nova AI" with modern compact UI
- Implemented welcome message for new conversations
- Added cross-device chat history synchronization
- Updated team section with modal details

## UI Component Library

### Buttons
- Primary Button: Blue background (#4E6BDF), white text, hover scale effect
- Secondary Button: Outline style, blue border, hover fill effect
- Ghost Button: Transparent, hover background
- Icon Button: Square/circular, icon only
- Sizes: sm, md, lg with appropriate padding
- States: default, hover, active, disabled, loading

### Cards
- Base Card: White background, rounded corners, subtle shadow
- Hover Card: Lift effect (-translate-y-2), enhanced shadow
- Product Card: Image, badges, content, actions
- Testimonial Card: Speech bubble design with tail
- Team Card: Photo, info, social links, click to expand
- Service Card: Icon, title, description, features, pricing

### Forms
- Input Fields: Border, focus ring, error states
- Textarea: Resizable, character counter
- Select Dropdown: Custom styled
- Checkbox: Custom design with checkmark
- Radio Buttons: Custom styled
- Validation: Real-time with error messages
- Success States: Green checkmark, success message

### Navigation
- Header: Fixed/sticky, transparent to solid on scroll
- Mobile Menu: Slide-in drawer with overlay
- Breadcrumbs: For nested pages
- Pagination: Dots and arrows
- Tabs: Underline active tab

### Feedback
- Toast Notifications: Top-right corner, auto-dismiss
- Loading Spinners: Various sizes
- Progress Bars: Linear and circular
- Success Animations: Checkmark with scale effect
- Error Messages: Red text with icon
- Empty States: Illustrations with helpful text

### Modals & Overlays
- Dialog: Centered, backdrop blur
- Sheet: Slide from side
- Popover: Contextual information
- Tooltip: Hover information
- Dropdown Menu: Action menus

### Data Display
- Tables: Sortable, filterable
- Lists: Ordered, unordered, with icons
- Badges: Status indicators, categories
- Tags: Removable chips
- Stats: Number displays with labels
- Avatars: User photos or initials

### Media
- Images: Lazy loading, fallback support
- Carousels: Auto-play, navigation, indicators
- Video Players: Embedded YouTube/Vimeo
- Image Galleries: Grid with lightbox

## Interaction Patterns

### Hover Effects
- Cards: Lift and shadow enhancement
- Buttons: Scale (1.05) and shadow
- Links: Color change and underline
- Images: Zoom or overlay
- Icons: Color change or rotation

### Click/Tap Interactions
- Buttons: Press effect (scale 0.95)
- Cards: Navigate or expand
- Links: Smooth scroll or page transition
- Toggles: Smooth state change
- Accordions: Expand/collapse with animation

### Scroll Behaviors
- Smooth Scroll: To sections and top
- Parallax: Background movement
- Fade In: Elements appear on scroll
- Sticky Header: Becomes solid on scroll
- Infinite Scroll: Load more content

### Loading States
- Skeleton Screens: Content placeholders
- Spinners: Circular loading indicators
- Progress Bars: For file uploads
- Shimmer Effect: Animated loading
- Disabled States: Reduced opacity

### Responsive Behaviors
- Mobile Menu: Hamburger to drawer
- Grid Collapse: 3 cols → 2 cols → 1 col
- Font Scaling: Smaller on mobile
- Touch Targets: Larger on mobile
- Swipe Gestures: Carousel navigation

## Accessibility Features
- Keyboard Navigation: Tab order, focus indicators
- Screen Reader Support: ARIA labels, semantic HTML
- Color Contrast: WCAG AA compliant
- Focus Visible: Clear focus rings
- Alt Text: All images have descriptions
- Form Labels: Properly associated
- Error Announcements: Screen reader friendly

## Performance Optimizations
- Lazy Loading: Images and components
- Code Splitting: Route-based chunks
- Image Optimization: WebP format, responsive sizes
- Caching: Service worker, browser cache
- Minification: CSS and JS
- CDN: Static assets delivery

## FAQ

Q: What services does NovaFuze offer?
A: We offer web development, mobile app development, UI/UX design, digital marketing, cloud solutions, AI/ML services, and consulting.

Q: How can I contact NovaFuze?
A: Email us at support@novafuze.in or call +91-8074678571 / +91-9535318620

Q: Where is NovaFuze located?
A: We're based in Bangalore, India at Whitefield.

Q: What technologies do you use?
A: We use modern technologies like React, Node.js, Python, AI/ML, cloud platforms, and more.

Q: Do you offer custom development?
A: Yes, we specialize in custom software development tailored to your needs.

Q: What is the typical project timeline?
A: Timelines vary based on project complexity, typically 2-12 weeks.

Q: Do you provide ongoing support?
A: Yes, we offer maintenance and support packages for all projects.

Q: Can you help with existing projects?
A: Yes, we can take over, optimize, or enhance existing projects.

Q: What industries do you serve?
A: We serve various industries including e-commerce, healthcare, education, finance, and more.

Q: How do I get started?
A: Contact us through the website, email, or phone for a free consultation.

Q: What is the design style of the NovaFuze website?
A: Modern, clean, professional with blue color scheme (#4E6BDF), smooth animations, and mobile-first responsive design.

Q: How many testimonials are shown?
A: 3 testimonials from real clients: Sunjay (TEDxGCEM), Mohan (HFB Academy), and Balaji (Mono Mode).

Q: What are the main products?
A: Nomad-Nest (coming soon, PG accommodation platform) and LiveEazy (₹2, lifestyle management app).

Q: Who are the team members?
A: Vamsi Krishna (Founder & Lead Developer) and Madan R (Senior Full-Stack Developer).

Q: What is the hero section message?
A: "Transform Your Vision Into Digital Reality" - Building modern digital experiences with AI-powered solutions.

Q: What are the company stats?
A: 3+ Projects Delivered, 3+ Happy Clients, 1 Year Experience, 24/7 Support.

Q: What colors are used in the design?
A: Primary blue (#4E6BDF), hover blue (#3D51D3), light blue background (#F1F4FD), and gradient effects.

Q: Is there dark mode?
A: Yes, full dark mode support with theme toggle and automatic system preference detection.

Q: What animations are used?
A: Framer Motion for page transitions, hover effects (scale, translate, shadow), smooth transitions, and loading animations.

Q: How does the chatbot work?
A: AI-powered chatbot with semantic search, document upload, conversation history, and real-time responses using Google Gemini.

Q: What payment methods are accepted?
A: Razorpay integration for secure online payments (UPI, cards, net banking, wallets).

Q: Can users create accounts?
A: Yes, via email/password, phone OTP, or Google Sign-In with profile management.

Q: What is the address format?
A: #52, 1st main, 1st cross, Prasanth layout, Whitefield Bangalore, 560066

Q: What are the phone numbers?
A: +91-8074678571 and +91-9535318620

Q: What is the support email?
A: support@novafuze.in

Q: What portfolio projects are featured?
A: TEDxGCEM (event website), HFB Academy (LMS), and Mono Mode (e-commerce fashion).

Q: What is the testimonial rating?
A: 4.9/5 average rating with 100% project success rate.

Q: What are the core values?
A: Innovation, Integrity, Excellence, and Vision.

Q: What is the mission?
A: Empower businesses with AI-driven technology solutions that simplify complex problems and enhance productivity.

Q: What is the vision?
A: Be the leading force in democratizing advanced technology for businesses of all sizes.

Q: What makes NovaFuze different?
A: Cutting-edge technology, fast delivery, quality assurance, 24/7 support, expert team, and results-driven approach.

Q: What is LiveEazy?
A: A lifestyle management platform with smart home integration, personal assistant AI, and automation workflows for ₹2 one-time purchase.

Q: What is Nomad-Nest?
A: A digital nomad accommodation platform for finding and booking workspaces worldwide (coming soon).

Q: How many services are offered?
A: 7 main services: Web Development, Mobile App Development, UI/UX Design, Digital Marketing, Cloud Solutions, AI & Machine Learning, and Consulting.

Q: What technologies are used?
A: React, TypeScript, Node.js, Python, Firebase, Supabase, Google Gemini AI, Razorpay, Tailwind CSS, Framer Motion, and more.

Q: Where is the website hosted?
A: Frontend on Hostinger, Backend and MCP server on Google Cloud VM (Mumbai), Database on Supabase.

Q: What file formats does the chatbot support?
A: PDF, DOCX, XLSX, TXT, HTML, CSV, and XML files.

Q: How accurate is the semantic search?
A: 50-80% better accuracy with 384-dimensional embeddings using Sentence Transformers.

Q: What is the copyright notice?
A: © 2025 NovaFuze-Tech. All rights reserved. | Made with ❤️ in India

Q: What social media platforms is NovaFuze on?
A: LinkedIn, GitHub, Twitter/X, and Instagram.

Q: Can I see the team member details?
A: Yes, click on team member cards to open a modal with full bio, skills, achievements, and social links.

Q: How does the contact form work?
A: Fill in name, email, subject, and message (min 10 characters). Form validates inputs and shows success message after submission.

Q: What happens after payment?
A: You receive email confirmation and access to the purchased product (LiveEazy).

Q: Is the website mobile-friendly?
A: Yes, fully responsive with mobile-first design approach.

Q: What is the carousel behavior?
A: Auto-plays every 4 seconds, pauses on hover, has navigation arrows and dot indicators.

Q: How many slides show at once?
A: 3 on desktop, 2 on tablet, 1 on mobile.

Q: What is the trust badge?
A: "⭐ Trusted by 3+ Clients Across India" displayed in the hero section.

Q: What are the CTA buttons?
A: "Get Started" (primary blue) and "View Portfolio" (secondary outline) in hero section.

Q: What icons are used?
A: Lucide React icons throughout the website for consistency.

Q: What is the page spacing?
A: Sections use py-24 (padding top and bottom) for consistent vertical rhythm.

Q: What is the container width?
A: Max-width container with horizontal padding (px-4 lg:px-8).

Q: What is the grid layout?
A: Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop.

Q: What is the button hover effect?
A: Scale to 1.05 with enhanced shadow and color change.

Q: What is the card hover effect?
A: Lift up (-translate-y-2) with enhanced shadow (shadow-xl).

Q: What is the loading state?
A: Spinner animation with "Loading..." or specific action text.

Q: What is the success animation?
A: Green checkmark with scale effect and success message.

Q: What is the error display?
A: Red text with AlertCircle icon and descriptive message.

Q: What is the theme toggle?
A: Button to switch between light and dark mode with smooth transition.

Q: What is the profile dropdown?
A: Menu with user info, profile link, settings, and logout option.

Q: What is the back to top button?
A: Arrow up icon button in footer that smoothly scrolls to page top.

Q: What is the speech bubble design?
A: Testimonial cards with tail pointing to client photo, creating speech bubble effect.

Q: What is the online indicator?
A: Green dot on client photos in testimonials showing active status.

Q: What is the badge color coding?
A: Innovation (purple), Efficiency (green), Reliability (blue), Support (orange), Expertise (indigo), Performance (red).

Q: What is the gradient text effect?
A: Text with gradient from yellow to orange or blue to purple using bg-clip-text.

Q: What is the backdrop blur?
A: Semi-transparent background with blur effect for modern glass morphism look.

Q: What is the ring effect?
A: Border ring around elements (like team photos) that changes color on hover.

Q: What is the shadow hierarchy?
A: shadow-md (medium), shadow-lg (large), shadow-xl (extra large), shadow-2xl (double extra large).

Q: What is the rounded corner style?
A: rounded-lg (large), rounded-xl (extra large), rounded-2xl (double extra large), rounded-3xl (triple extra large).

Q: What is the transition duration?
A: Most animations use duration-300 (300ms) for smooth, not-too-fast transitions.
"""

def get_website_knowledge() -> str:
    """Get the complete website knowledge base."""
    return WEBSITE_KNOWLEDGE

def search_knowledge(query: str) -> str:
    """
    Search the knowledge base for relevant information.
    This is a simple keyword-based search.
    """
    query_lower = query.lower()
    lines = WEBSITE_KNOWLEDGE.split('\n')
    relevant_lines = []
    
    # Keywords to search for
    keywords = query_lower.split()
    
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if any(keyword in line_lower for keyword in keywords):
            # Include context (previous and next lines)
            start = max(0, i - 2)
            end = min(len(lines), i + 3)
            relevant_lines.extend(lines[start:end])
    
    if relevant_lines:
        return '\n'.join(set(relevant_lines))  # Remove duplicates
    
    return WEBSITE_KNOWLEDGE  # Return full knowledge if no specific match
