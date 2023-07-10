import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoint } from "./Home";
import { DateRange } from "react-date-range";
import { ContextLogin } from "../Context/LoginContext";
import { useContext } from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";

const ReservationRequest = () => {
  const { state: loginContext } = useContext(ContextLogin);

  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState([]);
  const [formValues, setFormValues] = useState(loginContext?.user || {});

  const reservar = () => {
    navigate(`/reserve/${id}`);
  };  

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loginContext.isLogged) {
      Swal.fire({
        title: "No es posible reservar",
        text: "Ingrese con su cuenta para poder continuar",
        icon: "error",
      }).then(() => {
        navigate(`/login`);
      });
    }
  }, [loginContext]);

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
  }, [id]);

  function realizarReserva() {
    axios
      .post("http://localhost:8080/booking/add", {
        user: formValues,
        instrument: values,
        bookDate: selectedRange[0].startDate,
        returnDate: selectedRange[0].endDate,
        branch: values.branch,
      })
      .then((resp) => {
        Swal.fire({
          title: "Reserva realizada",
          text: "Su reserva fue realizada exitosamente",
          icon: "success",
        }).then(() => {
          navigate(`/home`);
        });
        console.log(resp);
      })
      .catch((error) => {
        Swal.fire({
          title: "Reserva rechazada",
          text: "Su reserva fue rechazada",
          icon: "error",
        });
      });
  }

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  {
    /*const handleRange = (ranges) => {
    setSelectedRange([ranges.selection]);
  };*/
  }

  const handleRange = (ranges) => {
    setSelectedRange([
      {
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
        key: "selection",
      },
    ]);
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
    new Date(2023, 7, 15),
    new Date(2023, 7, 14),
    new Date(2023, 7, 16),
    new Date(2023, 7, 24),
  ];

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="reservation-main">

      {
        isLoading ? (
          <div className="loading-message-detail">
            <h2>Cargando el producto a reservar...</h2>
          </div> 
        )
        : (
          <>
            <span className='span-volver' onClick={goBack}>{"<-- Volver"}</span>

            <h1>Solicita tu reserva</h1>
            <div className="detail-main-reserva">
              <div className="one-reserva">
                {values.images && values.images.length > 0 && (
                  <img className="gridImage" src={values.images[0]?.imageURL}></img>
                )}
                <h2>{values.name}</h2>
                <p>{values.description}</p>
                {values.features && values.features.length > 0 && (
                  <div className="caracteristicas">
                    <p>Que trae este producto:</p>
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
              </div>

              <div className="formContainer-reservation">
                <h2>Completá tus datos personales</h2>
                <form action="" className="form-dataReservation">
                  <div>
                    <div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formValues.name || ""}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email || ""}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="bookDate"
                        id="bookDate"
                        value={format(selectedRange[0].startDate, "dd-MM-yyyy")}
                        disabled
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="bookDate"
                        id="bookDate"
                        value={format(selectedRange[0].endDate, "dd-MM-yyyy")}
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formValues.lastName || ""}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formValues.address || ""}
                        placeholder={"Ingrese su direccion"}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="telephone"
                        id="telephone"
                        placeholder={"Ingrese su numero de telefono"}
                        value={formValues.telephone || ""}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            telephone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="available-dates-reserva">
              <h2>Confirma tu reserva</h2>
              <h3>Fechas disponibles</h3>

              <div className="calendar-container-reserva">
                <DateRange
                  className="calendar-reserva"
                  ranges={selectedRange}
                  minDate={new Date()}
                  disabledDates={disabledDates}
                  onChange={handleRange}
                />
                <button className="button-reserva" onClick={realizarReserva}>
                  Confirmar reserva
                </button>
              </div>
            </div>
            <div className="politicas-reserva">
              <h3>Lo que tenes que saber:</h3>
              <div className="contenedorPoliticas-reserva">
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

export default ReservationRequest;
