"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, Layers, X, Save, 
  AlertCircle, Inbox, Loader2, Pencil 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

// --- Skeleton Component ---
const CategorySkeleton = () => (
  <div className="grid gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-[32px] p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl h-12 w-12" />
            <div className="space-y-2">
              <div className="h-5 w-48 bg-zinc-100 dark:bg-zinc-900 rounded-md" />
              <div className="h-3 w-32 bg-zinc-50 dark:bg-zinc-800 rounded-md" />
            </div>
          </div>
          <div className="h-10 w-10 bg-zinc-50 dark:bg-zinc-900 rounded-xl" />
        </div>
        <div className="mt-6 flex gap-2">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="h-8 w-20 bg-zinc-50 dark:bg-zinc-800 rounded-xl" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const CategoryManager = () => {
  const queryClient = useQueryClient();

  // --- API Queries ---
  const { data: categories, isLoading } = useApiQuery<{
    data: { id: string; name: string; subjects: string[]; count?: number }[];
  }>(["fetch-categories"], "/api/shared/categories", {
    staleTime: 60000,
  });

  // --- Mutations ---
  const createCategoryMutation = useMutation({
    mutationFn: (payload: { name: string; subjects: string[] }) => 
      axios.post("http://localhost:5000/api/admin/categories", payload, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-categories"] });
      toast.success("Category created successfully");
      setIsModalOpen(false);
      resetForm();
    },
    onError: () => toast.error("Failed to create category"),
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string; subjects: string[] } }) => 
      axios.patch(`http://localhost:5000/api/admin/categories/${id}`, payload, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-categories"] });
      toast.success("Category updated successfully");
      setIsModalOpen(false);
      resetForm();
    },
    onError: () => toast.error("Failed to update category"),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => 
      axios.delete(`http://localhost:5000/api/admin/categories/${id}`, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-categories"] });
      toast.success("Category deleted");
      setIsDeleteOpen(false);
      setEditingCategory(null);
    },
    onError: () => toast.error("Failed to delete category"),
  });

  // --- Local State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  
  const [catName, setCatName] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState<string[]>([]);

  // --- Handlers ---
  const resetForm = () => {
    setCatName("");
    setSubjectsList([]);
    setCurrentSubject("");
    setEditingCategory(null);
  };

  const openModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setCatName(category.name);
      // Map existing subjects into state so they can be removed/added
      setSubjectsList([...category.subjects]);
    } else {
      resetForm();
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
    // This handles removing both newly added and pre-existing subjects
    setSubjectsList(prev => prev.filter(s => s !== sub));
  };

  const handleSave = async () => {
    if (!catName.trim()) return toast.error("Category name is required");
    if (subjectsList.length === 0) return toast.error("Add at least one subject");

    const payload = { name: catName, subjects: subjectsList };

    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, payload });
    } else {
      createCategoryMutation.mutate(payload);
    }
  };

  const isMutating = createCategoryMutation.isPending || updateCategoryMutation.isPending;

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter">Categories</h1>
          <p className="text-zinc-500 font-medium">Define subjects and group tutors.</p>
        </div>
        <Button 
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-6 font-black shadow-lg shadow-indigo-500/20 shrink-0 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-5 w-5" /> Add New
        </Button>
      </header>

      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {categories?.data && categories.data.length > 0 ? (
              categories.data.map((cat) => (
                <motion.div 
                  key={cat.id}
                  layout
                  className="group bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-[32px] p-6 hover:border-indigo-500/30 transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl text-indigo-600">
                        <Layers size={22} />
                      </div>
                      <div>
                        <h3 className="font-black text-xl tracking-tight">{cat.name}</h3>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                          {cat.subjects.length} Subjects 
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" size="icon" 
                        onClick={() => openModal(cat)}
                        className="rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-indigo-600"
                      >
                        <Pencil size={18}/>
                      </Button>
                      <Button 
                        variant="ghost" size="icon" 
                        onClick={() => { setEditingCategory(cat); setIsDeleteOpen(true); }}
                        className="rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500"
                      >
                        <Trash2 size={18}/>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {cat.subjects.map((sub) => (
                      <Badge key={sub} className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-none px-4 py-2 rounded-xl font-bold">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                <Inbox className="w-12 h-12 text-zinc-300 mb-4" />
                <p className="font-bold text-zinc-500">No categories found.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Add / Update Modal */}
      <Dialog open={isModalOpen} onOpenChange={(val) => { if(!val) resetForm(); setIsModalOpen(val); }}>
        <DialogContent className="sm:max-w-[480px] rounded-[36px] p-8 border-none dark:bg-zinc-950 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter">
              {editingCategory ? "Update Category" : "Create Category"}
            </DialogTitle>
            <DialogDescription className="font-medium text-zinc-500">
              {editingCategory ? "Update subjects by removing tags or adding new ones." : "Set the category name and hit enter to add subjects."}
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
              <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                {editingCategory ? "Edit Subjects" : "Add Subjects"}
              </Label>
              <Input 
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                onKeyDown={addSubject}
                placeholder="Type and press Enter..." 
                className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none font-bold" 
              />
              
              <div className="flex flex-wrap gap-2 mt-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {subjectsList.map(sub => (
                    <motion.div 
                      key={sub} 
                      initial={{ scale: 0.8, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      exit={{ scale: 0.5, opacity: 0 }}
                      layout
                    >
                      <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-none py-2 px-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all">
                        {sub} 
                        <X 
                          size={14} 
                          className="cursor-pointer hover:bg-white/20 rounded-full transition-colors" 
                          onClick={() => removeSubject(sub)} 
                        />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              disabled={isMutating}
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg gap-2" 
              onClick={handleSave}
            >
              {isMutating ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {isMutating ? "Saving Changes..." : editingCategory ? "Update Category" : "Create Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[32px] p-8 border-none text-center dark:bg-zinc-950">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tight">Are you sure?</DialogTitle>
            <DialogDescription className="font-medium">
              You're removing <span className="text-zinc-900 dark:text-white font-bold">{editingCategory?.name}</span>. This action is permanent.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-8">
            <Button variant="ghost" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setIsDeleteOpen(false)} disabled={deleteCategoryMutation.isPending}>
              Cancel
            </Button>
            <Button className="flex-1 h-12 bg-red-500 hover:bg-red-600 rounded-xl font-black text-white gap-2 transition-all active:scale-95" onClick={() => editingCategory && deleteCategoryMutation.mutate(editingCategory.id)} disabled={deleteCategoryMutation.isPending}>
              {deleteCategoryMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManager;