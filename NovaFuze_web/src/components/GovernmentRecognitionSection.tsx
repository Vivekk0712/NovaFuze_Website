import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Award, CheckCircle, TrendingUp, Globe } from "lucide-react"
import startupKarnatakaLogo from '../assets/0bbb9de8f8fad1c4e576e83232da3465b13c1389.png'
import dpiitStartupIndiaLogo from '../assets/b541470d22c77d565be497d99fa25a79dc5b8df5.png'

export function GovernmentRecognitionSection() {
  const recognitions = [
    {
      title: "DPIIT Startup India",
      logo: dpiitStartupIndiaLogo,
      description: "Recognized by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India under the Startup India initiative.",
      benefits: [
        "Access to government schemes and funding",
        "Tax exemptions under Startup India program",
        "Fast-track patent examination",
        "Self-certification compliance"
      ],
      color: "from-orange-500 to-green-600"
    },
    {
      title: "Startup Karnataka",
      logo: startupKarnatakaLogo,
      description: "Officially recognized by the Karnataka State Government's Startup Karnataka initiative, supporting innovation and entrepreneurship in the state.",
      benefits: [
        "State government support and resources",
        "Access to Karnataka startup ecosystem",
        "Priority in state procurement",
        "Mentorship and networking opportunities"
      ],
      color: "from-red-500 to-blue-600"
    }
  ]

  const stats = [
    {
      icon: <Award className="h-6 w-6" />,
      value: "2",
      label: "Government Recognitions",
      color: "text-primary"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      value: "100%",
      label: "Compliance",
      color: "text-green-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "3+",
      label: "Years in Operation",
      color: "text-orange-600"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      value: "Pan-India",
      label: "Operations",
      color: "text-blue-600"
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Government Recognition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certified & Recognized by Government of India
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            NovaFuze-Tech is proud to be officially recognized by both the Central and Karnataka State Governments, 
            demonstrating our commitment to innovation, compliance, and excellence in technology.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-md bg-gradient-to-br from-background to-accent/30">
              <CardContent className="pt-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="font-bold text-2xl mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recognition Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {recognitions.map((recognition, index) => (
            <Card key={index} className="border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className={`h-2 bg-gradient-to-r ${recognition.color}`}></div>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6 pt-4">
                  <img 
                    src={recognition.logo} 
                    alt={`${recognition.title} logo`}
                    className="h-20 w-auto object-contain"
                  />
                </div>
                <CardTitle className="text-2xl mb-3">{recognition.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  {recognition.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="bg-accent/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-3">
                    {recognition.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Message */}
        <div className="mt-16 text-center">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg max-w-4xl mx-auto">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-semibold text-xl mb-2">
                    Trusted by Government & Enterprises
                  </h3>
                  <p className="text-muted-foreground">
                    Our government recognition validates our commitment to quality, innovation, and compliance. 
                    Work with confidence knowing you're partnering with a certified technology provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
