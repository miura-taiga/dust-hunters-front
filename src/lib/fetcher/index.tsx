const fetcher = async (url: string): Promise<any> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("認証トークンがありません。");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("データの取得に失敗しました");
  }

  return response.json();
};

export default fetcher;
