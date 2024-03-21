import Navbar from "../components/Navigation/Navbar";
import Nights from "../components/EventResults/Nights";


const EventResults = () => {
    return( <div className="max-w-4xl mx-auto ">
        <Navbar />
        <h1>Event Results Page!</h1>
        <div className=" space-y-10">
            <Nights night="dOneNight" message="Night one" />
            <Nights night="dTwoNight" message="Night two" />
            <Nights night="dThreeNight" message="Night three" />
        </div>
       
    </div>
    );
};

export default EventResults;