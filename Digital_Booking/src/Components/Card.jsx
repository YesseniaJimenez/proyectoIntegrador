import React from 'react'
import percusion from "../assets/images/percusion.png"
import cuerda from "../assets/images/cuerda.png"
import electrico from "../assets/images/electrico.png"
import viento from "../assets/images/viento.png"


const Card = () => {
    return (
        <>
            <div className='card'>
                <img src={viento} alt="Card" />
                <p>{"Instrumentos de viento"}</p>
            </div>
            <div className='card'>
                <img src={cuerda} alt="Card" />
                <p>{"Instrumentos de cuerda"}</p>
            </div>
            <div className='card'>
                <img src={percusion} alt="Card" />
                <p>{"Instrumentos de percusion"}</p>
            </div>
            <div className='card'>
                <img src={electrico} alt="Card" />
                <p>{"Instrumentos electricos"}</p>
            </div>
        </>
    )
}

export default Card