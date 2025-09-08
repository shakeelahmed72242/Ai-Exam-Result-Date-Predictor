
export interface HistoricalDate {
  year: number;
  date: string; // YYYY-MM-DD
}

export interface Board {
  id: string;
  name: string;
  country: string;
  level: string;
  history: HistoricalDate[];
}

export interface PredictionResult {
  predictedDate: string; // YYYY-MM-DD
  confidence: number;
}

export interface Country {
    code: string;
    name: string;
}

export interface EducationLevel {
    id: string;
    name: string;
}
