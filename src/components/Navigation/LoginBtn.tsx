
import { useNavigate } from "react-router-dom";
const LoginBtn = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        
        navigate('/signin');
    };
    

    return(
        <button onClick={handleLogin}>Login</button>
    );
};

export default LoginBtn;