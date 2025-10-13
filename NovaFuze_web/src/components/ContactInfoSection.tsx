import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building,
  Navigation,
  ExternalLink,
  Copy,
  CheckCircle
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner@2.0.3"

export function ContactInfoSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Valid Indian domicile address for legal compliance
  const addressInfo = {
    company: "NovaFuze-Tech Technologies Private Limited",
    addressLine1: "#52, 1st main, 1st cross",
    addressLine2: "prasanth layout, Whitefield",
    city: "Bangalore", 
    state: "Karnataka",
    pinCode: "560066",
    country: "India",
    phone: "+91-8074678571",
    email: "support@novafuze.in",
    supportEmail: "support@novafuze.in",
    salesEmail: "support@novafuze.in"
  }

  const businessHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM IST" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM IST" },
    { day: "Sunday", time: "Closed" }
  ]

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      toast.success(`${field} copied to clipboard!`)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  const openInMaps = () => {
    const address = `${addressInfo.addressLine1}, ${addressInfo.addressLine2}, ${addressInfo.city}, ${addressInfo.state} ${addressInfo.pinCode}, ${addressInfo.country}`
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`
    window.open(mapsUrl, '_blank')
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4E6BDF] mb-4">
            Contact Information
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find us, call us, or visit us. We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Address Card */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#4E6BDF]">
                <div className="w-12 h-12 bg-[#F1F4FD] rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-[#4E6BDF]" />
                </div>
                Office Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-lg">NOVAFUZE LLP</p>
                <div className="text-muted-foreground">
                  <p>{addressInfo.addressLine1}</p>
                  <p>{addressInfo.addressLine2}</p>
                  <p>{addressInfo.city}, {addressInfo.state} {addressInfo.pinCode}</p>
                  <p>{addressInfo.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Badge variant="secondary" className="bg-[#F1F4FD] text-[#4E6BDF]">
                  PIN: {addressInfo.pinCode}
                </Badge>
                <Badge variant="outline" className="border-green-200 text-green-700">
                  Registered Office
                </Badge>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  size="sm"
                  className="bg-[#4E6BDF] hover:bg-[#3D51D3] text-white flex-1"
                  onClick={openInMaps}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(
                    `${addressInfo.addressLine1}, ${addressInfo.addressLine2}, ${addressInfo.city}, ${addressInfo.state} ${addressInfo.pinCode}, ${addressInfo.country}`,
                    "Address"
                  )}
                  className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
                >
                  {copiedField === "Address" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details Card */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#4E6BDF]">
                <div className="w-12 h-12 bg-[#F1F4FD] rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-[#4E6BDF]" />
                </div>
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Phone */}
              <div className="flex items-center justify-between p-3 bg-[#F8F9FF] rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#4E6BDF]" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{addressInfo.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`tel:${addressInfo.phone}`, '_self')}
                    className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
                  >
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(addressInfo.phone, "Phone")}
                  >
                    {copiedField === "Phone" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#F8F9FF] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#4E6BDF]" />
                    <div>
                      <p className="font-medium">General</p>
                      <p className="text-muted-foreground">{addressInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`mailto:${addressInfo.email}`, '_self')}
                      className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
                    >
                      Email
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(addressInfo.email, "Email")}
                    >
                      {copiedField === "Email" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#F8F9FF] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Sales</p>
                      <p className="text-muted-foreground">{addressInfo.salesEmail}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`mailto:${addressInfo.salesEmail}`, '_self')}
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      Email
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(addressInfo.salesEmail, "Sales Email")}
                    >
                      {copiedField === "Sales Email" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#F8F9FF] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Support</p>
                      <p className="text-muted-foreground">{addressInfo.supportEmail}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`mailto:${addressInfo.supportEmail}`, '_self')}
                      className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                    >
                      Email
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(addressInfo.supportEmail, "Support Email")}
                    >
                      {copiedField === "Support Email" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Hours */}
        <Card className="border-0 shadow-xl bg-white max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-[#4E6BDF]">
              <div className="w-12 h-12 bg-[#F1F4FD] rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#4E6BDF]" />
              </div>
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {businessHours.map((hours, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
                  <span className="font-medium">{hours.day}</span>
                  <span className="text-muted-foreground">{hours.time}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> For urgent support requests outside business hours, 
                please email us and we'll get back to you as soon as possible.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}