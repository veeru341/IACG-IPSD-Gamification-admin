import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (user: string, pass: string) => {
    if (user === 'admin' && pass === 'veeru@123') {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <MainPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} error={loginError} />
      )}
    </>
  );
};

export default App;
