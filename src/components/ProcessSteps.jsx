import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, CheckCircle2, AlertCircle, PieChart as PieChartIcon, ArrowRight } from 'lucide-react';

// Animated Counter component
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>₹{count.toLocaleString('en-IN')}</span>;
};

export default function ProcessSteps({ userData, onComplete }) {
  const [activeStep, setActiveStep] = useState(1);

  // Calculate dummy logic
  const r = (userData.riskProfile === 'Low' ? 0.08 : userData.riskProfile === 'Moderate' ? 0.12 : 0.15) / 12;
  const n = userData.timeHorizon * 12;
  // SIP PMT formula
  let requiredSIP = Math.round((userData.targetAmount * r) / (Math.pow(1 + r, n) - 1));
  if (requiredSIP < 0 || !isFinite(requiredSIP)) requiredSIP = 0; // fallback
  
  const savingsCapacity = userData.income - userData.expenses;
  const isAchievable = savingsCapacity >= requiredSIP;
  const equityPerc = userData.riskProfile === 'Low' ? 30 : userData.riskProfile === 'Moderate' ? 60 : 80;
  const debtPerc = 100 - equityPerc;

  const pieData = [
    { name: 'Equity', value: equityPerc, color: '#4f46e5' }, // Indigo-600
    { name: 'Debt', value: debtPerc, color: '#10b981' }      // Green-500
  ];

  // Auto-advance steps
  useEffect(() => {
    if (activeStep < 4) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 2500); // 2.5s per step
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 text-center">
        <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          Smart Processing Engine
        </h2>
        <p className="text-slate-500 mt-2 font-medium">The system ensures goals are realistic, achievable, and optimized.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: SIP Calculation */}
        <AnimatePresence>
          {activeStep >= 1 && (
            <motion.div
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-indigo-50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Calculator size={100} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                  <Calculator size={24} />
                </div>
                <h3 className="font-bold text-slate-800">Step 1: Required SIP</h3>
              </div>
              <div className="mt-6">
                <p className="text-sm text-slate-500 font-medium mb-1">Monthly Investment</p>
                <div className="text-3xl font-extrabold text-indigo-600">
                  <AnimatedCounter value={requiredSIP} />
                  <span className="text-lg text-slate-400 font-semibold">/mo</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Feasibility Check */}
        <AnimatePresence>
          {activeStep >= 2 && (
            <motion.div
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-green-50 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${isAchievable ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {isAchievable ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                </div>
                <h3 className="font-bold text-slate-800">Step 2: Feasibility</h3>
              </div>
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Capacity</span>
                  <span className="font-bold text-slate-800">₹{savingsCapacity.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Required</span>
                  <span className="font-bold text-indigo-600">₹{requiredSIP.toLocaleString('en-IN')}</span>
                </div>
                <div className={`font-semibold text-sm ${isAchievable ? 'text-green-600' : 'text-orange-600'} flex items-center gap-1.5`}>
                  {isAchievable ? (
                    <><CheckCircle2 size={16} /> Goal is achievable</>
                  ) : (
                    <><AlertCircle size={16} /> Shortfall detected</>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Asset Allocation */}
        <AnimatePresence>
          {activeStep >= 3 && (
            <motion.div
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-blue-50 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                  <PieChartIcon size={24} />
                </div>
                <h3 className="font-bold text-slate-800">Step 3: Allocation</h3>
              </div>
              <div className="h-40 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={1500}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none mt-2">
                  <span className="text-xs text-slate-400 font-medium">{userData.riskProfile}</span>
                  <span className="text-xs text-slate-400 font-medium">Risk</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {activeStep >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => onComplete()}
            className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200"
          >
            View Dashboard
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
