import DeleteAnnouncements from "../components/DeleteAnnouncements";
import Footer from "../components/Footer";
import Navbar from "../components/Navigation/Navbar";
import UpdateStatusAnnounce from "../components/UpdateStatusAnnounce";
import UploadAnnouncement from "../components/UploadAnnouncement";

const ManageHome = () => {

    return(
        <div className="max-w-4xl mx-auto">
            <Navbar/>
            <h1>Manage Home!</h1>
            <UploadAnnouncement/>
            <div className="divider"></div>
            <UpdateStatusAnnounce status="show" title="Disable Announcement"/>
            <div className="divider"></div>
            <UpdateStatusAnnounce status="dont show" title="Show Announcement"/>
            <div className="divider"></div>
            <DeleteAnnouncements />
            <Footer/>
        </div>
    );
};

export default ManageHome;