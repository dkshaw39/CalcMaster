
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { StandardCalculator } from './components/StandardCalculator';
import { CasioCalculator } from './components/CasioCalculator';
import { CasioScientificCalculator } from './components/CasioScientificCalculator';
import { CasioBasicScientificCalculator } from './components/CasioBasicScientificCalculator';
import { CalculatorList } from './components/CalculatorList';
import { Sidebar } from './components/Sidebar';
import { MortgageCalculator } from './components/MortgageCalculator';
import { BMICalculator } from './components/BMICalculator';
import { CalorieCalculator } from './components/CalorieCalculator';
import { LoanCalculator } from './components/LoanCalculator';
import { AutoLoanCalculator } from './components/AutoLoanCalculator';
import { DateCalculator } from './components/DateCalculator';
import { RetirementCalculator } from './components/RetirementCalculator';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { SalaryCalculator } from './components/SalaryCalculator';
import { SalesTaxCalculator } from './components/SalesTaxCalculator';
import { PercentageCalculator } from './components/PercentageCalculator';
import { RandomNumberGenerator } from './components/RandomNumberGenerator';
import { FractionCalculator } from './components/FractionCalculator';
import { GeometryCalculator } from './components/GeometryCalculator';
import { UnitConverter } from './components/UnitConverter';
import { GPACalculator } from './components/GPACalculator';
import { PasswordGenerator } from './components/PasswordGenerator';
import { PregnancyCalculator } from './components/PregnancyCalculator';
import { BodyFatCalculator } from './components/BodyFatCalculator';
import { BMRCalculator } from './components/BMRCalculator';
import { InflationCalculator } from './components/InflationCalculator';
import { PaceCalculator } from './components/PaceCalculator';
import { ConcreteCalculator } from './components/ConcreteCalculator';
import { SubnetCalculator } from './components/SubnetCalculator';
import { CalculatorCategory } from './types';
import { SEO } from './components/SEO';
import { 
  Calculator, DollarSign, Activity, Menu, Grid, X, MoreVertical
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
      { label: 'Investment Calculator', path: '/investment' },
      { label: 'Inflation Calculator', path: '/inflation' },
      { label: 'Salary Calculator', path: '/salary' },
      { label: 'Sales Tax Calculator', path: '/sales-tax' },
    ]
  },
  {
    title: 'Fitness & Health',
    icon: <Activity className="w-5 h-5" />,
    items: [
      { label: 'BMI Calculator', path: '/bmi' },
      { label: 'Calorie Calculator', path: '/calorie' },
      { label: 'Body Fat Calculator', path: '/body-fat' }, 
      { label: 'BMR Calculator', path: '/bmr' },
      { label: 'Pace Calculator', path: '/pace' },
      { label: 'Pregnancy Calculator', path: '/pregnancy' },
    ]
  },
  {
    title: 'Math & Others',
    icon: <Calculator className="w-5 h-5" />,
    items: [
      { label: 'Casio Basic (Desk)', path: '/casio' },
      { label: 'Casio Scientific (ES PLUS)', path: '/casio-scientific' },
      { label: 'Casio Scientific (fx-82MS)', path: '/casio-basic-scientific' },
      { label: 'Percentage Calculator', path: '/percentage' },
      { label: 'Random Number', path: '/random' },
      { label: 'Fraction Calculator', path: '/fraction' },
      { label: 'Geometry Calculator', path: '/geometry' },
      { label: 'Unit Converter', path: '/unit-converter' },
      { label: 'Date Calculator', path: '/date' },
      { label: 'GPA Calculator', path: '/gpa' },
      { label: 'Password Generator', path: '/password' },
      { label: 'Concrete Calculator', path: '/concrete' },
      { label: 'Subnet Calculator', path: '/subnet' },
    ]
  }
];

// Top Navigation Items
const topNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Casio Basic', path: '/casio' },
  { label: 'Casio Scientific', path: '/casio-scientific' },
  { label: 'Casio Scientific (MS)', path: '/casio-basic-scientific' },
];

const Header: React.FC<{
  onMenuClick: () => void;
  onMobileNavClick: () => void;
  isMobileNavOpen: boolean;
}> = ({ onMenuClick, onMobileNavClick, isMobileNavOpen }) => {
  return (
    <header className="sticky top-0 z-30 glass-nav shadow-sm h-14 md:h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-600 text-white p-1.5 md:p-2 rounded-lg group-hover:bg-brand-700 transition shadow-sm">
              <Calculator className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </div>
            <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              CalcMaster<span className="text-brand-600">Pro</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {topNavItems.map(item => (
            <Link 
              key={item.label}
              to={item.path}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden">
            <button
              onClick={onMobileNavClick}
              className={`p-2 rounded-lg transition-colors ${isMobileNavOpen ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
               {isMobileNavOpen ? <X size={24}/> : <MoreVertical size={24}/>}
            </button>
        </div>
      </div>
      
      {/* Mobile Collapsible Nav */}
      <div className={`md:hidden bg-white border-b border-slate-100 overflow-hidden transition-all duration-300 ${isMobileNavOpen ? 'max-h-64' : 'max-h-0'}`}>
         <div className="flex flex-col p-2 space-y-1">
            {topNavItems.map(item => (
              <Link 
                key={item.label}
                to={item.path}
                onClick={onMobileNavClick}
                className="px-4 py-3 text-sm font-bold text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}
         </div>
      </div>
    </header>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onMenuClick={() => setSidebarOpen(true)} 
        onMobileNavClick={() => setMobileNavOpen(!mobileNavOpen)}
        isMobileNavOpen={mobileNavOpen}
      />
      
      <div className="flex flex-1 relative max-w-7xl mx-auto w-full">
        <Sidebar 
          categories={categories} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <main className="flex-1 w-full p-3 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 py-8 md:py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CalcMaster Pro. Free online calculators for everyone.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-slate-400">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <div className="space-y-6 animate-fade-in">
              <SEO 
                title="Free Online Scientific Calculator" 
                description="Advanced free online scientific calculator with trigonometry, logarithms, fractions, and more. Similar to Casio fx-991ES and TI-84. No download required."
                keywords="scientific calculator, online calculator, trigonometry, free calculator, math solver, casio online"
              />
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Scientific <span className="text-brand-600">Calculator</span>
                </h1>
              </div>

              <StandardCalculator />
              
              <div className="mt-12">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Grid className="text-brand-600"/> All Calculators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categories.map((cat) => (
                    <CalculatorList key={cat.title} category={cat} />
                  ))}
                </div>
              </div>
            </div>
          } />

          {/* Calculator Routes */}
          <Route path="/casio" element={<CasioCalculator />} />
          <Route path="/casio-scientific" element={<CasioScientificCalculator />} />
          <Route path="/casio-basic-scientific" element={<CasioBasicScientificCalculator />} />
          
          <Route path="/mortgage" element={<MortgageCalculator />} />
          <Route path="/loan" element={<LoanCalculator />} />
          <Route path="/car-loan" element={<AutoLoanCalculator />} />
          
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/calorie" element={<CalorieCalculator />} />
          <Route path="/body-fat" element={<BodyFatCalculator />} />
          <Route path="/bmr" element={<BMRCalculator />} />
          <Route path="/pregnancy" element={<PregnancyCalculator />} />
          <Route path="/pace" element={<PaceCalculator />} />

          <Route path="/salary" element={<SalaryCalculator />} />
          <Route path="/sales-tax" element={<SalesTaxCalculator />} />
          <Route path="/retirement" element={<RetirementCalculator />} />
          <Route path="/investment" element={<InvestmentCalculator />} />
          <Route path="/inflation" element={<InflationCalculator />} />

          <Route path="/percentage" element={<PercentageCalculator />} />
          <Route path="/random" element={<RandomNumberGenerator />} />
          <Route path="/fraction" element={<FractionCalculator />} />
          <Route path="/geometry" element={<GeometryCalculator />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/date" element={<DateCalculator />} />
          <Route path="/gpa" element={<GPACalculator />} />
          <Route path="/password" element={<PasswordGenerator />} />
          <Route path="/concrete" element={<ConcreteCalculator />} />
          <Route path="/subnet" element={<SubnetCalculator />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
