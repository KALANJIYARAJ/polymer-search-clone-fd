import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [model, setModel] = useState(false);
  const [user, setUser] = useState([]);
  const [polymers, setPolymers] = useState([]);
  const [filterPolymer, setFilterPolymer] = useState([]);
  const [ sourceFile, setSourceFile ] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const [ currentWorkSpace, setCurrentWorkSpace ] = useState("");
  const [head, setHead] = useState(" ");

  return (
    <UserContext.Provider
      value={{
        model,
        setModel,
        user,
        setUser,
        polymers, 
        setPolymers,
        sourceFile, 
        setSourceFile,
        currentWorkSpace, 
        setCurrentWorkSpace,
        workspace,
        setWorkspace,
        head, 
        setHead,
        filterPolymer, 
        setFilterPolymer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
