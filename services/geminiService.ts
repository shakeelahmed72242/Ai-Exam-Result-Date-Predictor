
import { GoogleGenAI, Type } from "@google/genai";
import type { Board, PredictionResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const predictionSchema = {
  type: Type.OBJECT,
  properties: {
    predictedDate: {
      type: Type.STRING,
      description: 'The predicted result date for the next year (2025) in YYYY-MM-DD format. This must be a valid date string.',
    },
    confidence: {
      type: Type.INTEGER,
      description: 'A confidence score from 0 to 100 representing the certainty of the prediction.',
    },
  },
  required: ['predictedDate', 'confidence'],
};

export const predictResultDate = async (board: Board): Promise<PredictionResult> => {
  const historicalDataString = JSON.stringify(board.history, null, 2);

  const prompt = `
    You are an expert data analyst specializing in academic schedules. Your task is to predict the exam result announcement date for 2025.

    Details:
    - Country: ${board.country}
    - Board/University: ${board.name}
    - Education Level: ${board.level}

    Historical Data (YYYY-MM-DD):
    ${historicalDataString}

    Analysis Instructions:
    1. Analyze the historical dates to identify patterns, trends, or shifts.
    2. Note the typical month and day range for announcements.
    3. Assume results are typically announced on weekdays (Monday to Friday).
    4. Based on your analysis, predict the most likely result date for 2025.
    5. Provide a confidence score (0-100) for your prediction. A higher score means more certainty based on stable historical data.
    
    Return your prediction in JSON format that strictly follows the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: predictionSchema,
        temperature: 0.2, // Lower temperature for more deterministic prediction
      },
    });

    const jsonString = response.text;
    const parsedResult = JSON.parse(jsonString);

    // Basic validation
    if (
      !parsedResult.predictedDate ||
      typeof parsedResult.confidence !== 'number'
    ) {
      throw new Error('Invalid JSON structure received from AI model.');
    }

    return parsedResult as PredictionResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
