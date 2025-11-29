
import React, { useState } from 'react';

export const GeometryCalculator: React.FC = () => {
  const [shape, setShape] = useState('rectangle');
  const [val1, setVal1] = useState(0); // Length / Base / Radius
  const [val2, setVal2] = useState(0); // Width / Height

  let area = 0;
  let perimeter = 0;

  if (shape === 'rectangle') {
      area = val1 * val2;
      perimeter = 2 * (val1 + val2);
  } else if (shape === 'triangle') {
      area = 0.5 * val1 * val2;
      // Perimeter needs more info (sides), assuming right angle for demo or ignore
  } else if (shape === 'circle') {
      area = Math.PI * val1 * val1;
      perimeter = 2 * Math.PI * val1; // Circumference
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Area & Volume Calculator</h2>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
         {['rectangle', 'triangle', 'circle'].map(s => (
             <button 
                key={s} 
                onClick={() => setShape(s)}
                className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap ${shape === s ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'}`}
             >
                 {s}
             </button>
         ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                      {shape === 'circle' ? 'Radius' : shape === 'triangle' ? 'Base' : 'Length'}
                  </label>
                  <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-full p-2 border rounded-lg"/>
              </div>
              {shape !== 'circle' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        {shape === 'triangle' ? 'Height' : 'Width'}
                    </label>
                    <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-full p-2 border rounded-lg"/>
                  </div>
              )}
          </div>

          <div className="bg-slate-50 p-6 rounded-xl flex flex-col justify-center">
              <div className="mb-4">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Area</div>
                  <div className="text-3xl font-bold text-brand-600">{area.toFixed(2)}</div>
              </div>
              {shape !== 'triangle' && (
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-semibold">
                        {shape === 'circle' ? 'Circumference' : 'Perimeter'}
                    </div>
                    <div className="text-2xl font-bold text-slate-700">{perimeter.toFixed(2)}</div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
