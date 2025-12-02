
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, TrendingUp, Calendar, Layers, ArrowRight } from 'lucide-react';
import { SEO } from './SEO';

// --- UI Components ---
const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
    <div className="p-1.5 bg-brand-50 text-brand-600 rounded-md"><Icon size={16}/></div>
    {title}
  </h3>
);

const InputField = ({ label, value, onChange, icon: Icon, suffix, min, max, step = 1 }: any) => (
  <div className="group">
    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 ml-1">{label}</label>
    <div className="relative transition-all duration-200">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors pointer-events-none">
          <Icon size={18} />
        </div>
      )}
      <input 
        type="number" 
        value={value} 
        onChange={e => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
        min={min} max={max} step={step}
        className={`w-full bg-white text-slate-900 font-bold border border-slate-300 focus:border-brand-500 rounded-xl py-3 ${Icon ? 'pl-10' : 'pl-4'} pr-4 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all shadow-sm`}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }: any) => (
  <div>
    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 ml-1">{label}</label>
    <select 
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white text-slate-900 font-bold border border-slate-300 focus:border-brand-500 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all shadow-sm appearance-none"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export const InvestmentCalculator: React.FC = () => {
  // --- State ---
  const [startingAmount, setStartingAmount] = useState(10000);
  const [contribution, setContribution] = useState(500);
  const [contributionFreq, setContributionFreq] = useState('monthly'); // monthly, annually
  const [returnRate, setReturnRate] = useState(7.0);
  const [years, setYears] = useState(10);
  const [compoundFreq, setCompoundFreq] = useState('annually'); // monthly, quarterly, semi-annually, annually
  const [inflationRate, setInflationRate] = useState(0); // Optional inflation adjustment

  // --- Calculations ---
  const results = useMemo(() => {
    let balance = startingAmount;
    let totalPrincipal = startingAmount;
    const data = [];
    
    // Normalize rates
    const annualRate = returnRate / 100;
    const inflation = inflationRate / 100;
    
    // Determine frequencies per year
    const compPerYear = compoundFreq === 'monthly' ? 12 : compoundFreq === 'quarterly' ? 4 : compoundFreq === 'semi-annually' ? 2 : 1;
    const contribPerYear = contributionFreq === 'monthly' ? 12 : 1;
    
    // Simulation Step (Monthly for granularity)
    const totalMonths = years * 12;
    
    // Add initial point
    data.push({
      year: 0,
      principal: startingAmount,
      interest: 0,
      balance: startingAmount,
      inflationAdjusted: startingAmount
    });

    let currentPrincipal = startingAmount;
    let currentBalance = startingAmount;

    for (let m = 1; m <= totalMonths; m++) {
      // 1. Add Contribution
      let monthlyContrib = 0;
      if (contributionFreq === 'monthly') monthlyContrib = contribution;
      else if (contributionFreq === 'annually' && m % 12 === 0) monthlyContrib = contribution;
      
      currentPrincipal += monthlyContrib;
      currentBalance += monthlyContrib;

      // 2. Add Interest
      // Simple approximation for monthly iteration matching compounding frequency
      // If we compound monthly: rate/12. If annually: effective monthly rate or just compound at month 12.
      // For chart smoothness, we'll use effective monthly rate derived from compounding freq.
      
      const ratePerComp = annualRate / compPerYear;
      // If current month matches a compounding period
      if (m % (12 / compPerYear) === 0) {
        currentBalance = currentBalance * (1 + ratePerComp);
      }

      // Snapshot for Year End
      if (m % 12 === 0) {
        const year = m / 12;
        const totalInterest = currentBalance - currentPrincipal;
        
        // Calculate inflation adjusted purchasing power: Balance / (1 + inflation)^years
        const adjusted = currentBalance / Math.pow(1 + inflation, year);

        data.push({
          year,
          principal: Math.round(currentPrincipal),
          interest: Math.round(totalInterest),
          balance: Math.round(currentBalance),
          inflationAdjusted: Math.round(adjusted)
        });
      }
    }

    totalPrincipal = currentPrincipal;
    balance = currentBalance;
    const totalInterest = balance - totalPrincipal;

    return {
      endBalance: Math.round(balance),
      totalPrincipal: Math.round(totalPrincipal),
      totalInterest: Math.round(totalInterest),
      data
    };
  }, [startingAmount, contribution, contributionFreq, returnRate, years, compoundFreq, inflationRate]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      <SEO 
        title="Investment Calculator - Compound Interest"
        description="Calculate future investment value with compound interest. Adjust for inflation, contributions, and frequency to see how your money grows."
        keywords="investment calculator, compound interest calculator, roi calculator, future value calculator, wealth growth, inflation adjustment"
      />
      {/* Header */}
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">Investment <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Calculate the future value of your investments.</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left: Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white p-6 md:p-8">
             <SectionHeader icon={Layers} title="Investment Details" />
             <div className="space-y-5">
                <InputField 
                  label="Starting Amount" 
                  value={startingAmount} 
                  onChange={setStartingAmount} 
                  icon={DollarSign} 
                />
                <div className="grid grid-cols-2 gap-4">
                   <InputField 
                    label="Duration" 
                    value={years} 
                    onChange={setYears} 
                    suffix="Years"
                    icon={Calendar}
                  />
                  <InputField 
                    label="Return Rate" 
                    value={returnRate} 
                    onChange={setReturnRate} 
                    suffix="%"
                    step={0.1}
                    icon={TrendingUp}
                  />
                </div>
                <SelectField 
                  label="Compound Frequency" 
                  value={compoundFreq} 
                  onChange={setCompoundFreq} 
                  options={[
                    { value: 'annually', label: 'Annually' },
                    { value: 'semi-annually', label: 'Semi-Annually' },
                    { value: 'quarterly', label: 'Quarterly' },
                    { value: 'monthly', label: 'Monthly' },
                  ]} 
                />
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white p-6 md:p-8">
             <SectionHeader icon={DollarSign} title="Contributions" />
             <div className="space-y-5">
                <div className="grid grid-cols-3 gap-4">
                   <div className="col-span-2">
                      <InputField 
                        label="Add Amount" 
                        value={contribution} 
                        onChange={setContribution} 
                        icon={DollarSign} 
                      />
                   </div>
                   <div className="col-span-1">
                      <SelectField 
                        label="Frequency"
                        value={contributionFreq} 
                        onChange={setContributionFreq} 
                        options={[
                          { value: 'monthly', label: 'Month' },
                          { value: 'annually', label: 'Year' },
                        ]} 
                      />
                   </div>
                </div>
                <InputField 
                  label="Inflation Rate (Optional)" 
                  value={inflationRate} 
                  onChange={setInflationRate} 
                  suffix="%"
                  step={0.1}
                />
             </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* Summary Cards */}
           <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">End Balance</div>
                 <div className="text-3xl font-bold tracking-tight mb-2">${results.endBalance.toLocaleString()}</div>
                 {inflationRate > 0 && (
                   <div className="text-xs text-slate-400">
                     Purchasing Power: ${results.data[results.data.length-1].inflationAdjusted.toLocaleString()}
                   </div>
                 )}
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Principal</div>
                 <div className="text-2xl font-bold text-slate-800">${results.totalPrincipal.toLocaleString()}</div>
                 <div className="text-xs text-slate-400 mt-1">Your contributions</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Interest</div>
                 <div className="text-2xl font-bold text-brand-600">${results.totalInterest.toLocaleString()}</div>
                 <div className="text-xs text-slate-400 mt-1">Compound growth</div>
              </div>
           </div>

           {/* Chart */}
           <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Growth Trajectory</h3>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                       <defs>
                          <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#64748b" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                       <XAxis 
                          dataKey="year" 
                          stroke="#94a3b8" 
                          tick={{fontSize: 12}}
                          tickLine={false}
                          axisLine={false}
                       />
                       <YAxis 
                          stroke="#94a3b8" 
                          tick={{fontSize: 12}}
                          tickFormatter={(val) => `$${val/1000}k`}
                          tickLine={false}
                          axisLine={false}
                       />
                       <Tooltip 
                          formatter={(val: number) => `$${val.toLocaleString()}`}
                          labelFormatter={(label) => `Year ${label}`}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                       />
                       <Legend verticalAlign="top" height={36}/>
                       <Area 
                          type="monotone" 
                          dataKey="balance" 
                          name="Total Balance"
                          stroke="#0284c7" 
                          fill="url(#colorInterest)" 
                          strokeWidth={2}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="principal" 
                          name="Principal Invested"
                          stroke="#64748b" 
                          fill="url(#colorPrincipal)" 
                          strokeWidth={2}
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Table */}
           <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
             <div className="p-4 bg-slate-50 border-b border-slate-100">
               <h3 className="font-bold text-slate-800">Yearly Breakdown</h3>
             </div>
             <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white sticky top-0 shadow-sm z-10">
                    <tr className="text-xs uppercase text-slate-500 font-semibold">
                      <th className="px-6 py-3">Year</th>
                      <th className="px-6 py-3">Principal</th>
                      <th className="px-6 py-3 text-brand-600">Interest</th>
                      <th className="px-6 py-3 text-right">Total Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {results.data.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50">
                        <td className="px-6 py-3 text-slate-900 font-medium">{row.year}</td>
                        <td className="px-6 py-3 text-slate-600">${row.principal.toLocaleString()}</td>
                        <td className="px-6 py-3 text-brand-600 font-medium">+${row.interest.toLocaleString()}</td>
                        <td className="px-6 py-3 text-right font-bold text-slate-900">${row.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
};
