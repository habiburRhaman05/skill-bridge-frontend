"use client"
import React from 'react'
import { TutorListItem } from '../types';
import {motion} from "framer-motion"
import { Badge } from '@/components/ui/badge';
import { ArrowRight, GraduationCap, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const TutorCard = ({ tutor }: { tutor: TutorListItem }) => (
  <motion.div 
    layout
    whileHover={{ y: -6 }}
    className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between h-full"
  >
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center font-black text-indigo-600 text-2xl uppercase shadow-inner overflow-hidden">
          {tutor.profileAvater ? (
            <img src={tutor.profileAvater} className="w-full h-full object-cover" alt={tutor.name} />
          ) : (
            tutor.name.charAt(0)
          )}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Hourly Rate</p>
          <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">
            {tutor.tutorProfile.hourlyRate} <span className="text-xs font-bold">USD</span>
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-black tracking-tight">{tutor.name}</h3>
          <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-1.5 py-0 h-5">
            <Star className="fill-emerald-600 mr-1" size={10}/> <span className="text-[10px]">New</span>
          </Badge>
        </div>
        
        <p className="text-xs font-bold text-zinc-500 flex items-center gap-1.5 uppercase tracking-wide">
          <GraduationCap size={15} className="text-indigo-500" /> {tutor.tutorProfile.category}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4 min-h-[80px] content-start">
          {tutor.tutorProfile.subjects.slice(0, 5).map((s, idx) => (
            <Badge key={idx} variant="secondary" className="rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold py-1 px-2 border-none">
              {s}
            </Badge>
          ))}
          {tutor.tutorProfile.subjects.length > 5 && (
            <Badge variant="outline" className="text-[10px] border-dashed">+{tutor.tutorProfile.subjects.length - 5} More</Badge>
          )}
        </div>
      </div>
    </div>

    <Link href={`/tutors/${tutor.id}`} className="block mt-4">
      <Button className="w-full bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 rounded-xl font-bold h-12 group transition-all">
        View Full Profile <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
      </Button>
    </Link>
  </motion.div>
);

export default TutorCard