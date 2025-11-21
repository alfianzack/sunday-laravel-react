import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layout';
import VideoPlayer from '@/Components/VideoPlayer';

interface Video {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  video_url: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url?: string;
  preview_video_url?: string;
  instructor_name?: string;
  videos?: Video[];
  is_enrolled?: boolean;
}

interface Props {
  course: Course;
  auth?: {
    user?: {
      id: number;
      role: string;
    };
  };
}

export default function CourseShow({ course, auth }: Props) {
  const user = auth?.user;
  const isAdmin = user?.role === 'admin';

  // Redirect admin to admin course detail page
  if (isAdmin && typeof window !== 'undefined') {
    router.visit(`/admin/courses/${course.id}`);
    return null;
  }

  const handleAddToCart = () => {
    if (!user) {
      router.visit('/login');
      return;
    }
    router.post(`/cart/${course.id}`);
  };

  const handleEnroll = () => {
    if (course.is_enrolled) {
      router.visit(`/enrollments/${course.id}`);
    }
  };

  return (
    <Layout title={course.title}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                {course.thumbnail_url && (
                  <div className="relative w-full h-80 bg-blue-100 overflow-hidden">
                    <img
                      src={course.thumbnail_url.startsWith('http') ? course.thumbnail_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${course.thumbnail_url}`}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h1 className="text-4xl font-bold mb-4 text-gray-900">{course.title}</h1>

                  {course.instructor_name && (
                    <p className="text-gray-600 mb-6">Oleh: <span className="font-semibold">{course.instructor_name}</span></p>
                  )}

                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>
                  </div>

                  {course.preview_video_url && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900">Preview Materi</h2>
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <VideoPlayer videoUrl={course.preview_video_url} title={course.title} />
                      </div>
                    </div>
                  )}

                  {course.videos && course.videos.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-gray-900">Daftar Video ({course.videos.length})</h2>
                      <div className="space-y-3">
                        {course.videos.map((video, index) => (
                          <div key={video.id} className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors border border-gray-200">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 mb-1">{video.title}</p>
                                {video.description && (
                                  <p className="text-gray-600 text-sm mb-2">{video.description}</p>
                                )}
                                {video.duration && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Durasi: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-red-500 mb-2">
                    Rp {course.price.toLocaleString('id-ID')}
                  </p>
                  {course.is_enrolled ? (
                    <button
                      onClick={handleEnroll}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Lanjutkan Belajar
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Tambah ke Keranjang
                    </button>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Apa yang akan Anda pelajari:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Materi lengkap dan terstruktur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Akses seumur hidup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Sertifikat penyelesaian</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

