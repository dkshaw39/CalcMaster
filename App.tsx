
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
  Calculator, DollarSign, Activity, Menu, Grid, X, MoreVertical, LayoutGrid
} from 'lucide-react';

// Data Configuration for "All Calculators"
const categories: CalculatorCategory[] = [
  {
    title: 'Financial Tools',
    icon: <DollarSign className="w-6 h-6" />,
    items: [
      { label: 'Mortgage Calculator', path: '/mortgage' },
      { label: 'Loan Calculator', path: '/loan' },
      { label: 'Car Loan Calculator', path: '/car-loan' },
      { label: 'Retirement Planner', path: '/retirement' },
      { label: 'Investment Calculator', path: '/investment' },
      { label: 'Inflation Calculator', path: '/inflation' },
      { label: 'Salary Calculator', path: '/salary' },
      { label: 'Sales Tax Calculator', path: '/sales-tax' },
    ]
  },
  {
    title: 'Health & Fitness',
    icon: <Activity className="w-6 h-6" />,
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
    icon: <Calculator className="w-6 h-6" />,
    items: [
      { label: 'Casio Basic (Desk)', path: '/casio' },
      { label: 'Casio Scientific (ES)', path: '/casio-scientific' },
      { label: 'Casio Scientific (MS)', path: '/casio-basic-scientific' },
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
    <header className="sticky top-0 z-50 glass-nav shadow-sm h-14 md:h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative z-50 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-600 text-white p-1.5 md:p-2 rounded-lg group-hover:bg-brand-700 transition shadow-sm">
              <Calculator className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </div>
            <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
              Calc<span className="text-brand-600">Master</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav - Visible on MD and up */}
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

        {/* Mobile Nav Toggle - Hidden on MD and up */}
        <div className="flex items-center md:hidden">
            <button
              onClick={onMobileNavClick}
              className={`p-2 rounded-lg transition-colors ${isMobileNavOpen ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
               {isMobileNavOpen ? <X size={24}/> : <MoreVertical size={24}/>}
            </button>
        </div>
      </div>
      
      {/* Mobile Collapsible Nav - Absolute Position */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-300 z-40 origin-top ${isMobileNavOpen ? 'max-h-64 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95 pointer-events-none'}`}>
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
  const location = useLocation();

  // Exclusive Toggling logic
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) setMobileNavOpen(false); // Close top nav if opening sidebar
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
    if (!mobileNavOpen) setSidebarOpen(false); // Close sidebar if opening top nav
  };

  // Determine if we need a wider container for complex dashboards
  const isDashboardPage = [
    '/', 
    '/investment', 
    '/retirement', 
    '/mortgage', 
    '/loan', 
    '/car-loan', 
    '/salary',
    '/sales-tax',
    '/inflation',
    '/bmi',
    '/calorie',
    '/body-fat',
    '/bmr',
    '/pregnancy',
    '/pace',
    '/concrete',
    '/subnet',
    '/geometry',
    '/date',
    '/password',
    '/unit-converter',
    '/random',
    '/fraction',
    '/percentage',
    '/gpa',
    '/casio',
    '/casio-scientific',
    '/casio-basic-scientific'
  ].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onMenuClick={toggleSidebar} 
        onMobileNavClick={toggleMobileNav}
        isMobileNavOpen={mobileNavOpen}
      />
      
      <div className={`flex flex-1 relative w-full mx-auto ${isDashboardPage ? 'max-w-[1920px]' : 'max-w-7xl'}`}>
        <Sidebar 
          categories={categories} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Responsive padding */}
        <main className={`flex-1 w-full p-2 md:p-3 lg:p-4 overflow-x-hidden ${isDashboardPage ? 'xl:px-12' : ''}`}>
          {children}
        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 py-4 md:py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CalcMaster. Free online calculators for everyone.
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
            <div className="space-y-4 animate-fade-in">
              <SEO 
                title="Free Online Scientific Calculator" 
                description="Advanced free online scientific calculator with trigonometry, logarithms, fractions, and more. Similar to Casio fx-991ES and TI-84. No download required."
                keywords="scientific calculator, online calculator, trigonometry, free calculator, math solver, casio online"
              />
              <div className="text-center mb-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Scientific <span className="text-brand-600">Calculator</span>
                </h1>
              </div>

              <div className="max-w-4xl mx-auto">
                <StandardCalculator />
              </div>
              
              <div className="mt-12 md:mt-20 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8 px-2">
                  <div className="h-8 w-1.5 bg-brand-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                    Browse All Calculators
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
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
