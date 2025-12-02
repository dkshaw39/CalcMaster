
import React, { useState } from 'react';
import { Activity, Ruler } from 'lucide-react';

export const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [neck, setNeck] = useState(35); // cm
  const [waist, setWaist] = useState(80); // cm
  const [hip, setHip] = useState(95); // cm (female only)
  
  const calculate = () => {
    // US Navy Method
    // Male: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    // Female: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    
    // Note: Formulas usually use cm inputs.
    let bf = 0;
    
    if (gender === 'male') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
    
    return Math.max(2, Math.min(bf, 60)); // Clamp reasonable range
  };

  const bodyFat = calculate();
  const fatMass = weight * (bodyFat / 100);
  const leanMass = weight - fatMass;

  const getCategory = (bf: number, g: string) => {
     if (g === 'male') {
         if (bf < 6) return { label: 'Essential Fat', color: 'text-blue-600', bg: 'bg-blue-50' };
         if (bf < 14) return { label: 'Athletes', color: 'text-green-600', bg: 'bg-green-50' };
         if (bf < 18) return { label: 'Fitness', color: 'text-green-500', bg: 'bg-green-50' };
         if (bf < 25) return { label: 'Average', color: 'text-amber-600', bg: 'bg-amber-50' };
         return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-50' };
     } else {
         if (bf < 14) return { label: 'Essential Fat', color: 'text-blue-600', bg: 'bg-blue-50' };
         if (bf < 21) return { label: 'Athletes', color: 'text-green-600', bg: 'bg-green-50' };
         if (bf < 25) return { label: 'Fitness', color: 'text-green-500', bg: 'bg-green-50' };
         if (bf < 32) return { label: 'Average', color: 'text-amber-600', bg: 'bg-amber-50' };
         return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-50' };
     }
  };

  const category = getCategory(bodyFat, gender);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Body Fat <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Estimate body fat percentage using the Navy Method.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
             <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
               <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-md font-bold transition ${gender === 'male' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Male</button>
               <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-md font-bold transition ${gender === 'female' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Female</button>
             </div>

             <div className="space-y-5">
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
                
                <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Ruler size={16}/> Body Measurements (cm)
                    </h3>
                    <div className="space-y-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Neck</label>
                           <input type="number" value={neck} onChange={e => setNeck(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Waist (at navel)</label>
                           <input type="number" value={waist} onChange={e => setWaist(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                        </div>
                        {gender === 'female' && (
                            <div>
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hip (at widest)</label>
                               <input type="number" value={hip} onChange={e => setHip(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                            </div>
                        )}
                    </div>
                </div>
             </div>
         </div>

         <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                   <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Estimated Body Fat</div>
                   <div className="text-5xl font-bold tracking-tight mb-4">{bodyFat.toFixed(1)}<span className="text-2xl text-slate-400">%</span></div>
                   <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${category.bg} ${category.color}`}>
                      {category.label}
                   </div>
                </div>
                <div className="absolute right-0 bottom-0 p-6 opacity-10">
                   <Activity size={100} />
                </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-6">Body Composition</h3>
               <div className="space-y-4">
                  <div>
                     <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-slate-600">Fat Mass</span>
                        <span className="text-slate-900">{fatMass.toFixed(1)} kg</span>
                     </div>
                     <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div style={{ width: `${bodyFat}%` }} className="h-full bg-amber-500"></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-slate-600">Lean Mass</span>
                        <span className="text-slate-900">{leanMass.toFixed(1)} kg</span>
                     </div>
                     <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div style={{ width: `${100 - bodyFat}%` }} className="h-full bg-brand-600"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
