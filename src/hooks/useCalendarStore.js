import { useDispatch, useSelector } from 'react-redux';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent,onLoadEvents } from '../store';
import axios from 'axios';
import Swal from 'sweetalert2';
export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        try {
            // Todo bien
        if( calendarEvent.id ) {
            //Actualizando
            await axios.put(`${process.env.REACT_APP_URL_BASE_API}events/${ calendarEvent.id }`, calendarEvent, { headers: {'x-token': localStorage.getItem('token')}} );
            dispatch( onUpdateEvent({ ...calendarEvent, user }) );
            return;
        } else {
            // Creando
            const { data } = await axios.post(`${process.env.REACT_APP_URL_BASE_API}events/create-event`,calendarEvent ,{ headers: {'x-token': localStorage.getItem('token')}});
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.id, user }) );
        }
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.mensaje, 'error');
        }
        
    }

    const startDeletingEvent = async() => {
        // Todo: Llegar al backend
        try {
            await axios.delete(`${process.env.REACT_APP_URL_BASE_API}events/${ activeEvent.id }`,{ headers: {'x-token': localStorage.getItem('token')}} );
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }

    const startLoadingEvents = async() => {
        try {
            
            const { data } = await axios.get(`${process.env.REACT_APP_URL_BASE_API}events`,{ headers: {'x-token': localStorage.getItem('token')}});
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );
        } catch (error) {
          console.log(error)
        }
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
        startDeletingEvent,
    }
}