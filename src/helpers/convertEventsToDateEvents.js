import { parseISO } from 'date-fns';


export const convertEventsToDateEvents = ( events = []) => {

    return events.map( event => {

        event.end = parseISO( event.end );
        event.start = parseISO( event.start );
        event.user.id = event.user._id
        return event;
    })

}