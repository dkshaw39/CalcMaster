
import React, { useState } from 'react';
import { Timer, MapPin, Activity } from 'lucide-react';
import { Button } from './Button';

export const PaceCalculator: React.FC = () => {
  const [mode, setMode] = useState<'pace' | 'time' | 'distance'>('pace'); // What to calculate
  
  // State
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(30);
  const [secs, setSecs] = useState(0);
  
  const [dist, setDist] = useState(5);
  const [distUnit, setDistUnit] = useState<'km' | 'mi'>('km');
  
  const [paceMins, setPaceMins] = useState(6);
  const [paceSecs, setPaceSecs] = useState(0);
  const [paceUnit, setPaceUnit] = useState<'km' | 'mi'>('km');

  // Logic
  const getResult = () => {
    // Convert everything to common units (seconds, km)
    const totalTimeSec = (hours * 3600) + (mins * 60) + secs;
    const distanceKm = distUnit === 'km' ? dist : dist * 1.60934;
    const paceSecPerKm = (paceMins * 60 + paceSecs) * (paceUnit === 'km' ? 1 : 1.60934);

    if (mode === 'pace') {
       if (distanceKm <= 0 || totalTimeSec <= 0) return null;
       const calcPaceSecPerKm = totalTimeSec / distanceKm;
       // Convert to display units
       const displayPaceSec = calcPaceSecPerKm / (paceUnit === 'km' ? 1 : 1.60934);
       return {
          label: 'Pace',
          val: `${Math.floor(displayPaceSec / 60)}:${Math.floor(displayPaceSec % 60).toString().padStart(2, '0')}`,
          unit: `min / ${paceUnit}`
       };
    }
    
    if (mode === 'time') {
       if (distanceKm <= 0) return null;
       const calcTimeSec = distanceKm * paceSecPerKm;
       const h = Math.floor(calcTimeSec / 3600);
       const m = Math.floor((calcTimeSec % 3600) / 60);
       const s = Math.floor(calcTimeSec % 60);
       return {
          label: 'Time',
          val: `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`,
          unit: 'h:m:s'
       };
    }

    if (mode === 'distance') {
       if (totalTimeSec <= 0 || paceSecPerKm <= 0) return null;
       const calcDistKm = totalTimeSec / paceSecPerKm;
       const displayDist = calcDistKm / (distUnit === 'km' ? 1 : 1.60934);
       return {
          label: 'Distance',
          val: displayDist.toFixed(2),
          unit: distUnit
       };
    }
    return null;
  };

  const res = getResult();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Pace <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Calculate running pace, time, or distance.</p>
      </header>

      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex gap-1">
          {[
             { id: 'pace', label: 'Calculate Pace' },
             { id: 'time', label: 'Calculate Time' },
             { id: 'distance', label: 'Calculate Distance' }
          ].map((m: any) => (
             <button
               key={m.id}
               onClick={() => setMode(m.id)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === m.id ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
             >
               {m.label}
             </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
         <div className="grid md:grid-cols-2 gap-12 items-center">
             
             {/* Inputs */}
             <div className="space-y-6">
                 {mode !== 'time' && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                           <Timer size={14}/> Time
                        </label>
                        <div className="flex gap-2">
                           <div className="flex-1">
                              <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} className="w-full p-2 rounded-lg border border-slate-200 text-center font-bold"/>
                              <div className="text-[10px] text-center text-slate-400 mt-1">Hrs</div>
                           </div>
                           <div className="flex-1">
                              <input type="number" value={mins} onChange={e => setMins(Number(e.target.value))} className="w-full p-2 rounded-lg border border-slate-200 text-center font-bold"/>
                              <div className="text-[10px] text-center text-slate-400 mt-1">Mins</div>
                           </div>
                           <div className="flex-1">
                              <input type="number" value={secs} onChange={e => setSecs(Number(e.target.value))} className="w-full p-2 rounded-lg border border-slate-200 text-center font-bold"/>
                              <div className="text-[10px] text-center text-slate-400 mt-1">Secs</div>
                           </div>
                        </div>
                    </div>
                 )}

                 {mode !== 'distance' && (
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                           <MapPin size={14}/> Distance
                        </label>
                        <div className="flex gap-2">
                           <input type="number" value={dist} onChange={e => setDist(Number(e.target.value))} className="w-full p-2 rounded-lg border border-slate-200 font-bold"/>
                           <select value={distUnit} onChange={e => setDistUnit(e.target.value as any)} className="bg-white border border-slate-200 rounded-lg px-2 font-bold text-slate-600">
                              <option value="km">km</option>
                              <option value="mi">miles</option>
                           </select>
                        </div>
                        {/* Quick Distances */}
                        <div className="flex gap-2 mt-2">
                           <button onClick={() => { setDist(5); setDistUnit('km'); }} className="px-2 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-slate-500 hover:text-brand-600">5K</button>
                           <button onClick={() => { setDist(10); setDistUnit('km'); }} className="px-2 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-slate-500 hover:text-brand-600">10K</button>
                           <button onClick={() => { setDist(21.0975); setDistUnit('km'); }} className="px-2 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-slate-500 hover:text-brand-600">Half</button>
                           <button onClick={() => { setDist(42.195); setDistUnit('km'); }} className="px-2 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-slate-500 hover:text-brand-600">Marathon</button>
                        </div>
                     </div>
                 )}

                 {mode !== 'pace' && (
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                           <Activity size={14}/> Pace
                        </label>
                        <div className="flex gap-2">
                           <div className="flex items-center gap-1 flex-1">
                               <input type="number" value={paceMins} onChange={e => setPaceMins(Number(e.target.value))} className="w-full p-2 rounded-lg border border-slate-200 text-center font-bold"/>
                               <span className="font-bold text-slate-400">:</span>
                               <input type="number" value={paceSecs} onChange={e => setPaceSecs(Number(e.target.value))} className="w-full p-2 rounded-lg border border-slate-200 text-center font-bold"/>
                           </div>
                           <select value={paceUnit} onChange={e => setPaceUnit(e.target.value as any)} className="bg-white border border-slate-200 rounded-lg px-2 font-bold text-slate-600">
                              <option value="km">/ km</option>
                              <option value="mi">/ mi</option>
                           </select>
                        </div>
                     </div>
                 )}
             </div>

             {/* Result */}
             <div className="flex justify-center">
                 <div className="bg-slate-900 text-white rounded-full w-64 h-64 flex flex-col items-center justify-center shadow-2xl ring-8 ring-slate-100">
                     {res ? (
                        <>
                           <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{res.label}</div>
                           <div className="text-5xl font-extrabold tracking-tighter mb-1">{res.val}</div>
                           <div className="text-slate-400 font-medium">{res.unit}</div>
                        </>
                     ) : (
                        <span className="text-slate-500">Enter Values</span>
                     )}
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};
