import { Link, usePage } from '@inertiajs/react';
import { BookOpen, LayoutDashboard, Book, ShoppingCart, ClipboardList, LogOut, LogIn, UserPlus, FileText } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface PageProps {
  auth?: {
    user?: User;
  };
}

export default function Navbar() {
  const { auth } = usePage<PageProps>().props;
  const user = auth?.user;

  const handleLogout = () => {
    // Inertia will handle logout via route
    window.location.href = '/logout';
  };

  return (
    <nav className="bg-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            href={user?.role === 'admin' ? '/admin' : '/'}
            className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition-opacity"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
              <BookOpen className="w-6 h-6" />
            </div>
            <span>Sunday Class</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <>
                    <Link href="/admin" className="flex items-center gap-1.5 hover:text-yellow-200 font-semibold transition-colors">
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <Link href="/admin/courses" className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors">
                      <Book className="w-5 h-5" />
                      Materi
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors">
                      <FileText className="w-5 h-5" />
                      Order
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/cart" className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors relative">
                      <ShoppingCart className="w-5 h-5" />
                      Keranjang
                    </Link>
                    <Link href="/enrollments" className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors">
                      <ClipboardList className="w-5 h-5" />
                      Materi Saya
                    </Link>
                  </>
                )}
                <span className="text-yellow-200">
                  {user.role === 'admin' ? '👤 Admin' : `Halo, ${user.name}`}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors">
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

