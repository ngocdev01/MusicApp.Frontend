import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";



function AuthorizeRoute({role,children})
{
    const {auth} = useAuth();
    

    if (!auth) {
      // user is not authenticated
      return <Navigate
        to='/' state={{auth : true}}
        
      />
    }  
    if(role)
    {
         // user is not authrorized
        if(auth.role!=role)
        return <Navigate
        to='/notAuth' state={{auth : true}}
        
      />
    }
    return children;

    
    
}



export default AuthorizeRoute;