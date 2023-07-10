import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoint } from './Home'
import { useNavigate } from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${endpoint}/showAll`)
        .then(({data}) => {
            setProducts(data);
            console.log(data);
        })
        .catch((error) => {
            console.error(error)
        })
    }, [])

    const navigate = useNavigate()

    const goBack = () => {
        navigate("/home")
    }

    const deleteProduct = (id) => {
        

        // axios.delete(`${endpoint}/${id}`)
        // .then(response => {
        //     console.log(`Producto eliminado con id: ${id}` );
        //     alert("Producto eliminado")
        // })
        // .catch((error) => {
        //     console.log(error)
        //     alert("Error al eliminar el producto")
        // })


    }   

    return (
        <div className='main-products'>
            <span className='span-volver' onClick={goBack}>{"<-- Volver"}</span>
            <h1>Listado de productos</h1>

            <div className="container-products">

                {
                    products.map((product => {
                        return (
                            <div className='each-product' key={product.id}>
                                <p>{product.name}</p>
                                <p>{product.pricePerDay}</p>
                                <p>{product.category.categoryName}</p>
                                <button onClick={deleteProduct(product.id)}>Eliminar</button>
                            </div>
                        )
                    }))    
                }

            </div>
            
        </div>
    )
}

export default Products