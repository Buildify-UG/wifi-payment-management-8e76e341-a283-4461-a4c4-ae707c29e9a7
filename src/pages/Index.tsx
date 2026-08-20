import { useState } from 'react';
import { Wifi, Check, Clock, Calendar, AlertCircle } from 'lucide-react';

export default function TalibNet() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const packages = [
    {
      id: 'hours-12',
      name: '12 Hours',
      price: 500,
      duration: '12 hours',
      icon: Clock,
    },
    {
      id: 'day-1',
      name: '1 Day',
      price: 1000,
      duration: '24 hours',
      icon: Calendar,
    },
    {
      id: 'week-1',
      name: '1 Week',
      price: 5000,
      duration: '7 days',
      icon: Calendar,
    },
  ];

  const handlePayment = (packageId: string) => {
    setSelectedPackage(packageId);
    setPaymentStatus('processing');

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        setPaymentStatus('idle');
        setSelectedPackage(null);
      }, 3000);
    }, 2000);
  };

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
        <div className="relative px-6 py-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-full flex items-center justify-center">
                <Wifi className="w-16 h-16 text-cyan-400" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">TalibNet</h1>
          <p className="text-cyan-400 text-lg font-semibold">WI-FI</p>
          <p className="text-slate-300 mt-4 text-sm">Fast, Reliable WiFi Access</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-cyan-400 font-bold text-lg">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Choose Plan</h3>
              <p className="text-slate-300 text-sm">Select your WiFi package below</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-cyan-400 font-bold text-lg">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Pay via Phone</h3>
              <p className="text-slate-300 text-sm">Send payment to +255679545834</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-cyan-400 font-bold text-lg">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Get Access</h3>
              <p className="text-slate-300 text-sm">Connect instantly & enjoy WiFi</p>
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              const isSelected = selectedPackage === pkg.id;

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-cyan-400 bg-slate-800/80 shadow-lg shadow-cyan-400/20'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  } backdrop-blur p-8 cursor-pointer`}
                  onClick={() => !paymentStatus && handlePayment(pkg.id)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <Icon className="w-8 h-8 text-cyan-400" />
                    {isSelected && paymentStatus === 'success' && (
                      <Check className="w-6 h-6 text-green-400" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{pkg.duration}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-cyan-400">{pkg.price}</span>
                    <span className="text-slate-400 ml-2">TSH</span>
                  </div>

                  <button
                    onClick={() => !paymentStatus && handlePayment(pkg.id)}
                    disabled={paymentStatus !== 'idle'}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    } disabled:opacity-50`}
                  >
                    {paymentStatus === 'processing' && isSelected
                      ? 'Processing...'
                      : paymentStatus === 'success' && isSelected
                      ? 'Connected!'
                      : 'Get Access'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-3">Payment Details</h3>
              <div className="space-y-2 text-slate-300 text-sm">
                <p>
                  <span className="text-cyan-400 font-semibold">Recipient:</span> TALIB HAMAD MAKAME
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Phone:</span> +255679545834
                </p>
                <p className="text-xs text-slate-400 mt-4">
                  After payment, your WiFi access will be activated immediately. Your connection will automatically expire when your plan duration ends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {paymentStatus === 'success' && selectedPkg && (
          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-green-500/90 text-white rounded-lg p-6 shadow-2xl pointer-events-auto text-center max-w-sm">
              <Check className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Welcome to TalibNet!</h3>
              <p className="text-sm">Your {selectedPkg.name} plan is now active. Enjoy fast WiFi!</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 mt-16 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>TalibNet WiFi © 2024 | Fast, Reliable Internet Access</p>
        </div>
      </div>
    </div>
  );
}
