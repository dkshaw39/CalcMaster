
import React, { useState } from 'react';
import { Percent, ArrowRight } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Mode 1: What is X% of Y?
  const [val1A, setVal1A] = useState(15);
  const [val1B, setVal1B] = useState(200);
  const res1 = (val1A / 100) * val1B;

  // Mode 2: X is what % of Y?
  const [val2A, setVal2A] = useState(25);
  const [val2B, setVal2B] = useState(100);
  const res2 = val2B === 0 ? 0 : (val2A / val2B) * 100;

  // Mode 3: Percentage Change
  const [val3A, setVal3A] = useState(50);
  const [val3B, setVal3B] = useState(75);
  const res3 = val3A === 0 ? 0 : ((val3B - val3A) / val3A) * 100;
  const isIncrease = res3 > 0;

  const tabs = [
    { label: 'What is X% of Y?' },
    { label: 'X is what % of Y?' },
    { label: '% Change' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
       <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Percentage <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Calculate percentages, increases, and decreases.</p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex gap-1">
          {tabs.map((tab, idx) => (
             <button
               key={idx}
               onClick={() => setActiveTab(idx)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === idx ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
             >
               {tab.label}
             </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
         
         {/* Mode 1 */}
         {activeTab === 0 && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-bold text-slate-700">
               <span>What is</span>
               <div className="relative w-32">
                 <input type="number" value={val1A} onChange={e => setVal1A(Number(e.target.value))} className="w-full p-2 bg-slate-50 border-b-2 border-brand-500 focus:outline-none text-center text-brand-700"/>
                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
               </div>
               <span>of</span>
               <div className="w-32">
                 <input type="number" value={val1B} onChange={e => setVal1B(Number(e.target.value))} className="w-full p-2 bg-slate-50 border-b-2 border-slate-300 focus:border-brand-500 focus:outline-none text-center"/>
               </div>
               <span>?</span>
             </div>

             <div className="mt-12 text-center">
                <div className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-2">Result</div>
                <div className="text-6xl font-extrabold text-brand-600">{parseFloat(res1.toFixed(2))}</div>
             </div>

             {/* Visualization */}
             <div className="mt-12 max-w-lg mx-auto">
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
                   <div style={{ width: `${Math.min(val1A, 100)}%` }} className="h-full bg-brand-500 transition-all duration-500"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-bold uppercase">
                   <span>0</span>
                   <span>{val1B}</span>
                </div>
             </div>
           </div>
         )}

         {/* Mode 2 */}
         {activeTab === 1 && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-bold text-slate-700">
               <div className="w-32">
                 <input type="number" value={val2A} onChange={e => setVal2A(Number(e.target.value))} className="w-full p-2 bg-slate-50 border-b-2 border-brand-500 focus:outline-none text-center text-brand-700"/>
               </div>
               <span>is what % of</span>
               <div className="w-32">
                 <input type="number" value={val2B} onChange={e => setVal2B(Number(e.target.value))} className="w-full p-2 bg-slate-50 border-b-2 border-slate-300 focus:border-brand-500 focus:outline-none text-center"/>
               </div>
               <span>?</span>
             </div>

             <div className="mt-12 text-center">
                <div className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-2">Result</div>
                <div className="text-6xl font-extrabold text-brand-600">{parseFloat(res2.toFixed(2))}%</div>
             </div>
           </div>
         )}

         {/* Mode 3 */}
         {activeTab === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-bold text-slate-700">
               <span>Change from</span>
               <div className="w-32">
                 <input type="number" value={val3A} onChange={e => setVal3A(Number(e.target.value))} className="w-full p-2 bg-slate-50 border-b-2 border-slate-300 focus:border-brand-500 focus:outline-none text-center"/>
               </div>
               <span>to</span>
               <div className="w-32">
                 <input type="number" value={val3B} onChange={e => setVal3B(Number(e.target.value))} className="w-full p-2 bg-slate-50 border-b-2 border-brand-500 focus:outline-none text-center text-brand-700"/>
               </div>
             </div>

             <div className="mt-12 text-center">
                <div className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-2">
                   {res3 === 0 ? 'No Change' : isIncrease ? 'Increase' : 'Decrease'}
                </div>
                <div className={`text-6xl font-extrabold flex items-center justify-center gap-2 ${isIncrease ? 'text-green-500' : res3 < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                   {res3 > 0 && '+'}
                   {parseFloat(res3.toFixed(2))}%
                </div>
                <div className="mt-4 text-slate-500">
                   Difference: {val3B - val3A}
                </div>
             </div>
           </div>
         )}

      </div>
    </div>
  );
};
