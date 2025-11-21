import { Head, useForm, Link, router } from '@inertiajs/react';
import Layout from '@/Layout';
import { CreditCard, Upload, AlertCircle, CheckCircle2, Package, ArrowLeft } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail_url?: string;
}

interface Props {
  cart: CartItem[];
  auth?: {
    user?: {
      id: number;
    };
  };
}

export default function Checkout({ cart, auth }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    payment_proof: null as File | null,
  });

  if (!auth?.user) {
    router.visit('/login');
    return null;
  }

  if (cart.length === 0) {
    router.visit('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.payment_proof) {
      alert('Silakan upload bukti pembayaran');
      return;
    }

    post('/orders', {
      forceFormData: true,
      onSuccess: () => {
        router.visit('/orders');
      },
    });
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.toString()), 0);

  return (
    <Layout title="Checkout">
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                <CreditCard className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Checkout</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Informasi Pembayaran</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Upload Bukti Pembayaran
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('payment_proof', e.target.files?.[0] || null)}
                        className="hidden"
                        id="payment_proof"
                        required
                      />
                      <label
                        htmlFor="payment_proof"
                        className="cursor-pointer flex flex-col items-center gap-4"
                      >
                        <Upload className="w-12 h-12 text-gray-400" />
                        <div>
                          <span className="text-teal-600 font-semibold">Klik untuk upload</span> atau drag and drop
                        </div>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                        {data.payment_proof && (
                          <div className="mt-4 flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-semibold">{data.payment_proof.name}</span>
                          </div>
                        )}
                      </label>
                    </div>
                    {errors.payment_proof && (
                      <div className="mt-2 flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{errors.payment_proof}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Kembali ke Keranjang
                    </Link>
                    <button
                      type="submit"
                      disabled={processing}
                      className="ml-auto bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Memproses...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Buat Pesanan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-100 p-6 sticky top-4">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-6 h-6 text-teal-500" />
                  <h2 className="text-2xl font-bold text-blue-900">Ringkasan Pesanan</h2>
                </div>
                <div className="mb-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-700">
                      <span className="text-sm">{item.title}</span>
                      <span className="font-semibold">Rp {item.price.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  <div className="pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between font-bold text-2xl">
                      <span className="text-gray-900">Total</span>
                      <span className="text-orange-600">
                        Rp {total.toLocaleString('id-ID')}
                      </span>
                    </div>
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

