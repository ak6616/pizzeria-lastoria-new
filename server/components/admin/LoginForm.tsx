import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const success = await onLogin(username, password);
      if (!success) {
        setError('Nieprawidłowa nazwa użytkownika lub hasło');
      }
    } catch (err) {
      setError('Wystąpił błąd podczas logowania');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/90 p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Panel Administratora</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nazwa użytkownika
          </label>
          <input
            type="text"
            name="username"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Hasło
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition disabled:opacity-50"
        >
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
} 