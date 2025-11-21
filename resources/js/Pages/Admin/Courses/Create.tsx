import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Layout';
import { ArrowLeft, Upload } from 'lucide-react';

interface Props {
  auth?: {
    user?: {
      id: number;
      role: string;
    };
  };
}

export default function AdminCoursesCreate({ auth }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    price: '',
    thumbnail: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/courses', {
      forceFormData: true,
      onSuccess: () => {
        // Redirect will be handled by Inertia
      },
    });
  };

  return (
    <Layout title="Tambah Materi">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Daftar Materi
            </Link>
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Tambah Materi Baru</h1>
            <p className="text-lg text-gray-600">Buat materi kursus baru</p>
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
                  Thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('thumbnail', e.target.files?.[0] || null)}
                    className="hidden"
                    id="thumbnail"
                    required
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

              <div className="flex gap-4">
                <Link
                  href="/admin/courses"
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="ml-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Menyimpan...' : 'Simpan Materi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

