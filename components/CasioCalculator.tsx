
import React, { useState } from 'react';
import { Sun } from 'lucide-react';
import { SEO } from './SEO';

const Key = ({ label, type = 'num', onClick, className = '' }: any) => {
  // Casio-style plastic keys - Compacted height
  const baseStyle = "relative h-[45px] rounded-lg font-bold text-xl flex items-center justify-center transition-all active:top-[2px] select-none shadow-[0_3px_0_rgba(0,0,0,0.3)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] border-t border-white/10";
  
  let colorStyle = "bg-[#333] text-white"; // Standard Black Key
  if (type === 'red') colorStyle = "bg-[#d14] text-white shadow-[0_3px_0_#903]"; 
  if (type === 'accent') colorStyle = "bg-[#444] text-white"; 
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${colorStyle} ${className}`}>
      {label}
    </button>
  );
};

export const CasioCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);
  
  // Logic State
  const [value, setValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // --- Input Logic ---
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const allClear = () => {
    setValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setDisplay('0');
  };

  // --- Arithmetic ---
  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleOperator = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (value === null) {
      setValue(inputValue);
    } else if (operator && !waitingForOperand) {
      const result = calculate(value, inputValue, operator);
      setValue(result);
      setDisplay(String(parseFloat(result.toPrecision(12))));
    }

    setWaitingForOperand(true);
    setOperator(nextOp);
  };

  const handleEquals = () => {
    if (operator && value !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(value, inputValue, operator);
      const formatted = parseFloat(result.toPrecision(12));
      
      setDisplay(String(formatted));
      setValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  // --- Functions ---
  const handlePercent = () => {
    const current = parseFloat(display);
    if (value !== null && operator) {
      const percentVal = value * (current / 100);
      setDisplay(String(percentVal));
    } else {
      setDisplay(String(current / 100));
    }
  };

  const handleSqrt = () => {
    const current = parseFloat(display);
    if (current >= 0) {
      setDisplay(String(Math.sqrt(current)));
      setWaitingForOperand(true);
    }
  };

  const handleMemory = (action: 'M+' | 'M-' | 'MR' | 'MC') => {
    const current = parseFloat(display);
    if (action === 'M+') setMemory(prev => prev + current);
    if (action === 'M-') setMemory(prev => prev - current);
    if (action === 'MC') setMemory(0);
    if (action === 'MR') {
       setDisplay(String(memory));
       setWaitingForOperand(true);
    }
    setWaitingForOperand(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in pb-4">
      <SEO 
        title="Casio Desk Calculator Online"
        description="Simple online desk calculator with tax functions, memory, and percentage calculations. Perfect for office and accounting use."
        keywords="desk calculator, simple calculator, online calculator, tax calculator, office calculator, accounting calculator"
      />
      <header className="text-center pt-2 mb-2">
        <h1 className="text-xl font-bold text-slate-900">Casio <span className="text-brand-600">Basic</span></h1>
      </header>

      {/* Calculator Body - Compacted */}
      <div className="mx-auto max-w-[360px] bg-[#222] p-4 rounded-[1.5rem] shadow-2xl border-b-8 border-[#111] relative">
        
        {/* Branding Row */}
        <div className="flex justify-between items-start mb-4 px-2">
           <div>
              <div className="text-white font-bold italic text-lg tracking-wider">CASIO</div>
              <div className="text-white/50 text-[10px] font-bold mt-0.5">MS-80B <span className="ml-2">12 DIGITS</span></div>
           </div>
           
           {/* Solar Panel */}
           <div className="w-16 h-6 bg-[#333] rounded border border-[#555] shadow-inner relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 grid grid-cols-4 divide-x divide-white/10 opacity-30"><div></div><div></div><div></div><div></div></div>
              <Sun size={10} className="text-amber-700/50 relative z-10"/>
           </div>
        </div>

        {/* Display Screen - Compacted */}
        <div className="bg-[#c5dca0] h-20 rounded-lg border-[4px] border-[#444] mb-4 p-3 relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] flex flex-col justify-between">
           {/* Indicators */}
           <div className="flex gap-2 text-[10px] font-bold text-slate-800 opacity-70 font-mono h-3">
               {memory !== 0 && <span>M</span>}
               {operator && <span className="border border-slate-600 px-1 rounded-sm">{operator}</span>}
               {value !== null && value < 0 && <span>-</span>}
           </div>
           
           {/* Main Digits */}
           <div className="text-right text-[36px] leading-none font-mono text-slate-900 tracking-tight overflow-hidden font-medium">
             {display}
           </div>
        </div>

        {/* Keypad Area - Compacted Gaps */}
        <div className="grid grid-cols-4 gap-2 p-1">
            
            {/* Row 1: Memory */}
            <Key label="MC" type="accent" onClick={() => handleMemory('MC')} className="text-sm"/>
            <Key label="MR" type="accent" onClick={() => handleMemory('MR')} className="text-sm"/>
            <Key label="M-" type="accent" onClick={() => handleMemory('M-')} className="text-sm"/>
            <Key label="M+" type="accent" onClick={() => handleMemory('M+')} className="text-sm"/>

            {/* Row 2: Func */}
            <Key label="%" type="accent" onClick={handlePercent} />
            <Key label="√" type="accent" onClick={handleSqrt} />
            <Key label="C" type="red" onClick={clearEntry} />
            <Key label="AC" type="red" onClick={allClear} />

            {/* Row 3 */}
            <Key label="7" onClick={() => inputDigit('7')} />
            <Key label="8" onClick={() => inputDigit('8')} />
            <Key label="9" onClick={() => inputDigit('9')} />
            <Key label="÷" type="accent" onClick={() => handleOperator('÷')} className="text-2xl font-light"/>

            {/* Row 4 */}
            <Key label="4" onClick={() => inputDigit('4')} />
            <Key label="5" onClick={() => inputDigit('5')} />
            <Key label="6" onClick={() => inputDigit('6')} />
            <Key label="×" type="accent" onClick={() => handleOperator('×')} className="text-2xl font-light"/>

            {/* Row 5 */}
            <Key label="1" onClick={() => inputDigit('1')} />
            <Key label="2" onClick={() => inputDigit('2')} />
            <Key label="3" onClick={() => inputDigit('3')} />
            <Key label="-" type="accent" onClick={() => handleOperator('-')} className="text-3xl font-light"/>

            {/* Row 6 */}
            <Key label="0" onClick={() => inputDigit('0')} />
            <Key label="." onClick={inputDecimal} />
            <Key label="=" type="accent" onClick={handleEquals} className="text-2xl"/>
            <Key label="+" type="accent" onClick={() => handleOperator('+')} className="text-2xl font-light"/>
        </div>
      </div>
    </div>
  );
};
