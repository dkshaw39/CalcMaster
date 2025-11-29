
import React, { useState } from 'react';
import { Button } from './Button';

export const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = useState(10);
  const [val2, setVal2] = useState(100);
  const [mode, setMode] = useState('percentOf'); // percentOf, percentChange, whatPercent

  let result = 0;
  let text = '';

  if (mode === 'percentOf') {
    result = (val1 / 100) * val2;
    text = `${val1}% of ${val2} is`;
  } else if (mode === 'percentChange') {
    result = ((val2 - val1) / val1) * 100;
    text = `Change from ${val1} to ${val2} is`;
  } else {
    result = (val1 / val2) * 100;
    text = `${val1} is what % of ${val2}?`;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Percentage Calculator</h2>
      <div className="flex gap-2 mb-6 text-sm">
        <button onClick={() => setMode('percentOf')} className={`flex-1 py-2 rounded ${mode === 'percentOf' ? 'bg-brand-600 text-white' : 'bg-slate-100'}`}>% of Value</button>
        <button onClick={() => setMode('percentChange')} className={`flex-1 py-2 rounded ${mode === 'percentChange' ? 'bg-brand-600 text-white' : 'bg-slate-100'}`}>% Change</button>
        <button onClick={() => setMode('whatPercent')} className={`flex-1 py-2 rounded ${mode === 'whatPercent' ? 'bg-brand-600 text-white' : 'bg-slate-100'}`}>What %</button>
      </div>

      <div className="flex items-center gap-4">
        <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-24 p-2 border rounded text-center font-bold"/>
        <span className="text-slate-500 font-medium">
            {mode === 'percentOf' ? '%' : ''}
            {mode === 'percentChange' ? 'to' : ''}
            {mode === 'whatPercent' ? 'is what % of' : ''}
        </span>
        <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-24 p-2 border rounded text-center font-bold"/>
        {mode === 'percentOf' && <span className="text-slate-500 font-medium">of</span>}
      </div>

      <div className="mt-8 text-center p-6 bg-slate-50 rounded-xl">
        <div className="text-slate-500 mb-1">{text}</div>
        <div className="text-4xl font-bold text-brand-600">
            {result.toFixed(2)}{mode !== 'percentOf' ? '%' : ''}
        </div>
      </div>
    </div>
  );
};

export const RandomNumberGenerator: React.FC = () => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [result, setResult] = useState<number | null>(null);

    const generate = () => {
        setResult(Math.floor(Math.random() * (max - min + 1)) + min);
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Random Number Generator</h2>
            <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Min</label>
                    <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="w-full p-2 border rounded text-center"/>
                </div>
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Max</label>
                    <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="w-full p-2 border rounded text-center"/>
                </div>
            </div>
            <Button onClick={generate} size="lg" className="w-full">Generate</Button>
            {result !== null && (
                <div className="mt-6 text-6xl font-bold text-brand-600 animate-in zoom-in duration-300">
                    {result}
                </div>
            )}
        </div>
    );
};

export const FractionCalculator: React.FC = () => {
    // Simple mock for Fraction UI
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Fraction Calculator</h2>
            <p className="text-slate-600 mb-4">Calculate addition, subtraction, multiplication and division of fractions.</p>
            <div className="grid grid-cols-5 gap-2 items-center text-center">
                <div className="space-y-2">
                    <input className="w-full p-2 border rounded text-center" placeholder="Num"/>
                    <div className="h-px bg-slate-300"></div>
                    <input className="w-full p-2 border rounded text-center" placeholder="Den"/>
                </div>
                <div className="font-bold text-xl text-slate-400">+</div>
                <div className="space-y-2">
                    <input className="w-full p-2 border rounded text-center" placeholder="Num"/>
                    <div className="h-px bg-slate-300"></div>
                    <input className="w-full p-2 border rounded text-center" placeholder="Den"/>
                </div>
                <div className="font-bold text-xl text-slate-400">=</div>
                <div className="space-y-2">
                     <div className="w-full p-2 bg-slate-100 rounded text-center">--</div>
                     <div className="h-px bg-slate-300"></div>
                     <div className="w-full p-2 bg-slate-100 rounded text-center">--</div>
                </div>
            </div>
            <div className="mt-6 text-sm text-slate-500 text-center">
                (Simplified UI for demonstration)
            </div>
        </div>
    )
}
