import { GameResult } from '../types';

export const fetchGameResults = async (): Promise<GameResult[]> => {
  const response = await fetch('https://iacg-ipsd-gamification.up.railway.app/api/results');
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  if (data && Array.isArray(data.results)) {
    return data.results;
  }
  throw new Error('Invalid data format received from API.');
};
