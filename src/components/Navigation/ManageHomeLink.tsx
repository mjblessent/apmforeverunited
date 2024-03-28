import { useNavigate } from "react-router-dom";
const ManageHomeLink = () => {
    const navigate = useNavigate();
    const handleHomeManagePage = async () => {
        
        navigate('/managehome');
    };
    

    return(
        <li><a onClick={handleHomeManagePage}>Manage Home Page</a></li>
    );
};

export default ManageHomeLink;