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
    const [admin, setAdmin] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setIsLoading(false);
            setAdmin(admin);
            if (user) {
                const getAdmin = async () => {
                    try {
                        const DBuserDirectory = 'user/' + user.uid;
                        const userRecord = doc(db, DBuserDirectory);
                        const docSnap = await getDoc(userRecord);
                        if (docSnap.exists()) {
                            //console.log(docSnap.data().admin + ":Docsnap");
                            //console.log(docSnap.data().admin == true + ":Docsnap condition");
                            if (docSnap.data().admin == true) {
                                setAdmin(true);
                                //console.log("admin!");
                            }
                            else {
                                setAdmin(false);
                                // console.log("Not Admin");
                            }
                        }
                        else {
                            setAdmin(false);
                        }
                    } catch {
                        //console.error(error);
                        setAdmin(false);
                    }
                }

                await getAdmin();
            }
            else {
                setAdmin(false);
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