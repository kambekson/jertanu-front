import { useNavigate } from 'react-router-dom';

export default function ErrorPage404() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-9xl font-extrabold text-indigo-600">404</h2>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Страница не найдена</h1>
          <p className="mt-2 text-sm text-gray-600">
            Упс! Страница, которую вы ищете, не существует или была перемещена.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            onClick={handleGoHome}
            className="py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            На главную
          </button>
          
        </div>
      </div>
    </div>
  );
}
