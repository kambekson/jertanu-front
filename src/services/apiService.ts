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
    console.log(`[API] Fetching: ${options.method || 'GET'} ${finalUrl}`);

    // Если нет токенов, просто делаем запрос без авторизации
    if (!token || !refreshToken) {
      console.log('[API] No auth tokens found, requesting without auth');
      return fetch(finalUrl, options);
    }

    // Настраиваем заголовки запроса
    // Проверяем, что options.body не является FormData, иначе не устанавливаем Content-Type
    const isFormData = options.body instanceof FormData;
    console.log(`[API] Request body is FormData: ${isFormData}`);
    
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
    
    console.log(`[API] Request headers: ${Array.from(headers.entries())
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')}`);

    // Делаем первоначальный запрос
    let response = await fetch(finalUrl, requestOptions);
    console.log(`[API] Response status: ${response.status}`);

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
    console.log('Выполняется DELETE запрос к URL:', url);
    
    const response = await this.fetch(url, {
      ...options,
      method: 'DELETE'
    });
    
    console.log('Ответ на DELETE запрос:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ошибка в DELETE запросе:', response.status, errorText);
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
    console.log(`[API PATCH] URL: ${url}, IsFormData: ${isFormData}`);
    
    if (isFormData) {
      console.log('[API PATCH] FormData contents:');
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
      console.log(`[API PATCH] Response content-type: ${contentType}`);
      
      if (contentType && contentType.includes('application/json')) {
        const jsonResult = await response.json();
        console.log('[API PATCH] JSON response:', jsonResult);
        return jsonResult;
      }
      
      console.log('[API PATCH] Non-JSON response received');
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
    console.log(`[API PATCH FORM] URL: ${url}`);
    console.log('[API PATCH FORM] FormData contents:');
    
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
      
      console.log(`[API PATCH FORM] Sending to: ${fullUrl}`);
      
      // Создаем заголовки запроса по аналогии с примером из Postman
      const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`
        // Важно: Не устанавливаем Content-Type вручную, 
        // браузер автоматически установит его с boundary для FormData
      };
      
      console.log(`[API PATCH FORM] Headers: ${JSON.stringify(headers)}`);
      
      const response = await fetch(fullUrl, {
        method: 'PATCH',
        headers: headers,
        body: formData
      });
      
      console.log(`[API PATCH FORM] Response status: ${response.status}`);
      
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
      console.log(`[API PATCH FORM] Response content-type: ${contentType}`);
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const jsonResult = await response.json();
          console.log('[API PATCH FORM] JSON response:', jsonResult);
          return jsonResult;
        } catch (e) {
          console.error('[API PATCH FORM] Error parsing JSON:', e);
          throw new Error('Failed to parse JSON response');
        }
      }
      
      // Если ответ не JSON
      const textResult = await response.text();
      console.log('[API PATCH FORM] Text response length:', textResult.length);
      console.log('[API PATCH FORM] Text response (truncated):', textResult.substring(0, 100));
      
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
    console.log(`[API PATCH JSON] URL: ${url}`);
    console.log('[API PATCH JSON] Data:', JSON.stringify(data, null, 2));
    
    try {
      const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      console.log(`[API PATCH JSON] Sending to: ${fullUrl}`);
      
      // Создаем заголовки согласно примеру из Postman
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      console.log(`[API PATCH JSON] Headers: ${JSON.stringify(headers)}`);
      
      const response = await fetch(fullUrl, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
      });
      
      console.log(`[API PATCH JSON] Response status: ${response.status}`);
      
      if (!response.ok) {
        let errorDetail;
        try {
          errorDetail = await response.text();
        } catch (e) {
          errorDetail = 'Could not read error response';
        }
        
        console.error(`[API PATCH JSON] Error: ${response.status} ${errorDetail}`);
        throw new Error(`API request failed: ${response.status} ${errorDetail}`);
      }
      
      // Проверяем Content-Type ответа
      const contentType = response.headers.get('content-type');
      console.log(`[API PATCH JSON] Response content-type: ${contentType}`);
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const jsonResult = await response.json();
          console.log('[API PATCH JSON] JSON response:', jsonResult);
          return jsonResult;
        } catch (e) {
          console.error('[API PATCH JSON] Error parsing JSON:', e);
          throw new Error('Failed to parse JSON response');
        }
      }
      
      // Если ответ не JSON
      const textResult = await response.text();
      console.log('[API PATCH JSON] Text response length:', textResult.length);
      console.log('[API PATCH JSON] Text response (truncated):', textResult.substring(0, 100));
      
      return { success: true, message: 'Request completed successfully' };
    } catch (error) {
      console.error('[API PATCH JSON] Error:', error);
      throw error;
    }
  }
}; 