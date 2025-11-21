import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layout';
import CourseCard from '@/Components/CourseCard';
import { BookOpen, Plus } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url?: string;
  enrollment_count?: number;
}

interface Props {
  courses: Course[];
  auth?: {
    user?: {
      id: number;
      role: string;
    };
  };
}

export default function AdminCourses({ courses, auth }: Props) {
  return (
    <Layout title="Admin - Materi">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gray-900">Kelola Materi</h1>
              <p className="text-lg text-gray-600">Buat dan kelola materi kursus</p>
            </div>
            <Link
              href="/admin/courses/create"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Tambah Materi
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-4 border-teal-200">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-teal-100 rounded-full mb-6">
                  <BookOpen className="w-12 h-12 text-teal-500" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-3">Belum Ada Materi</h3>
                <p className="text-gray-600 text-lg mb-8">
                  Mulai dengan membuat materi pertama Anda untuk membagikan pengetahuan.
                </p>
                <Link
                  href="/admin/courses/create"
                  className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Materi Sekarang
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

