import React, { useState } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';

export default function WeeklyStudyScheduler() {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const shiftsOfDay = ['Morning (9AM)', 'Afternoon (1PM)', 'Evening (6PM)'];

  // Compound coordinate key map state initialization
  const [allocatedSlots, setAllocatedSlots] = useState<string[]>(['Mon-Evening (6PM)', 'Wed-Evening (6PM)']);

  const handleCellClickToggle = (dayString: string, shiftString: string) => {
    const matrixCoordinateKey = `${dayString}-${shiftString}`;
    setAllocatedSlots(prev => 
      prev.includes(matrixCoordinateKey) 
        ? prev.filter(key => key !== matrixCoordinateKey) 
        : [...prev, matrixCoordinateKey]
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
        <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Calendar size={16} /></div>
        <div>
          <h3 className="text-sm font-black text-gray-900">Study Routine Scheduler</h3>
          <p className="text-[10px] text-gray-400 font-medium">Allocate target review targets across specific calendar blocks to maintain streak velocity.</p>
        </div>
      </div>

      <div className="overflow-x-auto pr-1">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-[9px] font-black uppercase text-gray-400 pb-2 flex items-center gap-0.5"><Clock size={10} /> Time Slot</th>
              {daysOfWeek.map(day => (
                <th key={day} className="text-[9px] font-black uppercase text-gray-700 pb-2 text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shiftsOfDay.map(shift => (
              <tr key={shift} className="border-b border-gray-50 last:border-0 group">
                <td className="text-[10px] font-bold text-gray-500 py-3 tracking-tight">{shift}</td>
                {daysOfWeek.map(day => {
                  const targetCoordinate = `${day}-${shift}`;
                  const isCellSelected = allocatedSlots.includes(targetCoordinate);

                  return (
                    <td key={day} className="p-1 text-center">
                      <div 
                        onClick={() => handleCellClickToggle(day, shift)}
                        className={`mx-auto w-6 h-6 rounded-lg border flex items-center justify-center cursor-pointer transition ${
                          isCellSelected 
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xs' 
                            : 'bg-white border-gray-200 hover:border-indigo-300'
                        }`}
                        title={`Toggle study block for ${day} during ${shift}`}
                      >
                        {isCellSelected && <Check size={10} strokeWidth={3} />}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}