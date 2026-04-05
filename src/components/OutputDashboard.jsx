import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  PieChart as PieChartIcon, 
  ShieldCheck, 
  ArrowLeft,
  Clock,
  ArrowUpCircle,
  Target as TargetIcon
} from 'lucide-react';

export default function OutputDashboard({ userData, onReset }) {
  // Re-calculate values
  const r = (userData.riskProfile === 'Low' ? 0.08 : userData.riskProfile === 'Moderate' ? 0.12 : 0.15) / 12;
  const n = userData.timeHorizon * 12;
  let requiredSIP = Math.round((userData.targetAmount * r) / (Math.pow(1 + r, n) - 1));
  if (requiredSIP < 0 || !isFinite(requiredSIP)) requiredSIP = 0;
  
  const savingsCapacity = userData.income - userData.expenses;
  const isAchievable = savingsCapacity >= requiredSIP;
  
  const equityPerc = userData.riskProfile === 'Low' ? 30 : userData.riskProfile === 'Moderate' ? 60 : 80;
  const debtPerc = 100 - equityPerc;

  const equityAmount = Math.round(requiredSIP * (equityPerc / 100));
  const debtAmount = requiredSIP - equityAmount;

  // Fake short-term tracking
  const currentProgressPct = userData.savings > 0 ? Math.min(100, Math.round((userData.savings / userData.targetAmount) * 100)) : 0;
  
  let statusText = "You are on track to achieve your goal.";
  let statusColor = "text-green-600";
  let statusBg = "bg-green-100";
  let progressColor = "bg-green-500";
  
  if (!isAchievable) {
    statusText = "You are currently projecting a shortfall.";
    statusColor = "text-orange-600";
    statusBg = "bg-orange-100";
    progressColor = "bg-orange-500";
  } else if (currentProgressPct < 5 && userData.timeHorizon < 3) {
    statusText = "Slightly behind schedule. Consider increasing SIP.";
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Your Financial Blueprint</h2>
        <p className="text-slate-500 font-medium tracking-wide">Transforms financial goals into a clear, trackable investment journey.</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Investment Summary */}
          <div className="md:col-span-1 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200">
            <h3 className="font-bold text-indigo-100 mb-6 flex items-center gap-2">
              <TrendingUp size={20} />
              Investment Summary
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-indigo-200 text-sm font-medium mb-1">Monthly Investment</p>
                <p className="text-4xl font-extrabold tracking-tight">₹{requiredSIP.toLocaleString('en-IN')}</p>
              </div>
              
              <div className="pt-6 border-t border-indigo-400/30 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/80"></div>
                    <span className="text-indigo-100 text-sm">Equity ({equityPerc}%)</span>
                  </div>
                  <span className="font-bold">₹{equityAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-300"></div>
                    <span className="text-indigo-100 text-sm">Debt ({debtPerc}%)</span>
                  </div>
                  <span className="font-bold">₹{debtAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress & Setup */}
          <div className="md:col-span-2 space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col justify-center text-center">
              <div className={`mx-auto p-3 rounded-2xl w-fit mb-4 ${statusBg} ${statusColor}`}>
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-bold text-slate-800 text-xl mb-2">Goal: {userData.goalName}</h3>
              <p className={`font-semibold mb-6 ${statusColor}`}>{statusText}</p>
              
              <div className="w-full bg-slate-100 rounded-full h-4 mb-2 overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgressPct}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`${progressColor} h-4 rounded-full relative`}
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)' }}></div>
                </motion.div>
              </div>
              <div className="flex justify-between text-sm font-semibold text-slate-500">
                <span>₹{(userData.savings || 0).toLocaleString('en-IN')}</span>
                <span>Target: ₹{userData.targetAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Smart Suggestions */}
      {!isAchievable && (
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">Smart Suggestions to Achieve Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 bg-orange-50/50 rounded-xl border-orange-100 border-dashed">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ArrowUpCircle size={20} />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Increase SIP</h4>
              <p className="text-sm text-slate-500 font-medium">Free up ₹{(requiredSIP - savingsCapacity).toLocaleString('en-IN')} more per month from expenses.</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Clock size={20} />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Extend Timeline</h4>
              <p className="text-sm text-slate-500 font-medium">Delay your goal by adding 3-5 more years.</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-green-200 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <TargetIcon size={20} />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Reduce Target</h4>
              <p className="text-sm text-slate-500 font-medium">Lower your goal amount to match current capacity.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recalculate CTA */}
      <motion.div variants={itemVariants} className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-white hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 shadow-sm"
        >
          <ArrowLeft size={18} />
          Create Another Plan
        </button>
      </motion.div>
    </motion.div>
  );
}
