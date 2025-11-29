
import React, { useState } from 'react';
import { Button } from './Button';
import { Trash2, Plus } from 'lucide-react';

interface Course {
    id: number;
    credits: number;
    grade: string;
}

const gradePoints: any = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };

export const GPACalculator: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, credits: 3, grade: 'A' },
        { id: 2, credits: 3, grade: 'B' },
        { id: 3, credits: 3, grade: 'A' },
    ]);

    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), credits: 3, grade: 'A' }]);
    };

    const removeCourse = (id: number) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id: number, field: keyof Course, val: any) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: val } : c));
    };

    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const weightedPoints = courses.reduce((sum, c) => sum + (c.credits * gradePoints[c.grade]), 0);
    const gpa = totalCredits ? (weightedPoints / totalCredits).toFixed(2) : '0.00';

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-slate-800">GPA Calculator</h2>
                 <div className="text-right">
                     <div className="text-xs text-slate-500 uppercase font-semibold">Your GPA</div>
                     <div className="text-3xl font-bold text-brand-600">{gpa}</div>
                 </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="grid grid-cols-[1fr,1fr,auto] gap-4 text-xs font-bold text-slate-500 uppercase px-2">
                    <div>Grade</div>
                    <div>Credits</div>
                    <div></div>
                </div>
                {courses.map(c => (
                    <div key={c.id} className="grid grid-cols-[1fr,1fr,auto] gap-4 items-center">
                        <select 
                            value={c.grade} 
                            onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
                            className="p-2 border rounded"
                        >
                            {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <input 
                            type="number" 
                            value={c.credits} 
                            onChange={(e) => updateCourse(c.id, 'credits', Number(e.target.value))}
                            className="p-2 border rounded"
                        />
                        <button onClick={() => removeCourse(c.id)} className="text-red-400 hover:text-red-600 p-2">
                            <Trash2 className="w-4 h-4"/>
                        </button>
                    </div>
                ))}
            </div>

            <Button onClick={addCourse} variant="secondary" className="w-full flex items-center gap-2">
                <Plus className="w-4 h-4"/> Add Course
            </Button>
        </div>
    );
};
