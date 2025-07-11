import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(true);
    const [user, setUser] = useState({email: "nombre@ejemplo.com"});
    const navigate = useNavigate();

    const actions = {
        login: (email, password) => {
            if ((!email) || (!password)) return;
            setUser({email: email});
            setToken(true);
            navigate("/");
        },
        logout: () => {
            setToken(false);
            setUser(null);
            navigate("/logout");
        },
    }

    return (
        <UserContext.Provider value={{ token: token, user: user, actions: actions }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;