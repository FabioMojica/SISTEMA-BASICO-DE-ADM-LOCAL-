import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"


// Replace doesn't let you go to previus page

const ProtectedRoute = () => {
    console.log("hola");
    const {isAuthenticated} = useAuth();

    console.log(isAuthenticated)

    if(!isAuthenticated) {
        console.log(isAuthenticated) 
        return <Navigate to={'/login'} replace />
    }

  return (
      <Outlet></Outlet>
  )
}

export default ProtectedRoute
