import { useState } from "react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/config";

type AnnouncementDoc ={ 
    title: string,
    date: string,
    id: string,
}[];

type Props = {
    status: string;
    title: string;
};

const UpdateStatusAnnounce = (props: Props) => {

    const [firstLoad, setFirstLoad] = useState(true);
    const [announcementList, setAnnouncementList] = useState<AnnouncementDoc>([]);
    const [announcementID, setAnnouncementID] = useState<string>('');

    const getAnnouncements = async () => {
        const q = query(collection(db,"announcements"), where("status", "==", props.status));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            return{
                title: doc.data().title,
                date: doc.data().date,
                id: doc.id
            }
        });

        setAnnouncementList(lists);
        setFirstLoad(false);
    };

    if(firstLoad){
        getAnnouncements();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(announcementID != "0")
        {
            if(props.status == "show"){
                await updateDoc(doc(db, 'announcements/' + announcementID), {status: "dont show"});
            } else {
                await updateDoc(doc(db, 'announcements/' + announcementID), {status: "show"});
            }
            
        }

        setAnnouncementID("");
        setFirstLoad(true);
    };

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4">
                <label className="form-control w-full max-w-xs" >
                    <div className="label">
                        <span className="label-text">{props.title}</span>
                    </div>
                    <select className="select select-bordered" value={announcementID} onChange={(e) => setAnnouncementID(e.target.value)}>
                    <option key={"0"} value={"0"}></option>
                    {announcementList && announcementList.map(list =>
                        <option key={list.id} value={list.id}>{list.title} {list.date}</option>
                    )}
                    </select>
                </label>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">{props.title}</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStatusAnnounce;