import { Button } from "./ui/button"
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react"

export function RefundPolicyPage() {
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
            Refund Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: September 15
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <p className="text-sm text-muted-foreground mb-0">
              <strong>Our Commitment:</strong> NovaFuze is committed to client satisfaction. 
              This refund policy outlines the terms and conditions for refunds on our services 
              and products, ensuring fairness for both clients and our business.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Refund Eligibility</h2>
            <p className="mb-4">
              Refunds may be considered under the following circumstances:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold">Eligible for Refund</h3>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Service not delivered as per agreement</li>
                  <li>• Significant deviation from project scope</li>
                  <li>• Technical issues preventing service delivery</li>
                  <li>• Cancellation within 7 days of project start</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <XCircle className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="font-semibold">Not Eligible for Refund</h3>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Change of mind after project completion</li>
                  <li>• Completed work meeting agreed specifications</li>
                  <li>• Services already delivered and accepted</li>
                  <li>• Custom development work beyond 30 days</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Service-Specific Refund Terms</h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Web Development Projects</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full refund if project cancelled before development starts</li>
                  <li>Partial refund based on work completed for ongoing projects</li>
                  <li>No refund after final delivery and client acceptance</li>
                  <li>Milestone-based refunds as per project agreement</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Consulting Services</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hourly services: Refund for unused prepaid hours</li>
                  <li>Project consulting: Refund based on deliverables not provided</li>
                  <li>Strategy sessions: No refund after session completion</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Digital Products</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>14-day refund period for software products</li>
                  <li>No refund for downloaded digital assets</li>
                  <li>SaaS products: Pro-rated refund for unused subscription</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Refund Process Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                <Clock className="h-5 w-5 text-[#4E6BDF] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Step 1: Refund Request (Day 1)</h4>
                  <p className="text-sm text-muted-foreground">
                    Submit refund request via email with project details and reason
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                <Clock className="h-5 w-5 text-[#4E6BDF] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Step 2: Review Process (Days 2-5)</h4>
                  <p className="text-sm text-muted-foreground">
                    Our team reviews the request and may request additional information
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                <Clock className="h-5 w-5 text-[#4E6BDF] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Step 3: Decision & Processing (Days 6-10)</h4>
                  <p className="text-sm text-muted-foreground">
                    Refund decision communicated and processing initiated if approved
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                <Clock className="h-5 w-5 text-[#4E6BDF] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Step 4: Refund Completion (Days 11-15)</h4>
                  <p className="text-sm text-muted-foreground">
                    Refund credited to original payment method (may take 5-7 business days)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Refund Calculation</h2>
            <p className="mb-4">
              Refund amounts are calculated based on:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Work Completed:</strong> Percentage of project deliverables finished</li>
              <li><strong>Time Invested:</strong> Hours spent on research, planning, and development</li>
              <li><strong>Resources Used:</strong> Third-party services, licenses, or tools purchased</li>
              <li><strong>Project Stage:</strong> Earlier stages qualify for higher refund percentages</li>
            </ul>
            
            <div className="bg-muted/50 p-6 rounded-lg mt-6">
              <h4 className="font-semibold mb-3">Typical Refund Percentages</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-lg text-[#4E6BDF]">100%</div>
                  <div>Planning Stage</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg text-[#4E6BDF]">75%</div>
                  <div>Design Stage</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg text-[#4E6BDF]">50%</div>
                  <div>Development Stage</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg text-[#4E6BDF]">25%</div>
                  <div>Testing Stage</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Non-Refundable Items</h2>
            <p className="mb-4">
              The following items are generally non-refundable:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Third-party licenses and services purchased on client's behalf</li>
              <li>Domain registration and hosting setup fees</li>
              <li>Travel expenses for on-site consultations</li>
              <li>Custom training materials and documentation</li>
              <li>Emergency support or rush delivery charges</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Dispute Resolution</h2>
            <p className="mb-4">
              If you disagree with our refund decision:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our senior management team for review</li>
              <li>Provide additional documentation if available</li>
              <li>Consider mediation through a neutral third party</li>
              <li>Legal recourse as per our Terms of Service</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. How to Request a Refund</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="mb-4">
                To request a refund, please email us with the following information:
              </p>
              <ul className="space-y-2">
                <li><strong>Subject:</strong> Refund Request - [Project Name/Invoice Number]</li>
                <li><strong>Project Details:</strong> Contract number, project name, and dates</li>
                <li><strong>Reason:</strong> Detailed explanation for refund request</li>
                <li><strong>Documentation:</strong> Any supporting evidence or correspondence</li>
                <li><strong>Preferred Resolution:</strong> Full refund, partial refund, or service credit</li>
              </ul>
              
              <div className="mt-6 pt-4 border-t">
                <p><strong>Email:</strong> support@novafuze.in</p>
                <p><strong>Phone:</strong> +91-8074678571</p>
                <p><strong>Address:</strong> #52, 1st main, 1st cross, prasanth layout, Whitefield, Bangalore, 560066</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Policy Updates</h2>
            <p className="mb-4">
              This refund policy may be updated periodically. Material changes will be communicated 
              via email or website notice. Continued use of our services constitutes acceptance of 
              updated terms.
            </p>
          </section>

          <section className="text-center pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              This Refund Policy is governed by the laws of India and complies with applicable 
              consumer protection regulations. All amounts are in Indian Rupees (INR).
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}