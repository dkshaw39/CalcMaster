
import React, { useState } from 'react';
import { Box, Circle, Triangle, Cylinder, Square } from 'lucide-react';

export const GeometryCalculator: React.FC = () => {
  const [shape, setShape] = useState('rectangle');
  
  // Dynamic Inputs based on shape
  const [val1, setVal1] = useState(10); // L / Base / Radius
  const [val2, setVal2] = useState(5);  // W / Height
  const [val3, setVal3] = useState(2);  // Side 3 / Height 3D

  let area = 0;
  let volume = 0;
  let perimeter = 0;
  let formulaArea = '';
  let formulaVol = '';

  // Logic
  switch (shape) {
    case 'rectangle':
      area = val1 * val2;
      perimeter = 2 * (val1 + val2);
      formulaArea = 'A = l × w';
      break;
    case 'triangle':
      area = 0.5 * val1 * val2;
      // perimeter approx (assuming isosceles/right for basic inputs or needing more inputs)
      // keeping it simple: just area
      formulaArea = 'A = ½ × b × h';
      break;
    case 'circle':
      area = Math.PI * Math.pow(val1, 2);
      perimeter = 2 * Math.PI * val1; // Circumference
      formulaArea = 'A = πr²';
      break;
    case 'cylinder':
      // val1 = radius, val2 = height
      volume = Math.PI * Math.pow(val1, 2) * val2;
      area = (2 * Math.PI * val1 * val2) + (2 * Math.PI * Math.pow(val1, 2)); // Surface Area
      formulaVol = 'V = πr²h';
      formulaArea = 'SA = 2πrh + 2πr²';
      break;
    case 'sphere':
      // val1 = radius
      volume = (4/3) * Math.PI * Math.pow(val1, 3);
      area = 4 * Math.PI * Math.pow(val1, 2); // Surface Area
      formulaVol = 'V = 4/3 πr³';
      formulaArea = 'SA = 4πr²';
      break;
    case 'cone':
      // val1 = radius, val2 = height
      volume = Math.PI * Math.pow(val1, 2) * (val2 / 3);
      formulaVol = 'V = πr²(h/3)';
      break;
  }

  const shapes2D = [
    { id: 'rectangle', label: 'Rectangle', icon: Square },
    { id: 'triangle', label: 'Triangle', icon: Triangle },
    { id: 'circle', label: 'Circle', icon: Circle },
  ];
  
  const shapes3D = [
     { id: 'cylinder', label: 'Cylinder', icon: Cylinder },
     { id: 'sphere', label: 'Sphere', icon: Circle }, // Using circle icon for sphere
     { id: 'cone', label: 'Cone', icon: Triangle }, // Using triangle icon for cone shape
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Geometry <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Calculate Area, Perimeter, Volume, and Surface Area.</p>
      </header>

      <div className="grid md:grid-cols-12 gap-8">
         {/* Sidebar: Shape Selection */}
         <div className="md:col-span-3 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">2D Shapes</h3>
               <div className="space-y-1">
                  {shapes2D.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${shape === s.id ? 'bg-brand-50 text-brand-700 font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <s.icon size={18}/> {s.label}
                    </button>
                  ))}
               </div>
               
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-6 mb-3">3D Objects</h3>
               <div className="space-y-1">
                  {shapes3D.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${shape === s.id ? 'bg-brand-50 text-brand-700 font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <s.icon size={18}/> {s.label}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Main Calculation Area */}
         <div className="md:col-span-9">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
               <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 capitalize">{shape}</h2>
                    <p className="text-slate-500 text-sm">Enter dimensions to calculate.</p>
                  </div>
                  <div className="text-right text-xs text-slate-400 font-mono bg-slate-50 p-2 rounded">
                     {formulaArea && <div>{formulaArea}</div>}
                     {formulaVol && <div>{formulaVol}</div>}
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                     {/* Inputs Dynamic */}
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                         {shape === 'circle' || shape === 'sphere' || shape === 'cylinder' || shape === 'cone' ? 'Radius (r)' : shape === 'triangle' ? 'Base (b)' : 'Length (l)'}
                       </label>
                       <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-900" />
                     </div>

                     {(shape === 'rectangle' || shape === 'triangle' || shape === 'cylinder' || shape === 'cone') && (
                       <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                          {shape === 'rectangle' ? 'Width (w)' : 'Height (h)'}
                        </label>
                        <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-900" />
                       </div>
                     )}
                  </div>

                  {/* Results */}
                  <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col justify-center space-y-6">
                     {formulaVol ? (
                        <div>
                          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Volume</div>
                          <div className="text-3xl font-bold">{volume.toFixed(2)}</div>
                        </div>
                     ) : (
                        <div>
                          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Area</div>
                          <div className="text-3xl font-bold">{area.toFixed(2)}</div>
                        </div>
                     )}

                     {formulaVol ? (
                        // If it has volume, Area is Surface Area
                        shape !== 'cone' && (
                          <div className="pt-4 border-t border-slate-700">
                             <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Surface Area</div>
                             <div className="text-2xl font-semibold text-brand-400">{area.toFixed(2)}</div>
                          </div>
                        )
                     ) : (
                        shape !== 'triangle' && (
                          <div className="pt-4 border-t border-slate-700">
                             <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Perimeter / Circumference</div>
                             <div className="text-2xl font-semibold text-brand-400">{perimeter.toFixed(2)}</div>
                          </div>
                        )
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
