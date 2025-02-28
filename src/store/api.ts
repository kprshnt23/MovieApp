const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTkxY2UwODU0MGIxOTA0ZWVmNmZlZjJiNjNjMzFjMyIsIm5iZiI6MTYwMTY0NDcyOS4xMzY5OTk4LCJzdWIiOiI1Zjc3MjhiOTU4ZWZkMzAwMzVhZmQ2MWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F2zfabouupGY3rG4I48VEtBugZKeh_-pKRsDuD_HH6M';

const api = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

export default api;
