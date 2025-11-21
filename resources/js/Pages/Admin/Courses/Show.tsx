import { Head, Link, useForm, router } from '@inertiajs/react';
import Layout from '@/Layout';
import VideoPlayer from '@/Components/VideoPlayer';
import { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

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
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  
  const { data: videoData, setData: setVideoData, post: postVideo, put: putVideo, processing: videoProcessing, reset: resetVideo } = useForm({
    title: '',
    description: '',
    video_url: '',
    duration: '',
    order_index: '',
    video: null as File | null,
  });

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    postVideo(`/admin/courses/${course.id}/videos`, {
      forceFormData: true,
      onSuccess: () => {
        setShowAddVideo(false);
        resetVideo();
        router.reload();
      },
    });
  };

  const handleEditVideo = (video: Video) => {
    setEditingVideo(video);
    setVideoData({
      title: video.title,
      description: video.description || '',
      video_url: video.video_url,
      duration: video.duration?.toString() || '',
      order_index: video.order_index?.toString() || '',
      video: null,
    });
    setShowAddVideo(true);
  };

  const handleUpdateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    
    putVideo(`/admin/courses/${course.id}/videos/${editingVideo.id}`, {
      forceFormData: true,
      onSuccess: () => {
        setShowAddVideo(false);
        setEditingVideo(null);
        resetVideo();
        router.reload();
      },
    });
  };

  const handleDeleteVideo = (videoId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus video ini?')) {
      router.delete(`/admin/courses/${course.id}/videos/${videoId}`, {
        onSuccess: () => {
          router.reload();
        },
      });
    }
  };

  const handleCancelVideo = () => {
    setShowAddVideo(false);
    setEditingVideo(null);
    resetVideo();
  };

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

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Daftar Video ({course.videos?.length || 0})
                      </h2>
                      {!showAddVideo && (
                        <button
                          onClick={() => setShowAddVideo(true)}
                          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg"
                        >
                          <Plus className="w-5 h-5" />
                          Tambah Video
                        </button>
                      )}
                    </div>

                    {showAddVideo && (
                      <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">
                            {editingVideo ? 'Edit Video' : 'Tambah Video Baru'}
                          </h3>
                          <button
                            onClick={handleCancelVideo}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <form onSubmit={editingVideo ? handleUpdateVideo : handleAddVideo} className="space-y-4">
                          <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                              Judul Video
                            </label>
                            <input
                              type="text"
                              value={videoData.title}
                              onChange={(e) => setVideoData('title', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                              Deskripsi
                            </label>
                            <textarea
                              value={videoData.description}
                              onChange={(e) => setVideoData('description', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Durasi (detik)
                              </label>
                              <input
                                type="number"
                                value={videoData.duration}
                                onChange={(e) => setVideoData('duration', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                min="0"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Urutan
                              </label>
                              <input
                                type="number"
                                value={videoData.order_index}
                                onChange={(e) => setVideoData('order_index', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                min="0"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                              Video URL
                            </label>
                            <input
                              type="url"
                              value={videoData.video_url}
                              onChange={(e) => setVideoData('video_url', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                              placeholder="https://..."
                            />
                            <p className="mt-2 text-sm text-gray-500">Atau upload file video di bawah</p>
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                              File Video
                            </label>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => setVideoData('video', e.target.files?.[0] || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={handleCancelVideo}
                              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                              Batal
                            </button>
                            <button
                              type="submit"
                              disabled={videoProcessing}
                              className="ml-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50"
                            >
                              {videoProcessing ? 'Menyimpan...' : editingVideo ? 'Update Video' : 'Tambah Video'}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {course.videos && course.videos.length > 0 ? (
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
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditVideo(video)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit Video"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteVideo(video.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Hapus Video"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Belum ada video. Klik "Tambah Video" untuk menambahkan video pertama.
                      </div>
                    )}
                  </div>
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

