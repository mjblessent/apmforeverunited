
import Footer from "../components/Footer";
import Navbar from "../components/Navigation/Navbar";
import GetProfile from "../components/Profile/GetProfile"



const Profile = () => {
    



    return( <div className="max-w-4xl mx-auto ">
        <Navbar />
        <h1>Profile Page!</h1>
        <GetProfile/>
        <Footer/>
    </div>
    );
};

export default Profile;