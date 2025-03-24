import React, { useState } from "react";
import CategoryList from "./components/CategoryList";
import CartIcon from "./components/CartIcon";
import { BsFillMoonStarsFill, BsMoonStars } from "react-icons/bs";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpblR5cGUiOiIxIiwiQ3VzdG9tZXJJRCI6IjE1NTk1MSIsIkZpcnN0TmFtZSI6Ikh5cGVyIiwiTGFzdE5hbWUiOiJ2MiIsIkVtYWlsIjoiZGVtb0BoeXBlci5jb20iLCJDdXN0b21lclR5cGVJRCI6IjIiLCJJc1Jlc2VsbGVyIjoiMSIsIklzQVBJIjoiMSIsIlJlZmVyYW5jZUlEIjoiIiwiUmVnaXN0ZXJEYXRlIjoiMy8yMS8yMDI1IDY6MjI6MjQgUE0iLCJleHAiOjIwNTM3NzExNTEsImlzcyI6Imh0dHBzOi8vaHlwZXJ0ZWtub2xvamkuY29tLnRyIiwiYXVkIjoiaHR0cHM6Ly9oeXBlcnRla25vbG9qaS5jb20udHIifQ.KNfAHCJGMrUNTj_gsRHcV6ytzi-gXoRseOMTTLFHtxw";

  const [theme, setTheme] = useState(false);
  const changeTheme = () => {
    const root = document.getElementById("root");
    if (theme) {
      root.style.backgroundColor = "black";
      root.style.color = "#fff";
    } else {
      root.style.backgroundColor = "#fff";
      root.style.color = "black";
    }
    setTheme(!theme);
  };

  return (
    <div className={`${theme ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <header
        className={`${
          theme
            ? "bg-gray-900 text-white border-b border-white"
            : "bg-[#14274E] text-white"
        } shadow-md p-4 flex justify-between items-center px-6 fixed top-0 left-0 w-full z-50`}
      >
        <h1 className="text-lg sm:text-xl md:text-2xl 2xl:text-2xl font-bold">
          HYPER TEKNOLOJI
        </h1>
        <div className="flex flex-row items-center gap-5">
          <CartIcon />
          {theme ? (
            <BsMoonStars
              className="icon text-xl sm:text-2xl md:text-3xl 2xl:text-4xl text-white"
              onClick={changeTheme}
            />
          ) : (
            <BsFillMoonStarsFill
              className="icon text-xl sm:text-2xl md:text-3xl 2xl:text-4xl text-black"
              onClick={changeTheme}
            />
          )}
        </div>
      </header>
      <main
        className={`${
          theme ? "bg-gray-900 text-white" : "bg-[#D2E0FB] text-black"
        } min-h-screen flex-grow p-4 pt-20`} 
      >
        <CategoryList token={token} onSelectCategory={setSelectedCategory} />

        {selectedCategory && (
          <div className="text-center text-lg font-semibold mt-4">
           
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
