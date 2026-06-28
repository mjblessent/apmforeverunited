import { User, onAuthStateChanged } from "firebase/auth";
import { FC, createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

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
                const getAdmin = async () => {
                    try {
                        const DBuserDirectory = 'user/' + user.uid;
                        const userRecord = doc(db, DBuserDirectory);
                        const docSnap = await getDoc(userRecord);
                        if (docSnap.exists() && docSnap.data().admin === true) {
                            setAdmin(true);
                        }
                        else {
                            setAdmin(false);
                        }
                    } catch {
                        setAdmin(false);
                    } finally {
                        setIsLoading(false); // BUG FIX: End loading only after admin status is resolved
                    }
                }

                await getAdmin();
            }
            else {
                setAdmin(false);
                setIsLoading(false); // BUG FIX: End loading if no user is present
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