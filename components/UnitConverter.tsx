
import React, { useState } from 'react';

const units: any = {
    length: {
        base: 'm',
        items: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, yd: 1.09361, ft: 3.28084, in: 39.3701 }
    },
    weight: {
        base: 'kg',
        items: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274, ton: 0.001 }
    },
    temperature: {
        base: 'C', // Special handling
        items: { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' }
    },
    area: {
        base: 'm2',
        items: { m2: 1, km2: 0.000001, ft2: 10.7639, ac: 0.000247105, ha: 0.0001 }
    },
    volume: {
        base: 'l',
        items: { l: 1, ml: 1000, m3: 0.001, gal: 0.264172, qt: 1.05669, pt: 2.11338, cup: 4.22675 }
    },
    speed: {
        base: 'mps',
        items: { mps: 1, kph: 3.6, mph: 2.23694, knot: 1.94384 }
    },
    time: {
        base: 's',
        items: { s: 1, min: 1/60, hr: 1/3600, day: 1/86400, week: 1/604800, yr: 1/31536000 }
    },
    digital: {
        base: 'B',
        items: { B: 1, KB: 1/1024, MB: 1/1048576, GB: 1/1073741824, TB: 1/1099511627776 }
    }
};

export const UnitConverter: React.FC = () => {
    const [category, setCategory] = useState('length');
    const [val, setVal] = useState<number>(1);
    const [from, setFrom] = useState('m');
    const [to, setTo] = useState('ft');

    const handleCatChange = (c: string) => {
        setCategory(c);
        const keys = Object.keys(units[c].items);
        setFrom(keys[0]);
        setTo(keys[1] || keys[0]);
    };

    const convert = () => {
        if (category === 'temperature') {
            if (from === to) return val;
            let celsius = val;
            if (from === 'F') celsius = (val - 32) * 5/9;
            if (from === 'K') celsius = val - 273.15;
            
            if (to === 'C') return celsius;
            if (to === 'F') return (celsius * 9/5) + 32;
            if (to === 'K') return celsius + 273.15;
            return val;
        } else {
            const data = units[category];
            const baseVal = val / data.items[from];
            return baseVal * data.items[to];
        }
    };

    const result = convert();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            <header className="text-center mb-6 pt-4">
               <h1 className="text-2xl font-bold text-slate-900">Unit <span className="text-brand-600">Converter</span></h1>
               <p className="text-sm text-slate-500 mt-1">Convert between common units of measurement.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                {/* Categories */}
                <div className="flex overflow-x-auto border-b border-slate-100 p-2 scrollbar-hide">
                    {Object.keys(units).map(cat => (
                        <button 
                           key={cat}
                           onClick={() => handleCatChange(cat)}
                           className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide whitespace-nowrap transition ${category === cat ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                           {cat}
                        </button>
                    ))}
                </div>

                <div className="p-8 md:p-12">
                    <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center">
                        <div className="space-y-3">
                           <label className="text-xs font-bold text-slate-400 uppercase">From</label>
                           <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="w-full p-4 text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"/>
                           <select value={from} onChange={e => setFrom(e.target.value)} className="w-full p-3 font-medium bg-white border border-slate-200 rounded-xl text-slate-700">
                               {Object.keys(units[category].items).map(u => <option key={u} value={u}>{u}</option>)}
                           </select>
                        </div>

                        <div className="hidden md:block text-slate-300">
                           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>

                        <div className="space-y-3">
                           <label className="text-xs font-bold text-slate-400 uppercase">To</label>
                           <div className="w-full p-4 text-2xl font-bold bg-slate-900 text-white rounded-xl shadow-lg truncate">
                              {Number.isInteger(result) ? result : result.toFixed(5).replace(/\.?0+$/, '')}
                           </div>
                           <select value={to} onChange={e => setTo(e.target.value)} className="w-full p-3 font-medium bg-white border border-slate-200 rounded-xl text-slate-700">
                               {Object.keys(units[category].items).map(u => <option key={u} value={u}>{u}</option>)}
                           </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
