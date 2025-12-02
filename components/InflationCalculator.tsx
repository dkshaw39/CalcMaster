
import React, { useState } from 'react';
import { TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const InflationCalculator: React.FC = () => {
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(10);
  
  const futureValue = amount * Math.pow(1 + rate / 100, years);
  const purchasingPower = amount / Math.pow(1 + rate / 100, years);
  
  const data = [
    { name: 'Today', value: amount },
    { name: `In ${years} Years`, value: parseFloat(futureValue.toFixed(2)) }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Inflation <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Estimate future costs and purchasing power.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 h-fit">
           <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
             <TrendingUp className="text-brand-600"/> Parameters
           </h2>
           
           <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Current Amount</label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><DollarSign size={18}/></div>
                   <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full pl-10 p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Inflation Rate (%)</label>
                <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                <p className="text-xs text-slate-400 mt-1">US Historical Avg is approx 3.3%</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Duration (Years)</label>
                <input type="range" min="1" max="50" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full accent-brand-600 cursor-pointer mb-2"/>
                <div className="text-center font-bold text-brand-600">{years} Years</div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           {/* Main Result */}
           <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
               <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Future Cost</div>
               <div className="text-5xl font-bold tracking-tight mb-2">
                  ${futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
               </div>
               <p className="text-slate-400 text-sm">
                 To buy what <strong>${amount}</strong> buys today, you will need <strong>${futureValue.toFixed(2)}</strong> in {years} years.
               </p>
           </div>

           {/* Purchasing Power */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Purchasing Power Erosion</h3>
                  <div className="text-sm font-bold text-red-500">
                     -{(100 - (purchasingPower / amount * 100)).toFixed(1)}%
                  </div>
               </div>
               <div className="text-3xl font-bold text-slate-700 mb-1">
                  ${purchasingPower.toFixed(2)}
               </div>
               <p className="text-xs text-slate-500">
                  The value of today's ${amount} in {years} years.
               </p>
           </div>
           
           {/* Chart */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-64">
               <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={data}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} />
                       <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                       <YAxis hide />
                       <Tooltip cursor={{fill: 'transparent'}} />
                       <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                         {data.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : '#0ea5e9'} />
                         ))}
                       </Bar>
                   </BarChart>
               </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};
