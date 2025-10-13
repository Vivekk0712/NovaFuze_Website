import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

export function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: September 15
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <p className="text-sm text-muted-foreground mb-0">
              <strong>Important Notice:</strong> NovaFuze-Tech is committed to protecting your privacy. 
              This website is designed for showcasing our services and capabilities, and is not 
              intended for collecting personally identifiable information (PII) or handling sensitive data.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
            <p className="mb-4">
              We may collect the following types of information when you visit our website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, and phone number when you contact us</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and time spent</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system</li>
              <li><strong>Cookies:</strong> Small data files stored on your device to enhance user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve our website and services</li>
              <li>To send you newsletters and promotional materials (with your consent)</li>
              <li>To analyze website usage and performance</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist us in operating our website</li>
              <li>When required by law or to protect our rights</li>
              <li>In the event of a business transfer or merger</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
            <p className="mb-4">
              Under applicable data protection laws, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cookies Policy</h2>
            <p className="mb-4">
              Our website uses cookies to enhance user experience. You can control cookies through 
              your browser settings. Disabling cookies may affect website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Children's Privacy</h2>
            <p className="mb-4">
              Our services are not directed to children under 13. We do not knowingly collect 
              personal information from children under 13. If we become aware of such collection, 
              we will delete the information immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any 
              material changes by posting the new policy on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Contact Information</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="mb-2">
                If you have any questions about this Privacy Policy, please contact us:
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
              This Privacy Policy is governed by the laws of India and complies with applicable 
              Indian data protection regulations.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}