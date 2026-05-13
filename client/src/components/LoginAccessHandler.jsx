
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function LoginAcessHandler({setIsAuthenticated, setLoading}) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{ if(localStorage.getItem('jwtToken')){
        setIsAuthenticated(true);
        if(location.pathname==="/" ||
            location.pathname==="/login" ||
            location.pathname==="/signup"
        ){
            navigate('/home');
        }
    }
    }, [location] )

  return (
    null
  )
}

export default LoginAcessHandler;