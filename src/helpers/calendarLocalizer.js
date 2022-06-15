import esEs from 'date-fns/locale/es'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format,  getDay, startOfWeek, parse } from 'date-fns'

const locales = {
    'es': esEs,
  }
  
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })