"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Search, User } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Tips to Maximize Your Online Learning Sessions",
    excerpt: "Discover proven strategies to get the most out of every tutoring session and accelerate your learning journey with these practical tips.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop",
    category: "Learning Tips",
    author: "Sarah Chen",
    date: "Jan 15, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Why 1-on-1 Tutoring Beats Group Classes",
    excerpt: "Research shows personalized learning is 2x more effective. Here's why individual sessions produce better results for students.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    category: "Research",
    author: "Dr. Marcus Lee",
    date: "Jan 10, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "How to Choose the Right Tutor for Your Goals",
    excerpt: "A comprehensive guide to finding the perfect tutor match based on your learning style, goals, and budget requirements.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    category: "Guide",
    author: "Priya Sharma",
    date: "Jan 5, 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Future of Online Education in 2026",
    excerpt: "Explore the latest trends in edtech, from AI-powered learning to immersive virtual classrooms and personalized curricula.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop",
    category: "Industry",
    author: "Alex Rivera",
    date: "Dec 28, 2025",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "5 Study Techniques Backed by Science",
    excerpt: "From spaced repetition to active recall — learn the most effective study methods proven by cognitive science research.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    category: "Learning Tips",
    author: "Dr. Emily Park",
    date: "Dec 20, 2025",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "How SkillBridge Tutors Are Changing Lives",
    excerpt: "Real success stories from our community — students who went from beginners to professionals with the help of SkillBridge.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=600&auto=format&fit=crop",
    category: "Stories",
    author: "Team SkillBridge",
    date: "Dec 15, 2025",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-500/10 text-blue-600 border-none font-bold px-4 py-1.5 rounded-full">
            <BookOpen className="w-3 h-3 mr-1" /> SkillBridge Blog
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Insights & <span className="text-indigo-600">Resources</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-10">
            Tips, research, and stories to power your learning journey.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <Input placeholder="Search articles..." className="pl-12 h-14 rounded-2xl" />
          </div>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[28px] overflow-hidden h-full bg-card">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-500/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-black mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User size={12} />
                      <span className="font-bold">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
