
import React, { useState } from 'react';
import { Box, Cylinder, ArrowRight } from 'lucide-react';

export const ConcreteCalculator: React.FC = () => {
  const [type, setType] = useState<'slab' | 'column'>('slab');
  
  // Dimensions
  const [len, setLen] = useState(10); // ft
  const [width, setWidth] = useState(10); // ft
  const [depth, setDepth] = useState(4); // inches
  
  const [height, setHeight] = useState(10); // ft
  const [diameter, setDiameter] = useState(12); // inches
  
  const [quantity, setQuantity] = useState(1);

  const calculate = () => {
    let volCuFt = 0;
    
    if (type === 'slab') {
        // L(ft) * W(ft) * D(in / 12)
        volCuFt = len * width * (depth / 12);
    } else {
        // PI * r(ft)^2 * H(ft)
        const radiusFt = (diameter / 2) / 12;
        volCuFt = Math.PI * Math.pow(radiusFt, 2) * height;
    }

    volCuFt *= quantity;

    const volCuYd = volCuFt / 27;
    const bags60 = volCuFt / 0.45; // Approx 0.45 cu ft per 60lb bag
    const bags80 = volCuFt / 0.60; // Approx 0.60 cu ft per 80lb bag

    return { volCuFt, volCuYd, bags60, bags80 };
  };

  const res = calculate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Concrete <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Estimate volume and premix bags needed.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
               <button onClick={() => setType('slab')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-bold transition ${type === 'slab' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>
                 <Box size={16}/> Slab / Footing
               </button>
               <button onClick={() => setType('column')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-bold transition ${type === 'column' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>
                 <Cylinder size={16}/> Column
               </button>
            </div>

            <div className="space-y-4">
               {type === 'slab' ? (
                   <>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Length (ft)</label>
                           <input type="number" value={len} onChange={e => setLen(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Width (ft)</label>
                           <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Depth / Thickness (inches)</label>
                        <input type="number" value={depth} onChange={e => setDepth(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                     </div>
                   </>
               ) : (
                   <>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Height (ft)</label>
                        <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Diameter (inches)</label>
                        <input type="number" value={diameter} onChange={e => setDiameter(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                     </div>
                   </>
               )}
               
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Quantity</label>
                  <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
               </div>
            </div>
         </div>

         <div className="space-y-6">
             <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Required Volume</div>
                 <div className="flex items-baseline gap-2">
                    <div className="text-5xl font-bold tracking-tight">{res.volCuYd.toFixed(2)}</div>
                    <div className="text-lg font-medium text-slate-400">cubic yards</div>
                 </div>
                 <div className="mt-2 text-sm text-slate-500 font-mono">
                    {res.volCuFt.toFixed(2)} cubic feet
                 </div>
             </div>

             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                 <h3 className="font-bold text-slate-800 mb-4">Premix Bags Needed</h3>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                       <span className="font-medium text-slate-600">60lb Bags</span>
                       <span className="font-bold text-xl text-brand-600">{Math.ceil(res.bags60)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                       <span className="font-medium text-slate-600">80lb Bags</span>
                       <span className="font-bold text-xl text-brand-600">{Math.ceil(res.bags80)}</span>
                    </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};
