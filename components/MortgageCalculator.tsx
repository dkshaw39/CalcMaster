
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SEO } from './SEO';

export const MortgageCalculator: React.FC = () => {
  const [homeValue, setHomeValue] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(4800); // Annual
  const [insurance, setInsurance] = useState(1200); // Annual
  const [hoa, setHoa] = useState(0); // Monthly

  const [breakdown, setBreakdown] = useState<{
    monthlyPI: number;
    monthlyTax: number;
    monthlyIns: number;
    totalMonthly: number;
    totalInterest: number;
    loanAmount: number;
  } | null>(null);

  // Sync Down Payment Amount -> Percent
  const handleAmountChange = (val: number) => {
    setDownPayment(val);
    setDownPaymentPercent(Number(((val / homeValue) * 100).toFixed(2)));
  };

  // Sync Down Payment Percent -> Amount
  const handlePercentChange = (val: number) => {
    setDownPaymentPercent(val);
    setDownPayment(Math.round((val / 100) * homeValue));
  };

  useEffect(() => {
    const loanAmount = homeValue - downPayment;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;

    let monthlyPI = 0;
    if (interestRate === 0) {
      monthlyPI = loanAmount / n;
    } else {
      monthlyPI = loanAmount * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    }

    const monthlyTax = propertyTax / 12;
    const monthlyIns = insurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + hoa;
    const totalInterest = (monthlyPI * n) - loanAmount;

    setBreakdown({
      monthlyPI,
      monthlyTax,
      monthlyIns,
      totalMonthly,
      totalInterest,
      loanAmount
    });
  }, [homeValue, downPayment, loanTerm, interestRate, propertyTax, insurance, hoa]);

  const data = breakdown ? [
    { name: 'Principal & Interest', value: breakdown.monthlyPI },
    { name: 'Property Tax', value: breakdown.monthlyTax },
    { name: 'Home Insurance', value: breakdown.monthlyIns },
    { name: 'HOA Fees', value: hoa },
  ].filter(d => d.value > 0) : [];

  const COLORS = ['#4f46e5', '#0ea5e9', '#f59e0b', '#ef4444'];
  const inputClass = "w-full pl-8 p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition font-bold shadow-sm";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <SEO 
        title="Mortgage Calculator with Taxes, Insurance & HOA"
        description="Calculate your monthly mortgage payment including principal, interest, property taxes, homeowner's insurance, and HOA fees. View amortization and interest costs."
        keywords="mortgage calculator, amortization schedule, home loan calculator, pmi calculator, mortgage taxes insurance, monthly payment estimator"
      />
      <div className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Mortgage <span className="text-brand-600">Calculator</span></h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-600 rounded-full"></span>
            Loan Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Home Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input 
                  type="number" 
                  value={homeValue}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setHomeValue(val);
                    // Update down payment amount based on kept percentage
                    setDownPayment(Math.round((downPaymentPercent / 100) * val));
                  }}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Down Payment</label>
              <div className="flex gap-2">
                 <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input 
                      type="number" 
                      value={downPayment}
                      onChange={e => handleAmountChange(Number(e.target.value))}
                      className={inputClass}
                    />
                 </div>
                 <div className="relative w-24">
                    <input 
                      type="number" 
                      value={downPaymentPercent}
                      onChange={e => handlePercentChange(Number(e.target.value))}
                      className="w-full pr-6 pl-2 p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition text-center font-bold shadow-sm"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                 </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Loan Term</label>
              <select 
                value={loanTerm}
                onChange={e => setLoanTerm(Number(e.target.value))}
                className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition font-bold shadow-sm"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Interest Rate</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01"
                  value={interestRate}
                  onChange={e => setInterestRate(Number(e.target.value))}
                  className="w-full pr-8 pl-3 p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition font-bold shadow-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2 pt-6 border-t border-slate-100">
            <span className="w-1 h-5 bg-slate-400 rounded-full"></span>
            Taxes & Fees
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Property Tax / Year</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input 
                  type="number" 
                  value={propertyTax}
                  onChange={e => setPropertyTax(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Home Insurance / Year</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input 
                  type="number" 
                  value={insurance}
                  onChange={e => setInsurance(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">HOA Fees / Month</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input 
                  type="number" 
                  value={hoa}
                  onChange={e => setHoa(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden text-center">
              <div className="relative z-10">
                <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">Estimated Monthly Payment</p>
                <div className="text-5xl font-bold mb-2">
                  ${breakdown?.totalMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-slate-400">Loan Amount: ${breakdown?.loanAmount.toLocaleString()}</p>
              </div>
           </div>

           <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
             <h3 className="font-semibold text-slate-800 mb-4">Payment Breakdown</h3>
             
             <div className="h-48 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${Math.round(value)}`} />
                  </PieChart>
                </ResponsiveContainer>
             </div>

             <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-brand-600"></div>
                     <span className="text-slate-600">Principal & Interest</span>
                   </div>
                   <span className="font-bold text-slate-800">${Math.round(breakdown?.monthlyPI || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                     <span className="text-slate-600">Property Tax</span>
                   </div>
                   <span className="font-bold text-slate-800">${Math.round(breakdown?.monthlyTax || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                     <span className="text-slate-600">Home Insurance</span>
                   </div>
                   <span className="font-bold text-slate-800">${Math.round(breakdown?.monthlyIns || 0)}</span>
                </div>
                 <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <span className="text-slate-600">HOA Fees</span>
                   </div>
                   <span className="font-bold text-slate-800">${hoa}</span>
                </div>
             </div>

             <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Total Interest Paid</span>
                   <span className="font-bold text-slate-900">${Math.round(breakdown?.totalInterest || 0).toLocaleString()}</span>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
