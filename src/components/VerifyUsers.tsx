import { and, collection, doc, getCountFromServer, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";


type UserAccounts = {
name: string,
uid: string,
}[];

const VerifyUsers = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [userList, setUserList] = useState<UserAccounts>([]);
    const [userID, setUserID] = useState<string>('0');
    const [served, setServed] = useState<string>('');

    const loadUVUsers = async () => {

        const q = query(collection(db, "user"), where("verified", "==", false));
        const querySnapshot = await getDocs(q); 

         const lists = querySnapshot.docs.map( (document) => {
            return{
                name: document.data().name,
                uid: document.data().id
            }
        });

        setUserList(lists);
        setFirstLoad(false);
    };

    if(firstLoad){
        loadUVUsers();
        
    }

    const checkIfServed = async (id:string) =>{
        setUserID(id);
        if(id == "0"){
            setServed("");
        } else{
            const userRecord = doc(db, 'user/'+id);
            const docSnap = await getDoc(userRecord);

            if (docSnap.exists()) {
                const q = query(collection(db,"missionaryname"), and(where("first", "==", docSnap.data().fName), where("last", "==", docSnap.data().lName)));
                const qSnapshot = await getCountFromServer(q);
                //console.log(qSnapshot.data().count);
                //console.log(qSnapshot.data().count > 0);//greater than 0 means it was found
                if(qSnapshot.data().count > 0)
                {
                    setServed("They Served!");
                } else{
                    setServed("Name not found, reach out to see if they served " + docSnap.data().email);
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //console.log(userID);
        await updateDoc(doc(db, 'user/' + userID), {verified: true});
        await setDoc(doc(db, 'account/' + userID), {id: userID});

    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="hero-content flex-col ">
                        <h1>Account Authorization</h1>
                        <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
                            <div className="card-body">
                                <label className="form-control w-full max-w-xs" >
                                    <div className="label">
                                        <span className="label-text">Select the User Account you wish to verify</span>
                                    </div>
                                    <select className="select select-bordered" value={userID} onChange={(e) => checkIfServed(e.target.value)}>
                                        <option key={"0"} value={"0"}></option>
                                        {userList && userList.map(list =>
                                            <option key={list.uid} value={list.uid}>{list.name}</option>
                                            )}
                                        
                                    </select>
                                </label>
                                <div className="label">
                                    <span className="label-text">{served && served}</span>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Verify Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default VerifyUsers;