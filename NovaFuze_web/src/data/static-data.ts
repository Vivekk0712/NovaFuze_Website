// Static data for the website
import tedxImage from "figma:asset/b592f729f3b3f43f2ea6126286ea1d04a87be23d.png";
import hfbImage from "figma:asset/235600fa74e7c47f9dfc02bbe3fe10e3ea1b948d.png";

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  featuredImage: string
  tags: string[]
  author: string
  readTime: number
  createdAt: Date
  slug: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  images: string[]
  features: string[]
  category: string
  slug: string
}

export interface Service {
  id: string
  name: string
  description: string
  shortDescription: string
  icon: string
  features: string[]
  pricing: {
    startingPrice: number
    currency: string
    pricingModel: string
  }
  category: string
  slug: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  email: string
  socialLinks: {
    linkedin?: string
    github?: string
    twitter?: string
  }
  skills: string[]
  slug: string
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  shortDescription: string
  images: string[]
  technologies: string[]
  clientName: string
  projectUrl?: string
  githubUrl?: string
  category: string
  completionDate: Date
  slug: string
}

export interface Vlog {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  duration: string
  tags: string[]
  category: string
  createdAt: Date
  slug: string
}

export const staticBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Building Modern Web Applications with React',
    content: 'Learn how to build scalable React applications using modern development practices and tools. This comprehensive guide covers everything from project setup to deployment, including best practices for state management, routing, and performance optimization.',
    excerpt: 'A comprehensive guide to modern React development with best practices and tools',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500',
    tags: ['React', 'JavaScript', 'Web Development'],
    author: 'NovaFuze Team',
    readTime: 5,
    createdAt: new Date('2024-01-15'),
    slug: 'building-modern-web-applications-react'
  },
  {
    id: 'blog-2',
    title: 'The Future of AI in Web Development',
    content: 'Exploring how artificial intelligence is transforming the landscape of web development. From automated code generation to intelligent user interfaces, AI is revolutionizing how we build and interact with web applications.',
    excerpt: 'Discover the latest AI trends in web development and their impact on the industry',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
    tags: ['AI', 'Web Development', 'Technology'],
    author: 'NovaFuze Team',
    readTime: 7,
    createdAt: new Date('2024-01-10'),
    slug: 'future-ai-web-development'
  },
  {
    id: 'blog-3',
    title: 'Mobile-First Design: Best Practices for 2024',
    content: 'Mobile-first design has become essential in modern web development. Learn the key principles, techniques, and tools needed to create responsive websites that work perfectly across all devices.',
    excerpt: 'Essential guide to mobile-first design principles and implementation',
    featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
    tags: ['Mobile Design', 'UX/UI', 'Responsive Design'],
    author: 'NovaFuze Team',
    readTime: 6,
    createdAt: new Date('2024-01-05'),
    slug: 'mobile-first-design-best-practices'
  }
];

export const staticProducts: Product[] = [
  {
    id: 'nomad-nest',
    name: 'Nomad-Nest',
    description: 'Advanced application for PG & CO-living accommodations with smart booking and management features.',
    price: 0, // Contact for pricing
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1726390415269-2f7678d6b609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQRyUyMGhvc3RlbCUyMGFjY29tbW9kYXRpb24lMjBib29raW5nfGVufDF8fHx8MTc1ODg5NjE3OHww&ixlib=rb-4.1.0&q=80&w=1080'],
    features: ['Real-time booking system', 'Secure payment integration', 'Admin dashboard', 'Tenant management'],
    category: 'SaaS',
    slug: 'nomad-nest'
  },
  {
    id: 'liveeazy',
    name: 'LiveEazy',
    description: 'Comprehensive lifestyle management platform with smart home integration, personal assistant features, and seamless automation for modern living.',
    price: 799,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBtYW5hZ2VtZW50JTIwYXBwfGVufDF8fHx8MTc1ODg5NjIzNnww&ixlib=rb-4.1.0&q=80&w=1080'],
    features: ['Smart home integration', 'Personal assistant AI', 'Automation workflows', 'Lifestyle tracking'],
    category: 'Lifestyle',
    slug: 'liveeazy'
  }
];

export const staticServices: Service[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js. We create scalable, responsive, and user-friendly websites that drive business growth.',
    shortDescription: 'Modern web applications with cutting-edge technology',
    icon: 'Code',
    features: ['React/Next.js Development', 'Node.js APIs', 'Cloud Deployment', 'Responsive Design', 'SEO Optimization'],
    pricing: {
      startingPrice: 25000,
      currency: 'INR',
      pricingModel: 'Project-based'
    },
    category: 'Development',
    slug: 'web-development'
  },
  {
    id: 'mobile-app-development',
    name: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. Built with React Native and Flutter for optimal performance and user experience.',
    shortDescription: 'Cross-platform mobile apps for iOS and Android',
    icon: 'Smartphone',
    features: ['React Native Development', 'Flutter Development', 'iOS & Android', 'App Store Deployment', 'Push Notifications'],
    pricing: {
      startingPrice: 40000,
      currency: 'INR',
      pricingModel: 'Project-based'
    },
    category: 'Development',
    slug: 'mobile-app-development'
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    description: 'User-centered design solutions that create intuitive and engaging digital experiences. From wireframes to high-fidelity prototypes.',
    shortDescription: 'User-centered design for digital experiences',
    icon: 'Palette',
    features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Design Systems'],
    pricing: {
      startingPrice: 15000,
      currency: 'INR',
      pricingModel: 'Project-based'
    },
    category: 'Design',
    slug: 'ui-ux-design'
  }
];

export const staticTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Arjun Sharma',
    position: 'Founder & CEO',
    bio: 'Experienced full-stack developer and entrepreneur with over 8 years in the tech industry. Passionate about building innovative solutions that solve real-world problems.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    email: 'arjun@novafuze.in',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/arjunsharma',
      github: 'https://github.com/arjunsharma'
    },
    skills: ['React', 'Node.js', 'TypeScript', 'Leadership', 'Strategy'],
    slug: 'arjun-sharma'
  },
  {
    id: 'team-2',
    name: 'Priya Patel',
    position: 'Lead Designer',
    bio: 'Creative UI/UX designer with a keen eye for aesthetics and user experience. Specializes in creating beautiful and functional digital products.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b9a9f3b3?w=300',
    email: 'priya@novafuze.in',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/priyapatel'
    },
    skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    slug: 'priya-patel'
  },
  {
    id: 'team-3',
    name: 'Raj Kumar',
    position: 'Senior Developer',
    bio: 'Backend specialist with expertise in scalable architecture and cloud technologies. Passionate about clean code and system optimization.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    email: 'raj@novafuze.in',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/rajkumar',
      github: 'https://github.com/rajkumar'
    },
    skills: ['Python', 'AWS', 'Database Design', 'DevOps', 'API Development'],
    slug: 'raj-kumar'
  }
];

export const staticPortfolioProjects: PortfolioProject[] = [
  {
    id: 'portfolio-tedxgcem',
    title: 'TEDxGCEM',
    description: 'A comprehensive event website for TEDxGCEM featuring speaker profiles, event schedule, live streaming capabilities, and interactive audience engagement tools. The platform includes registration management, social media integration, and real-time updates during the event.',
    shortDescription: 'TEDx event website with live streaming and audience engagement',
    images: [tedxImage],
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS', 'Stripe'],
    clientName: 'GCEM College',
    projectUrl: 'https://tedxgcem.com/',
    githubUrl: 'https://github.com/novafuze/tedxgcem',
    category: 'Event Website',
    completionDate: new Date('2023-11-15'),
    slug: 'tedxgcem'
  },
  {
    id: 'portfolio-hfb-academy',
    title: 'HFB Academy',
    description: 'An advanced learning management system (LMS) for HFB Academy offering online courses, interactive assignments, progress tracking, and certification programs. Features include video streaming, quiz systems, student dashboards, and instructor tools for comprehensive online education.',
    shortDescription: 'Comprehensive learning management system with certification programs',
    images: [hfbImage],
    technologies: ['Next.js', 'PostgreSQL', 'Redis', 'AWS S3', 'Stripe', 'WebRTC'],
    clientName: 'HFB Academy',
    projectUrl: 'https://www.hfbacademy.in/',
    githubUrl: 'https://github.com/novafuze/hfb-academy',
    category: 'Educational Platform',
    completionDate: new Date('2024-02-28'),
    slug: 'hfb-academy'
  },
  {
    id: 'portfolio-mono-mode',
    title: 'Mono Mode',
    description: 'A sophisticated e-commerce platform for minimalist fashion brand Mono Mode, featuring a clean, modern design with advanced product filtering, wishlist functionality, secure payment processing, and personalized shopping experiences. Includes inventory management and order tracking systems.',
    shortDescription: 'Minimalist fashion e-commerce with advanced filtering and personalization',
    images: ['https://images.unsplash.com/photo-1695634184046-93d24e779ea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsbW9kZXJuJTIwbWluaW1hbGlzdCUyMGZhc2hpb24lMjB3ZWJzaXRlfGVufDF8fHx8MTc1ODkzNjgzNHww&ixlib=rb-4.1.0&q=80&w=1080'],
    technologies: ['React', 'Express.js', 'MongoDB', 'Cloudinary', 'Razorpay', 'ElasticSearch'],
    clientName: 'Mono Mode Fashion',
    projectUrl: 'https://www.monomode.in/',
    category: 'E-commerce',
    completionDate: new Date('2024-01-20'),
    slug: 'mono-mode'
  }
];

export const staticVlogs: Vlog[] = [
  {
    id: 'vlog-1',
    title: 'Building Scalable React Applications',
    description: 'Learn best practices for large-scale React applications including component architecture, state management, and performance optimization.',
    videoUrl: 'https://www.youtube.com/watch?v=demo1',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500',
    duration: '15:30',
    tags: ['React', 'Best Practices', 'Scaling'],
    category: 'Tutorial',
    createdAt: new Date('2024-01-01'),
    slug: 'building-scalable-react-applications'
  },
  {
    id: 'vlog-2',
    title: 'Modern Web Development Workflow',
    description: 'Discover the tools and processes we use at NovaFuze for efficient web development, from planning to deployment.',
    videoUrl: 'https://www.youtube.com/watch?v=demo2',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
    duration: '12:45',
    tags: ['Workflow', 'Tools', 'Productivity'],
    category: 'Behind the Scenes',
    createdAt: new Date('2024-01-10'),
    slug: 'modern-web-development-workflow'
  }
];

// Data getters
export const getStaticData = (type: string) => {
  switch (type) {
    case 'blogs':
      return staticBlogPosts;
    case 'products':
      return staticProducts;
    case 'services':
      return staticServices;
    case 'team':
      return staticTeamMembers;
    case 'portfolio':
      return staticPortfolioProjects;
    case 'vlogs':
      return staticVlogs;
    default:
      return [];
  }
};