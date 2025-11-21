import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layout';
import { LayoutDashboard, Book, FileText, Users, TrendingUp } from 'lucide-react';

interface Props {
  auth?: {
    user?: {
      id: number;
      name: string;
      role: string;
    };
  };
}

export default function AdminIndex({ auth }: Props) {
  return (
    <Layout title="Admin Dashboard">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Selamat datang, {auth?.user?.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/admin/courses"
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 rounded-xl p-3">
                  <Book className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Materi</h3>
                  <p className="text-gray-600 text-sm">Kelola materi kursus</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 rounded-xl p-3">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pesanan</h3>
                  <p className="text-gray-600 text-sm">Kelola pesanan</p>
                </div>
              </div>
            </Link>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 rounded-xl p-3">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pengguna</h3>
                  <p className="text-gray-600 text-sm">Kelola pengguna</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

