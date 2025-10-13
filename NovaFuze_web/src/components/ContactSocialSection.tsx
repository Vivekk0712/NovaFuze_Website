import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram, 
  Youtube, 
  ExternalLink,
  Users,
  MessageCircle,
  Share2
} from "lucide-react"

export function ContactSocialSection() {
  const socialLinks = [
    {
      name: "LinkedIn",
      handle: "@NovaFuze-Tech", 
      url: "https://www.linkedin.com/company/105298593/",
      icon: Linkedin,
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Connect with us professionally and see our latest updates",
      followers: "2.5K+ followers"
    },
    {
      name: "Twitter",
      handle: "@NovaFuze_LLP",
      url: "https://x.com/NovaFuze_LLP",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      description: "Follow us for tech insights and company news",
      followers: "1.8K+ followers"
    },
    {
      name: "GitHub",
      handle: "@novafuze",
      url: "https://github.com/novafuze",
      icon: Github,
      color: "bg-gray-800 hover:bg-gray-900",
      description: "Check out our open source projects and contributions",
      followers: "500+ stars"
    },
    {
      name: "Instagram",
      handle: "@vamsikrishna_2410",
      url: "https://www.instagram.com/vamsikrishna_2410/",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      description: "Behind the scenes content and team culture",
      followers: "1.2K+ followers"
    },
    {
      name: "YouTube",
      handle: "@NovaFuzeTech",
      url: "https://youtube.com/@novafuzetech",
      icon: Youtube,
      color: "bg-red-600 hover:bg-red-700",
      description: "Tech tutorials, case studies, and company vlogs",
      followers: "800+ subscribers"
    }
  ]

  const handleSocialClick = (url: string, name: string) => {
    // In a real app, you'd open the actual social media page
    // For now, we'll just show a toast
    window.open(url, '_blank')
  }

  return null
}