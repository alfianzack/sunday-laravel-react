import { Head, Link } from '@inertiajs/react';
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
  videos?: Video[];
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

export default function AdminCoursesShow({ course, auth }: Props) {
  return (
    <Layout title={`Admin - ${course.title}`}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Daftar Materi
            </Link>
          </div>

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
                </div>

                <div className="space-y-4">
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl text-center"
                  >
                    Edit Materi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

