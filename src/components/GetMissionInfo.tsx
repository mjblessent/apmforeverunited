import { collection, query, where, and, getCountFromServer } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
import React from "react";

const GetMissionInfo = () => {
    const [fName, setFName] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const q = query(collection(db,"missionaryname"), and(where("first", "==", fName.toLowerCase()), where("last", "==", lName.toLowerCase())));
            const qSnapshot = await getCountFromServer(q);
            console.log(qSnapshot.data().count);
            console.log(qSnapshot.data().count > 0);//greater than 0 means it was found
        } catch(error){
          //setError(error.message);
          setError("error on submit");
        }
    };
   

    return(<div>
            <form onSubmit={handleSubmit}>
            {error && error}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">First Name</span>
                </label>
                <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="First Name" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Last Name</span>
                </label>
                <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Check name</button>
            </div>
            </form>
        </div>
    );
};

export default GetMissionInfo;