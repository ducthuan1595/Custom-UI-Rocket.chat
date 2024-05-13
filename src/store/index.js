import { useContext, createContext, useState } from "react";

const Content = createContext();

const ProviderContent = ({children}) => {
    const [activeMenu, setActiveMenu] = useState('home');
    const [admin, setAdmin] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [visitor, setVisitor] = useState(null);

    const value = {
        activeMenu,
        setActiveMenu,
        setAdmin,
        admin,
        currentUser,
        setCurrentUser,
        setVisitor,
        visitor
    }

    return (
        <Content.Provider value={value}  >
            {children}
        </Content.Provider>
    )
}

export const StoreContext = () => {
    return useContext(Content);
}

export default ProviderContent;