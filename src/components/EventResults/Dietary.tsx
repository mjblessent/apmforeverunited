import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/config";

type DietaryDoc = {
    name: string,
    dietary: string,
    meal: string,
}[];

const Dietary = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [dietaryList, setDietaryList] = useState<DietaryDoc>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getDietary = async () => {

        const q = query(collection(db,"submissions"), where("dietary", ">", ""), where("dietary", "!=", "None"));
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
                name: doc.data().fName + " " +doc.data().lName ,
                dietary: doc.data().dietary,
                meal: meals
            }
        });
        //console.log(lists);
        for(let x =0; x<lists.length;x++)
            {
                if(lists[x].dietary == "No" || lists[x].dietary == "None.")
                    {
                        //console.log("remove this!");
                        //console.log(lists[x]);
                       lists.splice(x,1);
                       x = x-1;  
                    }
            }
            //console.log(lists);


            setDietaryList(lists);
        setFirstLoad(false);
        setIsLoading(false);
    };

    if(firstLoad){
        getDietary();
        
    }

    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold text-center">Dietary Restrictions</h1>
               <progress className="progress w-56"></progress> 
            </div>
        )
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
                        <th>Meals</th>
                    </tr>
                </thead>
                <tbody>
                    {dietaryList.length > 0 && dietaryList.map(list => 
                    <tr key={list.name}>
                        <td>{list.name}</td>
                        <td>{list.dietary}</td>
                        <td>{list.meal}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Dietary;