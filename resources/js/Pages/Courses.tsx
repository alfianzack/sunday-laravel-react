import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layout';
import CourseCard from '@/Components/CourseCard';
import { BookOpen, Plus, Sparkles } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url?: string;
  enrollment_count?: number;
}

interface User {
  id: number;
  name: string;
  role: string;
}

interface Props {
  courses: Course[];
  auth?: {
    user?: User;
  };
}

export default function Courses({ courses, auth }: Props) {
  const user = auth?.user;
  const isAdmin = user?.role === 'admin';

  // Redirect admin to admin courses page
  if (isAdmin && typeof window !== 'undefined') {
    router.visit('/admin/courses');
    return null;
  }

  return (
    <Layout title="Courses">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Semua Materi</h1>
              </div>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Jelajahi koleksi lengkap kursus pembelajaran video kami
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {courses.length > 0 && (
            <div className="mb-8 flex items-center justify-between bg-white rounded-xl shadow-md border-2 border-teal-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <p className="text-gray-700 font-medium">
                  Menampilkan <span className="font-bold text-teal-600">{courses.length}</span> materi tersedia
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-4 border-teal-200">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-teal-100 rounded-full mb-6">
                  <BookOpen className="w-12 h-12 text-teal-500" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-3">Belum Ada Materi</h3>
                <p className="text-gray-600 text-lg mb-8">
                  Belum ada materi tersedia saat ini. Silakan kembali lagi nanti.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

