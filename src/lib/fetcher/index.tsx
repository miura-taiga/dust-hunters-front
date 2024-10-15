/* eslint-disable @typescript-eslint/no-explicit-any */
const fetcher = async (
  url: string,
  method: 'GET' | 'PATCH' | 'POST' = 'GET',
  data?: any,
): Promise<any> => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('認証トークンがありません。');
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if ((method === 'PATCH' || method === 'POST') && data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`${method}リクエストの実行に失敗しました`);
  }

  return response.json();
};

export default fetcher;
/* eslint-disable @typescript-eslint/no-explicit-any */
