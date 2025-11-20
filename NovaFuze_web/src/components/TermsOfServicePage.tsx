import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

export function TermsOfServicePage() {
  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          className="mb-8 p-0 h-auto hover:bg-transparent text-[#4E6BDF] hover:text-[#3D51D3]"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4E6BDF] mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: September 15
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <p className="text-sm text-muted-foreground mb-0">
              <strong>Agreement:</strong> By accessing and using NovaFuze's website and services,
              you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="mb-4">
              These Terms of Service ("Terms") govern your use of NovaFuze's website, products, and services.
              By accessing or using our services, you acknowledge that you have read, understood, and agree
              to be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Services</h2>
            <p className="mb-4">
              NovaFuze provides technology consulting, software development, and digital solutions including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Web and mobile application development</li>
              <li>AI-powered solutions and automation</li>
              <li>Cloud infrastructure and consulting</li>
              <li>UI/UX design services</li>
              <li>Digital marketing and SEO services</li>
              <li>Technical consulting and support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Responsibilities</h2>
            <p className="mb-4">
              You agree to use our services responsibly and in accordance with these Terms:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information when required</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Not use our services for illegal or unauthorized purposes</li>
              <li>Respect intellectual property rights</li>
              <li>Not interfere with or disrupt our services</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Service Availability</h2>
            <p className="mb-4">
              While we strive to maintain continuous service availability, we do not guarantee
              uninterrupted access to our services. We reserve the right to modify, suspend,
              or discontinue services at any time with reasonable notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Intellectual Property Rights</h2>
            <p className="mb-4">
              All content, features, and functionality on our website and services are owned by
              NovaFuze and are protected by intellectual property laws:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Trademarks, logos, and brand names are our property</li>
              <li>Software, code, and technical solutions remain our intellectual property</li>
              <li>Client-specific work is delivered as per project agreements</li>
              <li>Open-source components retain their respective licenses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Payment Terms</h2>
            <p className="mb-4">
              For paid services, the following payment terms apply:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are quoted in Indian Rupees (INR) unless specified otherwise</li>
              <li>Payment terms are specified in individual project agreements</li>
              <li>Late payment may result in service suspension</li>
              <li>Refunds are subject to our Refund Policy</li>
              <li>Applicable taxes will be added as per Indian tax laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Privacy and Data Protection</h2>
            <p className="mb-4">
              Your privacy is important to us. Our data collection and processing practices
              are governed by our Privacy Policy, which forms an integral part of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>NovaFuze shall not be liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability shall not exceed the amount paid for the specific service</li>
              <li>We do not warrant that our services will be error-free or uninterrupted</li>
              <li>Users are responsible for backing up their data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold NovaFuze harmless from any claims, damages, or
              expenses arising from your use of our services or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend access to our services immediately, without prior notice,
              for conduct that we believe violates these Terms or is harmful to other users or us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by and construed in accordance with the laws of India.
              Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Material changes will be
              communicated through our website or email. Continued use of our services constitutes
              acceptance of modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Contact Information</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="mb-2">
                For questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-1">
                <li><strong>Email:</strong> support@novafuze.in</li>
                <li><strong>Phone:</strong> +91-8074678571</li>
                <li><strong>Address:</strong> #52, 1st main, 1st cross, prasanth layout, Whitefield, Bangalore, 560066</li>
              </ul>
            </div>
          </section>

          <section className="text-center pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              These Terms of Service are governed by the laws of India and comply with applicable
              Indian business and consumer protection regulations.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}