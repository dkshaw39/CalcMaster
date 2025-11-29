
import React, { useState } from 'react';
import { Button } from './Button';
import { RefreshCw, Copy } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
    const [length, setLength] = useState(12);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');

    const generate = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let valid = chars;
        if (includeNumbers) valid += nums;
        if (includeSymbols) valid += syms;

        let generated = '';
        for (let i = 0; i < length; i++) {
            generated += valid.charAt(Math.floor(Math.random() * valid.length));
        }
        setPassword(generated);
    };

    // Gen on mount
    React.useEffect(() => generate(), []);

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
             <h2 className="text-xl font-bold text-slate-800 mb-6">Password Generator</h2>
             
             <div className="bg-slate-900 text-white p-4 rounded-lg mb-6 break-all font-mono text-lg flex items-center justify-between">
                <span>{password}</span>
                <button onClick={() => navigator.clipboard.writeText(password)} className="text-slate-400 hover:text-white ml-4">
                    <Copy className="w-5 h-5"/>
                </button>
             </div>

             <div className="space-y-4 mb-8">
                 <div>
                     <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                         <span>Length</span>
                         <span>{length}</span>
                     </label>
                     <input type="range" min="6" max="32" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-brand-600"/>
                 </div>
                 <div className="flex gap-6">
                     <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} className="rounded text-brand-600 focus:ring-brand-500"/>
                         <span className="text-slate-700 text-sm">Numbers</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} className="rounded text-brand-600 focus:ring-brand-500"/>
                         <span className="text-slate-700 text-sm">Symbols</span>
                     </label>
                 </div>
             </div>

             <Button onClick={generate} size="lg" className="w-full flex items-center gap-2">
                 <RefreshCw className="w-4 h-4"/> Generate New
             </Button>
        </div>
    );
};
