
import React, { useState } from 'react';
import { Flame, Activity } from 'lucide-react';

export const BMRCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(175); // cm
  const [weight, setWeight] = useState(70); // kg
  const [formula, setFormula] = useState('mifflin');

  const calculateBMR = () => {
    let bmr = 0;
    if (formula === 'mifflin') {
       // Mifflin-St Jeor
       bmr = (10 * weight) + (6.25 * height) - (5 * age);
       bmr += gender === 'male' ? 5 : -161;
    } else {
       // Harris-Benedict (Revised)
       if (gender === 'male') {
          bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
       } else {
          bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
       }
    }
    return Math.round(bmr);
  };

  const bmr = calculateBMR();
  
  const multipliers = [
     { label: 'Sedentary', factor: 1.2, desc: 'Little or no exercise' },
     { label: 'Lightly Active', factor: 1.375, desc: 'Exercise 1-3 days/week' },
     { label: 'Moderately Active', factor: 1.55, desc: 'Exercise 3-5 days/week' },
     { label: 'Very Active', factor: 1.725, desc: 'Hard exercise 6-7 days/week' },
     { label: 'Extra Active', factor: 1.9, desc: 'Very hard exercise & physical job' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">BMR <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Calculate your daily calorie needs.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
               <Activity className="text-brand-600"/> Your Details
            </h2>

            <div className="space-y-5">
               <div className="flex bg-slate-100 p-1 rounded-lg">
                 <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-md font-bold transition ${gender === 'male' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Male</button>
                 <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-md font-bold transition ${gender === 'female' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Female</button>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Age</label>
                    <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Weight (kg)</label>
                    <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                  </div>
               </div>
               
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Height (cm)</label>
                  <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Equation</label>
                  <select value={formula} onChange={e => setFormula(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700">
                     <option value="mifflin">Mifflin-St Jeor (Recommended)</option>
                     <option value="harris">Harris-Benedict</option>
                  </select>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl flex items-center justify-between">
               <div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Your BMR</div>
                  <div className="text-5xl font-bold tracking-tight">{bmr.toLocaleString()}</div>
                  <div className="text-sm text-slate-400 mt-1">Calories / day at rest</div>
               </div>
               <div className="p-4 bg-slate-800 rounded-full">
                  <Flame size={40} className="text-orange-500"/>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
               <div className="p-4 bg-slate-50 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Daily Calorie Needs (TDEE)</h3>
               </div>
               <div className="divide-y divide-slate-50">
                  {multipliers.map((m) => (
                     <div key={m.label} className="p-4 flex justify-between items-center hover:bg-slate-50 transition">
                        <div>
                           <div className="font-bold text-slate-700 text-sm">{m.label}</div>
                           <div className="text-xs text-slate-400">{m.desc}</div>
                        </div>
                        <div className="font-mono font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-lg">
                           {Math.round(bmr * m.factor).toLocaleString()}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
