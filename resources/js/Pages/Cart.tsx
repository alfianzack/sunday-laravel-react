import { Head, Link, router, useForm } from '@inertiajs/react';
import Layout from '@/Layout';
import { ShoppingCart, Trash2, ArrowRight, Package } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url?: string;
}

interface Props {
  cart: CartItem[];
  auth?: {
    user?: {
      id: number;
      name: string;
    };
  };
}

export default function Cart({ cart, auth }: Props) {
  const { delete: removeItem } = useForm({});

  const handleRemove = (courseId: number) => {
    if (!confirm('Hapus materi ini dari keranjang?')) {
      return;
    }
    router.delete(`/cart/${courseId}`, {
      preserveScroll: true,
    });
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.toString()), 0);

  if (!auth?.user) {
    router.visit('/login');
    return null;
  }

  if (cart.length === 0) {
    return (
      <Layout title="Cart">
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-teal-500 text-white py-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">Keranjang</h1>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-lg border-4 border-teal-200 p-16 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-teal-100 rounded-full mb-6">
                <ShoppingCart className="w-12 h-12 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Keranjang Anda Kosong</h3>
              <p className="text-gray-600 text-xl mb-8">Mulai jelajahi dan tambahkan materi ke keranjang</p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <ArrowRight className="w-5 h-5" />
                Jelajahi Materi
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Cart">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-teal-500 text-white py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">Keranjang</h1>
                  <p className="text-white/90 text-lg">{cart.length} item dalam keranjang</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 flex gap-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
                    {item.thumbnail_url && (
                      <div className="relative w-40 h-28 bg-gradient-to-br from-teal-100 to-orange-100 rounded-xl overflow-hidden flex-shrink-0 border-2 border-teal-200">
                        <img
                          src={item.thumbnail_url.startsWith('http') ? item.thumbnail_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.thumbnail_url}`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/courses/${item.id}`}>
                          <h3 className="text-xl font-bold hover:text-teal-600 transition-colors mb-2 text-gray-900">{item.title}</h3>
                        </Link>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description}</p>
                        <p className="text-2xl font-bold text-orange-600">
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-xl transition-all self-start border-2 border-red-200 hover:border-red-300"
                      title="Hapus dari keranjang"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-100 p-6 sticky top-4">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-6 h-6 text-teal-500" />
                  <h2 className="text-2xl font-bold text-blue-900">Ringkasan</h2>
                </div>
                <div className="mb-6 space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cart.length} item)</span>
                    <span className="font-semibold">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between font-bold text-2xl">
                      <span className="text-gray-900">Total</span>
                      <span className="text-orange-600">
                        Rp {total.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan ke Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

