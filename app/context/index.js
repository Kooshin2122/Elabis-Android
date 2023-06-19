//
import { createContext, useContext, useEffect, useState } from "react";
//
const AppContxt = createContext();
//
const AppContext = ({ children }) => {
    const [userData, setUserData] = useState(false);
    const [isUserLogin, setIsUserLogin] = useState(false);
    return (
        <AppContxt.Provider value={{
            userData, setUserData,
            isUserLogin, setIsUserLogin,
        }}>
            {children}
        </AppContxt.Provider>
    );
};
//
export const useAppContext = () => {
    return useContext(AppContxt);
};
//
export default AppContext;
//