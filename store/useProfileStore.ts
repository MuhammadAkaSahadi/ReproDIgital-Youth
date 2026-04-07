import { create } from "zustand";

export type ActivityType = "artikel" | "kuis" | "goal";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  timestamp: string;
  description: string;
}

export interface ProfileGoal {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalSteps: number;
  completedSteps: number;
  deadline: string;
  daysLeft: number;
}

export interface Badge {
  id: string;
  name: string;
  iconType: string;
  dateEarned?: string; // If present, it is unlocked
  requirement: string;
}

interface ProfileState {
  summary: {
    totalArtikel: number;
    artikelBaruMingguIni: number;
    totalKuis: number;
    streakHarian: number;
    totalGoalAktif: number;
    goalHampirSelesai: number;
  };
  activities: Activity[];
  activeGoals: ProfileGoal[];
  badges: Badge[];
}

export const useProfileStore = create<ProfileState>(() => ({
  summary: {
    totalArtikel: 42,
    artikelBaruMingguIni: 5,
    totalKuis: 15,
    streakHarian: 12,
    totalGoalAktif: 5,
    goalHampirSelesai: 2,
  },
  activeGoals: [
    {
      id: "g1",
      title: "Meningkatkan Pemahaman Kesehatan Reproduksi Dasar",
      category: "Kesehatan Fisik",
      progress: 65,
      totalSteps: 7,
      completedSteps: 4,
      deadline: "20 Mei 2026",
      daysLeft: 120,
    },
    {
      id: "g2",
      title: "Rutin Konsultasi Sebaya Mingguan",
      category: "Mental & Emosional",
      progress: 40,
      totalSteps: 5,
      completedSteps: 2,
      deadline: "10 Jun 2026",
      daysLeft: 141,
    },
    {
      id: "g3",
      title: "Menuntaskan Serial Edukasi Pendidikan Seksual",
      category: "Edukasi",
      progress: 85,
      totalSteps: 10,
      completedSteps: 8,
      deadline: "15 Apr 2026",
      daysLeft: 15,
    }
  ],
  activities: [
    {
      id: "a1",
      type: "goal",
      title: "Menyelesaikan langkah 'Pemeriksaan Rutin'",
      description: "Progress tercapai 85%",
      timestamp: "2 jam lalu",
    },
    {
      id: "a2",
      type: "artikel",
      title: "Membaca artikel 'Mitos & Fakta Menstruasi'",
      description: "100% Selesai (5 menit baca)",
      timestamp: "5 jam lalu",
    },
    {
      id: "a3",
      type: "kuis",
      title: "Kuis Kesehatan Reproduksi Dasar",
      description: "Skor: 85 (Lulus)",
      timestamp: "1 hari lalu",
    },
    {
      id: "a4",
      type: "artikel",
      title: "Membaca artikel 'Pentingnya Boundaries'",
      description: "100% Selesai (7 menit baca)",
      timestamp: "2 hari lalu",
    },
    {
      id: "a5",
      type: "goal",
      title: "Membuat Goal 'Rutin Konsultasi Sebaya Mingguan'",
      description: "Kategori Mental & Emosional",
      timestamp: "3 hari lalu",
    }
  ],
  badges: [
    {
      id: "b1",
      name: "Pemula",
      iconType: "star",
      dateEarned: "5 Jan 2026",
      requirement: "Dibuat akun pertama kali",
    },
    {
      id: "b2",
      name: "Pembaca",
      iconType: "book",
      dateEarned: "12 Jan 2026",
      requirement: "Membaca 10 artikel",
    },
    {
      id: "b3",
      name: "Kuis Master",
      iconType: "award",
      dateEarned: "15 Feb 2026",
      requirement: "Lulus 5 kuis skor 80+",
    },
    {
      id: "b4",
      name: "Konsisten",
      iconType: "flame",
      dateEarned: "20 Mar 2026",
      requirement: "Login 7 hari berturut-turut",
    },
    {
      id: "b5",
      name: "Goal Getter",
      iconType: "target",
      dateEarned: "2 hari lalu",
      requirement: "Menyelesaikan 3 goal",
    },
    {
      id: "b6",
      name: "Inspirasi",
      iconType: "share",
      requirement: "Membagikan 5 artikel",
    }
  ]
}));
