import { addDoc, and, collection, doc, getDoc, getDocs, or, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";
import GetCompanions from "./MissionHistory/GetCompanions";

const GetMissionHistory = () => {

    const { user } = useAuth();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    //const [firstLoad, setFirstLoad] = useState(true);
    let firstLoad = useRef(true);
    


    const checkMissionHistory = async () => {
        const isMissionHistoryRecord = doc(db, 'user/'+user?.uid+'/missionhistory/status');

    try{
        const docSnap = await getDoc(isMissionHistoryRecord);
        if(docSnap.exists()){
            console.log("Doc exists!");
            setIsLoading(false);
        }else{
            console.log("Calling loading mission history");
            await loadMissionHistory();
            
        }
    }catch(error)
    {
        setIsError(true);
        console.log("Error!");
        console.log(isError);
        console.log(error);
    }

    
    };
    

    const loadMissionHistory = async () => {

        console.log("Doc not found");
        const userRecord = doc(db, 'user/'+user?.uid);
        try{

        
            const docSnap = await getDoc(userRecord);
            if(docSnap.exists()){
                const q = query(collection(db,"missiondatanames"), or(and(where("missionaryonefirst", "==", docSnap.data().fName),where("missionaryonelast", "==", docSnap.data().lName)),and(where("missionarytwofirst", "==", docSnap.data().fName),where("missionarytwolast", "==", docSnap.data().lName)),and(where("missionarythreefirst", "==", docSnap.data().fName),where("missionarythreelast", "==", docSnap.data().lName)),and(where("missionaryfourfirst", "==", docSnap.data().fName),where("missionaryfourlast", "==", docSnap.data().lName))));
                const companions = [{name:"", area:"",zone:""}];
                var shouldAdd = true;
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
                if(doc.data().missionaryonefirst != docSnap.data().fName && doc.data().missionaryonelast != docSnap.data().lName && doc.data().missionaryonefirst != "0")
                    {
                        console.log(doc.data().missionaryonefirst +" "+ doc.data().missionaryonelast);
                        for(var x =0; x<companions.length; x++){
                            if(companions[x].name == doc.data().missionaryonefirst +" "+ doc.data().missionaryonelast){
                                shouldAdd =false; 
                            }
                        }
                        if(shouldAdd){
                        companions.push({name:doc.data().missionaryonefirst +" "+ doc.data().missionaryonelast,area:doc.data().area,zone:doc.data().zone});
                        }
                        else{
                            shouldAdd = true;
                        }
                    }
                if(doc.data().missionarytwofirst != docSnap.data().fName && doc.data().missionarytwolast != docSnap.data().lName && doc.data().missionarytwofirst != "0")
                    {
                        console.log(doc.data().missionarytwofirst +" "+ doc.data().missionarytwolast);
                        for(var x =0; x<companions.length; x++){
                            if(companions[x].name == doc.data().missionarytwofirst +" "+ doc.data().missionarytwolast){
                                shouldAdd =false; 
                            }
                        }
                        if(shouldAdd){
                        companions.push({name:doc.data().missionarytwofirst +" "+ doc.data().missionarytwolast,area:doc.data().area,zone:doc.data().zone});
                        }
                        else{
                            shouldAdd = true;
                        }
                    }
                if(doc.data().missionarythreefirst != docSnap.data().fName && doc.data().missionarythreelast != docSnap.data().lName && doc.data().missionarythreefirst != "0")
                    {
                        console.log(doc.data().missionarythreefirst +" "+ doc.data().missionarythreelast);
                        for(var x =0; x<companions.length; x++){
                            if(companions[x].name == doc.data().missionarythreefirst +" "+ doc.data().missionarythreelast){
                                shouldAdd =false; 
                            }
                        }
                        if(shouldAdd){
                        companions.push({name:doc.data().missionarythreefirst +" "+ doc.data().missionarythreelast,area:doc.data().area,zone:doc.data().zone});
                        }
                        else{
                            shouldAdd = true;
                        }
                    }
                    if(doc.data().missionaryfourfirst != docSnap.data().fName && doc.data().missionaryfourlast != docSnap.data().lName && doc.data().missionaryfourfirst != "0")
                        {
                            console.log(doc.data().missionaryfourfirst +" "+ doc.data().missionaryfourlast);
                            for(var x =0; x<companions.length; x++){
                                if(companions[x].name == doc.data().missionaryfourfirst +" "+ doc.data().missionaryfourlast){
                                    shouldAdd =false; 
                                }
                            }
                            if(shouldAdd){
                            companions.push({name:doc.data().missionaryfourfirst +" "+ doc.data().missionaryfourlast,area:doc.data().area,zone:doc.data().zone});
                            }
                            else{
                                shouldAdd = true;
                            }
                        }
                        
                });
            
                for(var y =0; y<companions.length;y++){
                    console.log(companions[y].name + "\n");
                    console.log(companions[y].area + "\n");
                    await addDoc(collection(db,'user/'+user?.uid+'/companions'),companions[y]);
                }
                await setDoc(doc(db,'user/'+user?.uid+'/missionhistory/status'), {status:true});
                checkMissionHistory();
            }else{
                console.log("User doc not found");
             }


        
        


    }catch(error){
        setIsError(true);
        console.log("Error!");
        console.log(isError);
        console.log(error);
    }
    };

    if(firstLoad.current == true){
        console.log("Firstload at the start is ");
        console.log(firstLoad);
        //setFirstLoad(false);
        checkMissionHistory();
        firstLoad.current = false;
        console.log("Firstload at the end is ");
        console.log(firstLoad);
        
        
    }
    
    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold text-center">Mission History!</h1>
               <progress className="progress w-56"></progress> 
            </div>
        );
    }

    return(
        <div>
            <h1>Mission History!</h1>
           <GetCompanions/>

        </div>
    );

};

export default GetMissionHistory;