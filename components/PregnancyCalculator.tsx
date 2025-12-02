
import React, { useState } from 'react';
import { addDays, format, differenceInWeeks } from 'date-fns';
import { Button } from './Button';
import { Baby, Calendar, Heart, Eye, Activity } from 'lucide-react';

export const PregnancyCalculator: React.FC = () => {
    const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
    const [cycleLength, setCycleLength] = useState(28);
    const [calculated, setCalculated] = useState(false);

    // Results
    const lmp = new Date(lastPeriod);
    const cycleAdj = cycleLength - 28;
    const dueDate = addDays(lmp, 280 + cycleAdj);
    const conceptionDate = addDays(lmp, 14 + cycleAdj);
    
    // Milestones
    const milestones = [
        { week: 4, title: 'Positive Test', icon: Activity, date: addDays(lmp, 28 + cycleAdj) },
        { week: 6, title: 'First Heartbeat', icon: Heart, date: addDays(lmp, 42 + cycleAdj) },
        { week: 12, title: 'End of 1st Trimester', icon: Baby, date: addDays(lmp, 84 + cycleAdj) },
        { week: 20, title: 'Anatomy Scan (Gender)', icon: Eye, date: addDays(lmp, 140 + cycleAdj) },
        { week: 24, title: 'Viability', icon: Activity, date: addDays(lmp, 168 + cycleAdj) },
        { week: 27, title: 'End of 2nd Trimester', icon: Baby, date: addDays(lmp, 189 + cycleAdj) },
        { week: 40, title: 'Due Date', icon: Calendar, date: dueDate },
    ];

    const currentWeeks = differenceInWeeks(new Date(), lmp);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
             <header className="text-center mb-6 pt-4">
                <h1 className="text-2xl font-bold text-slate-900">Pregnancy <span className="text-brand-600">Calculator</span></h1>
                <p className="text-sm text-slate-500 mt-1">Estimate due date and key fetal milestones.</p>
             </header>

             <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                 <div className="grid md:grid-cols-3 gap-8 items-end mb-8">
                     <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">First Day of Last Period</label>
                         <input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Avg Cycle Length</label>
                         <input type="number" value={cycleLength} onChange={e => setCycleLength(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                     </div>
                     <Button onClick={() => setCalculated(true)} size="lg" className="w-full bg-brand-600 hover:bg-brand-700 border-brand-600">
                        Calculate Timeline
                     </Button>
                 </div>

                 {calculated && (
                     <div className="animate-in fade-in slide-in-from-bottom-8">
                         {/* Hero Result */}
                         <div className="bg-brand-50 rounded-2xl p-8 text-center border border-brand-100 mb-12">
                             <div className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-2">Estimated Due Date</div>
                             <div className="text-5xl font-extrabold text-brand-600 tracking-tight mb-2">
                                 {format(dueDate, 'MMMM do, yyyy')}
                             </div>
                             <div className="text-brand-500 font-medium">
                                 {format(dueDate, 'EEEE')}
                             </div>
                         </div>

                         {/* Timeline */}
                         <div className="relative">
                             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                             <div className="space-y-8">
                                 {milestones.map((m, i) => (
                                     <div key={i} className="relative flex items-center gap-6 group">
                                         <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-sm transition ${currentWeeks >= m.week ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            <m.icon size={24} />
                                         </div>
                                         <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex-1 hover:shadow-md transition">
                                             <div className="flex justify-between items-center mb-1">
                                                 <span className="text-xs font-bold text-slate-400 uppercase">Week {m.week}</span>
                                                 <span className="text-sm font-bold text-slate-800">{format(m.date, 'MMM d, yyyy')}</span>
                                             </div>
                                             <div className="font-bold text-slate-700">{m.title}</div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </div>
                 )}
             </div>
        </div>
    );
};
