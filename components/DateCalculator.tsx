
import React, { useState } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths, addDays, format, differenceInBusinessDays } from 'date-fns';

export const DateCalculator: React.FC = () => {
  const [tab, setTab] = useState(0);

  // Tab 0: Age / Diff
  const [date1, setDate1] = useState('1990-01-01');
  const [date2, setDate2] = useState(new Date().toISOString().split('T')[0]);

  // Tab 1: Add/Sub
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [operator, setOperator] = useState('add');
  const [amount, setAmount] = useState(30);
  const [unit, setUnit] = useState('days');

  const calculateDiff = () => {
    const start = new Date(date1);
    const end = new Date(date2);
    
    // Check if valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const years = differenceInYears(end, start);
    const months = differenceInMonths(end, addYears(start, years));
    const days = differenceInDays(end, addMonths(addYears(start, years), months));
    const totalDays = differenceInDays(end, start);
    const businessDays = differenceInBusinessDays(end, start);

    return { years, months, days, totalDays, businessDays };
  };

  const calculateAdd = () => {
     const start = new Date(startDate);
     const amt = operator === 'add' ? amount : -amount;
     
     let res = start;
     if (unit === 'years') res = addYears(start, amt);
     if (unit === 'months') res = addMonths(start, amt);
     if (unit === 'days') res = addDays(start, amt);
     
     return res;
  };

  const diff = calculateDiff();
  const addedDate = calculateAdd();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Date <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Calculate age, duration, or add time to a date.</p>
      </header>
      
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex gap-1">
          {['Age & Difference', 'Add / Subtract Days'].map((t, i) => (
             <button
               key={i}
               onClick={() => setTab(i)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tab === i ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
             >
               {t}
             </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
         {tab === 0 && diff && (
            <div className="grid md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Start Date / Date of Birth</label>
                     <input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">End Date</label>
                     <input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                  </div>
               </div>
               
               <div className="flex flex-col justify-center space-y-4">
                  <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                     <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Duration</div>
                     <div className="text-3xl font-bold tracking-tight mb-1">
                        {diff.years}y {diff.months}m {diff.days}d
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-slate-500 text-xs font-bold uppercase mb-1">Total Days</div>
                        <div className="text-xl font-bold text-slate-800">{diff.totalDays.toLocaleString()}</div>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-slate-500 text-xs font-bold uppercase mb-1">Business Days</div>
                        <div className="text-xl font-bold text-slate-800">{diff.businessDays.toLocaleString()}</div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {tab === 1 && (
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Start Date</label>
                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-800"/>
                   </div>
                   <div className="flex gap-4">
                      <div className="flex-1">
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Operation</label>
                         <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button onClick={() => setOperator('add')} className={`flex-1 py-2 rounded font-bold text-sm ${operator === 'add' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Add</button>
                            <button onClick={() => setOperator('sub')} className={`flex-1 py-2 rounded font-bold text-sm ${operator === 'sub' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Subtract</button>
                         </div>
                      </div>
                      <div className="w-24">
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Amount</label>
                         <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-lg font-bold text-center"/>
                      </div>
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Unit</label>
                     <div className="flex gap-2">
                        {['days', 'months', 'years'].map(u => (
                           <button key={u} onClick={() => setUnit(u)} className={`flex-1 py-3 border rounded-xl font-bold capitalize transition ${unit === u ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{u}</button>
                        ))}
                     </div>
                   </div>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl text-center">
                   <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Resulting Date</div>
                   <div className="text-4xl font-bold tracking-tight text-brand-400 mb-2">
                      {format(addedDate, 'MMM do, yyyy')}
                   </div>
                   <div className="text-lg text-slate-300">
                      {format(addedDate, 'EEEE')}
                   </div>
                </div>
             </div>
         )}
      </div>
    </div>
  );
};
