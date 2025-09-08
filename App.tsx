
import React, { useState } from 'react';
import { Header } from './components/Header';
import { PredictorForm } from './components/PredictorForm';
import { ResultDisplay } from './components/ResultDisplay';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { predictResultDate } from './services/geminiService';
import type { PredictionResult, Board } from './types';

const App: React.FC = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (board: Board) => {
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);
    setSelectedBoard(board);

    try {
      const result = await predictResultDate(board);
      setPredictionResult(result);
    } catch (err) {
      console.error(err);
      setError('Failed to get prediction. The AI model may be busy. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section id="predictor" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                AI Exam Result Date Predictor
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Get an AI-powered prediction for your exam result date.
              </p>
            </div>
            <PredictorForm onPredict={handlePredict} isLoading={isLoading} />
          </section>

          {error && (
             <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
          )}

          <ResultDisplay
            board={selectedBoard}
            result={predictionResult}
            isLoading={isLoading}
          />

          <BlogSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
