
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { RefreshCw, Copy, ShieldCheck, ShieldAlert, Eye, Volume2 } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        upper: true,
        lower: true,
        numbers: true,
        symbols: true,
        ambiguous: false, // Avoid Il1O0
    });
    const [mode, setMode] = useState<'random' | 'pronounceable'>('random');
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);

    const generate = () => {
        let result = '';
        
        if (mode === 'pronounceable') {
            // Simple consonant-vowel pattern
            const cons = 'bcdfghjklmnpqrstvwxyz';
            const vows = 'aeiou';
            for (let i = 0; i < length; i++) {
                result += (i % 2 === 0) ? cons[Math.floor(Math.random()*cons.length)] : vows[Math.floor(Math.random()*vows.length)];
            }
            // Add some numbers/caps if needed roughly
            if (options.upper) result = result.charAt(0).toUpperCase() + result.slice(1);
            if (options.numbers) result += Math.floor(Math.random() * 100);
        } else {
            let charset = '';
            if (options.lower) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (options.upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (options.numbers) charset += '0123456789';
            if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            if (!options.ambiguous) {
                charset = charset.replace(/[Il1O0]/g, '');
            }

            if (!charset) charset = 'abcdef'; // Fallback

            for (let i = 0; i < length; i++) {
                result += charset.charAt(Math.floor(Math.random() * charset.length));
            }
        }
        
        setPassword(result);
        calculateStrength(result);
    };

    const calculateStrength = (pwd: string) => {
        let s = 0;
        if (pwd.length > 8) s += 1;
        if (pwd.length > 12) s += 1;
        if (pwd.length > 16) s += 1;
        if (/[A-Z]/.test(pwd)) s += 1;
        if (/[0-9]/.test(pwd)) s += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) s += 1;
        setStrength(Math.min(s, 5)); // Max 5
    };

    useEffect(() => generate(), [length, options, mode]);

    const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500', 'bg-emerald-600'];
    const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
             <header className="text-center mb-6 pt-4">
                <h1 className="text-2xl font-bold text-slate-900">Password <span className="text-brand-600">Generator</span></h1>
                <p className="text-sm text-slate-500 mt-1">Generate secure, random passwords instantly.</p>
             </header>

             <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                 {/* Display */}
                 <div className="bg-slate-900 rounded-2xl p-6 mb-8 relative group">
                     <div className="font-mono text-2xl md:text-3xl text-white break-all text-center min-h-[48px] flex items-center justify-center">
                         {password}
                     </div>
                     <button 
                       onClick={() => navigator.clipboard.writeText(password)}
                       className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition"
                     >
                         <Copy size={20}/>
                     </button>
                 </div>

                 {/* Strength Bar */}
                 <div className="mb-8">
                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                         <span>Strength</span>
                         <span className={`${strength > 3 ? 'text-green-600' : 'text-slate-600'}`}>{strengthLabel[strength]}</span>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
                         {[0,1,2,3,4].map(i => (
                             <div key={i} className={`flex-1 transition-all duration-500 ${i < strength ? strengthColor[strength] : 'bg-transparent'} ${i < 4 ? 'border-r border-white' : ''}`}></div>
                         ))}
                     </div>
                 </div>

                 {/* Controls */}
                 <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                         <div>
                             <label className="flex justify-between font-bold text-slate-700 mb-4">
                                 <span>Length</span>
                                 <span>{length}</span>
                             </label>
                             <input type="range" min="6" max="64" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-brand-600 cursor-pointer"/>
                         </div>
                         
                         <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Generation Mode</label>
                             <div className="flex bg-slate-100 p-1 rounded-lg">
                                 <button onClick={() => setMode('random')} className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-md font-bold text-sm transition ${mode === 'random' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>
                                     <ShieldCheck size={16}/> Random
                                 </button>
                                 <button onClick={() => setMode('pronounceable')} className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-md font-bold text-sm transition ${mode === 'pronounceable' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>
                                     <Volume2 size={16}/> Easy to Say
                                 </button>
                             </div>
                         </div>
                     </div>

                     <div className="space-y-3">
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Character Sets</label>
                         <div className="grid grid-cols-2 gap-3">
                             {[
                                 { k: 'upper', l: 'ABC', dis: mode === 'pronounceable' },
                                 { k: 'lower', l: 'abc', dis: mode === 'pronounceable' },
                                 { k: 'numbers', l: '123', dis: false },
                                 { k: 'symbols', l: '@#$', dis: mode === 'pronounceable' },
                                 { k: 'ambiguous', l: 'No lI1', dis: mode === 'pronounceable' }
                             ].map((o: any) => (
                                 <label key={o.k} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${options[o.k as keyof typeof options] ? 'bg-brand-50 border-brand-200' : 'border-slate-200'} ${o.dis ? 'opacity-50 pointer-events-none' : ''}`}>
                                     <input 
                                       type="checkbox" 
                                       checked={options[o.k as keyof typeof options]} 
                                       onChange={e => setOptions({...options, [o.k]: e.target.checked})}
                                       className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500"
                                     />
                                     <span className="font-bold text-sm text-slate-700">{o.l}</span>
                                 </label>
                             ))}
                         </div>
                     </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-slate-100">
                     <Button onClick={generate} size="lg" className="w-full h-14 text-lg bg-slate-900 hover:bg-slate-800">
                         <RefreshCw className="mr-2"/> Generate New Password
                     </Button>
                 </div>
             </div>
        </div>
    );
};
