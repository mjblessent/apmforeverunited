import { collection, getDocs, query, where } from "firebase/firestore";
import { useRef, useState } from "react";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";

type Companions = {
    name: string,
    area: string,
    zone: string,
    
    }[];

const GetCompanions = () => {
    const { user } = useAuth();
    const [companionList, setCompanionList] = useState<Companions>([]);
    let firstLoad = useRef(true);

const getCompanions = async () => {
    const qCompanions = query(collection(db,'user/'+user?.uid+'/companions'), where("name", "!=",""));
    const querySnapshotC = getDocs(qCompanions);
    const lists = (await querySnapshotC).docs.map((document) => {
        return{
            name: document.data().name,
            zone: document.data().zone,
            area: document.data().area
        }
    });
    setCompanionList(lists);
};

if(firstLoad){
    getCompanions();
    firstLoad.current=false;
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
                    </tr>
                </thead>
                <tbody>
                    {companionList.length > 0 && companionList.map(list =>
                        <tr key={list.name}>
                            <td>{list.name}</td>
                            <td>{list.area}</td>
                            <td>{list.zone}</td>
                        </tr>
                    )}
                </tbody>
                </table>
    </div>
);
};

export default GetCompanions;