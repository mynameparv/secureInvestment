import { useState } from 'react';
import InputForm from './InputForm';
import ProcessSteps from './ProcessSteps';
import OutputDashboard from './OutputDashboard';

export default function GoalPlanner() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);

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
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Smart Planner</h2>
        <p className="text-slate-500 font-medium">Define your goals and generate an action plan.</p>
      </div>
      {step === 1 && <InputForm onSubmit={handleGeneratePlan} />}
      {step === 2 && <ProcessSteps userData={userData} onComplete={handleProcessComplete} />}
      {step === 3 && <OutputDashboard userData={userData} onReset={handleReset} />}
    </div>
  );
}
