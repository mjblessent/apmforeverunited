import { useNavigate } from "react-router-dom";
const ManageAccLink = () => {
    const navigate = useNavigate();
    const handleAccountManagePage = async () => {
        
        navigate('/manageaccounts');
    };
    

    return(
        <li><a onClick={handleAccountManagePage}>Manage Accounts</a></li>
    );
};

export default ManageAccLink;