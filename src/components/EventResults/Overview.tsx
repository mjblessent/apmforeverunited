import { useState } from "react";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


const Overview = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [NumSpouse, setNumSpouse] = useState<number>(0);
    const [NumSigOth, setNumSigOth] = useState<number>(0);
    const [NumSingle, setNumSingle] = useState<number>(0);
    const [NumMale, setNumMale] = useState<number>(0);
    const [NumFemale, setNumFemale] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getSetNums = async () => {
        const qSpouse = query(collection(db,"submissions"), where("plusOne", "==", "spouse"));
        const qSigOth = query(collection(db,"submissions"), where("plusOne", "==", "signifcantother"));
        const qSingle = query(collection(db,"submissions"), where("plusOne", "==", "noplusone"));
        const qMaleA = query(collection(db,"submissions"), where("gender", "==", "male"));
        const qMalePO = query(collection(db,"submissions"), where("plusGender", "==", "male"));
        const qFemaleA = query(collection(db,"submissions"), where("gender", "==", "female"));
        const qFemalePO = query(collection(db,"submissions"), where("plusGender", "==", "female"));

        const querySnapshotSpouse = await getCountFromServer(qSpouse);
        const querySnapshotSigOth = await getCountFromServer(qSigOth);
        const querySnapshotSingle = await getCountFromServer(qSingle);
        const querySnapshotMaleA = await getCountFromServer(qMaleA);
        const querySnapshotMalePO = await getCountFromServer(qMalePO);
        const querySnapshotFemaleA = await getCountFromServer(qFemaleA);
        const querySnapshotFemalePO = await getCountFromServer(qFemalePO);

        //console.log(querySnapshotMaleA);
        //console.log(querySnapshotMalePO);
        //console.log(querySnapshotMalePO.data().count+querySnapshotMaleA.data().count);

        setNumSpouse(querySnapshotSpouse.data().count);
        setNumSigOth(querySnapshotSigOth.data().count * 2);
        setNumSingle(querySnapshotSingle.data().count);
        setNumMale(querySnapshotMalePO.data().count+querySnapshotMaleA.data().count);
        setNumFemale(querySnapshotFemaleA.data().count+querySnapshotFemalePO.data().count);
        setFirstLoad(false);
        setIsLoading(false);
    };

    if(firstLoad){
        getSetNums();
        
    }

    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold">Overview of Attendence</h1>
                <progress className="progress w-56"></progress> 
            </div>
        )
    }

    return(
        <div className="text-center space-y-1">
        <div>
            <h1 className="text-3xl font-bold">Overview of Attendence</h1>
        </div>
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">Total</div>
                <div className="stat-value">{(NumSpouse*2)+NumSigOth+NumSingle}</div>
            </div>
            <div className="stat">                 
                <div className="stat-title">Married Couples</div>
                <div className="stat-value">{NumSpouse}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Total Single</div>
                <div className="stat-value">{NumSigOth+NumSingle}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Single Male</div>
                <div className="stat-value">{NumMale}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Single Female</div>
                <div className="stat-value">{NumFemale}</div>
            </div>
        </div>
    </div>
    );

};

export default Overview;