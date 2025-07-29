import React, { useState, FormEvent } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

interface LoginPageProps {
  onLogin: (user: string, pass: string) => void;
  error: string | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md mx-auto bg-gray-900 p-8 rounded-2xl shadow-2xl shadow-amber-500/20 border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-wider">
            GAME<span className="text-amber-500">PORTAL</span>
          </h1>
          <p className="text-gray-400 mt-2">Admin Login</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            aria-label="Username"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            aria-label="Password"
          />
          {error && (
            <div role="alert" className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          <div className="flex justify-center">
            <Button type="submit" className="py-3">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
