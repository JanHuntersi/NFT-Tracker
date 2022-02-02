import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AccessDenied from "../pages/AccessDenied";

export default function PrivateRoute({ children }){
const {user} = useAuth();
if (user != null){
    console.log("user is not null");
    return  children}
else{
   return <AccessDenied />

}


}