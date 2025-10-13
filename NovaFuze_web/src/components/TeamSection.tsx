import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Linkedin, Github, Twitter } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { TeamMemberModal } from "./TeamMemberModal"
import vamsiKrishnaAvatar from "figma:asset/af5b3ab8264ed44dc18aaa9511c1fdb76259d814.png"
import madanRAvatar from "figma:asset/8e10ab219daab55721714a8aa23d138234ff9c5c.png"

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

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const teamMembers: TeamMember[] = [
    {
      id: "vamsi-krishnareddy",
      name: "Vamsi Krishna",
      role: "Founder & Lead Developer",
      shortBio: "AI-driven development expert with passion for innovative digital solutions and scalable architecture.",
      fullBio: "Vamsi is the visionary founder of NovaFuze-Tech, bringing over 5 years of experience in cutting-edge web development and AI integration. His passion for innovation drives the company's mission to democratize advanced technology. He specializes in building scalable applications using modern frameworks and has led numerous successful projects from conception to deployment.",
      photo: vamsiKrishnaAvatar,
      skills: ["Next.js", "React", "Node.js", "AI/ML", "TypeScript", "AWS", "Product Strategy"],
      socialLinks: {
        linkedin: "https://www.linkedin.com/company/105298593/",
        github: "https://github.com/vamsi-2410",
        twitter: "https://x.com/NovaFuze_LLP",
        email: "vamsikrishna@novafuze.in"
      },
      achievements: [
        "Founded NovaFuze-Tech in 2024 and delivered 3+ successful projects",
        "Led development of 3 award-winning SaaS products",
        "Expertise in AI integration and modern web technologies",
        "Mentored 10+ junior developers"
      ]
    },
    {
      id: "madan-r",
      name: "Madan R",
      role: "Senior Full-Stack Developer",
      shortBio: "Full-stack expert specializing in React ecosystem and scalable backend solutions with cloud architecture.",
      fullBio: "Madan brings exceptional technical depth to NovaFuze-Tech's development team. With a strong background in both frontend and backend development, he excels at creating seamless user experiences backed by robust server-side solutions. His expertise in cloud architecture and DevOps practices ensures our applications are scalable and reliable.",
      photo: madanRAvatar,
      skills: ["React", "Python", "PostgreSQL", "Docker", "Kubernetes", "GraphQL", "System Design"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/madan-r-dev",
        github: "https://github.com/madan-novafuze-tech",
        twitter: "https://twitter.com/madan_dev"
      },
      achievements: [
        "Architected microservices handling 1M+ requests daily",
        "Reduced application load times by 60% through optimization",
        "Led migration of legacy systems to modern cloud infrastructure",
        "Contributing author to open-source React libraries"
      ]
    }
  ]

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }

  return (
    <section className="py-24 bg-[#F1F4FD]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind NovaFuze-Tech's success. Each bringing unique expertise 
            and a shared commitment to innovation and excellence.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <Card 
              key={member.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white cursor-pointer w-80"
              onClick={() => handleMemberClick(member)}
            >
              <CardContent className="p-6 text-center">
                {/* Profile Photo */}
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-[#F1F4FD] group-hover:ring-[#4E6BDF] transition-all duration-300">
                  <ImageWithFallback
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-semibold mb-1 group-hover:text-[#4E6BDF] transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-[#4E6BDF] font-medium mb-3">{member.role}</p>

                {/* Short Bio */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {member.shortBio}
                </p>

                {/* Top Skills */}


                {/* Social Links */}
                <div className="flex justify-center gap-2">
                  {member.socialLinks.linkedin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 hover:bg-[#4E6BDF] hover:text-white text-[#4E6BDF]"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(member.socialLinks.linkedin, '_blank')
                      }}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                  {member.socialLinks.github && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 hover:bg-[#4E6BDF] hover:text-white text-[#4E6BDF]"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(member.socialLinks.github, '_blank')
                      }}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  {member.socialLinks.twitter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 hover:bg-[#4E6BDF] hover:text-white text-[#4E6BDF]"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(member.socialLinks.twitter, '_blank')
                      }}
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>

      <TeamMemberModal 
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}