// need to move this into library 
import {React, createContext, useState} from "react";
import { Details } from "emissions-library4";

const UserContext = createContext();

export function UserContextProvider ({children}) {
    const [isEnabled, setIsEnabled] = useState(true);
    const [isRunning, setIsRunning] = useState(true);
    const values = {
        isEnabled,
        setIsEnabled,
        isRunning,
        setIsRunning,
    };
    return (
        <UserContext.Provider value = {values}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContext; 