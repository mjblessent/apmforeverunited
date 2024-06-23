import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


type Props = {
    item: string;
    title: string;
}

type ShopperDoc = {
    name: string,
    email: string,
}[];

const Shoppers = (props: Props) => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [shopperList, setShopperList] = useState<ShopperDoc>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getShoppers = async () => {

        const q = query(collection(db,"submissions"), where(props.item, "==", "yes"));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            var meals = "";
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
                email: doc.data().email
            }
        });

        setShopperList(lists);
        setFirstLoad(false);
        setIsLoading(false);
    };

    if(firstLoad){
        getShoppers();
        
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
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {shopperList && shopperList.map(list => 
                    <tr key={list.name}>
                        <td>{list.name}</td>
                        <td>{list.email}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Shoppers;