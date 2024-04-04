import Navbar from "../components/Navigation/Navbar";
import EventFormUA from "../components/EventReg/EventFormUA";
import EventFormA from "../components/EventReg/EventFormA";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";
//import { useNavigate } from "react-router-dom";

const EventRegister = () => {
  
    const { user } = useAuth();
    
    if(user){
        return( 
            <div className="md:container md:mx-auto  ">
                <Navbar />
                <EventFormA />
                <Footer/>
            </div>
            );
    } else{
        return( 
        <div className="md:container md:mx-auto ">
            <Navbar />
            <EventFormUA />
            <Footer/>
        </div>
        );
    }
};

export default EventRegister;