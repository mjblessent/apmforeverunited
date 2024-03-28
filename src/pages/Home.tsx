import Footer from "../components/Footer";
import GetAnnouncements from "../components/GetAnnouncements";
import Navbar from "../components/Navigation/Navbar";




const Home = () => {
    

    return( <div className="max-w-4xl mx-auto ">
        <Navbar />
        <GetAnnouncements />
        <Footer/>
    </div>
    );
};

export default Home;