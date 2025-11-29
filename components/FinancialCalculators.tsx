
import React, { useState } from 'react';
import { Button } from './Button';

export const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [savings, setSavings] = useState(20000);
  const [contribution, setContribution] = useState(500);
  const [rate, setRate] = useState(7);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const years = retireAge - currentAge;
    const r = rate / 100 / 12;
    const n = years * 12;
    
    // Future value of initial savings
    const fvSavings = savings * Math.pow(1 + rate/100, years);
    
    // Future value of monthly contributions
    // FV = P * [((1+r)^n - 1) / r]
    const fvContrib = contribution * ((Math.pow(1 + r, n) - 1) / r);
    
    setResult(fvSavings + fvContrib);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Retirement Calculator</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Current Age</label>
             <input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500"/>
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Retirement Age</label>
             <input type="number" value={retireAge} onChange={e => setRetireAge(Number(e.target.value))} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500"/>
           </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Current Savings ($)</label>
          <input type="number" value={savings} onChange={e => setSavings(Number(e.target.value))} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Contribution ($)</label>
          <input type="number" value={contribution} onChange={e => setContribution(Number(e.target.value))} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Annual Return (%)</label>
          <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500"/>
        </div>
        <Button onClick={calculate} className="w-full">Calculate Retirement Fund</Button>
      </div>
      {result !== null && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100 text-center">
          <p className="text-slate-600 text-sm">Projected savings at age {retireAge}</p>
          <p className="text-3xl font-bold text-green-700">${Math.round(result).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export const SalaryCalculator: React.FC = () => {
  const [amount, setAmount] = useState(50000);
  const [period, setPeriod] = useState('year');

  const calculate = () => {
    let annual = amount;
    if (period === 'hour') annual = amount * 40 * 52;
    if (period === 'day') annual = amount * 5 * 52;
    if (period === 'week') annual = amount * 52;
    if (period === 'month') annual = amount * 12;

    return {
      annual,
      monthly: annual / 12,
      weekly: annual / 52,
      hourly: annual / 2080 // 40hrs * 52wks
    };
  };

  const results = calculate();

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Salary & Tax Estimator</h2>
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500"/>
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-slate-700 mb-1">Per</label>
          <select value={period} onChange={e => setPeriod(e.target.value)} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500 bg-white">
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between p-3 bg-slate-50 rounded">
          <span className="text-slate-600">Annual</span>
          <span className="font-bold text-slate-900">${results.annual.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
        </div>
        <div className="flex justify-between p-3 bg-white rounded border border-slate-100">
          <span className="text-slate-600">Monthly</span>
          <span className="font-bold text-slate-900">${results.monthly.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
        </div>
        <div className="flex justify-between p-3 bg-slate-50 rounded">
          <span className="text-slate-600">Weekly</span>
          <span className="font-bold text-slate-900">${results.weekly.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
        </div>
        <div className="flex justify-between p-3 bg-white rounded border border-slate-100">
          <span className="text-slate-600">Hourly</span>
          <span className="font-bold text-slate-900">${results.hourly.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
        </div>
      </div>
    </div>
  );
};

export const SalesTaxCalculator: React.FC = () => {
    const [amount, setAmount] = useState(100);
    const [taxRate, setTaxRate] = useState(7);
  
    const tax = amount * (taxRate / 100);
    const total = amount + tax;
  
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Sales Tax Calculator</h2>
        <div className="space-y-4">
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
             <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500"/>
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Tax Rate (%)</label>
             <input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-full p-2 border rounded-lg outline-none focus:border-brand-500"/>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
             <div className="p-4 bg-slate-50 rounded-lg text-center">
                <div className="text-xs text-slate-500 uppercase">Tax Amount</div>
                <div className="text-xl font-bold text-slate-800">${tax.toFixed(2)}</div>
             </div>
             <div className="p-4 bg-brand-50 rounded-lg text-center border border-brand-100">
                <div className="text-xs text-brand-600 uppercase">Total</div>
                <div className="text-xl font-bold text-brand-800">${total.toFixed(2)}</div>
             </div>
          </div>
        </div>
      </div>
    );
  };
