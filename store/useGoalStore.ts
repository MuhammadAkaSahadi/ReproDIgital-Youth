import { create } from 'zustand';

export interface GoalTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'Pendidikan' | 'Karir' | 'Kesehatan' | 'Keuangan' | 'Personal';
  priority: 'Rendah' | 'Sedang' | 'Tinggi';
  progress: number; // 0-100
  targetDate: string;
  milestonesCount: number;
  milestonesCompleted: number;
  status: 'Aktif' | 'Tercapai' | 'Ditunda';
  tasks: GoalTask[];
}

interface GoalState {
  goals: Goal[];
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [
    {
      id: "1",
      title: "Lulus Ujian Nasional dengan Nilai A",
      description: "Fokus belajar matematika dan IPA setiap malam.",
      category: "Pendidikan",
      priority: "Tinggi",
      progress: 65,
      targetDate: "2026-05-15",
      milestonesCount: 7,
      milestonesCompleted: 4,
      status: "Aktif",
      tasks: [
        { id: "t1", title: "Merangkum bab Biologi", completed: true },
        { id: "t2", title: "Tryout Matematika ke-1", completed: true },
        { id: "t3", title: "Mendaftar ujian bimbingan", completed: true },
        { id: "t4", title: "Mengerjakan soal fisika", completed: true },
        { id: "t5", title: "Tryout UN gabungan", completed: false },
        { id: "t6", title: "Mempelajari bab Optik", completed: false },
        { id: "t7", title: "Tidur cukup sebelum H-1", completed: false },
      ]
    },
    {
      id: "2",
      title: "Menabung untuk Modal Kuliah",
      description: "Menyisihkan uang saku Rp 50.000 setiap minggu.",
      category: "Keuangan",
      priority: "Sedang",
      progress: 40,
      targetDate: "2026-12-31",
      milestonesCount: 10,
      milestonesCompleted: 4,
      status: "Aktif",
      tasks: [
        { id: "t2_1", title: "Membuka rekening tabungan", completed: true },
        { id: "t2_2", title: "Konsisten nabung bulan 1", completed: true },
        { id: "t2_3", title: "Konsisten nabung bulan 2", completed: true },
        { id: "t2_4", title: "Konsisten nabung bulan 3", completed: true },
        { id: "t2_5", title: "Konsisten nabung bulan 4", completed: false },
        { id: "t2_6", title: "Konsisten nabung bulan 5", completed: false },
        { id: "t2_7", title: "Mencari info beasiswa tambahan", completed: false },
      ]
    },
    {
      id: "3",
      title: "Rutin Olahraga Lari",
      description: "Lari pagi 3x seminggu untuk kesehatan fisik.",
      category: "Kesehatan",
      priority: "Rendah",
      progress: 100,
      targetDate: "2026-01-01",
      milestonesCount: 1,
      milestonesCompleted: 1,
      status: "Tercapai",
      tasks: [
        { id: "t3_1", title: "Membeli sepatu lari baru", completed: true },
      ]
    }
  ]
}));
