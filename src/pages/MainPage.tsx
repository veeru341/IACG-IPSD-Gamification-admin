import React, { useState, useEffect } from 'react';
import { GameResult } from '../types';
import { fetchGameResults } from '../api/gameApi';
import Button from '../components/Button';

interface MainPageProps {
  onLogout: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onLogout }) => {
  const [gameData, setGameData] = useState<GameResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await fetchGameResults();
        setGameData(results);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Game<span className="text-amber-500">Analytics</span>
          </h1>
          <Button onClick={onLogout} variant="outline">
            Logout
          </Button>
        </nav>
      </header>

      <main className="container mx-auto p-6" aria-labelledby="main-heading">
        <h2 id="main-heading" className="text-3xl font-bold mb-6 text-white">Game Results</h2>
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg border border-gray-800">
          <table className="w-full text-left">
            <thead className="bg-amber-500 text-black">
              <tr>
                <th scope="col" className="p-4 text-sm font-semibold uppercase tracking-wider">Game ID</th>
                <th scope="col" className="p-4 text-sm font-semibold uppercase tracking-wider">Score</th>
                <th scope="col" className="p-4 text-sm font-semibold uppercase tracking-wider">Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-400" aria-busy="true">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-red-400" role="alert">Error: {error}</td>
                </tr>
              ) : gameData.length > 0 ? (
                gameData.map((result) => (
                  <tr key={result._id} className="hover:bg-gray-800/50 transition-colors duration-200">
                    <td className="p-4 font-mono text-amber-500">{result.gameId ?? 'N/A'}</td>
                    <td className="p-4 font-semibold text-white">{result.score.toLocaleString()}</td>
                    <td className="p-4 text-gray-300">{result.speed}</td>
                  </tr>
                ))
              ) : (
                 <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-400">No game results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
