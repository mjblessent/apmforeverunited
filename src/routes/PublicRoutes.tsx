import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FC } from "react";

interface PublicRouteProps{
    children: React.ReactElement;
}

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if(user) {
        return <Navigate to='/profile' replace={true} />;
    }

    return children;
};

export default PublicRoute;