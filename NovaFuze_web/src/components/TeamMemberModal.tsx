import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Linkedin, Github, Twitter, ExternalLink, Mail } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface TeamMember {
  id: string
  name: string
  role: string
  shortBio: string
  fullBio: string
  photo: string
  skills: string[]
  socialLinks: {
    linkedin?: string
    github?: string
    twitter?: string
    website?: string
    email?: string
  }
  achievements: string[]
}

interface TeamMemberModalProps {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
}

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
  if (!member) return null

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    website: ExternalLink,
    email: Mail
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{member.name}</DialogTitle>
          <DialogDescription>
            Learn more about {member.name}, {member.role} at NovaFuze-Tech, including their background, skills, and achievements.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
              <ImageWithFallback
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-4">{member.role}</h3>
              
              {/* Social Links */}
              <div className="flex gap-3 justify-center sm:justify-start">
                {Object.entries(member.socialLinks).map(([platform, url]) => {
                  if (!url) return null
                  const Icon = socialIcons[platform as keyof typeof socialIcons]
                  return (
                    <Button
                      key={platform}
                      variant="outline"
                      size="sm"
                      className="w-9 h-9 p-0 hover:bg-[#4E6BDF] hover:text-white border-[#4E6BDF] text-[#4E6BDF]"
                      onClick={() => {
                        if (platform === 'email') {
                          window.location.href = `mailto:${url}`
                        } else {
                          window.open(url, '_blank')
                        }
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <p className="text-muted-foreground leading-relaxed">{member.fullBio}</p>
          </div>



          {/* Achievements Section */}
          <div>
            <h4 className="font-semibold mb-3">Key Achievements</h4>
            <ul className="space-y-2">
              {member.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4E6BDF] mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}