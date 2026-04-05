import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';

export default function Profile() {
  const menuItems = [
    { icon: Settings, label: 'Account Settings', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Bell, label: 'Notifications', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Shield, label: 'Privacy & Security', color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Your Profile</h2>
        <p className="text-slate-500 font-medium">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-inner">
          <User size={48} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">John Doe</h3>
        <p className="text-slate-500 font-medium mb-6">john.doe@example.com</p>
        
        <div className="flex gap-4 w-full">
          <div className="flex-1 bg-slate-50 rounded-2xl p-4 text-center">
            <p className="text-slate-500 text-sm font-semibold">Risk Profile</p>
            <p className="font-bold text-slate-800 tracking-wide text-lg">Moderate</p>
          </div>
          <div className="flex-1 bg-slate-50 rounded-2xl p-4 text-center">
            <p className="text-slate-500 text-sm font-semibold">KYC Status</p>
            <p className="font-bold text-green-600 tracking-wide text-lg flex items-center justify-center gap-1">
              Verified
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
        {menuItems.map((item, idx) => (
          <div 
            key={item.label}
            className={`flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer ${
              idx !== menuItems.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon size={20} />
              </div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </div>
        ))}
      </div>

      <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 rounded-3xl p-5 flex items-center justify-center gap-2 font-bold transition-colors">
        <LogOut size={20} />
        Sign Out
      </button>

    </motion.div>
  );
}
