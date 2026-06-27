import { addDoc, and, collection, doc, getDoc, getDocs, or, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import GetCompanions from "./MissionHistory/GetCompanions";
import GetDistricts from "./MissionHistory/GetDistricts";

const GetMissionHistory = () => {

    const { user } = useAuth();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    //const [firstLoad, setFirstLoad] = useState(true);
    const firstLoad = useRef(true);
    


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
                const companions = [{name:"", area:"",zone:"",startDate:"",endDate:""}];
                const districts = [{district:"", area:"", zone:""}];
                const districtDates = [{district:"",date:""}];
                let shouldAdd = true;
                let shouldAddDistrict = true;
                let shouldAddDistrictDate = true;
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());

                    for(let y =0; y<districts.length;y++){
                        if(districts[y].district == doc.data().district){
                            for(let z = 0; z<districtDates.length;z++){//problem here, length gets into the thousands
                                console.log(districtDates.length);
                                if(districtDates[z].district == doc.data().district && districtDates[z].date == doc.data().date){
                                    shouldAddDistrictDate = false;
                                }
                            }
                            shouldAddDistrict =false;
                        }
                    }
                    if(shouldAddDistrict){
                        districts.push({district:doc.data().district,area:doc.data().area,zone:doc.data().zone});
                        //districtDates.push({district:doc.data().district, date:doc.data().date});
                        }
                        else{
                            shouldAddDistrict = true;
                        }
                        if(shouldAddDistrictDate){
                            
                            districtDates.push({district:doc.data().district, date:doc.data().date});
                            }
                            else{
                                shouldAddDistrictDate = true;
                            }
                if(doc.data().missionaryonefirst != docSnap.data().fName && doc.data().missionaryonelast != docSnap.data().lName && doc.data().missionaryonefirst != "0")
                    {
                        console.log(doc.data().missionaryonefirst +" "+ doc.data().missionaryonelast);
                        for(let x =0; x<companions.length; x++){
                            if(companions[x].name == doc.data().missionaryonefirst +" "+ doc.data().missionaryonelast){
                                //check if new date is less than start date and if so update
                                //check if new data is greater than end date if so then update
                                //can probably make boolean function to determind this 
                                if(compareDates(companions[x].startDate, doc.data().date))
                                {
                                    companions[x].startDate = doc.data().date;
                                }
                                if(compareDates(doc.data().date, companions[x].endDate))
                                {
                                    companions[x].endDate = doc.data().date;
                                }
                                shouldAdd =false; 
                            }
                        }
                        if(shouldAdd){
                        companions.push({name:doc.data().missionaryonefirst +" "+ doc.data().missionaryonelast,area:doc.data().area,zone:doc.data().zone,startDate:doc.data().date,endDate:doc.data().date});
                        }
                        else{
                            shouldAdd = true;
                        }
                    }
                if(doc.data().missionarytwofirst != docSnap.data().fName && doc.data().missionarytwolast != docSnap.data().lName && doc.data().missionarytwofirst != "0")
                    {
                        console.log(doc.data().missionarytwofirst +" "+ doc.data().missionarytwolast);
                        for(let x =0; x<companions.length; x++){
                            if(companions[x].name == doc.data().missionarytwofirst +" "+ doc.data().missionarytwolast){
                                if(compareDates(companions[x].startDate, doc.data().date))
                                    {
                                        companions[x].startDate = doc.data().date;
                                    }
                                    if(compareDates(doc.data().date, companions[x].endDate))
                                    {
                                        companions[x].endDate = doc.data().date;
                                    }
                                shouldAdd =false; 
                            }
                        }
                        if(shouldAdd){
                        companions.push({name:doc.data().missionarytwofirst +" "+ doc.data().missionarytwolast,area:doc.data().area,zone:doc.data().zone,startDate:doc.data().date,endDate:doc.data().date});
                        }
                        else{
                            shouldAdd = true;
                        }
                    }
                if(doc.data().missionarythreefirst != docSnap.data().fName && doc.data().missionarythreelast != docSnap.data().lName && doc.data().missionarythreefirst != "0")
                    {
                        console.log(doc.data().missionarythreefirst +" "+ doc.data().missionarythreelast);
                        for(let x =0; x<companions.length; x++){
                            if(companions[x].name == doc.data().missionarythreefirst +" "+ doc.data().missionarythreelast){
                                if(compareDates(companions[x].startDate, doc.data().date))
                                    {
                                        companions[x].startDate = doc.data().date;
                                    }
                                    if(compareDates(doc.data().date, companions[x].endDate))
                                    {
                                        companions[x].endDate = doc.data().date;
                                    }
                                shouldAdd =false; 
                            }
                        }
                        if(shouldAdd){
                        companions.push({name:doc.data().missionarythreefirst +" "+ doc.data().missionarythreelast,area:doc.data().area,zone:doc.data().zone,startDate:doc.data().date,endDate:doc.data().date});
                        }
                        else{
                            shouldAdd = true;
                        }
                    }
                    if(doc.data().missionaryfourfirst != docSnap.data().fName && doc.data().missionaryfourlast != docSnap.data().lName && doc.data().missionaryfourfirst != "0")
                        {
                            console.log(doc.data().missionaryfourfirst +" "+ doc.data().missionaryfourlast);
                            for(let x =0; x<companions.length; x++){
                                if(companions[x].name == doc.data().missionaryfourfirst +" "+ doc.data().missionaryfourlast){
                                    if(compareDates(companions[x].startDate, doc.data().date))
                                        {
                                            companions[x].startDate = doc.data().date;
                                        }
                                        if(compareDates(doc.data().date, companions[x].endDate))
                                        {
                                            companions[x].endDate = doc.data().date;
                                        }
                                    shouldAdd =false; 
                                }
                            }
                            if(shouldAdd){
                            companions.push({name:doc.data().missionaryfourfirst +" "+ doc.data().missionaryfourlast,area:doc.data().area,zone:doc.data().zone,startDate:doc.data().date,endDate:doc.data().date});
                            }
                            else{
                                shouldAdd = true;
                            }
                        }
                        
                });
            
                for(let y =0; y<companions.length;y++){
                    console.log(companions[y].name + "\n");
                    console.log(companions[y].area + "\n");
                    await addDoc(collection(db,'user/'+user?.uid+'/companions'),companions[y]);
                }
                const districtMissionaries = [{id:"",date:"",district:"",fName:"",lName:""}];
                let shouldAddDistrictMissionary = true;
                for(let y =0; y<districts.length;y++){
                    
                    const docRef = await addDoc(collection(db,'user/'+user?.uid+'/district'),districts[y]);
                    console.log(docRef);
                    console.log(docRef.id);
                    for(let x = 0; x<districtDates.length;x++)
                    {
                        //console.log("District " +districts[y].district + "\n");
                        //console.log("District Date "+districtDates[x].district + "\n");
                        //console.log("Are they equal " + districtDates[x].district == districts[y].district + "\n");
                        if(districtDates[x].district == districts[y].district){
                            await addDoc(collection(db,'user/'+user?.uid+'/district/'+docRef.id+'/dates'),districtDates[x]);
                            console.log(districtDates[x].date+ "\n");
                            const q2 = query(collection(db,"missiondatanames"),and(where("district","==",districtDates[x].district), where("date","==",districtDates[x].date)));
                            const districtSnapShot = await getDocs(q2);
                            districtSnapShot.forEach((docs) => {
                                console.log(docs.data());
                                if(docs.data().missionaryonefirst != docSnap.data().fName && docs.data().missionaryonelast != docSnap.data().lName && docs.data().missionaryonefirst != "0")
                                {
                                    for(let z = 0; z<districtMissionaries.length;z++)
                                        {
                                            if(districtMissionaries[z].fName == docs.data().missionaryonefirst&& districtMissionaries[z].lName == docs.data().missionaryonelast)
                                            {
                                                shouldAddDistrictMissionary = false;
                                            }
                                        }
                                    if(shouldAddDistrictMissionary)
                                        {
                                            districtMissionaries.push({id:docRef.id,date:docs.data().date,district:docs.data().district,fName:docs.data().missionaryonefirst,lName:docs.data().missionaryonelast});
                                        }
                                    else{
                                        shouldAddDistrictMissionary = true;
                                    }    
                                }
                                if(docs.data().missionarytwofirst != docSnap.data().fName && docs.data().missionarytwolast != docSnap.data().lName && docs.data().missionarytwofirst != "0")
                                    {
                                        for(let z = 0; z<districtMissionaries.length;z++)
                                            {
                                                if( districtMissionaries[z].fName == docs.data().missionarytwofirst&& districtMissionaries[z].lName == docs.data().missionarytwolast)
                                                {
                                                    shouldAddDistrictMissionary = false;
                                                }
                                            }
                                        if(shouldAddDistrictMissionary)
                                            {
                                                districtMissionaries.push({id:docRef.id,date:docs.data().date,district:docs.data().district,fName:docs.data().missionarytwofirst,lName:docs.data().missionarytwolast});
                                            }
                                        else{
                                            shouldAddDistrictMissionary = true;
                                        }  
                                    }
                                if(docs.data().missionarythreefirst != docSnap.data().fName && docs.data().missionarythreelast != docSnap.data().lName && docs.data().missionarythreefirst != "0")
                                    {
                                        for(let z = 0; z<districtMissionaries.length;z++)
                                            {
                                                if(districtMissionaries[z].fName == docs.data().missionarythreefirst&& districtMissionaries[z].lName == docs.data().missionarythreelast)
                                                {
                                                    shouldAddDistrictMissionary = false;
                                                }
                                            }
                                        if(shouldAddDistrictMissionary)
                                            {
                                                districtMissionaries.push({id:docRef.id,date:docs.data().date,district:docs.data().district,fName:docs.data().missionarythreefirst,lName:docs.data().missionarythreelast});
                                            }
                                        else{
                                            shouldAddDistrictMissionary = true;
                                        }  
                                    }
                                if(docs.data().missionaryfourfirst != docSnap.data().fName && docs.data().missionaryfourlast != docSnap.data().lName && docs.data().missionaryfourfirst != "0")
                                    {
                                        for(let z = 0; z<districtMissionaries.length;z++)
                                            {
                                                if(districtMissionaries[z].fName == docs.data().missionaryfourfirst&& districtMissionaries[z].lName == docs.data().missionaryfourlast)
                                                {
                                                    shouldAddDistrictMissionary = false;
                                                }
                                            }
                                        if(shouldAddDistrictMissionary)
                                            {
                                                districtMissionaries.push({id:docRef.id,date:docs.data().date,district:docs.data().district,fName:docs.data().missionaryfourfirst,lName:docs.data().missionaryfourlast});
                                            }
                                        else{
                                            shouldAddDistrictMissionary = true;
                                        }  
                                    }
                            });
                        }
                    }

                }

                for(let a = 0;a<districtMissionaries.length;a++){
                    console.log(districtMissionaries[a]);
                    if(districtMissionaries[a].id != ""){
                        await addDoc(collection(db,'user/'+user?.uid+'/district/'+districtMissionaries[a].id+'/missionaries'),districtMissionaries[a]);
                    }
                    
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

    useEffect(() => {
        if(firstLoad.current == true){
            console.log("Firstload at the start is ");
            console.log(firstLoad);
            //setFirstLoad(false);
            checkMissionHistory();
            firstLoad.current = false;
            console.log("Firstload at the end is ");
            console.log(firstLoad);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const compareDates = (input1:string, input2:string) => {
        const date1 = new Date(input1);
        const date2 = new Date(input2);

        if(date1 > date2)
        {
            return true;
        }
        else {
            return false;
        }
    };

    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold text-center">Gathering your Mission History!</h1>
               <progress className="progress w-56"></progress> 
            </div>
        );
    }

    return(
        <div>
            <h1>Mission History!</h1>
           <GetCompanions/>
           <GetDistricts/>

        </div>
    );

};

export default GetMissionHistory;