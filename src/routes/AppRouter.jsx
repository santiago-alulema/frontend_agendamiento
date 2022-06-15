import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import {LoginPages} from '../auth/pages'
import {CalendarPage} from '../calendar/pages'
import {UserAuthStore} from '../hooks'
import { Navigate} from 'react-router-dom';
export const AppRouter = () => {
    const statusAuth = 'not-auth'
    const {checkAuthToken,status} = UserAuthStore();

    useEffect(() =>{
      checkAuthToken()
    },[])

    if(status ==='checking'){
      return(
        <h3>CARGANDO...</h3>
      )
    }
  return (
    <Routes>
        {
            (status === 'not-authenticated') 
            ?(
            <>
                            <Route path="/auth/*" element={ <LoginPages /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
              )
            : (
                <>
                    <Route path="/" element={ <CalendarPage /> } />
                    <Route path="/*" element={ <Navigate to="/" /> } />
                </>
            )
        }
    </Routes>
  )
}
