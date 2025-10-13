import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Home } from "lucide-react"

interface BlogBreadcrumbProps {
  postTitle?: string
  category?: string
}

export function BlogBreadcrumb({ postTitle, category }: BlogBreadcrumbProps) {
  return (
    <div className="bg-[#F1F4FD] py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#home" className="flex items-center gap-1 text-[#4E6BDF] hover:text-[#3D51D3]">
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#blog" className="text-[#4E6BDF] hover:text-[#3D51D3]">
                Blog
              </BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#blog" className="text-[#4E6BDF] hover:text-[#3D51D3]">
                    {category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {postTitle && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-muted-foreground max-w-xs truncate">
                    {postTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}