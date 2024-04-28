import { useState } from "react";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


type Props = {
    night: string;
    message: string;
};

const Nights = (props: Props) => {
    const [NightsNumSpouse, setNightsNumSpouse] = useState<number>(0);
    const [NightsNumSigOth, setNightsNumSigOth] = useState<number>(0);
    const [NightsNumSingle, setNightsNumSingle] = useState<number>(0);
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getsetNightsNum = async () => {
        const qSpouse = query(collection(db,"submissions"), where(props.night, "==", true),where("plusOne", "==", "spouse"));
        const qSigOth = query(collection(db,"submissions"), where(props.night, "==", true),where("plusOne", "==", "signifcantother"));
        const qSingle = query(collection(db,"submissions"), where(props.night, "==", true),where("plusOne", "==", "noplusone"));

        const querySnapshotSpouse = await getCountFromServer(qSpouse);
        const querySnapshotSigOth = await getCountFromServer(qSigOth);
        const querySnapshotSingle = await getCountFromServer(qSingle);

        setNightsNumSpouse(querySnapshotSpouse.data().count);
        setNightsNumSigOth(querySnapshotSigOth.data().count * 2);
        setNightsNumSingle(querySnapshotSingle.data().count);
        setFirstLoad(false);
        setIsLoading(false);
    };

    if(firstLoad){
        getsetNightsNum();
        
    }

    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold">{props.message}</h1>
               <progress className="progress w-56"></progress> 
            </div>
        )
    }

    return(
    <div className="text-center space-y-1">
        <div>
            <h1 className="text-3xl font-bold">{props.message}</h1>
        </div>
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">Total</div>
                <div className="stat-value">{(NightsNumSpouse*2)+NightsNumSigOth+NightsNumSingle}</div>
            </div>
            <div className="stat">                 
                <div className="stat-title">Married Couples</div>
                <div className="stat-value">{NightsNumSpouse}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Single</div>
                <div className="stat-value">{NightsNumSigOth+NightsNumSingle}</div>
            </div>
        </div>
    </div>
    );
};

export default Nights;