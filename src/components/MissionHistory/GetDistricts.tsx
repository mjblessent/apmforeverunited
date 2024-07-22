import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
type Districts = {
district:string,
zone:string,
missionaries:string[],
}[];
const GetDistricts = () => {
const {user} = useAuth();
const [districtList, setDistrictList] = useState<Districts>([]);
const [firstLoad, setFirstLoad] = useState(true);

const getDistricts = async () => {
    const qDistriscts = query(collection(db,'user/'+user?.uid+'/district'), where("district","!=",""));
    const querySnapshotD = getDocs(qDistriscts);
    var missionaryList = [{district:"",zone:"",missionaries:[""]}];
    const lists = (await querySnapshotD).docs.map((document) =>{
        return{
            id: document.id,
            district: document.data().district,
            zone: document.data().zone
        }
    });

    for(var x = 0; x<lists.length;x++){
        if(lists[x].id != ""){
            const qMissionaries = query(collection(db,'user/'+user?.uid+'/district/'+lists[x].id+'/missionaries'), where("id","==",lists[x].id));
            const querySnapshotM = await getDocs(qMissionaries);
            var names = [""];
            (querySnapshotM).docs.map((document) =>{
                
               names.push(document.data().fName + " " + document.data().lName + ", ");
                
            });

            missionaryList.push({district:lists[x].district,zone:lists[x].zone,missionaries:names});
            
        }
        
    }

    setDistrictList(missionaryList);

};


if(firstLoad){
    getDistricts();
    setFirstLoad(false);
}

return(
<div>
<h2>Districts</h2>
                <table className="table table-zebra border-4">
                <thead>
                    <tr>
                        <th>District</th>
                        <th>Zone</th>
                        <th>Missionaries</th>
                    </tr>
                </thead>
                <tbody>
                    {districtList.length > 0 && districtList.map(list =>
                        <tr key={list.district}>
                            <td>{list.district}</td>
                            <td>{list.zone}</td>
                            <td>{list.missionaries} </td>
                        </tr>
                    )}
                </tbody>
                </table>
</div>
);

};

export default GetDistricts;