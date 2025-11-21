import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layout';
import { FileText, CheckCircle2, Clock } from 'lucide-react';

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  items?: Array<{
    course_title: string;
  }>;
}

interface Props {
  orders: Order[];
  auth?: {
    user?: {
      id: number;
    };
  };
}

export default function Orders({ orders, auth }: Props) {
  if (!auth?.user) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4" />
            Menunggu Konfirmasi
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
            <CheckCircle2 className="w-4 h-4" />
            Dikonfirmasi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <Layout title="Pesanan Saya">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Pesanan Saya</h1>
                <p className="text-white/90 text-lg mt-2">{orders.length} total pesanan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border-4 border-teal-200 p-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-teal-100 rounded-full mb-6">
                <FileText className="w-12 h-12 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Belum Ada Pesanan</h3>
              <p className="text-gray-600 text-lg mb-8">Belum ada pesanan yang dibuat</p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Jelajahi Materi
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Pesanan #{order.id}</h3>
                      <p className="text-gray-600 text-sm">
                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  {order.items && order.items.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Materi:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        {order.items.map((item, index) => (
                          <li key={index}>{item.course_title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-gray-700 font-semibold">Total</span>
                    <span className="text-2xl font-bold text-orange-600">
                      Rp {order.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

