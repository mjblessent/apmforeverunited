import { collection, query, where, or, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

const GetMissionInfo = () => {

    const [firstLoad, setFirstLoad] = useState(true);

    const getInfo = async () => {
        const q = query(collection(db,"missiondatanames"), or(where("missionaryonelast", "==", "blessent" ),where("missionarytwolast", "==", "blessent" ),where("missionarythreelast", "==", "blessent" ),where("missionaryfourlast", "==", "blessent" )));
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot);
        setFirstLoad(false);
    };

    if(firstLoad){
        getInfo();
        
    }

    return(
        <div></div>
    );
};

export default GetMissionInfo;