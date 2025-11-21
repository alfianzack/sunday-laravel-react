import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Layout';
import { ArrowLeft, Upload } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  video_url: string;
  order_index?: number;
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

export default function AdminCoursesEdit({ course, auth }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    title: course.title || '',
    description: course.description || '',
    price: course.price?.toString() || '',
    thumbnail: null as File | null,
    preview_video: null as File | null,
    preview_video_url: course.preview_video_url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/courses/${course.id}`, {
      forceFormData: true,
      onSuccess: () => {
        // Redirect will be handled by Inertia
      },
    });
  };

  return (
    <Layout title={`Edit Materi - ${course.title}`}>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Link
              href={`/admin/courses/${course.id}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Detail Materi
            </Link>
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Edit Materi</h1>
            <p className="text-lg text-gray-600">Ubah informasi materi kursus</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Judul Materi
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Masukkan judul materi"
                  required
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Masukkan deskripsi materi"
                  rows={6}
                  required
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  value={data.price}
                  onChange={(e) => setData('price', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="0"
                  min="0"
                  required
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Thumbnail (kosongkan jika tidak ingin mengubah)
                </label>
                {course.thumbnail_url && (
                  <div className="mb-4">
                    <img
                      src={course.thumbnail_url.startsWith('http') ? course.thumbnail_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${course.thumbnail_url}`}
                      alt={course.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('thumbnail', e.target.files?.[0] || null)}
                    className="hidden"
                    id="thumbnail"
                  />
                  <label
                    htmlFor="thumbnail"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <div>
                      <span className="text-teal-600 font-semibold">Klik untuk upload</span> atau drag and drop
                    </div>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                    {data.thumbnail && (
                      <div className="mt-4">
                        <span className="text-green-600 font-semibold">{data.thumbnail.name}</span>
                      </div>
                    )}
                  </label>
                </div>
                {errors.thumbnail && (
                  <p className="mt-2 text-sm text-red-600">{errors.thumbnail}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Preview Video URL (kosongkan jika tidak ingin mengubah)
                </label>
                <input
                  type="url"
                  value={data.preview_video_url}
                  onChange={(e) => setData('preview_video_url', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="https://..."
                />
                <p className="mt-2 text-sm text-gray-500">Atau upload file video di bawah</p>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors mt-4">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setData('preview_video', e.target.files?.[0] || null)}
                    className="hidden"
                    id="preview_video"
                  />
                  <label
                    htmlFor="preview_video"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <div>
                      <span className="text-teal-600 font-semibold">Klik untuk upload video</span>
                    </div>
                    <p className="text-sm text-gray-500">MP4, MOV, AVI hingga 100MB</p>
                    {data.preview_video && (
                      <div className="mt-4">
                        <span className="text-green-600 font-semibold">{data.preview_video.name}</span>
                      </div>
                    )}
                  </label>
                </div>
                {errors.preview_video && (
                  <p className="mt-2 text-sm text-red-600">{errors.preview_video}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="ml-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

