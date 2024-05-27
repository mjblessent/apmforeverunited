import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const GetProfile = () => {

    const [firstLoad, setFirstLoad] = useState(true);
    const { user } = useAuth();
    const [name, setName] = useState<string>('');
    const [spouse, setSpouse] = useState<string>('');
    const [bDate, setBDate] = useState<string>('');
    const [wDate, setWDate] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [isError, setIsError] = useState(false);
    const [edit, setEdit] = useState(false);
    
    const loadProfile = async () => {
        
        const userRecord = doc(db, 'user/'+user?.uid);
        try{
            const docSnap = await getDoc(userRecord);
            if(docSnap.exists()){
                setName(docSnap.data().name);
                setSpouse(docSnap.data().spouse);
                setBDate(docSnap.data().bDay);
                setWDate(docSnap.data().wDay);
                setPhone(docSnap.data().phone);
                setLName(docSnap.data().lName);

             }
        } catch(error)
        {
            setIsError(true);
        }
        

        setFirstLoad(false);
    };

    const handleEdit = async () => {
    setEdit(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            if(user){
        
        const profileData ={
            lName: lName.toLowerCase(),
            bDay: bDate,
            spouse: spouse,
            wDay: wDate,
            phone: phone

        };

        const userDirectory = doc(db, 'user/' + user.uid);

        await updateDoc(userDirectory,profileData);
        setEdit(false);
        setFirstLoad(true);

    }

    }catch(error){
        setIsError(true);
    }

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
    }
    else if(edit){
        return(
        <form onSubmit={handleSubmit}>
        {isError && isError}
                <div className="hero-content flex-col ">
                    <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
                        <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Birthday</span>
                            </label>
                            <input type="date" value={bDate} onChange={(e) => setBDate(e.target.value)} placeholder="Birthdate" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Spouse</span>
                            </label>
                            <input type="text" value={spouse} onChange={(e) => setSpouse(e.target.value)} placeholder="Spouse Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Wedding Date</span>
                            </label>
                            <input type="date" value={wDate} onChange={(e) => setWDate(e.target.value)} placeholder="Wedding Date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="input input-bordered"  />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
    </form>
        );
    }
    else{
        return(
            <div>
            <h1>Name: {name}</h1>
            <h1>Birthdate: {bDate}</h1>
            <h1>Spouse: {spouse}</h1>
            <h1>Wedding Date: {wDate}</h1>
            <h1>Phone: {phone}</h1>
            <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
            </div>
        );
    }
    

};

export default GetProfile;