import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


type Props = {
    item: string;
    title: string;
}

type HelperDoc = {
    name: string,
    meal: string,
    email: string,
}[];

const Helpers = (props: Props) => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [helperList, setHelperList] = useState<HelperDoc>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getHelpers = async () => {

        const q = query(collection(db,"submissions"), where(props.item, "==", "yes"));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            let meals = "";
            if(doc.data().dOneD == true)
                {
                    meals = meals + "Friday Dinner, ";
                }
            if(doc.data().dTwoB == true)
                {
                     meals = meals + "Saturday Breakfast, ";
                }
            if(doc.data().dTwoL == true)
                {
                    meals = meals + "Saturday Lunch, ";
                }
            if(doc.data().dTwoD == true)
                {
                    meals = meals + "Saturday Dinner, ";
                }
            return{
                name: doc.data().fName + " " +doc.data().lName,
                meal: meals,
                email: doc.data().email
            }
        });

        setHelperList(lists);
        setFirstLoad(false);
        setIsLoading(false);
    };

    if(firstLoad){
        getHelpers();
        
    }

    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold text-center">{props.title}</h1>
               <progress className="progress w-56"></progress> 
            </div>
        )
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
                        <th>Meals</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {helperList && helperList.map(list => 
                    <tr key={list.name}>
                        <td>{list.name}</td>
                        <td>{list.meal}</td>
                        <td>{list.email}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Helpers;