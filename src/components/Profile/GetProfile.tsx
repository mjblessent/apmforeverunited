import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const GetProfile = () => {

    const [firstLoad, setFirstLoad] = useState(true);
    const { user } = useAuth();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isError, setIsError] = useState(false);
    
    const loadProfile = async () => {
        
        const userRecord = doc(db, 'user/'+user?.uid);
        try{
            const docSnap = await getDoc(userRecord);
            if(docSnap.exists()){
                setName(docSnap.data().name);
                setEmail(docSnap.data().email)
             }
        } catch(error)
        {
            setIsError(true);
        }
        

        setFirstLoad(false);
    };

    if(firstLoad){
        loadProfile();
        
    }

    if(isError){
        return(
        <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Account Not Verified! Please try again later</span>
        </div>
        );
    }else{
        return(
            <div>
            <h1>{name}</h1>
            <h1>{email}</h1>
            </div>
        );
    }
    

};

export default GetProfile;