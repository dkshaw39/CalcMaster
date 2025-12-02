
import React, { useState } from 'react';
import { DollarSign, RefreshCw, ShoppingCart } from 'lucide-react';

export const SalesTaxCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [taxRate, setTaxRate] = useState<number>(7.25);
  const [isReverse, setIsReverse] = useState(false); // If true, "amount" is the Total, calculate pre-tax

  const calculate = () => {
    if (isReverse) {
      // Amount is Total. We need Pre-Tax.
      // Total = PreTax * (1 + rate)
      // PreTax = Total / (1 + rate)
      const preTax = amount / (1 + taxRate / 100);
      const tax = amount - preTax;
      return { preTax, tax, total: amount };
    } else {
      // Amount is Pre-Tax.
      const tax = amount * (taxRate / 100);
      const total = amount + tax;
      return { preTax: amount, tax, total };
    }
  };

  const result = calculate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Sales Tax <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Calculate tax or reverse tax from total.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
           <div className="flex justify-center mb-8">
             <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
               <button 
                 onClick={() => setIsReverse(false)}
                 className={`px-4 py-2 rounded-md transition ${!isReverse ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
               >
                 Add Tax
               </button>
               <button 
                 onClick={() => setIsReverse(true)}
                 className={`px-4 py-2 rounded-md transition ${isReverse ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
               >
                 Reverse Tax
               </button>
             </div>
           </div>

           <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                  {isReverse ? 'Total Price (Inc. Tax)' : 'Price Before Tax'}
                </label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><DollarSign size={18}/></div>
                   <input 
                    type="number" 
                    value={amount} 
                    onChange={e => setAmount(Number(e.target.value))}
                    className="w-full pl-10 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-bold text-xl text-slate-900"
                   />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Tax Rate (%)
                </label>
                <div className="flex gap-4">
                  <input 
                    type="number" 
                    step="0.01"
                    value={taxRate} 
                    onChange={e => setTaxRate(Number(e.target.value))}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-bold text-xl text-slate-900"
                  />
                  {/* Quick Buttons */}
                  <div className="flex flex-col gap-2">
                     <button onClick={() => setTaxRate(5)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-600">5%</button>
                     <button onClick={() => setTaxRate(7.25)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-600">7.25%</button>
                     <button onClick={() => setTaxRate(10)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-600">10%</button>
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* Receipt */}
        <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShoppingCart size={120} />
           </div>
           
           <h3 className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8 border-b border-slate-700 pb-4">Receipt Details</h3>
           
           <div className="space-y-4 font-mono text-sm md:text-base">
              <div className="flex justify-between items-end">
                <span className="text-slate-400">Net Price</span>
                <span className="text-xl font-bold">${result.preTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-slate-400">Tax ({taxRate}%)</span>
                <span className="text-xl font-bold text-amber-500">+ ${result.tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="my-4 border-t-2 border-dashed border-slate-700"></div>
              <div className="flex justify-between items-end">
                <span className="text-brand-400 font-bold uppercase">Total</span>
                <span className="text-4xl font-bold tracking-tight">${result.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
