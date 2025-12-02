
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DollarSign, Briefcase, Calendar } from 'lucide-react';
import { SEO } from './SEO';

export const SalaryCalculator: React.FC = () => {
  const [grossSalary, setGrossSalary] = useState(65000);
  const [payFrequency, setPayFrequency] = useState('year'); // year, month, week, hour
  const [filingStatus, setFilingStatus] = useState('single'); // single, married

  const results = useMemo(() => {
    // 1. Normalize to Annual
    let annualGross = grossSalary;
    if (payFrequency === 'month') annualGross = grossSalary * 12;
    if (payFrequency === 'week') annualGross = grossSalary * 52;
    if (payFrequency === 'biweek') annualGross = grossSalary * 26;
    if (payFrequency === 'hour') annualGross = grossSalary * 40 * 52; // Assume 40h week

    // 2. Federal Tax (Simplified 2024/2025 Estimations)
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxableIncome = Math.max(0, annualGross - standardDeduction);
    
    let fedTax = 0;
    // Brackets for Single (Approx 2024)
    const brackets = filingStatus === 'single' 
      ? [
          { limit: 11600, rate: 0.10 },
          { limit: 47150, rate: 0.12 },
          { limit: 100525, rate: 0.22 },
          { limit: 191950, rate: 0.24 },
          { limit: 243725, rate: 0.32 },
          { limit: 609350, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
        ]
      : [ // Married Joint
          { limit: 23200, rate: 0.10 },
          { limit: 94300, rate: 0.12 },
          { limit: 201050, rate: 0.22 },
          { limit: 383900, rate: 0.24 },
          { limit: 487450, rate: 0.32 },
          { limit: 731200, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
      ];

    let previousLimit = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of brackets) {
      const chunk = Math.min(remainingIncome, bracket.limit - previousLimit);
      if (chunk <= 0) break;
      fedTax += chunk * bracket.rate;
      remainingIncome -= chunk;
      previousLimit = bracket.limit;
    }

    // 3. FICA (Social Security 6.2% + Medicare 1.45%)
    // SS Cap approx 168,600
    const ssCap = 168600;
    const ssTax = Math.min(annualGross, ssCap) * 0.062;
    const medicareTax = annualGross * 0.0145;
    const ficaTax = ssTax + medicareTax;

    // 4. State Tax (Flat estimate 4.5% for demo, as state laws vary wildly)
    const stateTax = annualGross * 0.045; 

    const totalTax = fedTax + ficaTax + stateTax;
    const netPay = annualGross - totalTax;

    return {
      annual: { gross: annualGross, net: netPay, fed: fedTax, fica: ficaTax, state: stateTax },
      monthly: { gross: annualGross/12, net: netPay/12 },
      biweekly: { gross: annualGross/26, net: netPay/26 },
      weekly: { gross: annualGross/52, net: netPay/52 }
    };
  }, [grossSalary, payFrequency, filingStatus]);

  const pieData = [
    { name: 'Net Pay', value: results.annual.net, color: '#0ea5e9' },
    { name: 'Federal Tax', value: results.annual.fed, color: '#f59e0b' },
    { name: 'FICA', value: results.annual.fica, color: '#64748b' },
    { name: 'State Tax', value: results.annual.state, color: '#94a3b8' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
       <SEO 
        title="Salary Calculator & Paycheck Estimator"
        description="Calculate your take-home pay (Net Pay) after Federal Tax, FICA, and State Taxes. View a detailed breakdown for annual, monthly, and bi-weekly paychecks."
        keywords="salary calculator, paycheck calculator, net pay calculator, take home pay, federal tax calculator, income tax calculator"
      />
       <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Salary <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">
          Calculate your net pay after taxes.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Input Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-brand-600"/> Income Details
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Gross Income</label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><DollarSign size={16}/></div>
                   <input 
                    type="number" 
                    value={grossSalary} 
                    onChange={e => setGrossSalary(Number(e.target.value))}
                    className="w-full pl-9 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Frequency</label>
                <select 
                  value={payFrequency} 
                  onChange={e => setPayFrequency(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium text-slate-700"
                >
                  <option value="year">Annually</option>
                  <option value="month">Monthly</option>
                  <option value="biweek">Bi-Weekly</option>
                  <option value="week">Weekly</option>
                  <option value="hour">Hourly (40h/wk)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Filing Status</label>
                <div className="grid grid-cols-2 gap-2">
                   <button 
                     onClick={() => setFilingStatus('single')}
                     className={`p-2 rounded-lg text-sm font-bold transition ${filingStatus === 'single' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                   >
                     Single
                   </button>
                   <button 
                     onClick={() => setFilingStatus('married')}
                     className={`p-2 rounded-lg text-sm font-bold transition ${filingStatus === 'married' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                   >
                     Married
                   </button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
                <strong>Note:</strong> Estimates use 2024/2025 Federal Brackets and standard deductions. State tax is estimated at a flat 4.5% avg.
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Top Card */}
           <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Estimated Net Pay (Annual)</div>
                 <div className="text-4xl md:text-5xl font-bold tracking-tight">
                    ${Math.round(results.annual.net).toLocaleString()}
                 </div>
                 <div className="text-sm text-slate-400 mt-2">
                    Effectively {((results.annual.net / results.annual.gross) * 100).toFixed(1)}% of your gross income
                 </div>
              </div>
              
              {/* Pie Chart Mini */}
              <div className="w-32 h-32 hidden md:block">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={pieData} dataKey="value" innerRadius={25} outerRadius={40} paddingAngle={2}>
                          {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Breakdown Table */}
           <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
             <div className="p-4 bg-slate-50 border-b border-slate-200">
               <h3 className="font-bold text-slate-800 flex items-center gap-2">
                 <Calendar size={18} className="text-brand-600"/> Paycheck Breakdown
               </h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="bg-white text-xs uppercase text-slate-500 border-b border-slate-100">
                   <tr>
                      <th className="px-6 py-4">Frequency</th>
                      <th className="px-6 py-4">Gross Pay</th>
                      <th className="px-6 py-4 text-brand-600">Take Home</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   <tr className="hover:bg-slate-50">
                     <td className="px-6 py-4 font-medium text-slate-900">Annually</td>
                     <td className="px-6 py-4 text-slate-600">${Math.round(results.annual.gross).toLocaleString()}</td>
                     <td className="px-6 py-4 font-bold text-brand-700 text-lg">${Math.round(results.annual.net).toLocaleString()}</td>
                   </tr>
                   <tr className="hover:bg-slate-50">
                     <td className="px-6 py-4 font-medium text-slate-900">Monthly</td>
                     <td className="px-6 py-4 text-slate-600">${Math.round(results.monthly.gross).toLocaleString()}</td>
                     <td className="px-6 py-4 font-bold text-brand-700 text-lg">${Math.round(results.monthly.net).toLocaleString()}</td>
                   </tr>
                   <tr className="hover:bg-slate-50">
                     <td className="px-6 py-4 font-medium text-slate-900">Bi-Weekly</td>
                     <td className="px-6 py-4 text-slate-600">${Math.round(results.biweekly.gross).toLocaleString()}</td>
                     <td className="px-6 py-4 font-bold text-brand-700 text-lg">${Math.round(results.biweekly.net).toLocaleString()}</td>
                   </tr>
                   <tr className="hover:bg-slate-50">
                     <td className="px-6 py-4 font-medium text-slate-900">Weekly</td>
                     <td className="px-6 py-4 text-slate-600">${Math.round(results.weekly.gross).toLocaleString()}</td>
                     <td className="px-6 py-4 font-bold text-brand-700 text-lg">${Math.round(results.weekly.net).toLocaleString()}</td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>

           {/* Tax Details */}
           <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Where does the money go?</h3>
              <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                       <span className="text-slate-700 font-medium">Federal Tax</span>
                    </div>
                    <span className="font-bold text-slate-900">${Math.round(results.annual.fed).toLocaleString()}</span>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                       <span className="text-slate-700 font-medium">FICA (SS & Medicare)</span>
                    </div>
                    <span className="font-bold text-slate-900">${Math.round(results.annual.fica).toLocaleString()}</span>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                       <span className="text-slate-700 font-medium">State Tax (Est.)</span>
                    </div>
                    <span className="font-bold text-slate-900">${Math.round(results.annual.state).toLocaleString()}</span>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};
