
import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calendar, DollarSign, Percent, Clock } from 'lucide-react';
import { format, addMonths } from 'date-fns';

interface AmortizationRow {
  date: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export const LoanCalculator: React.FC = () => {
  // Inputs
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTermYears, setLoanTermYears] = useState(5);
  const [loanTermMonths, setLoanTermMonths] = useState(0);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  // State for visibility
  const [showSchedule, setShowSchedule] = useState(false);

  // Calculations
  const calculations = useMemo(() => {
    const principal = loanAmount;
    const annualRate = interestRate / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = (loanTermYears * 12) + loanTermMonths;
    
    let monthlyPayment = 0;

    if (interestRate === 0) {
      monthlyPayment = principal / totalMonths;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // Generate Schedule
    const schedule: AmortizationRow[] = [];
    let currentBalance = principal;
    let totalInterest = 0;
    const start = new Date(startDate);

    for (let i = 1; i <= totalMonths; i++) {
      const interestPayment = currentBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      currentBalance -= principalPayment;
      
      // Handle floating point errors at end
      if (currentBalance < 0) currentBalance = 0;

      totalInterest += interestPayment;

      schedule.push({
        date: format(addMonths(start, i), 'MMM yyyy'),
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: currentBalance
      });
    }

    return {
      monthlyPayment,
      totalPayment: monthlyPayment * totalMonths,
      totalInterest,
      schedule
    };
  }, [loanAmount, interestRate, loanTermYears, loanTermMonths, startDate]);

  // Chart Data
  const pieData = [
    { name: 'Principal', value: loanAmount },
    { name: 'Total Interest', value: calculations.totalInterest },
  ];
  
  const COLORS = ['#0284c7', '#f59e0b']; // Brand Blue & Amber

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Section for SEO */}
      <header className="text-center space-y-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Advanced Loan Calculator</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Calculate monthly payments, total interest, and view a complete amortization schedule for your personal, auto, or business loan.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-brand-600 rounded-full"></span>
            Loan Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Loan Amount</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition">
                  <DollarSign size={18} />
                </div>
                <input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Interest Rate (APR)</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition">
                  <Percent size={18} />
                </div>
                <input 
                  type="number" 
                  step="0.1"
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Term (Years)</label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Clock size={18}/></div>
                   <input 
                    type="number" 
                    value={loanTermYears} 
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Months</label>
                <input 
                  type="number" 
                  value={loanTermMonths} 
                  onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition">
                  <Calendar size={18} />
                </div>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results & Visualization */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
             <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
                  <DollarSign size={80} />
                </div>
                <div className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-2">Monthly Payment</div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight">
                  ${calculations.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-2">Total Interest</div>
                <div className="text-2xl font-bold text-amber-500">
                  ${calculations.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-400 mt-2">Cost of borrowing</div>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-2">Total Payoff</div>
                <div className="text-2xl font-bold text-slate-700">
                  ${calculations.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-400 mt-2">Principal + Interest</div>
             </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Breakdown</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { name: 'Total', principal: loanAmount, interest: calculations.totalInterest }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip 
                     cursor={{fill: 'transparent'}}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="principal" name="Principal Amount" stackId="a" fill="#0284c7" radius={[4, 0, 0, 4]} barSize={40} />
                  <Bar dataKey="interest" name="Total Interest" stackId="a" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-brand-600"></div>
                    <span className="text-slate-600">Principal:</span>
                    <span className="font-bold ml-auto">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-slate-600">Interest:</span>
                    <span className="font-bold ml-auto">${Math.round(calculations.totalInterest).toLocaleString()}</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Schedule */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
           <div>
             <h3 className="text-lg font-bold text-slate-800">Amortization Schedule</h3>
             <p className="text-sm text-slate-500">Monthly breakdown of your loan</p>
           </div>
           <button 
             onClick={() => setShowSchedule(!showSchedule)}
             className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:bg-brand-50 px-4 py-2 rounded-lg transition"
           >
             {showSchedule ? 'Hide Schedule' : 'Show Full Schedule'}
           </button>
        </div>
        
        <div className={`overflow-x-auto transition-all duration-500 ${showSchedule ? 'max-h-[800px]' : 'max-h-[300px]'}`}>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Payment</th>
                <th className="px-6 py-3 font-semibold text-brand-600">Principal</th>
                <th className="px-6 py-3 font-semibold text-amber-600">Interest</th>
                <th className="px-6 py-3 font-semibold text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {calculations.schedule.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-900">{row.date}</td>
                  <td className="px-6 py-3 text-slate-600">${row.payment.toFixed(2)}</td>
                  <td className="px-6 py-3 text-slate-600 font-medium">${row.principal.toFixed(2)}</td>
                  <td className="px-6 py-3 text-slate-600">${row.interest.toFixed(2)}</td>
                  <td className="px-6 py-3 text-slate-900 font-bold text-right">${row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!showSchedule && (
             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-4">
                <span className="text-slate-400 text-xs">Expand to see full {calculations.schedule.length} months</span>
             </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use the Loan Calculator</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          This free <strong>Loan Calculator</strong> helps you estimate your monthly loan payments. By entering the loan amount, 
          interest rate (APR), and loan term, you can instantly see how much you will pay each month and the total cost of the loan over time.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-800 mb-2">What is Amortization?</h3>
               <p className="text-slate-600 text-sm leading-relaxed">
                 Amortization is the process of paying off a debt over time through regular payments. 
                 A portion of each payment goes towards the principal (the actual amount borrowed) and a portion goes towards interest. 
                 Early in the loan, a higher percentage of your payment goes toward interest.
               </p>
            </div>
            <div>
               <h3 className="text-lg font-bold text-slate-800 mb-2">Principal vs. Interest</h3>
               <p className="text-slate-600 text-sm leading-relaxed">
                 <strong>Principal:</strong> The money you originally agreed to pay back.<br/>
                 <strong>Interest:</strong> The cost of borrowing the principal.<br/>
                 Using this calculator, you can visualize the ratio of interest to principal for every single payment in the schedule above.
               </p>
            </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2">Common Uses</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
           <li><strong>Auto Loans:</strong> Calculate monthly car payments based on price and interest rate.</li>
           <li><strong>Personal Loans:</strong> Estimate payments for debt consolidation or personal expenses.</li>
           <li><strong>Small Business Loans:</strong> Plan your business finances by understanding your debt obligations.</li>
        </ul>
      </article>

    </div>
  );
};
