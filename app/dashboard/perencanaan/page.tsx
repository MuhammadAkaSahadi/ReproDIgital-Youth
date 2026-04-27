"use client";

import { useState } from "react";
import { Plus, Search, Calendar as CalendarIcon, Target, MoreVertical, Flame, CheckCircle, ChevronDown, CheckCheck, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { goalSchema, GoalSchema } from "@/validations/goal-validation";

// Mock Data
const INITIAl_GOALS = [
  {
    id: 1,
    title: "Membaca 5 Buku Edukasi",
    category: "Pendidikan",
    deadline: new Date(2026, 8, 30),
    progress: 40,
    status: "Berjalan",
    streak: 3,
  },
  {
    id: 2,
    title: "Sesi Konseling Bulanan",
    category: "Kesehatan Mental",
    deadline: new Date(2026, 7, 20),
    progress: 100,
    status: "Selesai",
    streak: 1,
  },
  {
    id: 3,
    title: "Ikut Webminar Pranikah",
    category: "Perkawinan Anak",
    deadline: new Date(2026, 9, 15),
    progress: 0,
    status: "Belum Mulai",
    streak: 0,
  },
];

export default function PerencanaanMasaDepanPage() {
  const [goals, setGoals] = useState(INITIAl_GOALS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<GoalSchema>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      category: "",
    },
  });

  const onSubmit = (data: GoalSchema) => {
    const newGoal = {
      id: goals.length + 1,
      title: data.title,
      category: data.category,
      deadline: data.deadline,
      progress: 0,
      status: "Belum Mulai",
      streak: 0,
    };
    setGoals([newGoal, ...goals]);
    setIsDialogOpen(false);
    reset();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Selesai": return "bg-green-100 text-green-800";
      case "Berjalan": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredGoals = goals.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900 tracking-tight">Perencanaan Masa Depan</h1>
          <p className="text-sm text-gray-600 mt-1">Pantau dan kelola target perkembangan personal Anda</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button className="bg-teal-600 hover:bg-teal-700 text-white transition-fast shrink-0 gap-2 font-medium" />
            }
          >
            <Plus className="h-4 w-4" />
            Tambah Rencana
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-visible">
            <DialogHeader>
              <DialogTitle className="font-heading">Tambah Rencana Baru</DialogTitle>
              <DialogDescription>
                Buat target baru untuk masa depan Anda. Isi detail dengan lengkap.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Judul Rencana</label>
                <Input
                  {...register("title")}
                  placeholder="Contoh: Mengikuti pelatihan skill..."
                  className={cn(errors.title ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-teal-500")}
                />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Kategori</label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={cn(errors.category ? "border-red-500 ring-red-500" : "focus:ring-teal-500")}>
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kesehatan Jasmani">Kesehatan Jasmani</SelectItem>
                        <SelectItem value="Kesehatan Mental">Kesehatan Mental</SelectItem>
                        <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                        <SelectItem value="Karir & Keuangan">Karir & Keuangan</SelectItem>
                        <SelectItem value="Perkawinan Anak">Pencegahan Perkawinan Anak</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
              </div>

              <div className="space-y-2 flex flex-col">
                <label className="text-sm font-medium text-gray-900">Tenggat Waktu</label>
                <Controller
                  control={control}
                  name="deadline"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger 
                        render={
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal border-gray-200",
                              !field.value && "text-muted-foreground",
                              errors.deadline && "border-red-500 text-red-500"
                            )}
                          />
                        }
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.deadline && <p className="text-xs text-red-500">{errors.deadline.message}</p>}
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">Batal</Button>
                <Button type="submit" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white">Simpan Rencana</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-gradient-to-br from-teal-50 to-teal-100/50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-teal-800">Total Rencana</p>
              <h3 className="text-2xl font-bold font-heading text-teal-900">{goals.length}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-teal-200/50 flex items-center justify-center">
              <Target className="h-6 w-6 text-teal-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Selesai</p>
              <h3 className="text-2xl font-bold font-heading text-green-900">{goals.filter(g => g.status === "Selesai").length}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-200/50 flex items-center justify-center">
              <CheckCheck className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-800">Total Streak</p>
              <h3 className="text-2xl font-bold font-heading text-orange-900">
                {goals.reduce((acc, curr) => acc + curr.streak, 0)} <span className="text-sm font-normal text-orange-700">Hari</span>
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-200/50 flex items-center justify-center">
              <Flame className="h-6 w-6 text-orange-500 border-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Container */}
      <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-heading font-semibold text-lg text-gray-900">Daftar Rencana Anda</h3>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari rencana..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-teal-500 text-sm h-9 rounded-lg"
            />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-100 hover:bg-transparent">
              <TableHead className="text-gray-600 font-medium">Judul Rencana</TableHead>
              <TableHead className="text-gray-600 font-medium whitespace-nowrap">Tenggat Waktu</TableHead>
              <TableHead className="text-gray-600 font-medium">Progress</TableHead>
              <TableHead className="text-gray-600 font-medium text-center">Streak</TableHead>
              <TableHead className="text-gray-600 font-medium text-right shrink-0">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => (
                <TableRow key={goal.id} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <TableCell>
                    <div>
                      <p className="font-semibold text-gray-900 hover:text-teal-600 transition-colors cursor-pointer line-clamp-1">{goal.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 font-medium">{goal.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium leading-none", getStatusStyle(goal.status))}>
                          {goal.status}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {format(goal.deadline, "dd MMM yyyy", { locale: id })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full max-w-[120px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 font-medium">{goal.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out" 
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {goal.streak > 0 ? (
                      <div className="inline-flex items-center justify-center gap-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-bold text-orange-700">{goal.streak}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Target className="w-12 h-12 text-gray-200 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Rencana belum ditemukan.</p>
                    <p className="text-xs">Buat rencana Anda yang pertama dengan menekan tombol Tambah Rencana.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
