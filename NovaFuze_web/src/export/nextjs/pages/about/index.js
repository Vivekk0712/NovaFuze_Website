import Head from 'next/head';
import { NextSeo } from 'next-seo';
import metaManifest from '../../meta/meta-manifest.json';

export async function getStaticProps() {
  const pageData = metaManifest['/about'];
  
  return {
    props: {
      pageData,
      aboutData: {
        title: "About NovaFuze",
        subtitle: "Building the future through AI-first development",
        mission: "Our mission is to empower businesses with cutting-edge technology solutions that drive growth and innovation.",
        vision: "To be the leading AI-first development company that transforms how businesses operate in the digital age.",
        team: [
          {
            name: "Balaji",
            role: "Founder & Lead Developer",
            bio: "Passionate about AI and modern web technologies",
            image: "/images/team/balaji.jpg"
          }
        ]
      }
    }
  };
}

export default function About({ pageData, aboutData }) {
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
    additionalMetaTags: [
      {
        name: 'keywords',
        content: pageData.keywords,
      },
    ],
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      
      <Head>
        {/* Breadcrumbs Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://novafuze.in/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About",
                  "item": "https://novafuze.in/about/"
                }
              ]
            })
          }}
        />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <h1>{aboutData.title}</h1>
            <p>{aboutData.subtitle}</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision">
          <div className="container">
            <div className="content-grid">
              <div className="mission">
                <h2>Our Mission</h2>
                <p>{aboutData.mission}</p>
              </div>
              <div className="vision">
                <h2>Our Vision</h2>
                <p>{aboutData.vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
              {aboutData.team.map((member, index) => (
                <div key={index} className="team-member">
                  <img src={member.image} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .about-hero {
          background: linear-gradient(135deg, #4E6BDF 0%, #3B52CC 100%);
          color: white;
          padding: 6rem 2rem 4rem;
          text-align: center;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .about-hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .about-hero p {
          font-size: 1.25rem;
          opacity: 0.9;
        }
        
        .mission-vision {
          padding: 4rem 2rem;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
          margin-top: 2rem;
        }
        
        .mission, .vision {
          padding: 2rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }
        
        .team-section {
          padding: 4rem 2rem;
          background: #f8f9ff;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .team-member {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }
        
        .team-member img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
        }
        
        .role {
          color: #4E6BDF;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 2.5rem;
          }
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}