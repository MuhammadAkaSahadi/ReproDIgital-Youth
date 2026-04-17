"use client";

import { useState } from "react";
import { Check, X, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { verifyCounselor, rejectCounselor } from "./actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Mock Data mimicking 'profiles' table
const MOCK_PROFILES = [
  {
    id: "uuid-1",
    full_name: "Dr. Sarah Lestari",
    specialization: "Psikologi Klinis / Kesehatan Mental Remaja",
    bio: "Memiliki pengalaman 5 tahun dalam pendampingan remaja.",
    created_at: new Date("2026-04-10T08:30:00"),
    is_verified: false,
    role: "counselor",
  },
  {
    id: "uuid-2",
    full_name: "Budi Santoso, M.Psi",
    specialization: "Kesehatan Reproduksi",
    bio: "Pakar kesehatan reproduksi yang aktif berkampanye.",
    created_at: new Date("2026-04-12T14:15:00"),
    is_verified: false,
    role: "counselor",
  },
  {
    id: "uuid-3",
    full_name: "Anita Dewi",
    specialization: "Hubungan Sehat",
    bio: "Konselor sekolah dedikatif.",
    created_at: new Date("2026-03-25T09:00:00"),
    is_verified: true,
    role: "counselor",
  },
];

export default function VerifikasiKonselorPage() {
  // Dalam real-app, data akan di-pass dari Server Component. Di sini kita mock sebagai state agar bisa disimulasikan.
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [searchQuery, setSearchQuery] = useState("");

  const handleVerify = async (userId: string) => {
    try {
      const response = await verifyCounselor(userId);
      if (response.success) {
        setProfiles(profiles.map(p => p.id === userId ? { ...p, is_verified: true } : p));
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Gagal memverifikasi konselor");
    }
  };

  const handleReject = async (userId: string) => {
    try {
      const response = await rejectCounselor(userId);
      if (response.success) {
        setProfiles(profiles.filter(p => p.id !== userId)); // Hapus dari UI sementara
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Gagal menolak konselor");
    }
  };

  const filteredProfiles = profiles.filter(p => p.full_name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900 tracking-tight">Verifikasi Konselor</h1>
          <p className="text-sm text-gray-600 mt-1">Kelola dan verifikasi pendaftaran konselor baru</p>
        </div>
      </div>

      {/* Main Table Container */}
      <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden p-0">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="font-heading font-semibold text-lg text-gray-900">Daftar Pendaftar</h3>
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {filteredProfiles.length} Total
            </span>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari nama konselor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-teal-500 text-sm h-9 rounded-lg"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="text-gray-600 font-medium">Nama Lengkap</TableHead>
                <TableHead className="text-gray-600 font-medium">Keahlian & Bio</TableHead>
                <TableHead className="text-gray-600 font-medium">Tanggal Mendaftar</TableHead>
                <TableHead className="text-gray-600 font-medium">Status</TableHead>
                <TableHead className="text-gray-600 font-medium text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <TableRow key={profile.id} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-teal-600 text-white font-heading font-bold text-xs uppercase">
                            {profile.full_name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900 hover:text-teal-600 transition-colors cursor-pointer">{profile.full_name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{profile.specialization}</p>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{profile.bio}</p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {format(profile.created_at, "dd MMM yyyy", { locale: id })}
                      </span>
                    </TableCell>
                    <TableCell>
                      {profile.is_verified ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Terverifikasi
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!profile.is_verified ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            onClick={() => handleVerify(profile.id)}
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 bg-white"
                          >
                            <Check className="w-4 h-4 mr-1" /> Terima
                          </Button>
                          <Button 
                            onClick={() => handleReject(profile.id)}
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 bg-white"
                          >
                            <X className="w-4 h-4 mr-1" /> Tolak
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">Selesai</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <p className="text-sm font-medium text-gray-900">Tidak ada data pendaftar.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
