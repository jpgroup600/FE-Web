import { createContext, useState } from "react";


export const AppProvider = createContext(null)


const Api = ({children})=>{
    const [item, setItem] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    return (
        <>
        <AppProvider.Provider value={{
            item,
            setItem,
            isLoggedIn,
            setIsLoggedIn
        }}>
        {children}
        </AppProvider.Provider>
        </>
    )
}

export default Api