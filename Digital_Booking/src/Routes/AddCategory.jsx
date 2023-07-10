import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

const AddCategory = () => {

    const [values, setValues] = useState({
        categoryName: "",
        description: "",
        images: [
            {
                imageURL: ""
            }
        ]
    })

    const handleImages = (e, index) => {
		const {value} = e.target

		setValues((values) => {
			const updatedImages = [...values.images]
			updatedImages[index].imageURL = value

			return {...values, images: updatedImages}
		})
	}

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values);

        axios.post("http://localhost:8080/admin/categories/add", values)
        .then((response) => {
            console.log("Categoria creada");
            console.log(response);
            Swal.fire({
                icon: "success",
                title: "Categoria creada!",
                text: "La categoria ha sido creada correctamente"
            })
            
        })
        .catch((error) => {
            console.error(error)
            Swal.fire({
                icon: "error",
                title: "Se produjo un error al crear la categoria",
                text: "La categoria no fue creada"
            })
        })
    }

    const navigate = useNavigate()

    const goBack = () => {
        navigate("/home")
    }


    return (
        <div className='addCategory-main'>
            <span className='span-volver' onClick={goBack}>{"<-- Volver"}</span>
            <h1>Agregar Categoria</h1>
            <div className="formCategory-container">
                <form action="" className='form-category' onSubmit={handleSubmit}>
                    <input type="text" name="categoryName" id="categoryName" placeholder='Titulo de la categoria' value={values.categoryName} onChange={(e) => {setValues({...values, categoryName: e.target.value})}}/>
                    <input type="text" name="description" id="description" placeholder='Descripcion de la categoria' value={values.description} onChange={(e) => {setValues({...values, description: e.target.value})}} />
                    <input type="url" name="imageURL" id="imageURL" placeholder='URL de la imagen de la categoria' onChange={e => handleImages(e, 0)}/>
                    <button type="submit">Agregar categoria</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory