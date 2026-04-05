import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './components/InputForm';
import ProcessSteps from './components/ProcessSteps';
import OutputDashboard from './components/OutputDashboard';
import { ShieldCheck } from 'lucide-react';

function App() {
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashActive(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleGeneratePlan = (data) => {
    setUserData(data);
    setStep(2);
  };

  const handleProcessComplete = () => {
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setUserData(null);
  };

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

      <div className="min-h-screen p-4 md:p-8 font-sans relative overflow-hidden text-slate-800">
        {/* Background decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-blue-200/40 blur-3xl -z-10"></div>

        <header className="max-w-5xl mx-auto mb-10 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl shadow-lg shadow-indigo-200/50">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
              SecureInvestment
            </h1>
            <p className="text-slate-500 font-medium mt-1">Transform your financial goals into reality</p>
          </div>
        </header>
        
        <main className="max-w-5xl mx-auto backdrop-blur-sm">
          {step === 1 && <InputForm onSubmit={handleGeneratePlan} />}
          {step === 2 && <ProcessSteps userData={userData} onComplete={handleProcessComplete} />}
          {step === 3 && <OutputDashboard userData={userData} onReset={handleReset} />}
        </main>
      </div>
    </>
  );
}

export default App;
