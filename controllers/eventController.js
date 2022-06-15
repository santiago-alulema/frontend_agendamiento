const {response} = require('express');
const Event = require('../models/EventModel')
const mongoose = require('mongoose');

const getEvents = async (req,res = response) => {
    try {
        const eventos = await Event.find().populate('user','username firstname lastname');
        return res.status(200).json({ok:true,eventos})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false,mensaje:"no se puso crear el evento"})
    }
    
}

const createEvent = async (req,res = response) => {
    try {
        const uid = req.uid;
        console.log(uid)
        const event = new Event(req.body)
        event.user = parseID(uid)
        const newEvent = await event.save()
        return res.status(200).json({ok:true, 
                                    id:newEvent.id,
                                    title: newEvent.title, 
                                    start: newEvent.title, 
                                    end:newEvent.end, 
                                    note:newEvent.notes})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false,mensaje:"no se puso crear el evento"})
    }
    
}

const updateEvent = async (req,res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Event.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Event.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    return res.status(200).json({ok:true,mensaje:"updateEvent",id})
}

const removeEvent = async (req,res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Event.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Event.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



const parseID = (id) =>{
    return mongoose.Types.ObjectId(id)
}

module.exports = {getEvents,createEvent,updateEvent,removeEvent}