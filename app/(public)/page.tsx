"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Categories from "@/features/landing-page/Categories";
import CTASection from "@/features/landing-page/CTASection";
import FeaturedTutors from "@/features/landing-page/FeaturedTutors";
import DashboardKPIs from "@/features/landing-page/KpisReport";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Globe,
  Mail,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Video,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      {/* 1. Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 px-4 sm:px-6 min-h-[65vh] flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
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
              <Button asChild className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-500/20">
                <Link href="/tutors">
                  Find Tutors
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-8 rounded-2xl font-bold text-lg border-zinc-200 dark:border-zinc-800">
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
          </motion.div>

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

      {/* 2. KPIs / Stats Section */}
      <DashboardKPIs />

      {/* 3. Trusted By / Partners Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p {...fadeInUp} className="text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-10">
            Trusted by learners from leading companies
          </motion.p>
          <motion.div {...fadeInUp} className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 dark:opacity-30">
            {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix"].map((company) => (
              <div key={company} className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-400 dark:text-zinc-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-default">
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">How SkillBridge Works</h2>
            <p className="text-muted-foreground font-medium text-lg">Your journey to mastery in three simple steps</p>
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 relative">
          {[
            { icon: <Search />, title: "Find your match", desc: "Search by subject, price, or rating to find the perfect expert." },
            { icon: <Calendar />, title: "Book a session", desc: "Choose a time that fits your schedule and book instantly." },
            { icon: <BookOpen />, title: "Start learning", desc: "Join your personalized 1-on-1 session via our secure platform." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-muted rounded-[30px] flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-black mb-3">{step.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Categories Section */}
      <Categories />

      {/* 6. Featured Tutors */}
      <FeaturedTutors />

      {/* 7. Features / Why Choose Us */}
      <section className="py-24 bg-muted/30 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-none font-bold px-4 py-1.5 rounded-full">
              Why SkillBridge
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Built for Serious Learners</h2>
            <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
              Everything you need for a world-class learning experience, all in one platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Verified Experts", desc: "Every tutor is vetted for quality, experience, and teaching ability.", color: "text-indigo-600", bg: "bg-indigo-500/10" },
              { icon: Zap, title: "Instant Booking", desc: "Book sessions in seconds with real-time availability updates.", color: "text-amber-600", bg: "bg-amber-500/10" },
              { icon: Video, title: "HD Video Sessions", desc: "Crystal-clear video calls with screen sharing and recording.", color: "text-blue-600", bg: "bg-blue-500/10" },
              { icon: Globe, title: "Global Community", desc: "Connect with tutors and students from over 45 countries.", color: "text-emerald-600", bg: "bg-emerald-500/10" },
              { icon: TrendingUp, title: "Track Progress", desc: "Monitor your learning journey with detailed analytics and insights.", color: "text-purple-600", bg: "bg-purple-500/10" },
              { icon: MessageSquare, title: "24/7 Support", desc: "Our support team is always ready to help you succeed.", color: "text-rose-600", bg: "bg-rose-500/10" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[28px] h-full bg-card">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                      <feature.icon className={`${feature.color} w-7 h-7`} />
                    </div>
                    <h3 className="text-xl font-black mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <TestimonialsSection />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Newsletter Section */}
      <NewsletterSection />

      {/* 11. Blog Preview Section */}
      <BlogPreviewSection />

      {/* 12. CTA Section */}
      <CTASection />
    </div>
  );
};

export default LandingPage;

/* ==============================
   TESTIMONIALS SECTION
   ============================== */
const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    text: "SkillBridge completely transformed how I learn. My tutor helped me land a job at Google within 3 months of starting sessions.",
  },
  {
    name: "Marcus Johnson",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    text: "The quality of tutors here is unmatched. I went from beginner to senior designer level in under a year. Absolutely worth every dollar.",
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    text: "I love how easy it is to find and book sessions. The platform is intuitive, and every tutor I've worked with has been exceptional.",
  },
  {
    name: "James Wilson",
    role: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/100?img=8",
    rating: 5,
    text: "The personalized 1-on-1 sessions made all the difference. My tutor adapted to my learning style and pace perfectly.",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-none font-bold px-4 py-1.5 rounded-full">
            <Star className="w-3 h-3 mr-1 fill-amber-500" /> Student Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">What Our Students Say</h2>
          <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
            Real stories from real learners who transformed their careers with SkillBridge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[28px] h-full bg-card">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-6 flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==============================
   FAQ SECTION
   ============================== */
const FAQ_DATA = [
  {
    q: "How does SkillBridge work?",
    a: "SkillBridge connects students with expert tutors for personalized 1-on-1 learning sessions. Browse tutors by subject, check their availability, and book a session that fits your schedule.",
  },
  {
    q: "How are tutors verified?",
    a: "Every tutor goes through a rigorous vetting process that includes identity verification, credential checks, and a teaching demo. Only the top candidates are accepted to our platform.",
  },
  {
    q: "What subjects are available?",
    a: "We offer a wide range of subjects including Programming, Mathematics, Science, Languages, Music, Design, Business, and many more. Browse our categories to see the full list.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes! We offer a 100% money-back guarantee on your first session. If you're not completely satisfied with your learning experience, we'll refund your payment — no questions asked.",
  },
  {
    q: "How do I become a tutor on SkillBridge?",
    a: "Simply sign up as a Tutor, complete your profile with your expertise and qualifications, set your availability and hourly rate, and start receiving booking requests from students.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards, PayPal, and bank transfers. Payments are processed securely through our encrypted payment gateway.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-muted/30 dark:bg-zinc-950/50">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-none font-bold px-4 py-1.5 rounded-full">
            FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground font-medium text-lg">
            Everything you need to know about SkillBridge.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 bg-card rounded-2xl border border-border hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-bold text-base group-hover:text-indigo-600 transition-colors">{faq.q}</h3>
                  <ChevronDown
                    size={20}
                    className={`text-muted-foreground shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed mt-4 pr-8">
                    {faq.a}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==============================
   NEWSLETTER SECTION
   ============================== */
function NewsletterSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-[80px] rounded-full -ml-24 -mb-24" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Stay in the Loop</h2>
            <p className="text-indigo-100 font-medium text-lg mb-8 max-w-lg mx-auto">
              Get weekly tips, new tutor announcements, and exclusive discounts delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="h-14 rounded-2xl bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50 flex-1"
              />
              <Button className="h-14 px-8 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl font-black shadow-lg">
                Subscribe
              </Button>
            </div>
            <p className="text-indigo-200 text-xs mt-4">No spam, unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ==============================
   BLOG PREVIEW SECTION
   ============================== */
const BLOG_POSTS = [
  {
    title: "10 Tips to Maximize Your Online Learning Sessions",
    excerpt: "Discover proven strategies to get the most out of every tutoring session and accelerate your learning journey.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop",
    category: "Learning Tips",
    date: "Jan 15, 2026",
  },
  {
    title: "Why 1-on-1 Tutoring Beats Group Classes",
    excerpt: "Research shows personalized learning is 2x more effective. Here's why individual sessions produce better results.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    category: "Research",
    date: "Jan 10, 2026",
  },
  {
    title: "How to Choose the Right Tutor for Your Goals",
    excerpt: "A comprehensive guide to finding the perfect tutor match based on your learning style, goals, and budget.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    category: "Guide",
    date: "Jan 5, 2026",
  },
];

function BlogPreviewSection() {
  return (
    <section className="py-24 bg-muted/30 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeInUp} className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-16 gap-6">
          <div className="text-center sm:text-left">
            <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-none font-bold px-4 py-1.5 rounded-full">
              From Our Blog
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Latest Insights</h2>
            <p className="text-muted-foreground font-medium text-lg">
              Tips, research, and stories to power your learning.
            </p>
          </div>
          <Button asChild variant="ghost" className="font-black text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 p-4 rounded-2xl text-lg transition-all">
            <Link href="/blog">
              View All <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href="/blog" className="group block">
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[28px] overflow-hidden h-full bg-card">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{post.category}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-black mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
