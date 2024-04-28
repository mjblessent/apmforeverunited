import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";

const Description = () => {
    
    const [title, setTitle] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [descript, setDescript] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getCurrentEventId = async () => {
        const DBCurrentEventId = 'events/currentevent';
        const eventRecordid = doc(db,DBCurrentEventId);
        const docSnap = await getDoc(eventRecordid);
        if(docSnap.exists())
        {
            if(docSnap.data().id == "false"){
                setTitle("No Event Scheduled");
                setDate("");
                setDescript("Check back later for future events");
            }else{
                getCurrentEventInfo(docSnap.data().id);
            }
        }
        
    };

    const getCurrentEventInfo = async (id: string) => {
        const DBCurrentEventInfo = 'events/' + id;
        const eventRecord = doc(db,DBCurrentEventInfo);
        const docSnap = await getDoc(eventRecord);

        if(docSnap.exists()){
            setTitle(docSnap.data().title);
            setDate("Register by: " + docSnap.data().subdate);
            setDescript(docSnap.data().description);
        }else{
            setTitle("No Event Scheduled");
            setDate("");
            setDescript("Check back later for future events");
        }
        setIsLoading(false);
    };
    getCurrentEventId();

    if(isLoading){
        return (
            <div className='text-center mt-10'>
               <progress className="progress w-56"></progress> 
            </div>
        )
    }

    return(
        <div className="text-center ">
            <h1 className="text-5xl font-bold">{title}</h1>
            <h2>{date}</h2>
            <p className="py-6">{descript}</p>
        </div>
    );
};

export default Description;