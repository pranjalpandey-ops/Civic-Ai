const API_BASE = '/api';

export async function fetchApi(endpoint, options = {}) {
  try {
    const token = localStorage.getItem('civic_token') || '';
    const userId = localStorage.getItem('civic_user_id') || 'usr_citizen_1';

    const headers = {
      'Content-Type': 'application/json',
      'x-user-id': userId,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}
