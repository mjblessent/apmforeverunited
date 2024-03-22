import { useState } from "react";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


const Overview = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [NumSpouse, setNumSpouse] = useState<number>(0);
    const [NumSigOth, setNumSigOth] = useState<number>(0);
    const [NumSingle, setNumSingle] = useState<number>(0);

    const getSetNums = async () => {
        const qSpouse = query(collection(db,"submissions"), where("plusOne", "==", "spouse"));
        const qSigOth = query(collection(db,"submissions"), where("plusOne", "==", "signifcantother"));
        const qSingle = query(collection(db,"submissions"), where("plusOne", "==", "noplusone"));

        const querySnapshotSpouse = await getCountFromServer(qSpouse);
        const querySnapshotSigOth = await getCountFromServer(qSigOth);
        const querySnapshotSingle = await getCountFromServer(qSingle);

        setNumSpouse(querySnapshotSpouse.data().count);
        setNumSigOth(querySnapshotSigOth.data().count * 2);
        setNumSingle(querySnapshotSingle.data().count);
        setFirstLoad(false);
    };

    if(firstLoad){
        getSetNums();
        
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
                <div className="stat-title">Single</div>
                <div className="stat-value">{NumSigOth+NumSingle}</div>
            </div>
        </div>
    </div>
    );

};

export default Overview;