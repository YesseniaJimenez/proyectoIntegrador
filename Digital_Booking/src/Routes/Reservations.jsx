import React from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ContextLogin } from '../Context/LoginContext'

const Reservations = () => {

    const { state: loginContext } = useContext(ContextLogin)

    const [allReservations, setAllReservations] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:8080/booking/all")
        .then(({data}) => {

            const reservations = data
            const myReservations = reservations.filter((reservation) => reservation.user?.id === loginContext.user.id )

            setAllReservations(myReservations)
            setIsLoading(false)
           

            console.log(data);
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className='reservations-main'>

            <h1>Mis reservas</h1>


            {
                isLoading ? (
                    <div className='loading-message'>
                        <h2>Cargando reservas...</h2>
                    </div>

                ) : allReservations.length > 0 ? (
                    <div className='container-reservas'>
                        {
                            allReservations.map((reservation) => (
                                <div key={reservation.id} className="everyReserva">
                                    <h2>{`${reservation.instrument.name}`}</h2>
                                    <p>{`Desde: ${reservation.bookDate}`}</p>
                                    <p>{`Hasta: ${reservation.returnDate}`}</p>
                                    {/* <p>{`Sucursal: ${reservation.instrument.branch.province}, ${reservation.instrument.branch.country}`}</p> */}
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className='container-noReserva'>
                        <h2>No tienes reservas</h2>
                    </div>
                )
            }
            
        </div>
    )
}

export default Reservations