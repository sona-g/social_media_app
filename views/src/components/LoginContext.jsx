import { createContext, useState } from "react";

const loginContext = createContext();

export function LoginProvider({children}) {
    const [user, setUser] = useState();
   
    return (
        <loginContext.Provider value={{ user, setUser }}>
            {children}
        </loginContext.Provider>
    )
}

export default loginContext;