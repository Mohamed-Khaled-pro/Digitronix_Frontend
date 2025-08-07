import { createContext, useEffect, useState, useContext } from "react";

export const FavouriteContext = createContext();
export const useFavourites = () => useContext(FavouriteContext);

export function FavouriteProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <FavouriteContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouriteContext.Provider>
  );
}

