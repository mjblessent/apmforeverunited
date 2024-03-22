import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import Navbar from "../components/Navigation/Navbar";
import UploadForm from "../components/UploadForm";


const ImageCollection = () => {


    return( <div className="max-w-4xl mx-auto ">
        <Navbar />
        <UploadForm />
        <ImageGallery />
        <Footer/>
    </div>
    );
};

export default ImageCollection;