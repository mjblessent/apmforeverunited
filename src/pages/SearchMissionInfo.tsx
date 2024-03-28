import Footer from "../components/Footer";
//import GetMissionInfo from "../components/GetMissionInfo"
import Navbar from "../components/Navigation/Navbar";
import UploadMissionNames from "../components/UploadMissionNames"
import GetMissionInfo from "../components/GetMissionInfo"

const SearchMissionInfo = () => {

    return(
        <div className="max-w-4xl mx-auto ">
            <Navbar/>
            <h1>Upload mission info doc!</h1>
            <UploadMissionNames />
            <GetMissionInfo />
            <Footer/>
        </div>
    );
};
export default SearchMissionInfo;