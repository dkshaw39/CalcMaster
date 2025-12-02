
import React, { useState } from 'react';
import { Divide, Equal } from 'lucide-react';

export const FractionCalculator: React.FC = () => {
  // Fraction A
  const [wholeA, setWholeA] = useState<number | ''>('');
  const [numA, setNumA] = useState<number>(1);
  const [denA, setDenA] = useState<number>(2);

  // Fraction B
  const [wholeB, setWholeB] = useState<number | ''>('');
  const [numB, setNumB] = useState<number>(1);
  const [denB, setDenB] = useState<number>(4);

  const [op, setOp] = useState('+');

  // Logic
  const calculate = () => {
     // Convert to improper
     const wA = Number(wholeA) || 0;
     const nA = (wA * denA) + numA;
     
     const wB = Number(wholeB) || 0;
     const nB = (wB * denB) + numB;

     let resNum = 0;
     let resDen = denA * denB;

     switch(op) {
        case '+':
           resNum = (nA * denB) + (nB * denA);
           break;
        case '-':
           resNum = (nA * denB) - (nB * denA);
           break;
        case '*':
           resNum = nA * nB;
           resDen = denA * denB;
           break;
        case '/':
           resNum = nA * denB;
           resDen = denA * nB;
           break;
     }

     // Reduce
     const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
     const divisor = Math.abs(gcd(resNum, resDen));
     
     const simplifiedNum = resNum / divisor;
     const simplifiedDen = resDen / divisor;

     // Mixed
     const mixedWhole = Math.floor(simplifiedNum / simplifiedDen);
     const mixedNum = simplifiedNum % simplifiedDen;

     return {
        num: simplifiedNum,
        den: simplifiedDen,
        mixedWhole,
        mixedNum,
        decimal: simplifiedNum / simplifiedDen
     };
  };

  const result = calculate();

  const FractionInput = ({ w, sw, n, sn, d, sd }: any) => (
     <div className="flex items-center gap-2">
        <input 
           type="number" 
           value={w} 
           onChange={e => sw(Number(e.target.value))} 
           placeholder="0"
           className="w-16 p-3 text-center bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 placeholder:text-slate-300"
        />
        <div className="flex flex-col gap-2">
           <input 
              type="number" 
              value={n} 
              onChange={e => sn(Number(e.target.value))} 
              className="w-16 p-2 text-center bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
           />
           <div className="h-0.5 bg-slate-300 w-full rounded-full"></div>
           <input 
              type="number" 
              value={d} 
              onChange={e => sd(Number(e.target.value))} 
              className="w-16 p-2 text-center bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
           />
        </div>
     </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Fraction <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Arithmetic with mixed fractions.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
         <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <FractionInput w={wholeA} sw={setWholeA} n={numA} sn={setNumA} d={denA} sd={setDenA} />
            
            <div className="flex gap-2">
               {['+', '-', '*', '/'].map(o => (
                  <button 
                     key={o} 
                     onClick={() => setOp(o)}
                     className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold transition ${op === o ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                     {o === '*' ? '×' : o === '/' ? '÷' : o}
                  </button>
               ))}
            </div>

            <FractionInput w={wholeB} sw={setWholeB} n={numB} sn={setNumB} d={denB} sd={setDenB} />
            
            <div className="text-slate-300">
               <Equal size={32}/>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-xl min-w-[150px] text-center shadow-lg">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Result</div>
                
                {/* Improper */}
                <div className="text-2xl font-bold mb-1">
                   {result.num}
                   <span className="opacity-50 mx-1">/</span>
                   {result.den}
                </div>
                
                {/* Mixed */}
                {result.mixedWhole > 0 && result.mixedNum > 0 && (
                   <div className="text-brand-400 font-mono text-lg font-bold border-t border-slate-700 pt-2 mt-2">
                      {result.mixedWhole} <span className="text-sm">{result.mixedNum}/{result.den}</span>
                   </div>
                )}
                
                {/* Decimal */}
                <div className="text-slate-400 text-sm mt-2">
                   {result.decimal.toFixed(4)}
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};
