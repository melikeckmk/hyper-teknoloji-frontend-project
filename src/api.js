export const fetchProductsByCategory = async (categoryID, token) => {
    try {
      const response = await fetch(`https://api.hyperteknoloji.com.tr/Products?categoryID=${categoryID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("fetchProductsByCategory Hatası:", error);
      return null;
    }
  };
  