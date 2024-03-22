import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


type Props = {
    item: string;
    title: string;
}

type HelperDoc = {
    name: string,
}[];

const Helpers = (props: Props) => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [helperList, setHelperList] = useState<HelperDoc>([]);

    const getHelpers = async () => {

        const q = query(collection(db,"submissions"), where(props.item, "==", "yes"));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            return{
                name: doc.data().fName + " " +doc.data().lName
            }
        });

        setHelperList(lists);
        setFirstLoad(false);
    };

    if(firstLoad){
        getHelpers();
        
    }


    return(
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center">{props.title}</h1>
            </div>
            <table className="table table-zebra border-4">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {helperList && helperList.map(list => 
                    <tr key={list.name}>
                        <td>{list.name}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Helpers;