"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Pencil, Trash2, Layers, X, Save, 
  AlertCircle, Search, Inbox 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const CategoryManager = () => {
  // --- Core State ---
  const [categories, setCategories] = useState([
    { id: "ssc", name: "Secondary (SSC)", subjects: ["Physics", "Higher Math", "Biology"], count: 120 },
    { id: "hsc", name: "Higher Secondary (HSC)", subjects: ["ICT", "Chemistry", "Accounting"], count: 85 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // --- Modal & Form State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  
  const [catName, setCatName] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState<string[]>([]);

  // --- Search Logic ---
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subjects.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [categories, searchQuery]);

  // --- Handlers ---
  const openModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setCatName(category.name);
      setSubjectsList([...category.subjects]);
    } else {
      setEditingCategory(null);
      setCatName("");
      setSubjectsList([]);
    }
    setIsModalOpen(true);
  };

  const addSubject = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentSubject.trim()) {
      e.preventDefault();
      if (!subjectsList.includes(currentSubject.trim())) {
        setSubjectsList(prev => [...prev, currentSubject.trim()]);
      }
      setCurrentSubject("");
    }
  };

  const removeSubject = (sub: string) => {
    setSubjectsList(prev => prev.filter(s => s !== sub));
  };

  const handleSave = () => {
    if (!catName.trim()) return;

    if (editingCategory) {
      setCategories(prev => prev.map(c => 
        c.id === editingCategory.id ? { ...c, name: catName, subjects: subjectsList } : c
      ));
    } else {
      const newCat = {
        id: Math.random().toString(36).substr(2, 9),
        name: catName,
        subjects: subjectsList,
        count: 0
      };
      setCategories(prev => [...prev, newCat]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setCategories(prev => prev.filter(c => c.id !== editingCategory?.id));
    setIsDeleteOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter">Taxonomy</h1>
          <p className="text-zinc-500 font-medium">Structure your platform's learning sectors.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input 
              placeholder="Search sectors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <Button 
            onClick={() => openModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-6 font-black shadow-lg shadow-indigo-500/20 shrink-0"
          >
            <Plus className="mr-2 h-5 w-5" /> Add
          </Button>
        </div>
      </header>

      {/* Content Grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <motion.div 
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-[32px] p-6 hover:border-indigo-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl text-indigo-600">
                      <Layers size={22} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl tracking-tight">{cat.name}</h3>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{cat.subjects.length} Subjects • {cat.count} Tutors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" size="icon" 
                      onClick={() => openModal(cat)}
                      className="rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    >
                      <Pencil size={18}/>
                    </Button>
                    <Button 
                      variant="ghost" size="icon" 
                      onClick={() => { setEditingCategory(cat); setIsDeleteOpen(true); }}
                      className="rounded-xl hover:bg-red-50 text-red-500"
                    >
                      <Trash2 size={18}/>
                    </Button>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {cat.subjects.map((sub) => (
                    <Badge 
                      key={sub} 
                      className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-none px-4 py-2 rounded-xl font-bold"
                    >
                      {sub}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800"
            >
              <Inbox className="w-12 h-12 text-zinc-300 mb-4" />
              <p className="font-bold text-zinc-500">No categories found matching "{searchQuery}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-[36px] p-8 border-none dark:bg-zinc-950 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter">
              {editingCategory ? "Update" : "Create"}
            </DialogTitle>
            <DialogDescription className="font-medium text-zinc-500">
              Set the category name and hit enter to add subjects.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Category Name</Label>
              <Input 
                value={catName} 
                onChange={(e) => setCatName(e.target.value)}
                placeholder="e.g. Science & Engineering" 
                className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-none font-bold text-lg" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Subjects</Label>
              <Input 
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                onKeyDown={addSubject}
                placeholder="Type and press Enter..." 
                className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none font-bold" 
              />
              <div className="flex flex-wrap gap-2 mt-4 max-h-40 overflow-y-auto pr-2">
                <AnimatePresence>
                  {subjectsList.map(sub => (
                    <motion.div
                      key={sub}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-none py-2 px-3 rounded-xl font-bold flex items-center gap-2">
                        {sub} <X size={14} className="cursor-pointer" onClick={() => removeSubject(sub)} />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg" 
              onClick={handleSave}
            >
              <Save className="mr-2 h-5 w-5" /> {editingCategory ? "Save Changes" : "Create Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[32px] p-8 border-none text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Delete this?</DialogTitle>
            <DialogDescription className="font-medium">
              You're about to remove <span className="text-zinc-900 dark:text-white font-bold">{editingCategory?.name}</span>. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-8">
            <Button variant="ghost" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button className="flex-1 h-12 bg-red-500 hover:bg-red-600 rounded-xl font-black text-white" onClick={handleDelete}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManager;