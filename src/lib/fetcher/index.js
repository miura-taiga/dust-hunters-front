const fetcher = async (url) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };
  
  export default fetcher;
  