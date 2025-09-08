
import React from 'react';
import type { PredictionResult, Board } from '../types';

interface ResultDisplayProps {
  board: Board | null;
  result: PredictionResult | null;
  isLoading: boolean;
}

const InfoCard: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
        <div className="mt-2">{children}</div>
    </div>
);

const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-100 rounded-lg">
        <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-slate-600 font-medium">AI is analyzing historical data...</p>
    </div>
);

const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString + 'T00:00:00'); // Assume UTC to avoid timezone issues
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
    } catch(e) {
        return "Invalid Date";
    }
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ board, result, isLoading }) => {
  if (isLoading) {
    return <div className="mt-12"><Loader /></div>;
  }

  if (!result || !board) {
    return null;
  }
  
  const confidenceColor = result.confidence > 80 ? 'text-green-600' : result.confidence > 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="mt-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6">{board.name} - Result Prediction for 2025</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InfoCard title="Predicted Result Date">
                <p className="text-3xl font-bold text-indigo-600">{formatDate(result.predictedDate)}</p>
            </InfoCard>
            <InfoCard title="AI Confidence Level">
                 <p className={`text-3xl font-bold ${confidenceColor}`}>{result.confidence}%</p>
            </InfoCard>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
            <h3 className="text-lg font-semibold mb-4">Historical Data Reference</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">Year</th>
                            <th className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">Official Result Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {board.history.map((h) => (
                            <tr key={h.year}>
                                <td className="px-4 py-3 font-medium">{h.year}</td>
                                <td className="px-4 py-3 text-slate-700">{formatDate(h.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="text-center mt-8">
            <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                Stay Updated
            </button>
            <p className="text-xs text-slate-500 mt-2">Sign up for email notifications (feature coming soon).</p>
        </div>
    </div>
  );
};
