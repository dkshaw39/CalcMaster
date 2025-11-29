
import React, { useState } from 'react';

const conversions: any = {
    length: {
        units: ['m', 'km', 'ft', 'in', 'cm', 'mi'],
        ratios: { m: 1, km: 0.001, cm: 100, ft: 3.28084, in: 39.3701, mi: 0.000621371 }
    },
    weight: {
        units: ['kg', 'g', 'lb', 'oz'],
        ratios: { kg: 1, g: 1000, lb: 2.20462, oz: 35.274 }
    }
};

export const UnitConverter: React.FC = () => {
    const [category, setCategory] = useState('length');
    const [val, setVal] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');

    const catData = conversions[category];

    // Convert 'from' to base, then base to 'to'
    const base = val / catData.ratios[fromUnit];
    const result = base * catData.ratios[toUnit];

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Unit Converter</h2>
            
            <div className="flex gap-2 mb-6 border-b border-slate-100 pb-2">
                <button onClick={() => {setCategory('length'); setFromUnit('m'); setToUnit('ft');}} className={`px-4 py-2 font-medium ${category === 'length' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500'}`}>Length</button>
                <button onClick={() => {setCategory('weight'); setFromUnit('kg'); setToUnit('lb');}} className={`px-4 py-2 font-medium ${category === 'weight' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500'}`}>Weight</button>
            </div>

            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <div className="space-y-2">
                    <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="w-full p-3 border rounded-lg text-lg font-medium"/>
                    <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full p-2 bg-slate-50 border rounded-lg text-slate-700">
                        {catData.units.map((u: string) => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>

                <div className="text-slate-400 font-bold text-xl">=</div>

                <div className="space-y-2">
                    <div className="w-full p-3 bg-slate-50 border rounded-lg text-lg font-medium text-slate-800">{result.toFixed(4)}</div>
                    <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full p-2 bg-slate-50 border rounded-lg text-slate-700">
                        {catData.units.map((u: string) => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};
