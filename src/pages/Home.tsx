import Footer from "../components/Footer";
import GetAnnouncements from "../components/GetAnnouncements";
import Navbar from "../components/Navigation/Navbar";




const Home = () => {
    

    return( <div className="md:container md:mx-auto ">
        <Navbar />
        <GetAnnouncements />
        <Footer/>
    </div>
    );
};

export default Home;