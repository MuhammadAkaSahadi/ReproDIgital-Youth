import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, MessageSquare, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { OverviewCharts } from "@/components/dashboard/OverviewCharts";

const summaryStats = [
  {
    title: "Total Siswa Aktif",
    value: "1,234",
    trend: "+12.5%",
    trendPositive: true,
    icon: Users,
    iconBgColor: "bg-teal-500/15",
    iconColor: "text-teal-600",
  },
  {
    title: "Total Konselor",
    value: "48",
    trend: "+8.3%",
    trendPositive: true,
    icon: UserCheck,
    iconBgColor: "bg-coral-500/15",
    iconColor: "text-coral-500",
  },
  {
    title: "Total Sesi Bulan Ini",
    value: "856",
    trend: "+15.2%",
    trendPositive: true,
    icon: MessageSquare,
    iconBgColor: "bg-green-500/15",
    iconColor: "text-green-600",
  },
  {
    title: "Konten Dipublish",
    value: "127",
    trend: "-5.1%",
    trendPositive: false,
    icon: FileText,
    iconBgColor: "bg-amber-500/15",
    iconColor: "text-amber-600",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold font-heading text-gray-900 tracking-tight">Ikhtisar Dashboard</h1>
        <p className="text-sm text-gray-600">Pantau perkembangan aktivitas, sesi konseling, dan publikasi edukasi hari ini.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, i) => (
          <Card key={i} className="rounded-xl border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-base">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold font-heading text-gray-900">{stat.value}</h3>
                    <div className="flex items-center text-xs font-medium">
                      {stat.trendPositive ? (
                         <span className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md">
                           <ArrowUpRight className="mr-1 h-3 w-3" />
                           {stat.trend}
                         </span>
                      ) : (
                        <span className="flex items-center text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md">
                           <ArrowDownRight className="mr-1 h-3 w-3" />
                           {stat.trend}
                         </span>
                      )}
                      <span className="ml-2 text-gray-500 font-normal">dari bulan lalu</span>
                    </div>
                  </div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.iconBgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <OverviewCharts />

      {/* Tabel Placeholder */}
      <Card className="rounded-xl border-none shadow-sm h-full w-full">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-900">Pendaftaran Konselor Terbaru</h3>
            <p className="text-sm text-gray-500 mt-1">Konselor yang menunggu verifikasi admin.</p>
          </div>
          <button className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-lg transition-fast">
            Lihat Semua
          </button>
        </div>
        <div className="overflow-x-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4 shrink-0 w-32">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">Konselor Baru {item}</td>
                  <td className="px-6 py-4 text-gray-500">konselor{item}@example.com</td>
                  <td className="px-6 py-4 text-gray-500">2 jam yang lalu</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Menunggu
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:opsacity-90 hover:bg-teal-700 transition-fast shadow-sm disabled:opacity-50">
                      Verifikasi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
