import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

type AttendeeDoc ={ 
    name: string,
    plusone: string,
    email: string,
}[];

const Attendees = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [attendeesList, setAttendeesList] = useState<AttendeeDoc>([]);

    const getAttendees = async () => {

        const q = query(collection(db,"submissions"), where("fName", "!=", ""));
        const querySnapshot = await getDocs(q);

        const lists = querySnapshot.docs.map((doc) => {
            return{
                name: doc.data().fName + " " +doc.data().lName,
                plusone: doc.data().plusOneName,
                email: doc.data().email
            }
        });

        setAttendeesList(lists);
        setFirstLoad(false);
    };

    if(firstLoad){
        getAttendees();
        
    }


    return(
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center">Attendees</h1>
            </div>
            <table className="table table-zebra border-4">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Plus One Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {attendeesList && attendeesList.map(list => 
                    <tr key={list.name}>
                        <td>{list.name}</td>
                        <td>{list.plusone}</td>
                        <td>{list.email}</td>
                    </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Attendees;