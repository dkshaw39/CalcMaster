
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calendar, DollarSign, Percent, Clock, Car } from 'lucide-react';
import { format, addMonths } from 'date-fns';

interface AmortizationRow {
  date: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export const AutoLoanCalculator: React.FC = () => {
  // Auto Loan Specific Inputs
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [interestRate, setInterestRate] = useState(6.5); // APR
  const [loanTermMonths, setLoanTermMonths] = useState(60); // Standard car loan terms are in months (36, 48, 60, 72)
  const [salesTaxRate, setSalesTaxRate] = useState(7.0);
  const [fees, setFees] = useState(450); // Title, Reg, Doc fees
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const [showSchedule, setShowSchedule] = useState(false);

  // Calculations
  const calculations = useMemo(() => {
    // Logic: Sales Tax is often calculated on (Price - TradeIn) in many states.
    // We will assume tax is calculated on the net price after trade-in for a generic "Advanced" calculator.
    const taxableAmount = Math.max(0, vehiclePrice - tradeInValue);
    const salesTaxAmount = taxableAmount * (salesTaxRate / 100);
    
    // Total Price of the car "out the door" before down payment
    const totalPrice = vehiclePrice + salesTaxAmount + fees;
    
    // Amount to Finance
    // (Vehicle Price + Tax + Fees) - Down Payment - Trade In
    // Note: Trade In is already subtracted from price effectively, but purely for financing amount:
    // Amount = (Vehicle Price + Tax + Fees) - Down Payment - Trade In
    let loanAmount = (vehiclePrice + salesTaxAmount + fees) - downPayment - tradeInValue;
    if (loanAmount < 0) loanAmount = 0;

    const principal = loanAmount;
    const annualRate = interestRate / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = loanTermMonths;
    
    let monthlyPayment = 0;

    if (interestRate === 0) {
      monthlyPayment = principal / totalMonths;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)) monthlyPayment = 0;

    // Generate Schedule
    const schedule: AmortizationRow[] = [];
    let currentBalance = principal;
    let totalInterest = 0;
    const start = new Date(startDate);

    for (let i = 1; i <= totalMonths; i++) {
      const interestPayment = currentBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      currentBalance -= principalPayment;
      
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
      salesTaxAmount,
      loanAmount,
      monthlyPayment,
      totalPayment: monthlyPayment * totalMonths,
      totalInterest,
      schedule,
      totalCost: totalPrice // Total cost of vehicle including cash paid
    };
  }, [vehiclePrice, downPayment, tradeInValue, interestRate, loanTermMonths, salesTaxRate, fees, startDate]);

  // Chart Data
  const pieData = [
    { name: 'Loan Principal', value: calculations.loanAmount },
    { name: 'Total Interest', value: calculations.totalInterest },
  ];
  
  const COLORS = ['#0284c7', '#f59e0b'];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Section for SEO */}
      <header className="text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Car Loan Calculator</h1>
        <p className="text-slate-500 max-w-3xl mx-auto">
          Use our free <strong>Car Loan Calculator</strong> to estimate your monthly car payments. 
          Factor in trade-in value, sales tax, dealer fees, and interest rates to find the true cost of your next vehicle.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-brand-600 rounded-full"></span>
            Vehicle Details
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Price</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition">
                  <Car size={18} />
                </div>
                <input 
                  type="number" 
                  value={vehiclePrice} 
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Down Payment</label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><DollarSign size={16}/></div>
                   <input 
                    type="number" 
                    value={downPayment} 
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-8 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Trade-in Value</label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><DollarSign size={16}/></div>
                   <input 
                    type="number" 
                    value={tradeInValue} 
                    onChange={(e) => setTradeInValue(Number(e.target.value))}
                    className="w-full pl-8 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sales Tax (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={salesTaxRate} 
                  onChange={(e) => setSalesTaxRate(Number(e.target.value))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fees (Title, Reg, Doc)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input 
                  type="number" 
                  value={fees} 
                  onChange={(e) => setFees(Number(e.target.value))}
                  className="w-full pl-8 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Loan Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Interest (APR)</label>
                    <div className="relative">
                       <input 
                        type="number" 
                        step="0.1"
                        value={interestRate} 
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Term (Months)</label>
                    <select 
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition font-medium"
                    >
                        <option value={36}>36 Months</option>
                        <option value={48}>48 Months</option>
                        <option value={60}>60 Months</option>
                        <option value={72}>72 Months</option>
                        <option value={84}>84 Months</option>
                    </select>
                  </div>
                </div>
            </div>
            
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Payment Date</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Calendar size={16}/></div>
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
                  <Car size={80} />
                </div>
                <div className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-2">Monthly Payment</div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight">
                  ${calculations.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-slate-400 mt-1">For {loanTermMonths} months</div>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-2">Total Interest</div>
                <div className="text-2xl font-bold text-amber-500">
                  ${calculations.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-slate-400 mt-2">Cost of financing</div>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-2">Loan Amount</div>
                <div className="text-2xl font-bold text-brand-600">
                  ${calculations.loanAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-slate-400 mt-2">After down payment & trade-in</div>
             </div>
          </div>

          {/* Breakdown Section */}
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                 <h3 className="text-lg font-semibold text-slate-800 mb-4">Total Cost Breakdown</h3>
                 <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                       <span className="text-slate-600">Vehicle Price</span>
                       <span className="font-semibold text-slate-900">${vehiclePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                       <span className="text-slate-600">Sales Tax ({salesTaxRate}%)</span>
                       <span className="font-semibold text-slate-900">+ ${Math.round(calculations.salesTaxAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                       <span className="text-slate-600">Fees</span>
                       <span className="font-semibold text-slate-900">+ ${fees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                       <span className="text-slate-600">Down Payment</span>
                       <span className="font-semibold text-green-600">- ${downPayment.toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                       <span className="text-slate-600">Trade-in Value</span>
                       <span className="font-semibold text-green-600">- ${tradeInValue.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-slate-200 my-2 pt-2 flex justify-between items-center font-bold">
                       <span className="text-slate-800">Amount Financed</span>
                       <span className="text-brand-600 text-lg">${Math.round(calculations.loanAmount).toLocaleString()}</span>
                    </div>
                 </div>
             </div>

             <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Principal vs Interest</h3>
                <div className="flex-1 w-full min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${Math.round(value).toLocaleString()}`} />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
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
             <p className="text-sm text-slate-500">Monthly breakdown of your car loan</p>
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
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Your Car Loan</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Financing a vehicle involves more than just looking at the sticker price. Our <strong>Car Loan Calculator</strong> helps you find your actual monthly payment by including sales tax, dealer fees, and the value of your trade-in vehicle.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-800 mb-2">How Interest (APR) Affects Payments</h3>
               <p className="text-slate-600 text-sm leading-relaxed">
                 The Annual Percentage Rate (APR) is the interest you pay on the loan. A lower credit score often results in a higher APR, which significantly increases your monthly payment and total cost over the life of the loan.
               </p>
            </div>
            <div>
               <h3 className="text-lg font-bold text-slate-800 mb-2">Trade-In & Down Payment</h3>
               <p className="text-slate-600 text-sm leading-relaxed">
                 Putting money down or trading in an old vehicle reduces the <strong>Principal Loan Amount</strong>. This not only lowers your monthly payment but also reduces the total amount of interest you will pay. In many states, the trade-in value is also deducted from the taxable price of the car, saving you money on sales tax.
               </p>
            </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2">Common Car Loan Terms</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
           <li><strong>36 Months (3 Years):</strong> Higher monthly payments, but lowest total interest.</li>
           <li><strong>60 Months (5 Years):</strong> The standard car loan term. Balanced payments and interest.</li>
           <li><strong>72-84 Months (6-7 Years):</strong> Lower monthly payments, but significantly higher total interest cost.</li>
        </ul>
      </article>

    </div>
  );
};
