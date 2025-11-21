import { Link, usePage } from '@inertiajs/react';
import { Users, CheckCircle2, Star } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url?: string;
  enrollment_count?: number;
}

interface CourseCardProps {
  course: Course;
}

interface PageProps {
  auth?: {
    user?: {
      role: string;
    };
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const { auth } = usePage<PageProps>().props;
  const isAdmin = auth?.user?.role === 'admin';
  const href = isAdmin ? `/admin/courses/${course.id}` : `/courses/${course.id}`;

  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-300 h-full flex flex-col transform hover:-translate-y-1">
        {course.thumbnail_url && (
          <div className="relative w-full h-48 bg-blue-100 overflow-hidden">
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-red-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Kursus
              </span>
            </div>
            <img
              src={course.thumbnail_url.startsWith('http') ? course.thumbnail_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${course.thumbnail_url}`}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
              {course.title}
            </h3>
            <p className="text-gray-600 line-clamp-2 text-sm flex-1">{course.description}</p>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                {course.enrollment_count !== undefined && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="font-medium">{course.enrollment_count} Siswa</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Terverifikasi</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-red-500">
                Rp {course.price.toLocaleString('id-ID')}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold text-gray-700">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

