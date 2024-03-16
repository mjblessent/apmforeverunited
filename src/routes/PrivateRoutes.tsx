import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FC } from "react";

interface PrivateRouteProps{
    children: React.ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const { user } = useAuth();
    const { admin } = useAuth();

    if(admin){
        console.log(admin);
        console.log("Welcome admin");
    }

    if(!user) {
        return <Navigate to='/signin' replace={true} />;
    }

    return children;
};

export default PrivateRoute;