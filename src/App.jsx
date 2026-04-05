import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, LayoutDashboard, Target, Bot, User } from 'lucide-react';

import Portfolio from './components/Portfolio';
import GoalPlanner from './components/GoalPlanner';
import AIAdvisor from './components/AIAdvisor';
import Profile from './components/Profile';

function App() {
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [activeTab, setActiveTab] = useState('portfolio');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashActive(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'portfolio': return <Portfolio />;
      case 'goal': return <GoalPlanner />;
      case 'advisor': return <AIAdvisor />;
      case 'profile': return <Profile />;
      default: return <Portfolio />;
    }
  };

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: LayoutDashboard },
    { id: 'goal', label: 'Goal', icon: Target },
    { id: 'advisor', label: 'AI Advisor', icon: Bot },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      <AnimatePresence>
        {isSplashActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%', transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                scale: { type: "spring", damping: 12, stiffness: 100 }
              }}
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md shadow-2xl border border-white/20">
                <ShieldCheck size={72} className="text-white" />
              </div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight"
              >
                SecureInvestment
              </motion.h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
                className="h-1 bg-white/30 rounded-full mt-2"
              >
                <div className="h-full bg-white rounded-full w-2/3"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen pb-24 md:pb-8 font-sans relative overflow-x-hidden text-slate-800 flex flex-col">
        {/* Background decorations */}
        <div className="fixed top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl -z-10"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-blue-200/40 blur-3xl -z-10"></div>

        <header className="max-w-5xl mx-auto w-full pt-8 px-4 md:px-8 mb-6 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl shadow-lg shadow-indigo-200/50">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
              SecureInvestment
            </h1>
          </div>
        </header>
        
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 backdrop-blur-sm relative z-0 mt-4 h-full">
          {renderTabContent()}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200 p-4 md:p-6 z-40 rounded-t-3xl shadow-[0_-10px_40px_rgb(0,0,0,0.05)] md:sticky md:mt-12 md:max-w-md md:mx-auto md:rounded-3xl md:bottom-6 md:border md:shadow-xl">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 relative ${
                    isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <tab.icon size={24} className={isActive ? 'relative z-10' : ''} />
                  <span className={`text-xs font-bold ${isActive ? 'opacity-100' : 'opacity-0 h-0'} transition-all`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-indigo-50 rounded-xl -z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
