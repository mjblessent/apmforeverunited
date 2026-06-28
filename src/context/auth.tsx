import { User, onAuthStateChanged } from "firebase/auth";
import { FC, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

//create context
interface AuthContextType {
    user: User | null,
    isLoading: boolean,
    admin: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    admin: false,
});

interface AuthProviderProps {
    children: React.ReactElement;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null); //sets the default user value
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [admin, setAdmin] = useState<boolean>(false); // SECURITY FIX: Default to false

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            
            if (user) {
                try {
                    // Fetch the token result which contains the custom claims
                    // Passing true forces a refresh so we get the latest claims
                    const idTokenResult = await user.getIdTokenResult(true);
                    
                    if (idTokenResult.claims.admin === true) {
                        setAdmin(true);
                    } else {
                        setAdmin(false);
                    }
                } catch {
                    setAdmin(false);
                } finally {
                    setIsLoading(false);
                }
            }
            else {
                setAdmin(false);
                setIsLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    const value = {
        user,
        isLoading,
        admin,
    };

    return <AuthContext.Provider value={value}> {!isLoading && children} </AuthContext.Provider>;
};