import { useNavigate } from "react-router-dom";
const HomeLink = () => {
    const navigate = useNavigate();
    const handleProfilePage = async () => {
        
        navigate('/');
    };
    

    return(
        <li><a onClick={handleProfilePage}>Home</a></li>
    );
};

export default HomeLink;