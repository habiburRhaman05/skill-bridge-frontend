import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, BookOpen, UserCheck, MoreVertical } from 'lucide-react';

export const BookingCard = ({ booking }:{booking:any}) => {
  const { tutor, dateTime, status, id } = booking;
  const tutorUser = tutor.user;
  
  // Format the date from the ISO string: 2026-01-31T00:00:00.000Z
  const eventDate = new Date(dateTime).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="relative group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl overflow-hidden transition-all hover:border-cyan-500/50 shadow-2xl"
    >
      {/* Top Section: Status & Actions */}
      <div className="flex justify-between items-start mb-6">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
          status === 'CONFIRMED' 
          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        }`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'CONFIRMED' ? 'bg-green-400' : 'bg-yellow-400'}`} />
          {status}
        </div>
        <button className="text-slate-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Tutor Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
            {tutorUser.profileAvater ? (
              <img src={tutorUser.profileAvater} alt={tutorUser.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              tutorUser.name[0]
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1 rounded-lg border-2 border-[#0f172a]">
            <UserCheck size={12} className="text-white" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {tutorUser.name}
          </h3>
          <p className="text-slate-400 text-sm flex items-center gap-1">
            <BookOpen size={14} className="text-cyan-500" />
            {tutor.subjects.join(", ")} • {tutor.category}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Schedule</span>
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <Calendar size={14} className="text-cyan-500" />
            {eventDate}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Rate</span>
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <DollarSign size={14} className="text-green-400" />
            <span className="font-mono">${tutor.hourlyRate}/hr</span>
          </div>
        </div>
      </div>

      {/* Footer / ID */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-600">ID: #{id.split('-')[0]}</span>
        <button className="bg-white/10 hover:bg-white text-white hover:text-black px-4 py-2 rounded-xl text-sm font-semibold transition-all">
          Manage Session
        </button>
      </div>

      {/* Unique Animated Background Element */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />
    </motion.div>
  );
};

