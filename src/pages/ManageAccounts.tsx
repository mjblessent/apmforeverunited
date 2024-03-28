import Footer from "../components/Footer";
import VerifyUsers from "../components/VerifyUsers";
import Navbar from "../components/Navigation/Navbar";

const ManageAccounts = () => {

    return(
        <div className="max-w-4xl mx-auto ">
            <Navbar/>
            <h1>Manage Accounts!</h1>
            <VerifyUsers/>
            <Footer/>
        </div>
    );
};

export default ManageAccounts;