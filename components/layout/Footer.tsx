import React from 'react'
import { Github, Globe, GraduationCap, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const FOOTER_LINKS = {
  platform: [
    { label: "Find a Tutor", href: "/tutors" },
    { label: "Enterprise", href: "#" },
    { label: "Affiliate Program", href: "#" },
  ],
  security: [
    { label: "Login", href: "/sign-in" },
    { label: "Join Us as Tutor", href: "/sign-up" },
    { label: "Create Account", href: "/sign-up" },
  ],
  social: [
    { icon: Github, href: "https://github.com/habiburRhaman05" },
    { icon: Globe, href: "https://rhaman.vercel.app/" },
    
  ]
}

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={18} />
              </div>
              <span className="text-xl font-black tracking-tighter">SkillBridge</span>
            </div>
            <p className="text-muted-foreground font-medium leading-relaxed">
              The world's leading platform for personalized 1-on-1 education. 
              Empowering students since 2026.
            </p>
            <div className="flex gap-4">
              {FOOTER_LINKS.social.map((social, idx) => (
                <social.icon 
                  key={idx} 
                  className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-indigo-600 transition-colors" 
                />
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:pl-10">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Platform
            </h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-indigo-600 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* secruity Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Secruity
            </h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              {FOOTER_LINKS.security.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-indigo-600 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="bg-muted p-8 rounded-[32px] border border-border">
            <h4 className="font-black tracking-tight mb-2">Stay Updated</h4>
            <p className="text-sm text-muted-foreground font-medium mb-4">
              Get the latest news and offers.
            </p>
            <div className="flex flex-col gap-2">
              <Input 
                placeholder="Enter your email" 
                className="h-11 rounded-xl bg-card border-border shadow-none focus-visible:ring-indigo-600" 
              />
              <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground font-bold text-sm text-center md:text-left">
            © 2026 SkillBridge Platform. Built with ❤️ for Learners. Made By Habibur Rhaman
          </p>
         
        </div>
      </div>
    </footer>
  )
}

export default Footer