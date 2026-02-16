"use client";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");
    const [userPublicName, setUserPublicName] = useState("");
    const [auth, setAuth] = useState (null);
    const [authStatus, setAuthStatus] = useState (null);
    const [status, setStatus] = useState (null);   // статус ответа при вводе логина и пароля
    const [role, setRole] = useState (null);

    const authorization = async () => {
        try {
            const res = fetch(`/api/auth/check-auth`, {
                method: "GET",
                withCredentials: true
            })
            .then((res) => 
            {                
                res.json().then((data) => {                    
                setCurrentUser (data.email);
                setAuthStatus(data.status);
                if(data.status === 200) {
                    setAuth(true);
                }
                else setAuth(false);
                }) 
            })
        }       
        catch (err) {
            return err;  
        }                    
    };
    
    const login = async (inputs) => {
        try {
            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                body: JSON.stringify(inputs),
                headers: {
                    withCredentials: true,
                    credentials: "same-origin"
                },
                withCredentials: true,
                credentials: "same-origin"
            })
            return res.json().then((data) => {  
                setCurrentUser (data.email);
                setUserPublicName (data.public_name);
                setStatus (data.status);
                setAuth (data.status);   
            })            
            .then(() => {                  
                authorization();                   
            }) 
           } 
        catch (err) {
            setAuth (500);
            setStatus (500);
            return(err);  
           }                      
    };
    const logout = async () => {
        try {
            const res = await fetch(`/api/auth/logout`, {
                method: "POST",
                headers: {
                    withCredentials: true,
                    credentials: "same-origin"
                },
            })
            .then(() => {                  
                authorization();    
            })            
           }         
        catch (err) {
            return(err);  
        } 
    }                

  return (
    <AuthContext.Provider value={{ currentUser, userPublicName, status, authStatus, auth, login, logout, authorization }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

