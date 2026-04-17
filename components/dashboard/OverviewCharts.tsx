"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data
const areaData = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 200 },
  { name: "Mar", total: 350 },
  { name: "Apr", total: 420 },
  { name: "Mei", total: 580 },
  { name: "Jun", total: 700 },
  { name: "Jul", total: 810 },
  { name: "Ags", total: 890 },
  { name: "Sep", total: 950 },
  { name: "Okt", total: 1020 },
  { name: "Nov", total: 1100 },
  { name: "Des", total: 1234 },
];

const barData = [
  { name: "Minggu 1", sesi: 180 },
  { name: "Minggu 2", sesi: 210 },
  { name: "Minggu 3", sesi: 250 },
  { name: "Minggu 4", sesi: 216 },
];

const pieData = [
  { name: "Kesehatan Reproduksi", value: 400, color: "#0D9488" }, // Teal
  { name: "Perkawinan Anak", value: 250, color: "#FF7A5C" }, // Coral
  { name: "Hubungan Sehat", value: 156, color: "#10B981" }, // Green
  { name: "Lainnya", value: 50, color: "#6B7280" }, // Gray
];

export function OverviewCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
      <Card className="col-span-1 md:col-span-2 border-none shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900 font-heading">Pertumbuhan Pengguna Baru</CardTitle>
          <CardDescription className="text-gray-600">Total siswa aktif selama 12 bulan terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={areaData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #E5E7EB", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                  itemStyle={{ color: "#0D9488", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="total" stroke="#0D9488" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900 font-heading">Sesi Konseling</CardTitle>
          <CardDescription className="text-gray-600">Sesi per minggu bulan ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #E5E7EB" }}
                />
                <Bar dataKey="sesi" fill="#0D9488" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900 font-heading">Distribusi Topik</CardTitle>
          <CardDescription className="text-gray-600">Kategori isu terbesar yang dikonsultasikan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #E5E7EB", padding: "8px" }}
                  itemStyle={{ color: "#111827" }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  wrapperStyle={{ fontSize: "12px", color: "#6B7280" }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
