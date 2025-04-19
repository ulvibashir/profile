import Link from 'next/link'
import { FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold">
                Ismat Samadov
              </Link>
              <p className="text-gray-400 mt-2">
                Analyst & Engineer
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="mailto:ismetsemedov@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Ismat Samadov. All rights reserved.
            </p>
            
            <nav className="flex space-x-6">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#experience">Experience</FooterLink>
              <FooterLink href="#education">Education</FooterLink>
              <FooterLink href="#skills">Skills</FooterLink>
              <FooterLink href="#tech-profiles">Tech Profiles</FooterLink>
              <FooterLink href="#portfolio">Portfolio</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link 
      href={href}
      className="text-gray-400 hover:text-white text-sm transition-colors"
    >
      {children}
    </Link>
  )
}

export default Footer
