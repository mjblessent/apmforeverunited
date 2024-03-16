import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
const LogoutBtn = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        
        try{
            await signOut(auth);
            signOutPage();
        } catch (error){
            console.log(error.message);
        }
    };

    const signOutPage = () => {
        
        navigate('/signin');

    };

    return(
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutBtn;