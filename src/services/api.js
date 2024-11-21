const BASE_URL = 'https://fourn-ecotech-assignment-backend.onrender.com/api';

const api = {
  post: async (url, data) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  get: async (url) => {
    const response = await fetch(`${BASE_URL}${url}`);
    return response.json();
  },
};

export default api;
