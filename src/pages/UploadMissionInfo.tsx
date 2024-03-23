import Navbar from "../components/Navigation/Navbar";
import UploadTextDoc from "../components/UploadTextDoc";

const UploadMissionInfo = () => {

    return(
        <div className="max-w-4xl mx-auto ">
            <Navbar/>
            <h1>Upload mission info doc!</h1>
            <UploadTextDoc/>
        </div>
    );
};
export default UploadMissionInfo;