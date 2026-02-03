"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Users, Star, ArrowRight, CheckCircle2,
  GraduationCap, Globe, ShieldCheck, Instagram, Twitter, Linkedin,
  BookOpen, Video, Calendar, Menu, X, Moon, Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Categories from "@/features/landing-page/Categories";
import FeaturedTutors from "@/features/landing-page/FeaturedTutors";
import Link from "next/link";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-500/30 transition-colors duration-300">
     
      {/* 1. Navbar */}
   

      {/* 2. Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <Badge className="bg-indigo-500/10 text-indigo-500 border-none px-4 py-1.5 rounded-full font-bold">
              ✨ Trusted by 10,000+ Students
            </Badge>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] sm:leading-[0.9]">
              Connect with <span className="text-indigo-600">Expert</span> Tutors.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Unlock your potential with 1-on-1 personalized sessions. Browse top-rated experts in coding, music, languages, and more.
            </p>
           
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0">
             
              <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-500/20">
               <Link href={'/tutors'}>
                Find Tutors
               </Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative hidden sm:block"
          >
            <div className="aspect-square bg-muted rounded-[40px] sm:rounded-[60px] overflow-hidden relative border-[8px] sm:border-[12px] border-card shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="Student learning"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur p-6 rounded-[32px] flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Live Now</p>
                  <p className="font-black text-xl">Advanced React UI</p>
                </div>
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                  <Video size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats Section (New Content) */}
      <section className="py-10 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Tutors", val: "500+" },
            { label: "Subjects", val: "120+" },
            { label: "Success Rate", val: "98%" },
            { label: "Countries", val: "45+" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl sm:text-4xl font-black text-indigo-600">{stat.val}</p>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How It Works (New Content) */}
      <section id="how-it-works" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">How SkillBridge Works</h2>
          <p className="text-muted-foreground font-medium text-lg">Your journey to mastery in three simple steps</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 relative">
          {[
            { icon: <Search />, title: "Find your match", desc: "Search by subject, price, or rating to find the perfect expert." },
            { icon: <Calendar />, title: "Book a session", desc: "Choose a time that fits your schedule and book instantly." },
            { icon: <BookOpen />, title: "Start learning", desc: "Join your personalized 1-on-1 session via our secure platform." }
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-muted rounded-[30px] flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-black mb-3">{step.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Categories Section */}
   <Categories/>

      {/* 6. Featured Tutors */}
    <FeaturedTutors/>

 

      {/* 8. Footer */}
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
    </div>
  );
};

export default LandingPage;

