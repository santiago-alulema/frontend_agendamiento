import React from 'react'

export const CalendarEvent = ({event}) => {
    const {title, user} = event
  return (
    <div>
        <strong>{title}</strong>
        <strong>-{user.firstname} {user.lastname}</strong>
    </div>
  )
}
