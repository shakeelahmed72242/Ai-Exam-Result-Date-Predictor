
import React, { useState, useEffect } from 'react';
import { countries, educationLevels, boards } from '../data/examData';
import type { Board } from '../types';

interface PredictorFormProps {
  onPredict: (board: Board) => void;
  isLoading: boolean;
}

const SelectField: React.FC<{
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    disabled?: boolean;
}> = ({ label, value, onChange, children, disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
        >
            {children}
        </select>
    </div>
);


export const PredictorForm: React.FC<PredictorFormProps> = ({ onPredict, isLoading }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedBoardId, setSelectedBoardId] = useState<string>('');
  const [availableBoards, setAvailableBoards] = useState<Board[]>([]);

  useEffect(() => {
    if (selectedCountry && selectedLevel) {
      const filteredBoards = boards.filter(
        (b) => b.country === selectedCountry && b.level === selectedLevel
      );
      setAvailableBoards(filteredBoards);
      setSelectedBoardId(''); // Reset board selection
    } else {
      setAvailableBoards([]);
    }
  }, [selectedCountry, selectedLevel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedBoard = boards.find((b) => b.id === selectedBoardId);
    if (selectedBoard) {
      onPredict(selectedBoard);
    }
  };
  
  const canSubmit = selectedCountry && selectedLevel && selectedBoardId && !isLoading;

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField label="Select Country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option value="" disabled>Choose a country</option>
                    {countries.map((c) => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                </SelectField>

                <SelectField label="Select Education Level" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} disabled={!selectedCountry}>
                    <option value="" disabled>Choose a level</option>
                    {educationLevels.map((l) => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                </SelectField>

                <SelectField label="Select Board/University" value={selectedBoardId} onChange={(e) => setSelectedBoardId(e.target.value)} disabled={availableBoards.length === 0}>
                    <option value="" disabled>Choose a board</option>
                    {availableBoards.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </SelectField>
            </div>
            
            <button
                type="submit"
                disabled={!canSubmit}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Predicting...
                    </>
                ) : 'Predict Result Date'}
            </button>
        </form>
    </div>
  );
};
