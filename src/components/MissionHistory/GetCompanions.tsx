import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";

type Companions = {
    name: string,
    area: string,
    zone: string,
    startDate: string,
    endDate: string,
    
    }[];

const GetCompanions = () => {
    const { user } = useAuth();
    const [companionList, setCompanionList] = useState<Companions>([]);
    const [firstLoad, setFirstLoad] = useState(true);

const getCompanions = async () => {
    console.log("Calling get companions");
    const firstDate = new Date("7/15/18");
    const seondDate = new Date("7/14/19");
    console.log(firstDate);
    console.log(seondDate);
    console.log(firstDate < seondDate);

    const qCompanions = query(collection(db,'user/'+user?.uid+'/companions'), where("name", "!=",""));
    const querySnapshotC = getDocs(qCompanions);
    const lists = (await querySnapshotC).docs.map((document) => {
        return{
            name: document.data().name,
            zone: document.data().zone,
            area: document.data().area,
            startDate: document.data().startDate,
            endDate: document.data().endDate
        }
    });
    setCompanionList(lists);
};

if(firstLoad){
    getCompanions();
    setFirstLoad(false);
}

return(
    <div>
        <h2>Companions</h2>
                <table className="table table-zebra border-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Area</th>
                        <th>Zone</th>
                        <th>Dates Served</th>
                    </tr>
                </thead>
                <tbody>
                    {companionList.length > 0 && companionList.map(list =>
                        <tr key={list.name}>
                            <td>{list.name}</td>
                            <td>{list.area}</td>
                            <td>{list.zone}</td>
                            <td>{list.startDate} - {list.endDate}</td>
                        </tr>
                    )}
                </tbody>
                </table>
    </div>
);
};

export default GetCompanions;