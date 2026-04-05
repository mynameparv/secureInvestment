import { motion } from 'framer-motion';
import { Bot, Sparkles, Send, ArrowRight } from 'lucide-react';

export default function AIAdvisor() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            AI Financial Advisor <Sparkles className="text-indigo-500" size={20} />
          </h2>
          <p className="text-slate-500 font-medium">Get personalized insights and action plans instantly.</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 shadow-sm hidden md:block">
          <Bot size={28} />
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col overflow-hidden relative">
        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shrink-0">
              <Bot size={20} />
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 rounded-tl-sm max-w-[85%] shadow-sm">
              <p className="text-slate-700 font-medium leading-relaxed mb-3">
                Hello! I noticed your Equity Funds have grown by 12% this month. Based on your risk profile, I suggest rebalancing your portfolio.
              </p>
              <div className="bg-white rounded-xl p-3 border border-indigo-100 hover:border-indigo-300 transition-colors cursor-pointer group flex items-center justify-between shadow-sm">
                <div>
                  <span className="font-bold text-indigo-600 text-sm block">Recommended Action</span>
                  <span className="text-slate-600 text-sm font-semibold">Move ₹20,000 to Debt Funds</span>
                </div>
                <ArrowRight size={18} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0 font-bold">
              U
            </div>
            <div className="bg-blue-600 text-white rounded-2xl p-4 rounded-tr-sm max-w-[85%] shadow-md shadow-blue-200">
              <p className="font-medium">How will this affect my House Downpayment goal?</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shrink-0">
              <Bot size={20} />
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 rounded-tl-sm max-w-[85%] shadow-sm">
              <p className="text-slate-700 font-medium leading-relaxed">
                It will slightly lower your immediate risk exposure without delaying your 5-year goal. You are currently on track to reach your ₹50L target 2 months early!
              </p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-white m-2 rounded-2xl">
          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <input 
              type="text" 
              placeholder="Ask me about your investments..." 
              className="flex-1 bg-transparent px-3 py-2 outline-none text-slate-700 font-medium"
            />
            <button className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
