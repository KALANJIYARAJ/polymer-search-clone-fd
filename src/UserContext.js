import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [model, setModel] = useState(false);
  const [user, setUser] = useState([]);
  const [polymers, setPolymers] = useState([]);
  const [ sourceFile, setSourceFile ] = useState([]);
  return (
    <UserContext.Provider
      value={{
        model,
        setModel,
        user,
        setUser,
        polymers, 
        setPolymers,
        sourceFile, setSourceFile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
