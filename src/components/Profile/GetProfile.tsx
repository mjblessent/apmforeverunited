import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const GetProfile = () => {

    const [firstLoad, setFirstLoad] = useState(true);
    const { user } = useAuth();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    
    const loadProfile = async () => {
        
        const userRecord = doc(db, 'user/'+user?.uid);
        const docSnap = await getDoc(userRecord);
        if(docSnap.exists()){
            setName(docSnap.data().name);
            setEmail(docSnap.data().email)
        }

        setFirstLoad(false);
    };

    if(firstLoad){
        loadProfile();
        
    }

    return(
        <div>
        <h1>{name}</h1>
        <h1>{email}</h1>
        </div>
    );

};

export default GetProfile;