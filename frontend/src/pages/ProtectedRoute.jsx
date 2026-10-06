import { useEffect, useState } from 'react';
import { auth } from './js/client';
import { Navigate, Outlet } from 'react-router-dom';
import Login  from './Login';

export default function ProtectedRoute(){
    const [isAuth, setAuth] = useState(null)

    useEffect(()=>{
        auth()
            .then(()=> setAuth(true) )
            .catch(()=> setAuth(false))
    }, [])
    return isAuth === true? <Outlet />: isAuth === false? <Navigate to='/login' replace/> : null
}