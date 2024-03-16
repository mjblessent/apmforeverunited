import { useNavigate } from "react-router-dom";
const ImgCollectLink = () => {
    const navigate = useNavigate();
    const handleImgCollectPage = async () => {
        
        navigate('/imagecollection');
    };
    

    return(
        <li><a onClick={handleImgCollectPage}>Image Collection</a></li>
    );
};

export default ImgCollectLink;