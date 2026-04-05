import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Target, Activity, ArrowRight, Loader2, Info } from 'lucide-react';

export default function InputForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    income: '',
    expenses: '',
    savings: '',
    goalName: '',
    targetAmount: '',
    timeHorizon: 5,
    riskProfile: 'Moderate'
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleRiskChange = (profile) => {
    setFormData(prev => ({ ...prev, riskProfile: profile }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const income = Number(formData.income);
    const expenses = Number(formData.expenses);
    
    if (expenses > income) {
      setError('Monthly expenses cannot exceed monthly income.');
      return;
    }
    
    if (!formData.goalName || !formData.targetAmount || !formData.income || !formData.expenses) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    // Simulate API/processing delay
    setTimeout(() => {
      setIsLoading(false);
      onSubmit({
        ...formData,
        income: Number(formData.income),
        expenses: Number(formData.expenses),
        savings: Number(formData.savings || 0),
        targetAmount: Number(formData.targetAmount),
        timeHorizon: Number(formData.timeHorizon)
      });
    }, 1500);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50"
    >
      <div className="flex items-start gap-3 mb-8 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
        <Info className="text-blue-500 mt-0.5 shrink-0" size={20} />
        <div>
          <h3 className="font-semibold text-blue-900">Welcome to Smart Planning</h3>
          <p className="text-blue-700/80 text-sm mt-1">Accurate inputs ensure personalized financial planning. We use this to calculate the perfect SIP and strategy for you.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section 1: Financial Profile */}
        <section>
          <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
            <Wallet className="text-indigo-500" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Financial Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Monthly Income (₹)</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
                placeholder="e.g. 100000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Monthly Expenses (₹)</label>
              <input
                type="number"
                name="expenses"
                value={formData.expenses}
                onChange={handleChange}
                placeholder="e.g. 60000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Current Savings (₹)</label>
              <input
                type="number"
                name="savings"
                value={formData.savings}
                onChange={handleChange}
                placeholder="e.g. 500000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Goal Definition */}
        <section>
          <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
            <Target className="text-green-500" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Goal Definition</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Goal Name</label>
              <input
                type="text"
                name="goalName"
                value={formData.goalName}
                onChange={handleChange}
                placeholder="e.g. House Downpayment"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Target Amount (₹)</label>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="e.g. 5000000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Time Horizon: {formData.timeHorizon} Years</label>
              <input
                type="range"
                name="timeHorizon"
                min="1"
                max="30"
                value={formData.timeHorizon}
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500 mt-4"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Risk Profile */}
        <section>
          <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
            <Activity className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Risk Profile</h2>
          </div>
          
          <div className="flex gap-4">
            {['Low', 'Moderate', 'High'].map((profile) => (
              <button
                key={profile}
                type="button"
                onClick={() => handleRiskChange(profile)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  formData.riskProfile === profile
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 border-transparent'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {profile}
              </button>
            ))}
          </div>
        </section>

        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {error}
          </motion.div>
        )}

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 overflow-hidden disabled:opacity-80"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                Generate Plan
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
            {!isLoading && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
