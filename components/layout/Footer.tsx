import { GraduationCap, Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const Footer = () => {
  return (
   <footer className="pt-24 pb-12 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <GraduationCap size={18} />
                </div>
                <span className="text-xl font-black tracking-tighter">SkillBridge</span>
              </div>
              <p className="text-muted-foreground font-medium leading-relaxed">The world's leading platform for personalized 1-on-1 education. Empowering students since 2026.</p>
              <div className="flex gap-4">
                <Twitter className="text-muted-foreground cursor-pointer hover:text-indigo-600 transition-colors" />
                <Instagram className="text-muted-foreground cursor-pointer hover:text-indigo-600 transition-colors" />
                <Linkedin className="text-muted-foreground cursor-pointer hover:text-indigo-600 transition-colors" />
              </div>
            </div>
           
            <div className="lg:pl-10">
              <h4 className="font-black mb-6 uppercase text-xs tracking-[0.2em] text-muted-foreground">Platform</h4>
              <ul className="space-y-4 font-bold text-muted-foreground">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Find a Tutor</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Group Classes</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Affiliate Program</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-6 uppercase text-xs tracking-[0.2em] text-muted-foreground">Support</h4>
              <ul className="space-y-4 font-bold text-muted-foreground">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Accessibility</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div className="bg-muted p-8 rounded-[32px] border border-border">
              <h4 className="font-black mb-2 tracking-tight">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-4 font-medium">Get the latest news and offers.</p>
              <div className="flex flex-col gap-2">
                <Input placeholder="Enter your email" className="rounded-xl bg-card h-11 border-border" />
                <Button className="bg-indigo-600 text-white rounded-xl h-11 w-full font-bold">Subscribe</Button>
              </div>
            </div>
          </div>
         
          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between gap-6 items-center">
            <p className="text-muted-foreground font-bold text-sm">© 2026 SkillBridge Platform. Built with ❤️ for Learners.</p>
            <div className="flex gap-8 text-sm font-bold text-muted-foreground">
              <a href="#" className="hover:text-foreground">Terms of Service</a>
              <a href="#" className="hover:text-foreground">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer