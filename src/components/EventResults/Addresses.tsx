import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

type AddressDoc ={ 
    name: string,
    address: string,
}[];

const Addresses = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [addressesList, setAddressesList] = useState<AddressDoc>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getAddresses = async () => {

        const q = query(collection(db,"submissions"), where("address", "!=", ""));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            return{
                name: doc.data().fName + " " +doc.data().lName,
                address: doc.data().address
            }
        });

        setAddressesList(lists);
        setFirstLoad(false);
        setIsLoading(false);
    };

    if(firstLoad){
        getAddresses();
        
    }

    if(isLoading){
        return (
            <div className='text-center mt-10'>
                <h1 className="text-3xl font-bold text-center">Addresses</h1>
               <progress className="progress w-56"></progress> 
            </div>
        )
    }

    return(
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center">Addresses</h1>
            </div>
            <table className="table table-zebra border-4">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {addressesList && addressesList.map(list => 
                    <tr key={list.name}>
                        <td>{list.name}</td>
                        <td>{list.address}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Addresses;