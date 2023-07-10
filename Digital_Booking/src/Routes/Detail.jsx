import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoint } from "./Home";
import CarouselComponent from "../Components/Carousel.jsx";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

const Detail = () => {
  const { id } = useParams();

  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${endpoint}/${id}`)
      .then(({ data }) => {
        setValues(data);
        setIsLoading(false)
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false)
      });
  }, []);

  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();

  const deleteProduct = () => {
    if (confirm("Desea eliminar el producto?")) {
      setDeleted(true);
      navigate("/home");
    } else {
      setDeleted(false);
    }
  };

  const reservar = () => {
    navigate(`/reserve/${id}`)
  }

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleRange = (ranges) => {
    setSelectedRange([ranges.selection]);
  };

  const disabledDates = [
    new Date(2023, 6, 9),
    new Date(2023, 6, 8),
    new Date(2023, 6, 7),
    new Date(2023, 6, 3),
    new Date(2023, 6, 4),
    new Date(2023, 6, 17),
    new Date(2023, 6, 16),
    new Date(2023, 6, 15),
    new Date(2023, 7, 5),
    new Date(2023, 7, 15),
		new Date(2023, 7, 14),
		new Date(2023, 7, 16),
		new Date(2023, 7, 24),
  ];

  return (
    <div className="detail-main">

      {
        isLoading ? ( 
          <div className="loading-message-detail">
            <h2>Cargando detalle del producto...</h2>
          </div> 
        )
        : (
          <>
            <div className="images">
              <div className="one">
                {values.images && values.images.length > 0 && (
                  <img className="gridImage" src={values.images[0]?.imageURL}></img>
                )}
              </div>
              <div className="two">
                {values.images && values.images.length > 0 && (
                  <img className="gridImage" src={values.images[1]?.imageURL}></img>
                )}
              </div>
              <div className="three">
                {values.images && values.images.length > 0 && (
                  <img className="gridImage" src={values.images[2]?.imageURL}></img>
                )}
              </div>
              <div className="four">
                {values.images && values.images.length > 0 && (
                  <img className="gridImage" src={values.images[3]?.imageURL}></img>
                )}
              </div>
              <div className="five">
                {values.images && values.images.length > 0 && (
                  <img className="gridImage" src={values.images[4]?.imageURL}></img>
                )}
                <div className="verMas">
                  <a href="">Ver más</a>
                </div>
              </div>
            </div>
            <div className="carrusel">
              <CarouselComponent />
            </div>

            <h2>{values.name}</h2>
            <p>{values.description}</p>

            {values.features && values.features.length > 0 && (
              <div className="caracteristicas">
                <p>Caracteristicas de este producto:</p>
                <ol>
                  {
                    values.features.map((feature, index) => {
                      return (
                        <li key={index}>{feature}</li>
                      )
                    })
                  }
                </ol>
              </div>
            )}

            <p className="precio">{`$${values.pricePerDay}`}</p>

            <div className="available-dates">
              <h3>Fechas disponibles</h3>

              <div className="reserva-container">
                <div className="calendar-container">
                  <DateRange
                    className="calendar-reserva"
                    ranges={selectedRange}
                    minDate={new Date()}
                    disabledDates={disabledDates}
                    onChange={handleRange}
                  />
                </div>
                <button className="button-reserva" onClick={reservar}>Realizar reserva</button>
              </div>
            </div>

            <div className="politicas">
              <h2>Lo que tenes que saber:</h2>
              <div className="contenedorPoliticas">
                <div>
                  <h4>Condiciones de devolución:</h4>
                  <p>
                    a. Los instrumentos rentados deben ser devueltos en las mismas
                    condiciones en las que fueron entregados. Esto incluye su
                    funcionamiento adecuado, limpieza y estado físico.
                  </p>
                  <p>
                    b. Cualquier daño o pérdida de los instrumentos será
                    responsabilidad del cliente y se le cobrará el valor
                    correspondiente para reparación o reemplazo.
                  </p>
                </div>
                <div>
                  <h4>Duración y prórroga del alquiler:</h4>
                  <p>
                    a. La duración del alquiler comienza en el momento de la entrega
                    del instrumento y finaliza en la fecha acordada al momento de la
                    reserva.
                  </p>
                  <p>
                    b. En caso de que desees extender el período de alquiler, debes
                    notificarlo con al menos 24 horas de anticipación. La prórroga
                    está sujeta a disponibilidad y se realizará un cargo adicional por
                    cada día adicional de alquiler.
                  </p>
                  <p>
                    c. Si no se realiza la devolución del instrumento en la fecha
                    acordada y no se ha solicitado una prórroga, se realizará un cargo
                    automático a la tarjeta de crédito proporcionada por el cliente
                    por cada día extra de alquiler.
                  </p>
                </div>
                <div>
                  <h4>Responsabilidad del cliente:</h4>
                  <p>
                    a. El cliente es responsable de utilizar los instrumentos
                    alquilados de manera adecuada y segura, siguiendo todas las
                    instrucciones proporcionadas.
                  </p>
                  <p>
                    b. El cliente asume la responsabilidad por cualquier lesión
                    personal o daño a terceros que pueda ocurrir durante el uso de los
                    instrumentos alquilados.
                  </p>
                </div>
                <div>
                  <h4>Cancelaciones y reembolsos:</h4>
                  <p>
                    a. Para cancelar una reserva, debes notificarlo con al menos 48
                    horas de anticipación para poder recibir un reembolso completo.
                  </p>
                  <p>
                    b. Las cancelaciones realizadas con menos de 48 horas de
                    anticipación no serán elegibles para un reembolso. Sin embargo, se
                    puede aplicar un crédito para futuras reservas bajo ciertas
                    circunstancias.
                  </p>
                </div>
              </div>
            </div>
          </>
        )
      }


    </div>
  );
};

export default Detail;
