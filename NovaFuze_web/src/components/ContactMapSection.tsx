import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { MapPin, ExternalLink, Navigation } from "lucide-react"

export function ContactMapSection() {
  const officeLocation = {
    name: "NovaFuze-Tech Technologies",
    address: "#52, 1st main, 1st cross, Prasanth layout, Whitefield, Bangalore, Karnataka 560066, India",
    lat: 12.984248,
    lng: 77.748472,
    latDisplay: "12°59'03.3\"N",
    lngDisplay: "77°44'56.5\"E",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.594!3d12.972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
  }



  const openInGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(officeLocation.address)}`
    window.open(mapsUrl, '_blank')
  }

  const openDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeLocation.address)}`
    window.open(directionsUrl, '_blank')
  }

  return (
    <section className="py-24 bg-[#F8F9FF]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4E6BDF] mb-4">
            Find Us on the Map
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Located in the heart of Bangalore's business district, we're easily accessible 
            by all major transport modes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl overflow-hidden bg-white h-full">
              <CardContent className="p-0 h-full">
                <div className="relative h-96 lg:h-[500px]">
                  {/* Google Maps Embed */}
                  <iframe
                    src={officeLocation.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="NovaFuze-Tech Office Location"
                  ></iframe>
                  
                  {/* Overlay Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      className="bg-white text-[#4E6BDF] hover:bg-[#F1F4FD] shadow-lg border border-[#4E6BDF]/20"
                      onClick={openInGoogleMaps}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Maps
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#4E6BDF] hover:bg-[#3D51D3] text-white shadow-lg"
                      onClick={openDirections}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                  
                  {/* Location Info Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#4E6BDF] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#4E6BDF] mb-1">{officeLocation.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {officeLocation.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {/* Address Details */}
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#4E6BDF]">
                  <div className="w-10 h-10 bg-[#F1F4FD] rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#4E6BDF]" />
                  </div>
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Address</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {officeLocation.address}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Coordinates</h4>
                  <p className="text-muted-foreground text-sm">
                    {officeLocation.latDisplay}, {officeLocation.lngDisplay}
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-[#4E6BDF] hover:bg-[#3D51D3] text-white"
                    onClick={openDirections}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </section>
  )
}