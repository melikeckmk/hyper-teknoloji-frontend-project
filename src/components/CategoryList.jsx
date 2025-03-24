import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const CategoryList = ({ token, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryTypeID, setCategoryTypeID] = useState("");
  const [categoryTypeOptions, setCategoryTypeOptions] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.hyperteknoloji.com.tr/Categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Veri alınamadı");
        const data = await response.json();

        const sortedCategories = data.data.sort((a, b) =>
          a.categoryName.localeCompare(b.categoryName)
        );

        setCategories(sortedCategories);
        setFilteredCategories(sortedCategories);

        const uniqueCategoryTypes = [];
        const seenCategoryTypeIDs = new Set();

        sortedCategories.forEach((category) => {
          if (!seenCategoryTypeIDs.has(category.categoryTypeID)) {
            seenCategoryTypeIDs.add(category.categoryTypeID);
            uniqueCategoryTypes.push({
              id: category.categoryTypeID,
              name: category.categoryName, 
            });
          }
        });

        setCategoryTypeOptions(uniqueCategoryTypes);
      } catch (error) {
        console.error("Kategori çekme hatası:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleCategoryTypeFilter = (typeID) => {
    setCategoryTypeID(typeID);
    if (typeID) {
      const filtered = categories.filter(
        (category) => category.categoryTypeID === parseInt(typeID)
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <select
          value={categoryTypeID}
          onChange={(e) => handleCategoryTypeFilter(e.target.value)}
          className="p-3 w-55 md:w-96  rounded-md border dark:bg-gray-900 dark:text-white text-sm"
        >
          <option value="">Kategori Seçin</option>
          {categoryTypeOptions.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} 
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              key={category.productCategoryID}
              className="relative border border-[#14274E] p-4 rounded-xl bg-white dark:bg-[#1a1a2e] 
                       transition-all duration-500 ease-in-out cursor-pointer flex flex-col justify-between min-h-[320px]
                       transform hover:scale-105 hover:shadow-2xl"
              onClick={() => onSelectCategory(category.productCategoryID)}
            >
              <button
                className="absolute -top-3 -right-3 bg-white dark:bg-[#1a1a2e] p-3 rounded-full shadow-md 
                           text-gray-400 hover:text-red-500 transition-all z-10 border border-gray-300 dark:border-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setFavorites((prevFavorites) => {
                    const updatedFavorites = {
                      ...prevFavorites,
                      [category.productCategoryID]:
                        !prevFavorites[category.productCategoryID],
                    };
                    localStorage.setItem(
                      "favorites",
                      JSON.stringify(updatedFavorites)
                    );
                    return updatedFavorites;
                  });
                }}
              >
                {favorites[category.productCategoryID] ? (
                  <AiFillHeart className="text-red-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-2xl" />
                )}
              </button>

              <img
                src={category.categoryDetail?.categoryMainImage}
                alt={category.categoryName}
                className="w-full h-40 object-cover rounded-md"
              />

              <h3 className="text-lg font-semibold mt-2 text-center text-gray-900 dark:text-white">
                {category.categoryName}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-center">
                Fiyat: <b>???</b> TL
              </p>

              <button
                onClick={() => dispatch(addToCart(category))}
                className="bg-[#14274E] text-white px-4 py-2 mt-auto rounded-full 
                           shadow-lg hover:shadow-[0px_5px_20px_5px_rgba(20,39,78,0.7)] 
                           transition-all duration-300"
              >
                Sepete Ekle
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Kategoriler Yükleniyor...
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
