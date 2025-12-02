
import React, { useState } from 'react';
import { Shuffle, List, ArrowDownUp } from 'lucide-react';
import { Button } from './Button';

export const RandomNumberGenerator: React.FC = () => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [count, setCount] = useState(1);
    const [allowDuplicates, setAllowDuplicates] = useState(true);
    const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none');
    
    const [results, setResults] = useState<number[]>([]);

    const generate = () => {
        let nums: number[] = [];
        const range = max - min + 1;
        
        if (!allowDuplicates && count > range) {
           alert("Range is too small for unique numbers.");
           return;
        }

        if (allowDuplicates) {
           for(let i=0; i<count; i++) {
              nums.push(Math.floor(Math.random() * range) + min);
           }
        } else {
           const set = new Set<number>();
           while(set.size < count) {
              set.add(Math.floor(Math.random() * range) + min);
           }
           nums = Array.from(set);
        }

        if (sort === 'asc') nums.sort((a,b) => a - b);
        if (sort === 'desc') nums.sort((a,b) => b - a);

        setResults(nums);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
            <header className="text-center mb-6 pt-4">
               <h1 className="text-2xl font-bold text-slate-900">Random <span className="text-brand-600">Generator</span></h1>
               <p className="text-sm text-slate-500 mt-1">Generate single numbers or sequences.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
               <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-5">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Min</label>
                           <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-center"/>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Max</label>
                           <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-center"/>
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Quantity</label>
                        <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(1000, Number(e.target.value))))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-center"/>
                     </div>
                     <div className="flex gap-4 items-center">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                           <input type="checkbox" checked={allowDuplicates} onChange={e => setAllowDuplicates(e.target.checked)} className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500"/>
                           <span className="text-sm font-medium text-slate-700">Allow Duplicates</span>
                        </label>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sort Order</label>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                           {['none', 'asc', 'desc'].map(s => (
                              <button 
                                key={s} 
                                onClick={() => setSort(s as any)}
                                className={`flex-1 py-1.5 rounded text-sm font-bold capitalize transition ${sort === s ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}
                              >
                                 {s}
                              </button>
                           ))}
                        </div>
                     </div>

                     <Button onClick={generate} size="lg" className="w-full text-lg h-14">
                        <Shuffle className="mr-2"/> Generate
                     </Button>
                  </div>

                  {/* Results Area */}
                  <div className="bg-slate-900 rounded-xl p-6 min-h-[300px] flex flex-col">
                     <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                        <span>Result</span>
                        <span>{results.length} items</span>
                     </div>
                     
                     <div className="flex-1 overflow-y-auto max-h-[300px] text-white">
                        {results.length === 0 ? (
                           <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                              <List size={48} className="mb-2"/>
                              <span>Ready to generate</span>
                           </div>
                        ) : results.length === 1 ? (
                           <div className="h-full flex items-center justify-center">
                              <span className="text-8xl font-bold tracking-tighter text-brand-400 animate-in zoom-in">{results[0]}</span>
                           </div>
                        ) : (
                           <div className="grid grid-cols-4 gap-2">
                              {results.map((n, i) => (
                                 <div key={i} className="bg-slate-800 p-2 rounded text-center font-mono font-bold animate-in fade-in zoom-in" style={{animationDelay: `${i * 20}ms`}}>
                                    {n}
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
        </div>
    );
};
