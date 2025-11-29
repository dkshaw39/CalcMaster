
import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import { Button } from './Button';

export const PregnancyCalculator: React.FC = () => {
    const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
    const [cycleLength, setCycleLength] = useState(28);
    const [dueDate, setDueDate] = useState<Date | null>(null);

    const calculate = () => {
        // Naegele's rule: LMP + 7 days + 9 months (approx 280 days)
        // Adjusted for cycle length diff from 28
        const lmp = new Date(lastPeriod);
        const cycleAdjustment = cycleLength - 28;
        const totalDays = 280 + cycleAdjustment;
        
        setDueDate(addDays(lmp, totalDays));
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
             <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Pregnancy Due Date Calculator</h2>
             
             <div className="space-y-4 mb-6">
                 <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">First Day of Last Period</label>
                     <input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className="w-full p-2 border rounded-lg"/>
                 </div>
                 <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Average Cycle Length (Days)</label>
                     <input type="number" value={cycleLength} onChange={e => setCycleLength(Number(e.target.value))} className="w-full p-2 border rounded-lg"/>
                 </div>
             </div>
             
             <Button onClick={calculate} className="w-full bg-pink-500 hover:bg-pink-600 border-pink-600">Calculate Due Date</Button>

             {dueDate && (
                 <div className="mt-8 text-center animate-in slide-in-from-bottom-2 fade-in">
                     <div className="text-slate-500 text-sm uppercase tracking-wide mb-1">Estimated Due Date</div>
                     <div className="text-3xl font-bold text-pink-600">{format(dueDate, 'MMMM do, yyyy')}</div>
                 </div>
             )}
        </div>
    );
};
