import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

// Default SEO configuration
const defaultSEO = {
  title: 'NovaFuze — AI-First Web & Mobile Development | Bangalore',
  description: 'NovaFuze builds AI-driven web and mobile applications for startups and enterprises. Expert development team in Bangalore offering custom solutions.',
  canonical: 'https://novafuze.in/',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://novafuze.in/',
    siteName: 'NovaFuze',
    images: [
      {
        url: 'https://novafuze.in/og/default-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'NovaFuze - AI-First Development',
      }
    ],
  },
  twitter: {
    handle: '@novafuze',
    site: '@novafuze',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'NovaFuze',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      
      <Head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        
        {/* Global organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NovaFuze",
              "alternateName": "NovaFuze Tech",
              "url": "https://novafuze.in",
              "logo": "https://novafuze.in/logo.png",
              "description": "AI-first web and mobile development company specializing in custom applications for startups and enterprises",
              "foundingDate": "2020",
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
                "email": "support@novafuze.in",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/novafuze",
                "https://twitter.com/novafuze",
                "https://github.com/novafuze"
              ]
            })
          }}
        />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        
        {/* Critical CSS for all pages */}
        <style jsx global>{`
          :root {
            --primary: #4E6BDF;
            --background: #ffffff;
            --foreground: #0f0f23;
            --secondary: #F1F4FD;
            --muted: #F8F9FF;
            --border: #e5e7eb;
          }
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          html {
            font-size: 16px;
            scroll-behavior: smooth;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background-color: var(--background);
            color: var(--foreground);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Skip link for accessibility */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
          
          .sr-only:focus {
            position: static;
            width: auto;
            height: auto;
            padding: 0.5rem 1rem;
            margin: 0;
            overflow: visible;
            clip: auto;
            white-space: normal;
            background: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 0.25rem;
          }
          
          /* Focus styles for accessibility */
          button:focus,
          a:focus,
          input:focus,
          textarea:focus,
          select:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
          }
          
          /* Basic typography */
          h1, h2, h3, h4, h5, h6 {
            font-weight: 600;
            line-height: 1.2;
            margin-bottom: 1rem;
          }
          
          h1 {
            font-size: 2.5rem;
          }
          
          h2 {
            font-size: 2rem;
          }
          
          h3 {
            font-size: 1.5rem;
          }
          
          p {
            margin-bottom: 1rem;
          }
          
          a {
            color: var(--primary);
            text-decoration: none;
          }
          
          a:hover {
            text-decoration: underline;
          }
          
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Container utility */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 0 1rem;
            }
            
            h1 {
              font-size: 2rem;
            }
            
            h2 {
              font-size: 1.75rem;
            }
          }
        `}</style>
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}