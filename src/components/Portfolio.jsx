import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function Portfolio() {
  const portfolioData = [
    { name: 'Equity Funds', value: 450000, color: '#4f46e5' },
    { name: 'Fixed Deposits', value: 200000, color: '#10b981' },
    { name: 'Gold', value: 100000, color: '#f59e0b' },
    { name: 'Crypto', value: 50000, color: '#8b5cf6' }
  ];

  const totalValue = portfolioData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Portfolio Dashboard</h2>
        <p className="text-slate-500 font-medium">Overview of your current assets and investments.</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-xl">
              <Wallet size={24} />
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
              <TrendingUp size={16} /> +12.5%
            </div>
          </div>
          <p className="text-indigo-100 font-medium mb-1">Total Net Worth</p>
          <h3 className="text-4xl font-extrabold tracking-tight">₹{totalValue.toLocaleString('en-IN')}</h3>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-xl">
                <Activity size={24} />
              </div>
              <p className="font-bold text-slate-800 tracking-wide">Monthly Returns</p>
            </div>
            <span className="text-green-600 font-bold flex items-center">
              +₹14,500 <ArrowUpRight size={18} />
            </span>
          </div>
          <div className="mt-6 flex gap-4">
            <div className="flex-1 bg-slate-50 rounded-2xl p-4">
              <p className="text-slate-500 text-sm font-medium mb-1">Invested</p>
              <p className="font-bold text-slate-800">₹7,20,000</p>
            </div>
            <div className="flex-1 bg-slate-50 rounded-2xl p-4">
              <p className="text-slate-500 text-sm font-medium mb-1">Gains</p>
              <p className="font-bold text-green-600">+₹80,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Asset Allocation</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="h-48 w-48 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1000}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            {portfolioData.map((asset) => (
              <div key={asset.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{asset.name}</p>
                  <p className="text-sm font-medium text-slate-500">
                    {Math.round((asset.value / totalValue) * 100)}% (₹{(asset.value / 1000).toFixed(0)}k)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
