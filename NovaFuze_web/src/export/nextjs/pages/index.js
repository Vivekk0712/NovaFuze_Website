import Head from 'next/head';
import { NextSeo } from 'next-seo';
import metaManifest from '../meta/meta-manifest.json';

export async function getStaticProps() {
  const pageData = metaManifest['/'];
  
  return {
    props: {
      pageData,
      // Add any additional data fetching here
      heroData: {
        title: "Build the Future with AI-First Development",
        subtitle: "We create cutting-edge web and mobile applications that transform businesses and accelerate growth through innovative technology.",
        ctaText: "Start Your Project",
        ctaLink: "/contact/"
      },
      services: [
        {
          title: "Web Development",
          description: "Modern, scalable web applications using React, Next.js, and cutting-edge technologies.",
          icon: "💻"
        },
        {
          title: "Mobile Apps", 
          description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
          icon: "📱"
        },
        {
          title: "AI Integration",
          description: "Smart AI-powered features and integrations that give your business a competitive edge.",
          icon: "🤖"
        }
      ]
    }
  };
}

export default function Home({ pageData, heroData, services }) {
  const seoConfig = {
    title: pageData.title,
    description: pageData.description,
    canonical: pageData.canonical,
    openGraph: {
      type: pageData.type,
      url: pageData.canonical,
      title: pageData.title,
      description: pageData.description,
      images: [
        {
          url: `https://novafuze.in${pageData.og_image}`,
          width: 1200,
          height: 630,
          alt: pageData.title,
        }
      ],
      site_name: 'NovaFuze',
    },
    twitter: {
      handle: '@novafuze',
      site: '@novafuze',
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: pageData.keywords,
      },
      {
        name: 'author',
        content: 'NovaFuze',
      },
    ],
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      
      <Head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NovaFuze",
              "url": "https://novafuze.in",
              "logo": "https://novafuze.in/logo.png",
              "description": "AI-first web and mobile development company",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Innovation Hub, Koramangala",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560034",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-80-12345678",
                "contactType": "customer service",
                "email": "support@novafuze.in"
              }
            })
          }}
        />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/images/hero-bg.webp" />
        <link rel="preload" as="font" href="/fonts/inter-var.woff2" type="font/woff2" crossOrigin="" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>{heroData.title}</h1>
            <p>{heroData.subtitle}</p>
            <a href={heroData.ctaLink} className="cta-button">
              {heroData.ctaText}
            </a>
          </div>
        </section>

        {/* Trust Section */}
        <section className="trust-section" aria-labelledby="trust-heading">
          <div className="container">
            <h2 id="trust-heading">Trusted by Forward-Thinking Companies</h2>
            <p>We&apos;ve helped startups and enterprises build scalable, AI-powered solutions</p>
            {/* Client logos will be rendered here */}
          </div>
        </section>

        {/* Services Preview */}
        <section className="services-preview" aria-labelledby="services-heading">
          <div className="container">
            <h2 id="services-heading">Our Services</h2>
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #4E6BDF 0%, #3B52CC 100%);
          color: white;
          text-align: center;
          padding: 2rem;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          max-width: 800px;
        }
        
        .hero p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          max-width: 600px;
          opacity: 0.9;
        }
        
        .cta-button {
          display: inline-block;
          background: white;
          color: #4E6BDF;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
        }
        
        .trust-section {
          padding: 4rem 2rem;
          text-align: center;
          background: #f8f9ff;
        }
        
        .services-preview {
          padding: 4rem 2rem;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .service-card {
          padding: 2rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          text-align: center;
        }
        
        .service-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .hero p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}