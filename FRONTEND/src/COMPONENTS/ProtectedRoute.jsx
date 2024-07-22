import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"
import LoadingMessage from "./LoandingMessage";

// Replace doesn't let you go to previus page

const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth();

    if(isLoading) return <LoadingMessage></LoadingMessage>;

    if(!isLoading && !isAuthenticated) return <Navigate to={'/login'} replace />
    

    return (    
    <Outlet></Outlet>
    );
}

export default ProtectedRoute
