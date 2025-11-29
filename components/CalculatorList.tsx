
import React from 'react';
import { Link } from 'react-router-dom';
import { CalculatorCategory } from '../types';
import { ChevronRight } from 'lucide-react';

interface CalculatorListProps {
  category: CalculatorCategory;
}

export const CalculatorList: React.FC<CalculatorListProps> = ({ category }) => {
  return (
    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div className="text-brand-600">
           {category.icon}
        </div>
        <h3 className="font-bold text-slate-800 text-sm md:text-base">{category.title}</h3>
      </div>
      <ul className="divide-y divide-slate-100 text-sm">
        {category.items.map((item) => (
          <li key={item.label}>
            <Link 
              to={item.path}
              className="block px-4 py-2.5 text-slate-600 hover:bg-brand-50 hover:text-brand-700 hover:pl-5 transition-all duration-200 flex justify-between group"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-brand-400" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
