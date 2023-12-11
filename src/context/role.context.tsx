import { createContext } from "react";
import { useState } from "react";

interface RoleContextProps {
  isTeacher: boolean;
  setIsTeacher: (isTeacher: boolean) => void;
}

const RoleContext = createContext<RoleContextProps>({} as RoleContextProps);
export const RoleProvider = ({ children }) => {
  const [isTeacher, setIsTeacher] = useState(false);

  return (
    <RoleContext.Provider value={{ isTeacher, setIsTeacher }}>
      {children}
    </RoleContext.Provider>
  );
};
export default RoleContext;
