import Footer from "../components/Footer";
import GetMissionHistory from "../components/GetMissionHistory";
import Navbar from "../components/Navigation/Navbar";

const MissionHistory = () => {

    return(
        <div className="max-w-4xl mx-auto ">
            <Navbar/>
            <GetMissionHistory/>


            <Footer/>
        </div>

    );

};

export default MissionHistory;