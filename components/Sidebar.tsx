
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalculatorCategory } from '../types';
import { ChevronRight } from 'lucide-react';

interface SidebarProps {
  categories: CalculatorCategory[];
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`
          fixed top-16 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200 overflow-y-auto transform transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:h-[calc(100vh-4rem)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 space-y-6">
           {categories.map((cat) => (
             <div key={cat.title}>
               <div className="flex items-center gap-2 mb-2 px-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
                 <span className="text-brand-600">{cat.icon}</span>
                 {cat.title}
               </div>
               <ul className="space-y-0.5">
                 {cat.items.map(item => {
                   const isActive = location.pathname === item.path;
                   
                   return (
                     <li key={item.label}>
                       <Link
                         to={item.path}
                         onClick={onClose}
                         className={`
                           flex items-center justify-between px-3 py-2 rounded text-sm transition-colors
                           ${isActive 
                             ? 'bg-brand-50 text-brand-700 font-medium' 
                             : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                         `}
                       >
                         {item.label}
                         {isActive && <ChevronRight className="w-3 h-3" />}
                       </Link>
                     </li>
                   );
                 })}
               </ul>
             </div>
           ))}
        </div>
      </aside>
    </>
  );
};
