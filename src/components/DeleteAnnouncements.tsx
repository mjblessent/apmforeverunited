import { useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, or, query, where } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { deleteObject, ref } from "firebase/storage";

type AnnouncementDoc ={ 
    title: string,
    date: string,
    status: string,
    storageDirect: string,
    id: string,
}[];



const DeleteAnnouncements = () => {

    const [firstLoad, setFirstLoad] = useState(true);
    const [announcementList, setAnnouncementList] = useState<AnnouncementDoc>([]);
    const [announcementID, setAnnouncementID] = useState<string>('');

    const getAnnouncements = async () => {
        const q = query(collection(db,"announcements"), or(where("status", "==", "show"), where("status", "==", "dont show")));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            return{
                title: doc.data().title,
                date: doc.data().date,
                status: doc.data().status,
                storageDirect: doc.data().storageDirect,
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
            const docSnap = await getDoc(doc(db, 'announcements/' + announcementID));

            if(docSnap.exists() && docSnap.data().storageDirect != ""){
                deleteObject(ref(storage,docSnap.data().storageDirect));
                
            }
            await deleteDoc(doc(db, 'announcements/' + announcementID)); 
            
        }

        setAnnouncementID("");
        setFirstLoad(true);
    };

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4">
                <label className="form-control w-full max-w-xs" >
                    <div className="label">
                        <span className="label-text">Delete Announcement</span>
                    </div>
                    <select className="select select-bordered" value={announcementID} onChange={(e) => setAnnouncementID(e.target.value)}>
                    <option key={"0"} value={"0"}></option>
                    {announcementList && announcementList.map(list =>
                        <option key={list.id} value={list.id}>{list.title} {list.date} {list.status}</option>
                    )}
                    </select>
                </label>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Delete Announcement</button>
                </div>
            </form>
        </div>
    );
};

export default DeleteAnnouncements;