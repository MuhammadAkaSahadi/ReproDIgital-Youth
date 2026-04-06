"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface GoalFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormValues {
  title: string;
  description: string;
  category: string;
  priority: string;
  targetDate: string;
}

export function GoalFormDialog({ isOpen, onOpenChange }: GoalFormDialogProps) {
  const { register, handleSubmit, control, watch, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      category: "Personal",
      priority: "Sedang"
    }
  });

  const categories = ["Pendidikan", "Karir", "Kesehatan", "Keuangan", "Personal"];
  const priorities = ["Rendah", "Sedang", "Tinggi"];

  const [tasks, setTasks] = useState([{ id: "1", title: "" }]);

  const currentCategory = watch("category");
  const currentPriority = watch("priority");

  const onSubmit = (data: FormValues) => {
    console.log("Menyimpan Tujuan: ", { ...data, tasks });
    // TODO: Connect Action to perform DB inserts later
    reset();
    onOpenChange(false);
  };

  const addTask = () => setTasks([...tasks, { id: crypto.randomUUID(), title: "" }]);
  const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
  const updateTaskTitle = (id: string, val: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: val } : t));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] p-0 overflow-hidden bg-gray-50 border-gray-200">
        
        <DialogHeader className="px-6 md:px-8 py-6 bg-white border-b border-gray-200 text-left">
          <DialogTitle className="text-[22px] font-heading font-bold text-gray-900">Tambah Tujuan Baru</DialogTitle>
          <DialogDescription className="text-[14px] text-gray-500 mt-1">
            Tetapkan sasaran spesifik yang ingin kamu wujudkan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="max-h-[60vh] overflow-y-auto px-6 md:px-8 py-6 flex flex-col gap-6">
            
            {/* Field 1: Nama Tujuan */}
            <div>
              <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-2">Nama Tujuan</label>
              <Input 
                {...register("title", { required: "Nama tujuan wajib diisi" })}
                placeholder="Contoh: Belajar UTBK 1 jam/hari" 
                className={`h-12 bg-white border ${errors.title ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300 focus-visible:ring-teal-500'} rounded-lg font-medium`}
              />
              {errors.title && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.title.message}</p>}
            </div>

            {/* Field 2: Deskripsi */}
            <div>
              <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-2">Deskripsi (Opsional)</label>
              <textarea 
                {...register("description")}
                placeholder="Ceritakan sedikit motivasi di balik tujuan ini..." 
                className="w-full min-h-[100px] p-3 text-sm bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 rounded-lg font-medium resize-none shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field 3: Kategori */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-2">Kategori</label>
                <div className="flex flex-wrap gap-2">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <>
                        {categories.map((cat) => (
                          <button 
                            type="button"
                            key={cat} 
                            onClick={() => field.onChange(cat)}
                            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
                              currentCategory === cat 
                                ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-xs' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Field 4: Prioritas */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-2">Prioritas</label>
                <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm p-1">
                   <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <>
                        {priorities.map((pri) => (
                          <button 
                            type="button"
                            key={pri} 
                            onClick={() => field.onChange(pri)}
                            className={`flex-1 py-2 text-[13px] font-semibold transition-colors rounded-md ${
                              currentPriority === pri 
                                ? (pri === 'Tinggi' ? 'bg-red-50 text-red-600' : pri === 'Sedang' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-800') 
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pri}
                          </button>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Field 5: Target Date */}
            <div>
              <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-2">Target Selesai</label>
              <Input 
                type="date"
                {...register("targetDate", { required: "Tentukan tanggal target penyelesaian" })}
                className={`h-12 bg-white border ${errors.targetDate ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300 focus-visible:ring-teal-500'} rounded-lg font-medium w-full md:w-1/2 cursor-pointer shadow-sm`}
              />
              {errors.targetDate && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.targetDate.message}</p>}
            </div>

            {/* Field 6: Langkah-Langkah */}
            <div className="pt-2 border-t border-gray-200">
              <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-3">Daftar Langkah (Milestones)</label>
              <div className="flex flex-col gap-3 mb-3">
                {tasks.map((task, idx) => (
                  <div key={task.id} className="flex items-center gap-2">
                    <span className="w-6 text-center text-[12px] font-bold text-gray-400">{idx + 1}.</span>
                    <Input 
                      value={task.title}
                      onChange={(e) => updateTaskTitle(task.id, e.target.value)}
                      placeholder="Apa langkah yang perlu dilakukan?" 
                      className="h-10 bg-white border-gray-200 rounded-lg flex-1 font-medium shadow-sm"
                    />
                    {tasks.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeTask(task.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                        <Trash2 className="w-[18px] h-[18px]" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={addTask} className="text-teal-600 border-dashed border-teal-200 hover:bg-teal-50 hover:text-teal-700 bg-white shadow-sm font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Langkah
              </Button>
            </div>

          </div>

          {/* Footer */}
          <DialogFooter className="px-6 md:px-8 py-5 bg-white border-t border-gray-200 sm:justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="text-gray-600 font-medium h-11 border-gray-300 hover:bg-gray-50 px-6 cursor-pointer">
              Batal
            </Button>
            <Button type="submit" className="bg-coral-500 hover:bg-coral-600 text-white font-bold h-11 px-6 shadow-sm border-0 active:scale-95 transition-all">
              Simpan Tujuan
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}
