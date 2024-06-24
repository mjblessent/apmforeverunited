import { collection, and, getDocs, or, query, where, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/config";

type Attendee = {
    name: string,
    id: string,
}[];

const AssignGender = () => {

    const [firstLoad, setFirstLoad] = useState(true);
    const [attendeeList, setAttendeeList] = useState<Attendee>([]);
    const [plusOneList, setPlusOneList] = useState<Attendee>([]);
    const [gender, setGender] = useState<string>('male');
    const [docID, setDocID] = useState<string>('0');
    const [genderPlus, setGenderPlus] = useState<string>('male');
    const [docID2, setDocID2] = useState<string>('0');

    const loadUnknowGender = async () => {

        const q = query(collection(db,"submissions"),and(where("gender", "==", ""), or(where("plusOne", "==", "noplusone"), where("plusOne", "==", "signifcantother")))  );
        const querySnapshot = await getDocs(q);
        const lists = querySnapshot.docs.map( (document) => {
            return{
                id: document.id,
                name: document.data().fName + " " + document.data().lName
            }
        });

        const qq = query(collection(db,"submissions"),and(where("plusGender", "==", ""), where("plusOne", "==", "signifcantother")));
        const querySnapshot2 = await getDocs(qq);
        const lists2 = querySnapshot2.docs.map( (document) => {
            return{
                id: document.id,
                name: document.data().plusOneName
            }
        });

        //console.log(lists);
        //console.log(lists2);
        setAttendeeList(lists);
        setPlusOneList(lists2);
        setFirstLoad(false);
    };


    if(firstLoad){
        loadUnknowGender();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updateData = {
            gender: gender
        };

        const updateDirectory = doc(db, 'submissions/' + docID);
        await updateDoc(updateDirectory,updateData);
        setFirstLoad(true);
    };

    const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updateData = {
            plusGender: genderPlus
        };

        const updateDirectory = doc(db, 'submissions/' + docID2);
        await updateDoc(updateDirectory,updateData);
        setFirstLoad(true);
    };

    return(
        <div>
            <h1></h1>
            <form onSubmit={handleSubmit}>
                    <div>
                        <div className="hero-content flex-col ">
                            <h1>Attendee</h1>
                            <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
                                <div className="card-body">
                                    <label className="form-control w-full max-w-xs" >
                                        <div className="label">
                                            <span className="label-text">Select the Attendee you wish to assign Elder or Sister</span>
                                        </div>
                                        <select className="select select-bordered" value={docID} onChange={(e) => setDocID(e.target.value)}>
                                            <option key={"0"} value={"0"}></option>
                                            {attendeeList && attendeeList.map(list =>
                                                <option key={list.id} value={list.id}>{list.name}</option>
                                                )}
                                            
                                        </select>
                                    </label>
                                    <div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Elder</span> 
                                    <input type="radio"  value="male" onChange={(e) => setGender(e.target.value)} name="radio-1" className="radio radio-primary"/>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Sister</span> 
                                    <input type="radio"  value="female" onChange={(e) => setGender(e.target.value)} name="radio-1" className="radio radio-primary"/>
                                </label>
                            </div>
                        </div>
                                    <div className="label">
                                        <span className="label-text"></span>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary">Assign</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={handleSubmit2}>
                    <div>
                        <div className="hero-content flex-col ">
                            <h1>Plus One List</h1>
                            <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
                                <div className="card-body">
                                    <label className="form-control w-full max-w-xs" >
                                        <div className="label">
                                            <span className="label-text">Select the Plus One you wish to assign Elder or Sister</span>
                                        </div>
                                        <select className="select select-bordered" value={docID2} onChange={(e) => setDocID2(e.target.value)}>
                                            <option key={"0"} value={"0"}></option>
                                            {plusOneList && plusOneList.map(list =>
                                                <option key={list.id} value={list.id}>{list.name}</option>
                                                )}
                                            
                                        </select>
                                    </label>
                                    <div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Elder</span> 
                                    <input type="radio"  value="male" onChange={(e) => setGenderPlus(e.target.value)} name="radio-1" className="radio radio-primary"/>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Sister</span> 
                                    <input type="radio"  value="female" onChange={(e) => setGenderPlus(e.target.value)} name="radio-1" className="radio radio-primary"/>
                                </label>
                            </div>
                        </div>
                                    <div className="label">
                                        <span className="label-text"></span>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary">Assign</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>



        </div>
    );

};

export default AssignGender;