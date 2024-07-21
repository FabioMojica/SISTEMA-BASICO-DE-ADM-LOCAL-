import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest } from "../api/authentication";
import { getProductsRequest } from "../api/products";
import { validateToken } from "../api/authentication";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("Use Auth must be used within an AuthProvider");
    return context;
};


export const AuthProvider = ( { children } ) => {
    const [ user, setUser ] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    
    const signIn = async (data) => {
        try {
            const res = await loginRequest(data);
            setUser(res.data);
            setIsAuthenticated(true);
            return res;
        } catch(e){
            return {isError: true, error: e};
        }
    }

    const logOut = async () => {
        try{
            const res = await logoutRequest();
            setUser(null);
            setIsAuthenticated(false);
        } catch(e){
            console.log(e);
        }
    }

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            return res;
        } catch (e) {
            return {isError: true, error: e};
        }
    }

    /*
    useEffect( () => {
        const verifyJWT = async () => {
            const cookies = Cookies.get();
            console.log(cookies)
            if(cookies.token){
                console.log("true");
                try {
                    const res = await validateToken(cookies.token);
                    setUser(res.data.name);
                    console.log(res.data.name);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        verifyJWT();
    },[]);*/

    return (
        <>
        <AuthContext.Provider 
            value={{
                signIn,
                logOut,
                getProducts,
                setUser,
                user,
                isAuthenticated,
            }}
        >
            { children }
        </AuthContext.Provider>
        </>
    )
};