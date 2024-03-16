import { useNavigate } from "react-router-dom";
const ProfileLink = () => {
    const navigate = useNavigate();
    const handleProfilePage = async () => {
        
        navigate('/profile');
    };
    

    return(
        <li><a onClick={handleProfilePage}>Profile</a></li>
    );
};

export default ProfileLink;