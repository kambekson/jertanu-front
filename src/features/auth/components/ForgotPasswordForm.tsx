import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function ForgotPasswordForm({ switchView }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ошибка при отправке запроса');

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при отправке запроса');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <Mail className="w-16 h-16 text-blue-500 mx-auto" />
        <h2 className="text-2xl font-bold">Проверьте вашу почту</h2>
        <p className="text-gray-600">
          Мы отправили инструкции по восстановлению пароля на указанный email.
        </p>
        <button onClick={() => switchView('login')} className="text-blue-500 hover:underline">
          Вернуться к входу
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Восстановление пароля</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded p-2">
          <Mail className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Отправка...' : 'Отправить инструкции'}
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
