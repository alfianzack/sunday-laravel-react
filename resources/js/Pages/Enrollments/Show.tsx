import { Head, router } from '@inertiajs/react';
import Layout from '@/Layout';
import VideoPlayer from '@/Components/VideoPlayer';

interface Video {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  video_url: string;
  watched?: boolean;
}

interface Enrollment {
  id: number;
  course_id: number;
  course_title: string;
  course_description: string;
  progress: number;
  videos: Video[];
  current_video_id?: number;
}

interface Props {
  enrollment: Enrollment;
  auth?: {
    user?: {
      id: number;
    };
  };
}

export default function EnrollmentShow({ enrollment, auth }: Props) {
  if (!auth?.user) {
    router.visit('/login');
    return null;
  }

  const currentVideo = enrollment.videos.find(v => v.id === enrollment.current_video_id) || enrollment.videos[0];

  return (
    <Layout title={enrollment.course_title}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-8">
                  <h1 className="text-4xl font-bold mb-4 text-gray-900">{enrollment.course_title}</h1>

                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">{enrollment.course_description}</p>
                  </div>

                  {currentVideo && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900">Video Saat Ini</h2>
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <VideoPlayer videoUrl={currentVideo.video_url} title={currentVideo.title} />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-bold mb-2">{currentVideo.title}</h3>
                        {currentVideo.description && (
                          <p className="text-gray-600">{currentVideo.description}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {enrollment.videos && enrollment.videos.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-gray-900">Daftar Video ({enrollment.videos.length})</h2>
                      <div className="space-y-3">
                        {enrollment.videos.map((video, index) => (
                          <div
                            key={video.id}
                            className={`p-4 rounded-xl transition-colors border ${
                              video.id === enrollment.current_video_id
                                ? 'bg-blue-50 border-blue-300'
                                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                                video.id === enrollment.current_video_id
                                  ? 'bg-blue-100 text-blue-600'
                                  : video.watched
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {video.watched ? '✓' : index + 1}
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
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Belajar</h3>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-teal-600">{enrollment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Status:</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      Ter-enroll
                    </span>
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

