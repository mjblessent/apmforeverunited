import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

type AnnouncementDoc ={ 
    title: string,
    message: string,
    date: string,
    imgurl: string,
    id: string,
}[];

const GetAnnouncements = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [announcementList, setAnnouncementList] = useState<AnnouncementDoc>([]);

    const getAnnouncements = async () => {
        const q = query(collection(db,"announcements"), where("status", "==", "show"));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            return{
                title: doc.data().title,
                message: doc.data().message,
                date: doc.data().date,
                imgurl: doc.data().imgurl,
                id: doc.id
            }
        });

        setAnnouncementList(lists);
        setFirstLoad(false);
    };

    if(firstLoad){
        getAnnouncements();
    }

    return(
        <div>
            {announcementList && announcementList.map(list => 
        <div key={list.id}>
        <div className="hero min-h-12 bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src={list.imgurl} className="max-w-xs w-fit max-h-fit rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{list.title}</h1>
                    <p className="text-xs">{list.date}</p>
                    <p className="py-6">{list.message}</p>
                </div>
            </div>
        </div>
        <div className="divider"></div>
        </div>
        )}
        </div>
    );
};

export default GetAnnouncements;