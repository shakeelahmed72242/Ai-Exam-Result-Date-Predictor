
import type { Board, Country, EducationLevel } from '../types';

export const countries: Country[] = [
  { code: 'IN', name: 'India' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
];

export const educationLevels: EducationLevel[] = [
  { id: 'matric', name: 'Matric (10th)' },
  { id: 'intermediate', name: 'Intermediate (12th)' },
  { id: 'university', name: 'University' },
  { id: 'competitive', name: 'Competitive Exams' },
];

export const boards: Board[] = [
  // Pakistan
  {
    id: 'pk-fbise-matric',
    name: 'FBISE Islamabad',
    country: 'PK',
    level: 'matric',
    history: [
      { year: 2020, date: '2020-07-20' },
      { year: 2021, date: '2021-09-27' },
      { year: 2022, date: '2022-08-05' },
      { year: 2023, date: '2023-07-18' },
      { year: 2024, date: '2024-07-22' },
    ],
  },
  {
    id: 'pk-bise-lahore-inter',
    name: 'BISE Lahore',
    country: 'PK',
    level: 'intermediate',
    history: [
      { year: 2020, date: '2020-09-22' },
      { year: 2021, date: '2021-10-14' },
      { year: 2022, date: '2022-10-20' },
      { year: 2023, date: '2023-09-13' },
      { year: 2024, date: '2024-09-12' },
    ],
  },
  // India
  {
    id: 'in-cbse-10',
    name: 'CBSE',
    country: 'IN',
    level: 'matric',
    history: [
      { year: 2020, date: '2020-07-15' },
      { year: 2021, date: '2021-08-03' },
      { year: 2022, date: '2022-07-22' },
      { year: 2023, date: '2023-05-12' },
      { year: 2024, date: '2024-05-13' },
    ],
  },
  {
    id: 'in-cbse-12',
    name: 'CBSE',
    country: 'IN',
    level: 'intermediate',
    history: [
      { year: 2020, date: '2020-07-13' },
      { year: 2021, date: '2021-07-30' },
      { year: 2022, date: '2022-07-22' },
      { year: 2023, date: '2023-05-12' },
      { year: 2024, date: '2024-05-13' },
    ],
  },
   // UK
   {
    id: 'uk-alevel',
    name: 'A-Levels',
    country: 'UK',
    level: 'intermediate',
    history: [
      { year: 2020, date: '2020-08-13' },
      { year: 2021, date: '2021-08-10' },
      { year: 2022, date: '2022-08-18' },
      { year: 2023, date: '2023-08-17' },
      { year: 2024, date: '2024-08-15' },
    ],
  },
  // US
  {
    id: 'us-sat',
    name: 'SAT',
    country: 'US',
    level: 'competitive',
    history: [
      { year: 2020, date: '2020-06-26' }, // June exam
      { year: 2021, date: '2021-06-21' },
      { year: 2022, date: '2022-06-17' },
      { year: 2023, date: '2023-06-16' },
      { year: 2024, date: '2024-06-14' },
    ],
  },
];
