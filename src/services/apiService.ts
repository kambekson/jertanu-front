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
    const finalUrl = url.startsWith('http') ? url : `${API_URL}${url}`;

    // Если нет токенов, просто делаем запрос без авторизации
    if (!token || !refreshToken) {
      return fetch(finalUrl, options);
    }

    // Настраиваем заголовки запроса
    // Проверяем, что options.body не является FormData, иначе не устанавливаем Content-Type
    const isFormData = options.body instanceof FormData;    
    // Создаем новый объект Headers
    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    
    // Не добавляем Content-Type для FormData, браузер сам установит правильный заголовок с boundary
    if (!isFormData && options.method && ['GET', 'DELETE'].indexOf(options.method) === -1) {
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
        console.log('[API] Content-Type set to application/json');
      }
    }

    // Формируем окончательные опции для запроса
    const requestOptions = {
      ...options,
      headers
    };

    // Делаем первоначальный запрос
    let response = await fetch(finalUrl, requestOptions);

    // Если ответ 401 (Unauthorized), пытаемся обновить токен
    if (response.status === 401) {
      try {
        // Пробуем обновить токен
        await authService.refreshToken();
        
        // Получаем новый токен из localStorage (обновлено в authService.refreshToken)
        const newToken = localStorage.getItem('access_token');
        
        // Повторяем запрос с новым токеном
        const newHeaders = new Headers(options.headers || {});
        newHeaders.set('Authorization', `Bearer ${newToken || ''}`);
        
        // Также не устанавливаем Content-Type для FormData при повторном запросе
        if (!isFormData && options.method && ['GET', 'DELETE'].indexOf(options.method) === -1) {
          if (!newHeaders.has('Content-Type')) {
            newHeaders.set('Content-Type', 'application/json');
          }
        }
        
        response = await fetch(finalUrl, {
          ...options,
          headers: newHeaders
        });
      } catch (error) {
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
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }
    
    if (response.status === 204) {
      return null; // No content
    }
    
    // Только пытаемся получить JSON, если есть содержимое
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json') && response.status !== 204) {
      return response.json();
    }
    
    return null;
  },

  /**
   * PATCH запрос к API
   */
  async patch(url: string, data: any, options: RequestInit = {}): Promise<any> {
    // Определяем, является ли data объектом FormData
    const isFormData = data instanceof FormData;    
    if (isFormData) {
      for (const pair of data.entries()) {
        console.log(`  ${pair[0]}: ${pair[1] instanceof File ? `File: ${pair[1].name} (${pair[1].size} bytes)` : 
          (typeof pair[1] === 'string' && pair[1].length > 100 ? 
            `${pair[1].substring(0, 100)}...` : pair[1])}`);
      }
    } else {
      console.log('[API PATCH] JSON data:', data);
    }
    
    // Настраиваем опции запроса
    const requestOptions: RequestInit = {
      ...options,
      method: 'PATCH'
    };
    
    // Если это FormData, просто используем его как body
    // Иначе преобразуем данные в JSON
    if (isFormData) {
      requestOptions.body = data;
    } else {
      requestOptions.headers = {
        'Content-Type': 'application/json',
        ...options.headers
      };
      requestOptions.body = JSON.stringify(data);
    }
    
    try {
      const response = await this.fetch(url, requestOptions);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[API PATCH] Error: ${response.status} ${errorText}`);
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }
      
      // Проверяем Content-Type для определения типа ответа
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const jsonResult = await response.json();
        return jsonResult;
      }
      
      return null;
    } catch (error) {
      console.error('[API PATCH] Error:', error);
      throw error;
    }
  },

  /**
   * PATCH запрос к API с FormData
   */
  async patchFormData(url: string, formData: FormData): Promise<any> {
    
    for (const pair of formData.entries()) {
      console.log(`  ${pair[0]}: ${pair[1] instanceof File ? `File: ${pair[1].name} (${pair[1].size} bytes)` : 
        (typeof pair[1] === 'string' && pair[1].length > 100 ? 
          `${pair[1].substring(0, 100)}...` : pair[1])}`);
    }
    
    try {
      // Прямой вызов fetch без использования this.fetch для полного контроля над запросом
      const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      
      // Создаем заголовки запроса по аналогии с примером из Postman
      const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`
        // Важно: Не устанавливаем Content-Type вручную, 
        // браузер автоматически установит его с boundary для FormData
      };
      
      const response = await fetch(fullUrl, {
        method: 'PATCH',
        headers: headers,
        body: formData
      });
            
      if (!response.ok) {
        let errorDetail;
        try {
          errorDetail = await response.text();
        } catch (e) {
          errorDetail = 'Could not read error response';
        }
        
        console.error(`[API PATCH FORM] Error: ${response.status} ${errorDetail}`);
        throw new Error(`API request failed: ${response.status} ${errorDetail}`);
      }
      
      // Проверяем Content-Type ответа
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const jsonResult = await response.json();
          return jsonResult;
        } catch (e) {
          console.error('[API PATCH FORM] Error parsing JSON:', e);
          throw new Error('Failed to parse JSON response');
        }
      }
      
      return { success: true, message: 'Request completed successfully' };
    } catch (error) {
      console.error('[API PATCH FORM] Error:', error);
      throw error;
    }
  },

  /**
   * PATCH запрос к API с прямой отправкой JSON (без FormData)
   * Используется как альтернативный способ обновления, если FormData не работает
   */
  async patchDirectJson(url: string, data: any): Promise<any> {
    
    try {
      // Получаем текущий токен доступа
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
      
      const response = await fetch(fullUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[API PATCH JSON] Error: ${response.status} ${errorText}`);
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }
      
      // Проверяем Content-Type для определения типа ответа
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const jsonResult = await response.json();
        return jsonResult;
      }
      
      return null;
    } catch (error) {
      console.error('[API PATCH JSON] Error:', error);
      throw error;
    }
  },

  /**
   * POST запрос к API с FormData
   */
  async postFormData(url: string, formData: FormData): Promise<any> {
    
    for (const pair of formData.entries()) {
      console.log(`  ${pair[0]}: ${pair[1] instanceof File ? `File: ${pair[1].name} (${pair[1].size} bytes)` : 
        (typeof pair[1] === 'string' && pair[1].length > 100 ? 
          `${pair[1].substring(0, 100)}...` : pair[1])}`);
    }
    
    try {
      // Прямой вызов fetch без использования this.fetch для полного контроля над запросом
      const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[API POST FORM] Error: ${response.status} ${errorText}`);
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }
      
      // Проверяем Content-Type для определения типа ответа
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const jsonResult = await response.json();
        return jsonResult;
      }
      
      return null;
    } catch (error) {
      console.error('[API POST FORM] Error:', error);
      throw error;
    }
  }
}; 