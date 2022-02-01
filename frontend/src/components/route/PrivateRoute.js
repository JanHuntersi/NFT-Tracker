import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PrivateRoute({ children }){
const {user} = useAuth()
console.log(user.email);
return user.email ? children : <Navigate to="/login"/>

}