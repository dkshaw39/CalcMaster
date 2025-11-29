import React, { useState } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from 'date-fns';

export const DateCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateAge = () => {
    const start = new Date(birthDate);
    const end = new Date(targetDate);

    const years = differenceInYears(end, start);
    const months = differenceInMonths(end, addYears(start, years));
    const days = differenceInDays(end, addMonths(addYears(start, years), months));

    const totalDays = differenceInDays(end, start);

    return { years, months, days, totalDays };
  };

  const age = calculateAge();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
            <input 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Age at Date</label>
            <input 
              type="date" 
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-700"
            />
          </div>
        </div>

        <div className="bg-brand-50 rounded-xl p-6 border border-brand-100 text-center">
           <h3 className="text-brand-900 text-lg font-medium mb-4">Result Age</h3>
           <div className="flex justify-center items-end gap-2 text-brand-700">
              <div className="flex flex-col items-center">
                 <span className="text-4xl font-bold">{age.years}</span>
                 <span className="text-xs uppercase tracking-wider font-medium opacity-70">Years</span>
              </div>
              <span className="text-2xl pb-4 opacity-50">,</span>
              <div className="flex flex-col items-center">
                 <span className="text-4xl font-bold">{age.months}</span>
                 <span className="text-xs uppercase tracking-wider font-medium opacity-70">Months</span>
              </div>
              <span className="text-2xl pb-4 opacity-50">,</span>
              <div className="flex flex-col items-center">
                 <span className="text-4xl font-bold">{age.days}</span>
                 <span className="text-xs uppercase tracking-wider font-medium opacity-70">Days</span>
              </div>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
             <div className="text-xs text-slate-500 uppercase">Total Days</div>
             <div className="text-xl font-semibold text-slate-800">{age.totalDays.toLocaleString()}</div>
           </div>
           <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
             <div className="text-xs text-slate-500 uppercase">Total Hours (Approx)</div>
             <div className="text-xl font-semibold text-slate-800">{(age.totalDays * 24).toLocaleString()}</div>
           </div>
        </div>
      </div>
    </div>
  );
};