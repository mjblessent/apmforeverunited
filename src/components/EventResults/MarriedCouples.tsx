import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

type MarriedDoc ={ 
    name: string,
    plusone: string,
    email: string,
    dOneNight: string,
}[];

const MarriedCouples = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [marriedList, setMarriedList] = useState<MarriedDoc>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getMarried = async () => {

        const q = query(collection(db,"submissions"), where("plusOne", "==", "spouse"));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            var night = "No";
            if(doc.data().dOneNight){
                night= "Yes";
            }
            return{
                name: doc.data().fName + " " +doc.data().lName,
                plusone: doc.data().plusOneName,
                email: doc.data().email,
                dOneNight: night
            }
        });

        setMarriedList(lists);
        setFirstLoad(false);
        setIsLoading(false);
    };

    if(firstLoad){
        getMarried();
        
    }

    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold text-center">Married Couples</h1>
               <progress className="progress w-56"></progress> 
            </div>
        )
    }

    return(
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center">Married Couples</h1>
            </div>
            <table className="table table-zebra border-4">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Plus One Name</th>
                        <th>Staying the night?</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {marriedList && marriedList.map(list => 
                    <tr key={list.name}>
                        <td>{list.name}</td>
                        <td>{list.plusone}</td>
                        <td>{list.dOneNight}</td>
                        <td>{list.email}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default MarriedCouples;