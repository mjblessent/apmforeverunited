import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FC } from "react";

interface AdminRouteProps{
    children: React.ReactElement;
}

const AdminRoute: FC<AdminRouteProps> = ({ children }) => {
    const { user } = useAuth();
    const { admin } = useAuth();

    if(!user){
        console.log(admin);
        console.log("Not user");
        return <Navigate to='/signin' replace={true} />;
    }
    if(!admin){
        console.log(admin);
        console.log("Not admin");
        return <Navigate to='/' replace={true} />;
    }


    return children;
};

export default AdminRoute;