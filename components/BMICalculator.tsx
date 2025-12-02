
import React, { useState } from 'react';
import { Activity, Info, Scale } from 'lucide-react';
import { SEO } from './SEO';

export const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  // Imperial specific inputs (converted to metric for calculation)
  const [weightLbs, setWeightLbs] = useState(154);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);

  const calculate = () => {
    let w = unit === 'metric' ? weight : weightLbs * 0.453592;
    let h = unit === 'metric' ? height : (heightFt * 30.48) + (heightIn * 2.54);
    
    // Safety check
    if (h <= 0 || w <= 0) return { bmi: 0, pi: 0, ideal: { min: 0, max: 0 } };

    const hM = h / 100; // height in meters

    // 1. BMI
    const bmi = w / (hM * hM);

    // 2. Ponderal Index (kg/m^3)
    const pi = w / (hM * hM * hM);

    // 3. Ideal Weight Formulas (Devine)
    // Male: 50kg + 2.3kg * (heightInInches - 60)
    // Female: 45.5kg + 2.3kg * (heightInInches - 60)
    const heightInInches = h * 0.393701;
    let idealBase = 0;
    
    // Devine Formula
    if (gender === 'male') {
        idealBase = 50 + 2.3 * (heightInInches - 60);
    } else {
        idealBase = 45.5 + 2.3 * (heightInInches - 60);
    }

    // Healthy BMI Range (18.5 - 25) reverse calc
    const minHealthy = 18.5 * (hM * hM);
    const maxHealthy = 25 * (hM * hM);

    return {
        bmi,
        pi,
        idealDevine: idealBase,
        healthyRange: { min: minHealthy, max: maxHealthy }
    };
  };

  const stats = calculate();

  const getStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-200', panel: 'bg-blue-50' };
    if (bmi < 25) return { label: 'Normal Weight', color: 'text-green-500', bg: 'bg-green-500', border: 'border-green-200', panel: 'bg-green-50' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-200', panel: 'bg-orange-50' };
    return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-500', border: 'border-red-200', panel: 'bg-red-50' };
  };

  const status = getStatus(stats.bmi);

  // Meter Needle Rotation (0 to 180 deg)
  // Scale: 15 (0deg) to 40 (180deg)
  const getRotation = (bmi: number) => {
      const minVal = 15;
      const maxVal = 40;
      const clamped = Math.max(minVal, Math.min(maxVal, bmi));
      return ((clamped - minVal) / (maxVal - minVal)) * 180;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <SEO 
        title="BMI Calculator - Body Mass Index"
        description="Calculate your Body Mass Index (BMI) and find your ideal weight range. Determine if you are underweight, normal weight, or overweight."
        keywords="bmi calculator, body mass index, ideal weight calculator, healthy weight range, bmi chart"
      />
      <header className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-900">BMI <span className="text-brand-600">Calculator</span></h1>
        <p className="text-sm text-slate-500 mt-1">Check your Body Mass Index and ideal weight.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
         
         {/* Inputs */}
         <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 h-fit">
            <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
               <Scale className="text-brand-600"/> Body Measurements
            </h2>
            
            <div className="space-y-6">
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button onClick={() => setUnit('metric')} className={`flex-1 py-2 rounded-md font-bold transition ${unit === 'metric' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Metric</button>
                    <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 rounded-md font-bold transition ${unit === 'imperial' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Imperial</button>
                </div>
                
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-md font-bold transition ${gender === 'male' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Male</button>
                    <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-md font-bold transition ${gender === 'female' ? 'bg-white shadow text-brand-600' : 'text-slate-500'}`}>Female</button>
                </div>

                {unit === 'metric' ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Height (cm)</label>
                            <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Weight (kg)</label>
                            <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Height</label>
                            <div className="flex gap-2">
                                <input type="number" placeholder="ft" value={heightFt} onChange={e => setHeightFt(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                                <input type="number" placeholder="in" value={heightIn} onChange={e => setHeightIn(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Weight (lbs)</label>
                            <input type="number" value={weightLbs} onChange={e => setWeightLbs(Number(e.target.value))} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700"/>
                        </div>
                    </div>
                )}
            </div>
         </div>

         {/* Results */}
         <div className="space-y-6">
            
            {/* Main Gauge Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center relative overflow-hidden">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Your BMI</h3>
                
                {/* Gauge Visualization */}
                <div className="relative h-32 w-64 mx-auto mb-4 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full rounded-t-full bg-gradient-to-r from-blue-400 via-green-400 to-red-500 opacity-20"></div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-t-full border-[20px] border-slate-100 border-b-0"></div>
                    {/* Tick Marks (Simplified CSS) */}
                    <div 
                        className="absolute bottom-0 left-1/2 w-1 h-32 origin-bottom bg-slate-800 transition-transform duration-700 ease-out"
                        style={{ transform: `translateX(-50%) rotate(${getRotation(stats.bmi) - 90}deg)` }}
                    >
                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                    </div>
                </div>

                <div className="text-6xl font-extrabold tracking-tighter text-slate-900 mb-2">
                    {stats.bmi.toFixed(1)}
                </div>
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${status.panel} ${status.color}`}>
                    {status.label}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-bold uppercase">
                        <Activity size={14}/> Healthy Weight
                    </div>
                    <div className="text-lg font-bold text-slate-800">
                        {Math.round(stats.healthyRange.min)} - {Math.round(stats.healthyRange.max)} <span className="text-sm font-normal text-slate-400">kg</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                     <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-bold uppercase">
                        <Info size={14}/> Ponderal Index
                    </div>
                    <div className="text-lg font-bold text-slate-800">
                        {stats.pi.toFixed(2)} <span className="text-sm font-normal text-slate-400">kg/m³</span>
                    </div>
                </div>
            </div>

            {/* Ideal Weight Box */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Ideal Weight</div>
                        <div className="text-3xl font-bold">
                            {Math.round(stats.idealDevine)} <span className="text-lg text-slate-500">kg</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Based on Devine Formula (1974)</div>
                    </div>
                    <div className="text-right">
                         <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Prime</div>
                         <div className="text-2xl font-bold text-brand-400">{(stats.bmi / 25).toFixed(2)}</div>
                    </div>
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};
