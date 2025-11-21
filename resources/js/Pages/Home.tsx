import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layout';
import CourseCard from '@/Components/CourseCard';
import { BookOpen, ArrowRight, Settings, CheckCircle2, Users, Sparkles, Globe, Camera, Award, Clock, PlayCircle, TrendingUp, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

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

export default function Home({ courses, auth }: Props) {
  const user = auth?.user;
  const isAdmin = user?.role === 'admin';

  return (
    <Layout title="Home">
      <div className="min-h-screen bg-amber-50">
        {!isAdmin && (
          <>
            {/* Hero Section dengan tema kuning soft dan artistik */}
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 min-h-[90vh] flex items-center">
              {/* Decorative circles - soft pastel */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute top-20 left-1/3 w-24 h-24 bg-emerald-200 rounded-full opacity-35 blur-3xl"></div>
              <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-200 rounded-full opacity-35 blur-3xl"></div>
              <div className="absolute top-10 right-20 w-28 h-28 bg-amber-200 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute top-32 right-1/4 w-20 h-20 bg-sky-200 rounded-full opacity-35 blur-3xl"></div>

              <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Welcome Content */}
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-slate-700 mb-4 shadow-sm">
                      <Camera className="w-4 h-4 text-rose-400" />
                      Studio Sunday
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      <span className="text-slate-800">Selamat Datang di</span>
                      <br />
                      <span className="text-rose-400">Studio</span>{' '}
                      <span className="text-cyan-500">Sunday</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl">
                      Di mana imajinasi menjadi nyata melalui ilustrasi magis! Bergabunglah dengan kami dalam menciptakan dunia yang mempesona untuk anak-anak dari segala usia.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                      >
                        <Sparkles className="w-5 h-5" />
                        Jelajahi Galeri
                      </Link>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                      >
                        <Globe className="w-5 h-5" />
                        Hubungi Kami
                      </a>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-6 pt-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-slate-800">{courses.length}+</div>
                        <div className="text-sm text-slate-600 font-medium">Materi Tersedia</div>
                      </div>
                      <div className="text-center relative">
                        <div className="absolute inset-0 bg-emerald-200 rounded-full opacity-30 blur-xl"></div>
                        <div className="text-3xl font-bold text-slate-800 relative z-10">1000+</div>
                        <div className="text-sm text-slate-600 font-medium relative z-10">Siswa Aktif</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-slate-800">50+</div>
                        <div className="text-sm text-slate-600 font-medium">Instruktur</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Illustration Frame */}
                  <div className="relative lg:block hidden">
                    <div className="relative">
                      {/* Gradient background untuk ilustrasi - soft pastel */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-amber-100 to-cyan-100 rounded-3xl transform rotate-3 opacity-60"></div>

                      {/* Frame dengan border soft */}
                      <div className="relative bg-white rounded-3xl p-4 shadow-xl transform -rotate-1">
                        {/* Outer border dengan gradient soft */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-300 via-sky-300 to-cyan-400 p-[6px] opacity-70">
                          {/* Inner border layer */}
                          <div className="absolute inset-[6px] rounded-3xl bg-gradient-to-br from-cyan-200 to-sky-200 p-[4px] opacity-60">
                            <div className="absolute inset-[10px] rounded-3xl bg-gradient-to-br from-amber-50 to-rose-50"></div>
                          </div>
                        </div>
                        {/* Content wrapper */}
                        <div className="relative bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-12 min-h-[400px] flex items-end z-10 border-4 border-cyan-300/50">
                          <div className="w-full flex justify-center items-end">
                            <div className="bg-gradient-to-br from-rose-200 to-amber-200 rounded-2xl p-8 shadow-md transform hover:scale-105 transition-transform">
                              <BookOpen className="w-32 h-32 text-cyan-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section dengan tema soft pastel */}
            <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 relative">
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-slate-800 mb-4">Mengapa Pilih Studio Sunday?</h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Platform pembelajaran yang dirancang khusus untuk memberikan pengalaman belajar terbaik
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 border-rose-100/50">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full mb-4 shadow-sm">
                      <Clock className="w-8 h-8 text-rose-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Belajar Fleksibel</h3>
                    <p className="text-slate-600 text-sm">Akses materi kapan saja dan di mana saja sesuai waktu Anda. Tidak ada batasan waktu!</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 border-cyan-100/50">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-200 to-cyan-300 rounded-full mb-4 shadow-sm">
                      <Award className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Konten Berkualitas</h3>
                    <p className="text-slate-600 text-sm">Video pembelajaran berkualitas tinggi dari instruktur berpengalaman dan terpercaya</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 border-amber-100/50">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mb-4 shadow-sm">
                      <Users className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Komunitas Aktif</h3>
                    <p className="text-slate-600 text-sm">Bergabung dengan ribuan pembelajar lainnya dan saling berbagi pengalaman</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 border-emerald-100/50">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full mb-4 shadow-sm">
                      <TrendingUp className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Progress Tracking</h3>
                    <p className="text-slate-600 text-sm">Pantau perkembangan belajar Anda dengan sistem tracking yang terintegrasi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <PlayCircle className="w-12 h-12 mx-auto mb-4 text-cyan-500" />
                    <h3 className="text-xl font-bold mb-2 text-slate-800">Video HD</h3>
                    <p className="text-slate-600">Semua video dalam kualitas tinggi untuk pengalaman belajar optimal</p>
                  </div>
                  <div>
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-rose-500" />
                    <h3 className="text-xl font-bold mb-2 text-slate-800">Sertifikat</h3>
                    <p className="text-slate-600">Dapatkan sertifikat resmi setelah menyelesaikan setiap kursus</p>
                  </div>
                  <div>
                    <Settings className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
                    <h3 className="text-xl font-bold mb-2 text-slate-800">Update Berkala</h3>
                    <p className="text-slate-600">Konten selalu diperbarui dengan materi terbaru dan relevan</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Courses Section */}
        <div className="bg-gradient-to-b from-amber-50 via-white to-white py-16">
          <div className="container mx-auto px-4">
            {isAdmin && (
              <>
                <div className="mb-8 flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-bold mb-2 text-slate-800">Admin Dashboard</h1>
                    <p className="text-lg text-slate-600">Kelola platform pembelajaran video Anda</p>
                  </div>
                  <Link
                    href="/admin/courses/create"
                    className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    + Tambah Materi
                  </Link>
                </div>
                <div className="mb-8">
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Dashboard Admin
                  </Link>
                </div>
              </>
            )}

            {!isAdmin && (
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-200 to-rose-300 text-rose-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                  Materi Terpopuler
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
                  Pilih Materi yang Ingin Anda Pelajari
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                  Temukan kursus yang sesuai dengan minat dan kebutuhan Anda. Setiap materi dirancang untuk memberikan pengalaman belajar yang menyenangkan dan efektif.
                </p>
              </div>
            )}

            {courses.length === 0 ? (
              <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-4 border-cyan-200/50">
                <div className="max-w-md mx-auto">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-rose-100 to-cyan-100 rounded-full mb-6">
                    <BookOpen className="w-16 h-16 text-cyan-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {isAdmin ? 'Mulai Perjalanan Anda' : 'Belum Ada Materi Tersedia'}
                  </h3>
                  <p className="text-slate-600 text-lg mb-8">
                    {isAdmin
                      ? 'Klik tombol "Tambah Materi" di atas untuk membuat materi pertama dan mulai membangun platform pembelajaran Anda.'
                      : 'Belum ada materi tersedia saat ini. Silakan kembali lagi nanti untuk melihat konten baru.'}
                  </p>
                  {isAdmin && (
                    <Link
                      href="/admin/courses/create"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                      <Sparkles className="w-5 h-5" />
                      + Tambah Materi Sekarang
                    </Link>
                  )}
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

        {/* Footer */}
        <footer className="bg-gradient-to-br from-cyan-400 via-teal-400 to-cyan-500 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold">Studio Sunday</span>
                </div>
                <div className="space-y-3 text-white/90">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>info@studiosunday.com</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Jl. Contoh No. 123, Jakarta, Indonesia</span>
                  </div>
                </div>
              </div>

              {/* Social Media Column */}
              <div>
                <h3 className="text-xl font-bold mb-4">Media Sosial</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Newsletter Column */}
              <div>
                <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                <p className="text-white/90 mb-4">Dapatkan update terbaru tentang materi dan kursus baru</p>
                <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); }}>
                  <input
                    type="email"
                    placeholder="Email Anda"
                    className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-cyan-300/50 mt-8 pt-8 text-center text-white/80">
              <p>© 2024 Studio Sunday. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}

