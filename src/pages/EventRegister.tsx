import Navbar from "../components/Navigation/Navbar";
import EventFormUA from "../components/EventReg/EventFormUA";
import EventFormA from "../components/EventReg/EventFormA";
import { useAuth } from "../hooks/useAuth";
//import { useNavigate } from "react-router-dom";

const EventRegister = () => {
  
    const { user } = useAuth();
    
    if(user){
        return( 
            <div className="max-w-4xl mx-auto ">
                <Navbar />
                <EventFormA />
            </div>
            );
    } else{
        return( 
        <div className="max-w-4xl mx-auto ">
            <Navbar />
            <EventFormUA />
        </div>
        );
    }
};

export default EventRegister;