import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/config";

type DietaryDoc = {
    name: string,
    dietary: string,
}[];

const Dietary = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [dietaryList, setDietaryList] = useState<DietaryDoc>([]);

    const getDietary = async () => {

        const q = query(collection(db,"submissions"), where("dietary", "!=", ""));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            return{
                name: doc.data().fName + " " +doc.data().lName ,
                dietary: doc.data().dietary
            }
        });

        setDietaryList(lists);
        setFirstLoad(false);
    };

    if(firstLoad){
        getDietary();
        
    }

    return(
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center">Dietary Restrictions</h1>
            </div>
            <table className="table table-zebra border-4">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Dietary Restrictions</th>
                    </tr>
                </thead>
                <tbody>
                    {dietaryList.length > 0 && dietaryList.map(list => 
                    <tr key={list.name}>
                        <td>{list.name}</td>
                        <td>{list.dietary}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Dietary;