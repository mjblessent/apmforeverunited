import { useAuth } from "../../hooks/useAuth";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";

const InOrOutBtn = () => {
    const { user } = useAuth();

    if(user){
        return(
            <LogoutBtn />
        );
    }else{
        return(
            <LoginBtn />
        );
    };
};

export default InOrOutBtn;