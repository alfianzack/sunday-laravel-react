import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layout';
import { BookOpen, PlayCircle, TrendingUp, ArrowRight } from 'lucide-react';

interface Enrollment {
  id: number;
  course_id: number;
  title: string;
  thumbnail_url?: string;
  progress?: number;
}

interface Props {
  enrollments: Enrollment[];
  auth?: {
    user?: {
      id: number;
    };
  };
}

export default function Enrollments({ enrollments, auth }: Props) {
  if (!auth?.user) {
    return null;
  }

  return (
    <Layout title="Materi Saya">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Materi Saya</h1>
              </div>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Lanjutkan pembelajaran Anda dan capai tujuan belajar
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {enrollments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border-4 border-teal-200 p-16 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-teal-100 rounded-full mb-6">
                <BookOpen className="w-12 h-12 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Belum Ada Materi</h3>
              <p className="text-gray-600 text-xl mb-8">Belum ada materi yang di-enroll</p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <ArrowRight className="w-5 h-5" />
                Jelajahi Materi
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrollments.map((enrollment) => (
                <Link
                  key={enrollment.id}
                  href={`/enrollments/${enrollment.course_id}`}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {enrollment.thumbnail_url && (
                    <div className="relative w-full h-48 bg-blue-100 overflow-hidden">
                      <img
                        src={enrollment.thumbnail_url.startsWith('http') ? enrollment.thumbnail_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${enrollment.thumbnail_url}`}
                        alt={enrollment.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Ter-enroll
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{enrollment.title}</h3>
                    {enrollment.progress !== undefined && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-semibold text-teal-600">{enrollment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-2 text-teal-600 font-semibold">
                      <PlayCircle className="w-5 h-5" />
                      <span>Lanjutkan Belajar</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

