
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-16">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Exam Result Date Predictor. All rights reserved.</p>
        <p className="text-xs text-slate-400 mt-2">
            Disclaimer: The predicted dates are based on AI analysis of historical data and are for estimation purposes only. Always refer to official board announcements.
        </p>
      </div>
    </footer>
  );
};
