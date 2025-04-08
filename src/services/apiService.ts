import { authService } from './authService';

const API_URL = 'http://localhost:3000/api';

/**
 * Функция для выполнения API-запросов с автоматическим обновлением токена
 */
export const apiService = {
  /**
   * Выполняет запрос к API с автоматическим обновлением токена при необходимости
   */
  async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Получаем текущий токен доступа
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    // Если нет токенов, просто делаем запрос без авторизации
    if (!token || !refreshToken) {
      return fetch(url.startsWith('http') ? url : `${API_URL}${url}`, options);
    }

    // Настраиваем заголовки запроса
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };

    // Делаем первоначальный запрос
    let response = await fetch(url.startsWith('http') ? url : `${API_URL}${url}`, {
      ...options,
      headers
    });

    // Если ответ 401 (Unauthorized), пытаемся обновить токен
    if (response.status === 401) {
      try {
        // Пробуем обновить токен
        await authService.refreshToken();
        
        // Получаем новый токен из localStorage (обновлено в authService.refreshToken)
        const newToken = localStorage.getItem('access_token');
        
        // Повторяем запрос с новым токеном
        const newHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`
        };
        
        response = await fetch(url.startsWith('http') ? url : `${API_URL}${url}`, {
          ...options,
          headers: newHeaders
        });
      } catch (error) {
        console.error('Failed to refresh token:', error);
        // В случае ошибки обновления токена, очищаем данные авторизации
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token');
        
        // Если это страница агентства, перенаправляем на страницу входа агентства
        if (window.location.pathname.startsWith('/agency')) {
          window.location.href = '/agency/login';
        }
      }
    }

    return response;
  },

  /**
   * GET запрос к API
   */
  async get(url: string, options: RequestInit = {}): Promise<any> {
    const response = await this.fetch(url, {
      ...options,
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    return response.json();
  },

  /**
   * POST запрос к API
   */
  async post(url: string, data: any, options: RequestInit = {}): Promise<any> {
    const response = await this.fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    return response.json();
  },

  /**
   * DELETE запрос к API
   */
  async delete(url: string, options: RequestInit = {}): Promise<any> {
    const response = await this.fetch(url, {
      ...options,
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    if (response.status === 204) {
      return null; // No content
    }
    
    return response.json();
  },

  /**
   * PUT запрос к API
   */
  async put(url: string, data: any, options: RequestInit = {}): Promise<any> {
    const response = await this.fetch(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    return response.json();
  }
}; 