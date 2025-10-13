import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { MessageCircle, Phone, Mail, X, ChevronUp, ChevronDown } from "lucide-react"

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const supportChannels = [
    {
      name: "WhatsApp Chat",
      icon: MessageCircle,
      action: () => window.open("https://wa.me/918074678571?text=Hi! I'm interested in your services.", "_blank"),
      description: "Get instant replies",
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      name: "Call Now",
      icon: Phone,
      action: () => window.open("tel:+918074678571", "_self"),
      description: "Direct call support",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      name: "Email Us",
      icon: Mail,
      action: () => window.open("mailto:support@novafuze.in?subject=Service Inquiry", "_self"),
      description: "Get detailed responses",
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    }
  ]

  return (
    <>
      {/* Main Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          size="sm"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Support Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 animate-in slide-in-from-bottom-2 duration-300">
          <Card className="w-80 shadow-2xl border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Need Help?</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0"
                >
                  {isMinimized ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {!isMinimized && (
                <p className="text-sm text-muted-foreground">
                  Choose your preferred way to reach us
                </p>
              )}
            </CardHeader>
            
            {!isMinimized && (
              <CardContent className="space-y-3">
                {supportChannels.map((channel, index) => {
                  const Icon = channel.icon
                  return (
                    <Button
                      key={index}
                      onClick={channel.action}
                      variant="outline"
                      className={`w-full justify-start h-12 ${channel.hoverColor} hover:text-white border-border/50 hover:border-transparent transition-all duration-200`}
                    >
                      <div className={`w-8 h-8 rounded-full ${channel.bgColor} flex items-center justify-center mr-3`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">{channel.name}</div>
                        <div className="text-xs text-muted-foreground group-hover:text-white/80">
                          {channel.description}
                        </div>
                      </div>
                    </Button>
                  )
                })}
                
                {/* Quick Stats */}
                <div className="pt-3 border-t border-border/50">
                  <div className="text-center text-xs text-muted-foreground">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>We're online now!</span>
                    </div>
                    <div>Average response time: 5 minutes</div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}

      {/* WhatsApp Quick Button */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:block">
        <Button
          onClick={() => window.open("https://wa.me/918074678571?text=Hi! I'm interested in your services.", "_blank")}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300"
          size="sm"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="ml-2 hidden lg:inline">WhatsApp</span>
        </Button>
      </div>
    </>
  )
}