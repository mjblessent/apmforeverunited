import { useState } from "react";
import { collection, getDocs, query, where, or } from "firebase/firestore";
import { db } from "../../firebase/config";


type SinglesDoc = {
    id: string;
    name: string;
    gender: string;
    plusOneName: string;
    plusGender:string;
    dOneNight: string;
}[];

const Singles = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [singlesList, setSinglesList] = useState<SinglesDoc>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getSingles = async () => {
        const q = query(collection(db,"submissions"), or(where("plusOne", "==", "noplusone"), where("plusOne", "==", "signifcantother")));
        const querySnapshot = await getDocs(q);
        const lists = querySnapshot.docs.map( (document) => {

            var night = "No";
            if(document.data().dOneNight){
                night= "Yes";
            }
            return{
                id: document.id,
                name: document.data().fName + " " + document.data().lName,
                gender: document.data().gender,
                plusOneName: document.data().plusOneName,
                plusGender: document.data().plusGender,
                dOneNight: night
            }
        });

        //console.log(lists);
        setSinglesList(lists);
        setFirstLoad(false);
        setIsLoading(false);

    };


    if(firstLoad){
        getSingles();
        
    }

    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold text-center">Singles</h1>
               <progress className="progress w-56"></progress> 
            </div>
        )
    }

    return(
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center">Singles</h1>
            </div>
            <table className="table table-zebra border-4">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Plus one Name</th>
                        <th>Plus one Gender</th>
                        <th>Staying the night?</th>
                    </tr>
                </thead>
                <tbody>
                    {singlesList && singlesList.map(list => 
                    <tr key={list.id}>
                        <td>{list.name}</td>
                        <td>{list.gender}</td>
                        <td>{list.plusOneName}</td>
                        <td>{list.plusGender}</td>
                        <td>{list.dOneNight}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Singles;