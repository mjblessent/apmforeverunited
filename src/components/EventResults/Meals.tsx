import { useState } from "react";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


type Props = {
    meal: string;
};

const Meals = (props: Props) => {
    const [MealsNumSpouse, setMealsNumSpouse] = useState<number>(0);
    const [MealsNumSigOth, setMealsNumSigOth] = useState<number>(0);
    const [MealsNumSingle, setMealsNumSingle] = useState<number>(0);
    const [firstLoad, setFirstLoad] = useState(true);

    const getsetMealsNum = async () => {
        const qSpouse = query(collection(db,"submissions"), where(props.meal, "==", true),where("plusOne", "==", "spouse"));
        const qSigOth = query(collection(db,"submissions"), where(props.meal, "==", true),where("plusOne", "==", "signifcantother"));
        const qSingle = query(collection(db,"submissions"), where(props.meal, "==", true),where("plusOne", "==", "noplusone"));

        const querySnapshotSpouse = await getCountFromServer(qSpouse);
        const querySnapshotSigOth = await getCountFromServer(qSigOth);
        const querySnapshotSingle = await getCountFromServer(qSingle);

        setMealsNumSpouse(querySnapshotSpouse.data().count);
        setMealsNumSigOth(querySnapshotSigOth.data().count * 2);
        setMealsNumSingle(querySnapshotSingle.data().count);
        setFirstLoad(false);
    };

    if(firstLoad){
        getsetMealsNum();
        
    }
    return(
    <div>
        {(MealsNumSpouse*2)+MealsNumSigOth+MealsNumSingle}
    </div>
    );
};

export default Meals;