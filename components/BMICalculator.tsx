import React, { useState } from 'react';

export const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  
  // Imperial specific
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  const calculateBMI = () => {
    let w = parseFloat(weight);
    let h = parseFloat(height);

    if (isNaN(w) || w <= 0) return 0;

    if (unit === 'imperial') {
      const f = parseFloat(feet) || 0;
      const i = parseFloat(inches) || 0;
      const totalInches = (f * 12) + i;
      if (totalInches <= 0) return 0;
      
      // BMI = (weight (lb) / [height (in)]^2) * 703
      return (w / (totalInches * totalInches)) * 703;
    } else {
      // Metric: weight (kg) / [height (m)]^2
      if (isNaN(h) || h <= 0) return 0;
      // If user enters cm, convert to meters
      if (h > 3) h = h / 100; 
      return w / (h * h);
    }
  };

  const bmi = calculateBMI();
  
  const getStatus = (bmi: number) => {
    if (bmi === 0) return { label: 'Enter Details', color: 'text-slate-400', bg: 'bg-slate-100' };
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-100' };
    if (bmi < 25) return { label: 'Normal Weight', color: 'text-green-500', bg: 'bg-green-100' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-100' };
    return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-100' };
  };

  const status = getStatus(bmi);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      <div className="p-1 bg-slate-100 flex">
        <button 
          onClick={() => setUnit('metric')}
          className={`flex-1 py-3 text-sm font-medium rounded-t-lg transition ${unit === 'metric' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Metric (kg/cm)
        </button>
        <button 
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-3 text-sm font-medium rounded-t-lg transition ${unit === 'imperial' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Imperial (lbs/ft)
        </button>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
             {unit === 'metric' ? (
               <>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</label>
                   <input 
                      type="number" 
                      placeholder="e.g. 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
                   <input 
                      type="number" 
                      placeholder="e.g. 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                   />
                 </div>
               </>
             ) : (
               <>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Height</label>
                   <div className="flex gap-2">
                     <input 
                        type="number" 
                        placeholder="ft"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                     />
                     <input 
                        type="number" 
                        placeholder="in"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                     />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Weight (lbs)</label>
                   <input 
                      type="number" 
                      placeholder="e.g. 160"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                   />
                 </div>
               </>
             )}
          </div>

          <div className={`rounded-xl p-6 text-center transition-colors ${status.bg}`}>
            <p className="text-slate-600 font-medium mb-1">Your BMI is</p>
            <div className={`text-5xl font-bold mb-2 ${status.color}`}>
              {bmi > 0 ? bmi.toFixed(1) : '--'}
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide bg-white/50 ${status.color}`}>
              {status.label}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
           <h4 className="font-semibold text-slate-800 mb-3">BMI Categories</h4>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
              <div className="p-2 bg-slate-50 rounded text-slate-600">Underweight &lt; 18.5</div>
              <div className="p-2 bg-green-50 rounded text-green-700 font-medium">Normal 18.5 - 24.9</div>
              <div className="p-2 bg-orange-50 rounded text-orange-700">Overweight 25 - 29.9</div>
              <div className="p-2 bg-red-50 rounded text-red-700">Obese &ge; 30</div>
           </div>
        </div>
      </div>
    </div>
  );
};