// UserContext.jsx
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []); // يشتغل مرة واحدة فقط لما يبدأ التطبيق

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
