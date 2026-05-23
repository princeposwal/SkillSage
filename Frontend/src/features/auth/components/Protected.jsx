//He have created this protected file because without this anyone can access our homepage even without login , after creating this he must first login then only can access .

import { useAuth } from "../hooks/useAuth"
import { Navigate} from "react-router"

const Protected = ({children}) => {
    const {user,loading} = useAuth();


    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    if(!user){
        //Navigating to login page if user is not present in our context.
        return <Navigate to="/login" />
    }

    return children;
}

export default Protected;