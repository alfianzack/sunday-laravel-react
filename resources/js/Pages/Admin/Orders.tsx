import { Head, router } from '@inertiajs/react';
import Layout from '@/Layout';
import { FileText, CheckCircle2, Clock } from 'lucide-react';

interface Order {
  id: number;
  user_name: string;
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
      role: string;
    };
  };
}

export default function AdminOrders({ orders, auth }: Props) {
  const handleConfirm = (orderId: number) => {
    if (confirm('Konfirmasi pembayaran untuk pesanan ini?')) {
      router.patch(`/admin/orders/${orderId}/confirm`);
    }
  };

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
    <Layout title="Admin - Pesanan">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Kelola Pesanan</h1>
            <p className="text-lg text-gray-600">Konfirmasi dan kelola pesanan pengguna</p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border-4 border-teal-200 p-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-teal-100 rounded-full mb-6">
                <FileText className="w-12 h-12 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Belum Ada Pesanan</h3>
              <p className="text-gray-600 text-lg">Belum ada pesanan yang perlu dikonfirmasi</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Pesanan #{order.id}</h3>
                      <p className="text-gray-600 text-sm mb-1">Oleh: {order.user_name}</p>
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
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-orange-600">
                        Rp {order.total.toLocaleString('id-ID')}
                      </span>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleConfirm(order.id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                        >
                          Konfirmasi
                        </button>
                      )}
                    </div>
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

