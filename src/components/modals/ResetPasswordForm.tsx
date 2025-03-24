import { Lock } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ResetPasswordForm({ switchView }) {
  const [searchParams] = useSearchParams();
  const tokenFromURL = searchParams.get('token') || ''; // Берём токен из URL

  const [verificationCode, setVerificationCode] = useState(tokenFromURL);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: verificationCode,
          newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ошибка при сбросе пароля');

      switchView('login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при сбросе пароля');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Сброс пароля</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded p-2">
          <Lock className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Введите код подтверждения"
            className="w-full outline-none"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center border rounded p-2">
          <Lock className="w-5 h-5 text-gray-400 mr-6" />
          <input
            type="password"
            placeholder="Введите новый пароль"
            className="w-full outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center border rounded p-2">
          <Lock className="w-5 h-5 text-gray-400 mr-6" />
          <input
            type="password"
            placeholder="Подтвердите новый пароль"
            className="w-full outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Сбрасываем пароль...' : 'Сбросить пароль'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={() => switchView('login')} className="text-blue-500 hover:underline">
          Вернуться к входу
        </button>
      </div>
    </div>
  );
}
