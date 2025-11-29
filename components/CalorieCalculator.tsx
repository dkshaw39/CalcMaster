import React, { useState } from 'react';
import { Button } from './Button';

export const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1.2);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    
    setResult(Math.round(bmr * activity));
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <h2 className="text-xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
           <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
           Enter Your Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <div className="flex gap-2">
                {['male', 'female'].map(g => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2 px-4 rounded-lg capitalize text-sm font-medium transition ${gender === g ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age (15-80)</label>
              <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"/>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">Activity Level</label>
             <div className="space-y-2">
               {[
                 { val: 1.2, label: 'Sedentary', desc: 'Little or no exercise' },
                 { val: 1.375, label: 'Light', desc: 'Exercise 1-3 times/week' },
                 { val: 1.55, label: 'Moderate', desc: 'Exercise 4-5 times/week' },
                 { val: 1.725, label: 'Active', desc: 'Daily exercise or intense exercise 3-4 times/week' },
                 { val: 1.9, label: 'Very Active', desc: 'Intense exercise 6-7 times/week' },
               ].map((opt) => (
                 <button
                    key={opt.val}
                    onClick={() => setActivity(opt.val)}
                    className={`w-full text-left p-3 rounded-lg border transition ${activity === opt.val ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                 >
                   <div className={`text-sm font-semibold ${activity === opt.val ? 'text-brand-700' : 'text-slate-700'}`}>{opt.label}</div>
                   <div className="text-xs text-slate-500">{opt.desc}</div>
                 </button>
               ))}
             </div>
          </div>
        </div>

        <div className="mt-8">
           <Button onClick={calculate} className="w-full md:w-auto px-8 py-3 text-lg bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg shadow-brand-200">
             Calculate Calories
           </Button>
        </div>
      </div>

      <div className="md:col-span-1 space-y-4">
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
           </div>
           <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">Maintenance Calories</h3>
           <div className="text-5xl font-bold mb-1">{result ? result.toLocaleString() : '--'}</div>
           <div className="text-slate-400 text-sm">Calories / day</div>
        </div>

        {result && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-4">Weight Goals</h4>
            <div className="space-y-4">
               <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-sm font-medium text-green-800">Mild Weight Loss</span>
                  <span className="font-bold text-green-700">{Math.round(result * 0.9)}</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <span className="text-sm font-medium text-yellow-800">Weight Loss</span>
                  <span className="font-bold text-yellow-700">{Math.round(result * 0.8)}</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-sm font-medium text-red-800">Extreme Loss</span>
                  <span className="font-bold text-red-700">{Math.round(result * 0.61)}</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-sm font-medium text-blue-800">Mild Weight Gain</span>
                  <span className="font-bold text-blue-700">{Math.round(result * 1.1)}</span>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};