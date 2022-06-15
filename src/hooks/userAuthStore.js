import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {onChecking, onLogin,onLogout,clearErrorMessage, onLogoutCalendar} from '../store'

export const UserAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector( state => state.auth );

    const startLogin = async  ({email,password}) => {
        dispatch(onChecking())
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_URL_BASE_API}auth/login`,{email,password});
            localStorage.setItem('token',data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin(data))
        } catch (error) {
            dispatch(onLogout('Credenciales Incorrectas'))
            setTimeout(() =>{
                dispatch(clearErrorMessage())
            },10)
        }
    }

    const startRegister = async(user) => {
        dispatch( onChecking() );
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_URL_BASE_API}auth/create-user`,user);
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ firstname: data.firstname, lastname: data.lastname, uid: data.uid }) );
            
        } catch (error) {
            dispatch( onLogout( error.response.data?.message || '--' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL_BASE_API}auth/renew-token`,{ headers: {'x-token': localStorage.getItem('token')}});
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            console.log(data)
            dispatch( onLogin({ firstname: data.firstname, lastname: data.lastname, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        //propiedades
        status, 
        user,
        errorMessage,
        //metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}