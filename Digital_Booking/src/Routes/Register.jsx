import React, { useContext } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom'
import { ContextRegister } from '../Context/RegisterContext'
import axios from 'axios'

const Register = () => {

    const { dispatch } = useContext(ContextRegister)

    const navigate = useNavigate()

    const field_one = [
        { id: 1, name: "name", type: "text", placeholder: "Ingrese su nombre", tabIndex: 1},
        { id: 6, name: "email", type: "email", placeholder: "Correo electronico", tabIndex: 3},
    ]
    
    const field_two = [
        { id: 2, name: "lastName", type: "text", placeholder: "Ingrese su apellido", tabIndex: 2},
        { id: 7, name: "password", type: "password", placeholder: "Contraseña", tabIndex: 4}
    ]

    const getInitialValues = () => ({
        name: "",
        lastName: "",
        email: "",
        password: "",
    });

    const getValidationSchema = () => (
        Yup.lazy(() =>

            Yup.object().shape({

                name: Yup.string().required("Campo Obligatorio"),
                lastName: Yup.string().required("Campo Obligatorio"),
                email: Yup.string().email().required("Campo Obligatorio"),

                password: Yup.string()
                    .min(8, 'La contraseña debe tener al menos 8 caracteres')
                    .max(20, 'La contraseña no debe superar los 20 caracteres')
                    .required('Campo Obligatorio'),

            })

        )

    )

    const onSubmit = (values) => {
        console.log(values)
        axios.post("http://localhost:8080/auth/signup", values)
        .then((response) => {
            console.log("Registrado exitosamente");
            console.log(response);
            alert("Registrado! Vas a recibir un correo electronico para validar tu cuenta")
        })
        .catch((error) => {
            console.error(error)
        })
        // navigate("/home")
    }

    const { handleSubmit, values, setFieldValue, errors } = useFormik({

        validateOnBlur: false,

        validateOnChange: false,

        initialValues: getInitialValues(),

        validationSchema: getValidationSchema(),

        onSubmit

    });


    return (
        <div className='register-main'>
            <h1>Crear una cuenta</h1>

            <div className="form-register">
                <form action="" className='form-registry' onSubmit={handleSubmit} id="register">
                    <div className='container-fieldOne'>
                        {
                            field_one.map((field) => {
                                return (
                                    <div key={field.id}>
                                        <input type={field.type} name={field.name} placeholder={field.placeholder} tabIndex={field.tabIndex} onChange={(e) => { setFieldValue(field.name, e.target.value) }} />
                                        {
                                            errors[field.name] && (
                                                <p>{errors[field.name]}</p>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='container-fieldTwo'>
                        {
                            field_two.map((field) => {
                                return (
                                    <div key={field.id}>
                                        <input type={field.type} name={field.name} placeholder={field.placeholder} tabIndex={field.tabIndex} onChange={(e) => { setFieldValue(field.name, e.target.value) }} />
                                        {
                                            errors[field.name] && (
                                                <p>{errors[field.name]}</p>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </form>
                <div className='container-button'>
                    <Link to="/login" className="link-register">Tienes cuenta? Ingresa desde aqui</Link>
                    <button type="submit" form='register' tabIndex={10} style={{cursor: "pointer"}}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Register