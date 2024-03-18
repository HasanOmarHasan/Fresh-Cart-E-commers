import { createContext, useEffect, useState } from "react";

export const TokenCotext = createContext();

export default function TokenCotextProvider({children}) {
  const [tkn, setTkn] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("tkn") !== null) {
      setTkn(localStorage.getItem("tkn"));
    }
  }, []);
  return (
    <TokenCotext.Provider value={{ tkn, setTkn }}>
      {children}
    </TokenCotext.Provider>
  );
}
