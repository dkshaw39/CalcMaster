
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { StandardCalculator } from './components/StandardCalculator';
import { CalculatorList } from './components/CalculatorList';
import { Sidebar } from './components/Sidebar';
import { MortgageCalculator } from './components/MortgageCalculator';
import { BMICalculator } from './components/BMICalculator';
import { CalorieCalculator } from './components/CalorieCalculator';
import { LoanCalculator } from './components/LoanCalculator';
import { AutoLoanCalculator } from './components/AutoLoanCalculator';
import { DateCalculator } from './components/DateCalculator';
import { RetirementCalculator, SalaryCalculator, SalesTaxCalculator } from './components/FinancialCalculators';
import { PercentageCalculator, RandomNumberGenerator, FractionCalculator } from './components/MathCalculators';
import { GeometryCalculator } from './components/GeometryCalculator';
import { UnitConverter } from './components/UnitConverter';
import { GPACalculator } from './components/GPACalculator';
import { PasswordGenerator } from './components/PasswordGenerator';
import { PregnancyCalculator } from './components/PregnancyCalculator';
import { CalculatorCategory } from './types';
import { 
  Calculator, DollarSign, Activity, Menu, Grid
} from 'lucide-react';

// Data Configuration for "All Calculators"
const categories: CalculatorCategory[] = [
  {
    title: 'Financial',
    icon: <DollarSign className="w-5 h-5" />,
    items: [
      { label: 'Mortgage Calculator', path: '/mortgage' },
      { label: 'Loan Calculator', path: '/loan' },
      { label: 'Car Loan Calculator', path: '/car-loan' },
      { label: 'Retirement Calculator', path: '/retirement' },
      { label: 'Investment Calculator', path: '/retirement' },
      { label: 'Salary Calculator', path: '/salary' },
      { label: 'Sales Tax Calculator', path: '/sales-tax' },
      { label: 'Income Tax Calculator', path: '/salary' },
    ]
  },
  {
    title: 'Fitness & Health',
    icon: <Activity className="w-5 h-5" />,
    items: [
      { label: 'BMI Calculator', path: '/bmi' },
      { label: 'Calorie Calculator', path: '/calorie' },
      { label: 'Body Fat Calculator', path: '/bmi' }, 
      { label: 'BMR Calculator', path: '/calorie' },
      { label: 'Pregnancy Calculator', path: '/pregnancy' },
      { label: 'Due Date Calculator', path: '/pregnancy' },
    ]
  },
  {
    title: 'Math',
    icon: <Calculator className="w-5 h-5" />,
    items: [
      { label: 'Scientific Calculator', path: '/' },
      { label: 'Percentage Calculator', path: '/percentage' },
      { label: 'Random Number Generator', path: '/random' },
      { label: 'Fraction Calculator', path: '/fraction' },
      { label: 'Triangle Calculator', path: '/geometry' },
      { label: 'Volume Calculator', path: '/geometry' },
      { label: 'Area Calculator', path: '/geometry' },
    ]
  },
  {
    title: 'Other',
    icon: <Grid className="w-5 h-5" />,
    items: [
      { label: 'Age Calculator', path: '/date' },
      { label: 'Date Calculator', path: '/date' },
      { label: 'GPA Calculator', path: '/gpa' },
      { label: 'Password Generator', path: '/password' },
      { label: 'Unit Conversion', path: '/converter' },
    ]
  }
];

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="sticky top-0 z-50 glass-nav h-14 md:h-16">
    <div className="max-w-screen-2xl mx-auto px-4 h-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-600 p-1.5 rounded text-white shadow-sm">
            <Calculator className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            Calc<span className="text-brand-600">Master</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <Link to="/" className="hover:text-brand-600 transition">Home</Link>
        <Link to="/mortgage" className="hover:text-brand-600 transition">Financial</Link>
        <Link to="/bmi" className="hover:text-brand-600 transition">Health</Link>
        <Link to="/converter" className="hover:text-brand-600 transition">Converter</Link>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 mt-auto py-12 text-sm text-slate-500">
    <div className="max-w-screen-2xl mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div>
        <div className="font-bold text-slate-900 mb-4 flex items-center gap-2">
           <Calculator className="w-4 h-4" /> CalcMaster
        </div>
        <p className="mb-4">
          The ultimate collection of free online calculators. Accurate, fast, and designed for professionals.
        </p>
        <div>© 2025 CalcMaster Pro</div>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link to="/" className="hover:text-brand-600">Scientific Calculator</Link></li>
          <li><Link to="/mortgage" className="hover:text-brand-600">Mortgage Calculator</Link></li>
          <li><Link to="/bmi" className="hover:text-brand-600">BMI Calculator</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-brand-600">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-brand-600">Terms of Use</a></li>
          <li><a href="#" className="hover:text-brand-600">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Hero / Scientific Calculator */}
    <section className="bg-white rounded-xl shadow-tool border border-slate-200 p-2 md:p-5">
      <div className="text-center mb-3">
        <h1 className="text-lg md:text-2xl font-bold text-slate-900 mb-1">Free Online Scientific Calculator</h1>
        <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto hidden md:block">
          A comprehensive tool for basic math, algebra, trigonometry, and calculus.
        </p>
      </div>
      <StandardCalculator />
    </section>

    {/* All Calculators Grid */}
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Grid className="w-5 h-5 text-brand-600" /> All Calculators
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {categories.map((cat) => (
          <CalculatorList key={cat.title} category={cat} />
        ))}
      </div>
    </section>
  </div>
);

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">
        {/* Sidebar */}
        <Sidebar 
          categories={categories} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main Content */}
        <main className="flex-1 p-2 md:p-6 min-w-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/mortgage" element={<MortgageCalculator />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/calorie" element={<CalorieCalculator />} />
            <Route path="/loan" element={<LoanCalculator />} />
            <Route path="/car-loan" element={<AutoLoanCalculator />} />
            <Route path="/date" element={<DateCalculator />} />
            
            <Route path="/retirement" element={<RetirementCalculator />} />
            <Route path="/salary" element={<SalaryCalculator />} />
            <Route path="/sales-tax" element={<SalesTaxCalculator />} />
            
            <Route path="/percentage" element={<PercentageCalculator />} />
            <Route path="/random" element={<RandomNumberGenerator />} />
            <Route path="/fraction" element={<FractionCalculator />} />
            <Route path="/geometry" element={<GeometryCalculator />} />
            
            <Route path="/converter" element={<UnitConverter />} />
            <Route path="/gpa" element={<GPACalculator />} />
            <Route path="/password" element={<PasswordGenerator />} />
            <Route path="/pregnancy" element={<PregnancyCalculator />} />

            {/* Catch all other routes and redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
