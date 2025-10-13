import { Header } from "./Header"
import { ServiceDetailHero } from "./ServiceDetailHero"
import { ServiceOverviewSection } from "./ServiceOverviewSection"
import { ChallengesSection } from "./ChallengesSection"
import { ProcessSection } from "./ProcessSection"
import { ServicePortfolioCarousel } from "./ServicePortfolioCarousel"
import { ServiceTestimonials } from "./ServiceTestimonials"
import { ServiceCTA } from "./ServiceCTA"
import { Footer } from "./Footer"
import { Search, Code, Rocket } from "lucide-react"
import tedxImage from "figma:asset/b592f729f3b3f43f2ea6126286ea1d04a87be23d.png";
import hfbImage from "figma:asset/235600fa74e7c47f9dfc02bbe3fe10e3ea1b948d.png";

export function WebDevelopmentServicePage() {
  // Service data
  const serviceData = {
    title: "Web Development",
    subtitle: "Modern, responsive websites that drive results",
    description: "Transform your digital presence with cutting-edge web development solutions. We create high-performance, scalable websites and web applications using the latest technologies like React, Next.js, and Node.js.",
    pricing: "₹50,000",
    deliveryTime: "2-8 weeks",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    heroImage: "https://images.unsplash.com/photo-1532623034127-3d92b01fb3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHRlYW18ZW58MXx8fHwxNzU4MjEyMjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Performance First",
      "Modern Tech Stack",
      "API Integration",
      "Security Features"
    ]
  }

  // Overview data
  const overviewData = {
    title: "Web Development",
    overview: "Our web development service combines modern design principles with cutting-edge technology to create websites that not only look great but perform exceptionally. We focus on user experience, performance, and scalability to ensure your website grows with your business.",
    benefits: [
      "Increased online visibility and reach",
      "Improved user engagement and conversions",
      "Better search engine rankings",
      "Mobile-responsive design for all devices",
      "Fast loading times and optimal performance",
      "Scalable architecture for future growth"
    ],
    deliverables: [
      "Custom website design and development",
      "Content management system (CMS)",
      "SEO optimization and analytics setup",
      "Mobile-responsive implementation",
      "Performance optimization",
      "Security implementation and SSL setup",
      "6 months of free maintenance and support"
    ],
    targetAudience: [
      "Small Businesses",
      "Startups",
      "E-commerce Companies",
      "Professional Services",
      "Non-profits",
      "Enterprise Companies"
    ]
  }

  // Challenges data
  const challengesData = {
    title: "Web Development",
    description: "Modern businesses face numerous challenges in establishing an effective online presence. Our web development solutions address these pain points systematically.",
    challenges: [
      {
        problem: "Poor website performance and slow loading times",
        impact: "High bounce rates",
        solution: "Performance optimization with modern frameworks and CDN implementation",
        result: "Page load times under 2 seconds, improved user retention"
      },
      {
        problem: "Non-responsive design that doesn't work on mobile devices",
        impact: "Lost mobile traffic",
        solution: "Mobile-first responsive design approach using modern CSS frameworks",
        result: "Seamless experience across all devices, increased mobile conversions"
      },
      {
        problem: "Poor search engine visibility and low organic traffic",
        impact: "Limited online reach",
        solution: "Comprehensive SEO optimization and technical SEO implementation",
        result: "Improved search rankings and 200% increase in organic traffic"
      }
    ]
  }

  // Process data
  const processData = {
    title: "Web Development",
    description: "Our proven 3-step process ensures efficient project delivery while maintaining the highest quality standards. Each phase is designed to maximize collaboration and minimize revisions.",
    steps: [
      {
        step: 1,
        title: "Discovery & Planning",
        description: "We start by understanding your business goals, target audience, and technical requirements. This phase includes competitor analysis, user research, and technical architecture planning.",
        icon: <Search className="h-6 w-6 text-[#4E6BDF]" />,
        duration: "1-2 weeks",
        deliverables: [
          "Project scope and requirements document",
          "Technical architecture plan",
          "User experience wireframes",
          "Project timeline and milestones"
        ]
      },
      {
        step: 2,
        title: "Design & Development",
        description: "Our team creates pixel-perfect designs and develops the website using modern technologies. We follow agile methodology with regular check-ins and feedback sessions.",
        icon: <Code className="h-6 w-6 text-[#4E6BDF]" />,
        duration: "3-6 weeks",
        deliverables: [
          "Custom website design mockups",
          "Fully functional website development",
          "Content management system setup",
          "Mobile responsive implementation"
        ]
      },
      {
        step: 3,
        title: "Testing & Launch",
        description: "Comprehensive testing across all devices and browsers, performance optimization, SEO setup, and smooth deployment to production with ongoing support.",
        icon: <Rocket className="h-6 w-6 text-[#4E6BDF]" />,
        duration: "1-2 weeks",
        deliverables: [
          "Quality assurance testing",
          "Performance optimization",
          "SEO setup and analytics",
          "Live website deployment",
          "Training and documentation"
        ]
      }
    ]
  }

  // Portfolio data
  const portfolioData = {
    title: "Web Development",
    description: "See how we've helped businesses transform their online presence with modern, high-performing websites.",
    projects: [
      {
        id: "tedxgcem",
        title: "TEDxGCEM",
        client: "GCEM College",
        description: "A comprehensive event website for TEDxGCEM featuring speaker profiles, event schedule, live streaming capabilities, and interactive audience engagement tools.",
        image: tedxImage,
        tags: ["Event Website", "React", "Live Streaming", "Engagement"],
        results: [
          { metric: "Event Registration", value: "+200%" },
          { metric: "User Engagement", value: "+180%" }
        ],
        link: "/portfolio/tedxgcem"
      },
      {
        id: "hfb-academy",
        title: "HFB Academy",
        client: "HFB Academy",
        description: "An advanced learning management system (LMS) for HFB Academy offering online courses, interactive assignments, progress tracking, and certification programs.",
        image: hfbImage,
        tags: ["Educational Platform", "LMS", "Next.js", "E-learning"],
        results: [
          { metric: "Student Enrollment", value: "+250%" },
          { metric: "Course Completion", value: "+300%" }
        ],
        link: "/portfolio/hfb-academy"
      }
    ]
  }

  // Testimonials data
  const testimonialsData = {
    title: "Web Development",
    description: "Hear from our clients about their experience working with our web development team.",
    testimonials: [
      {
        id: "sunjay-tedx",
        name: "Sunjay",
        role: "TEDx License Holder",
        company: "TEDxGCEM",
        image: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        quote: "NovaFuze-Tech created an exceptional website for TEDxGCEM that perfectly captures our vision and mission. The platform is user-friendly, engaging, and has significantly improved our event registration and community engagement.",
        rating: 5,
        project: "TEDxGCEM Website"
      },
      {
        id: "mohan-hfb",
        name: "Mohan",
        role: "Academy Owner",
        company: "HFB Badminton Academy, Hoodi",
        image: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        quote: "As a proud owner of a badminton academy in Hoodi, I needed a professional online presence. NovaFuze-Tech delivered beyond expectations with a comprehensive academy management system that handles everything from student registrations to scheduling.",
        rating: 5,
        project: "HFB Academy Website"
      },
      {
        id: "amit-fintech",
        name: "Balaji",
        role: "Founder & Designer",
        company: "Mono Mode, Whitefield",
        image: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        quote: "As a young entrepreneur from Whitefield focused on unique design clothing solutions for Gen-Z, I needed a website that truly represents our brand. NovaFuze-Tech created a stunning, modern platform that perfectly captures our aesthetic and has boosted our online sales tremendously!",
        rating: 5,
        project: "Mono Mode E-commerce"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ServiceDetailHero {...serviceData} />
        <ServiceOverviewSection {...overviewData} />
        <ChallengesSection {...challengesData} />
        <ProcessSection {...processData} />
        <ServicePortfolioCarousel {...portfolioData} />
        <ServiceTestimonials {...testimonialsData} />
        <ServiceCTA 
          title="Web Development"
          pricing="₹50,000"
          deliveryTime="2-8 weeks"
        />
      </main>
      <Footer />
    </div>
  )
}