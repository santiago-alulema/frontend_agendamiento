import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {LoginPages} from '../auth/pages'
import {CalendarPage} from '../calendar/pages'

export const AppRouter = () => {
    const statusAuth = 'auth'
  return (
    <Routes>
        {
            (statusAuth === 'not-auth') 
            ? (<Route path="/auth/*" exact element={<LoginPages />}/>)
            : (<Route path="/agendamiento" exact element={<CalendarPage />}/>)
        }
    </Routes>
  )
}
