import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MultiSelect } from "react-multi-select-component"
import Swal from "sweetalert2"
import { useEffect } from 'react'

const AddProduct = () => {

	const [brands, setBrands] = useState([])

	const [categories, setCategories] = useState([])

	const [branches, setBranches] = useState([])

	useEffect(() => {
		axios.get("http://localhost:8080/brands/showAll")
			.then(({ data }) => {
				setBrands(data)
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			})
	}, [])

	useEffect(() => {
		axios.get("http://localhost:8080/admin/categories/showAll")
			.then(({ data }) => {
				setCategories(data)
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			})
	}, [])

	useEffect(() => {
		axios.get("http://localhost:8080/branches/all")
			.then(({ data }) => {
				setBranches(data)
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			})
	}, [])

	const caracteristicas = [
		{
			label: "Acustica", value: "Acustica"
		},
		{
			label: "6 cuerdas", value: "6 cuerdas"
		},
		{
			label: "4 cuerdas", value: "4 cuerdas"
		},
		{
			label: "Madera", value: "Madera"
		},
		{
			label: "Metal", value: "Metal"
		},
		{
			label: "Bronce", value: "Bronce"
		},
		{
			label: "Profesional", value: "Profesional"
		},
		{
			label: "Intermedio", value: "Intermedio"
		},
		{
			label: "Principiante", value: "Principiante"
		},
		{
			label: "Tradicional", value: "Tradicional"
		},
	]

	const [selected, setSelected] = useState([])

	const [values, setValues] = useState({
		name: "",
		category: {
			id: 0,
			categoryName: ""
		},
		brand: {
			id: 0,
			brandName: ""
		},
		description: "",
		pricePerDay: 0,
		images: [
			{ imageURL: "" },
			{ imageURL: "" },
			{ imageURL: "" },
			{ imageURL: "" },
			{ imageURL: "" },
		],
		features: [],
		branch: {
			id: 0
		}
	})

	const handleImages = (e, index) => {
		const { value } = e.target

		setValues((values) => {
			const updatedImages = [...values.images]
			updatedImages[index].imageURL = value

			return { ...values, images: updatedImages }
		})
	}

	// const handleFileChange = (e) => {
	// 	const files = e.target.files
	// 	const updatedImages = []

	// 	for (let i = 0; i < files.length && i < 5; i++) {
	// 		const file = files[i]
	// 		updatedImages.push(file)
	// 	}

	// 	const updatedValues = { ...values, images: updatedImages}
	// 	setValues(updatedValues)
	// }

	const handleChange = (selectedOptions) => {
		setSelected(selectedOptions)
		setValues((prevValues) => ({
			...prevValues,
			features: selectedOptions.map((option) => option.value)
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(values);

		// const formData = new FormData();
		// formData.append("name", values.name)
		// formData.append("categoryName", values.category.categoryName)
		// formData.append("brandName", values.brand.brandName)
		// formData.append("description", values.description)
		// formData.append("pricePerDay", values.pricePerDay)
		// formData.append("features", values.features)

		// for (let i = 0; i < values.images.length; i++) {
		// 	const file = values.images[i]		
		// 	formData.append("images", file)	
		// }

		axios.post("http://localhost:8080/instruments/add", values)
			.then((response) => {
				console.log("Producto cargado correctamente");
				console.log(response);
				Swal.fire({
					icon: "success",
					title: "Producto cargado!",
					text: "El producto fue cargado exitosamente"
				})
			})
			.catch((error) => {
				console.error("Error al agregar el producto: ", error)
				Swal.fire({
					icon: "error",
					title: "Se produjo un error",
					text: "Error al cargar el producto"
				})
			})
	}

	const navigate = useNavigate()

	const goBack = () => {
		navigate("/home")
	}

	return (
		<div className='container-addProduct'>
			<span className='span-volver' onClick={goBack}>{"<-- Volver"}</span>
			<h1>Agregar Producto</h1>

			<div className="form-container">
				<form action="" className='form-addProduct' onSubmit={handleSubmit} id="addProduct">

					<div className="contOne-addProd">

						<div>
							<input type="text" name="name" id="name" placeholder='Ingrese el nombre del instrumento' onChange={e => setValues({ ...values, name: e.target.value })} />
						</div>

						<div>
							<select name="brand" id="brand" value={values.brand.brandName} onChange={ (e) => {
								const selectedBrandName = e.target.value
								const selectedBrand = brands.find((brand) => brand.brandName === selectedBrandName)
								const brandId = selectedBrand ? selectedBrand.id : 0;

								setValues({...values, brand: {id: brandId, brandName: selectedBrandName}})
							}}>
								<option value="">Seleccione una marca</option>
								{
									brands.map((brand) => (
										<option key={brand.id} value={brand.brandName}>{brand.brandName}</option>
									))
								}
							</select>
						</div>

						<div>
							<input type="text" name="description" id="description" placeholder='Ingrese una descripcion' onChange={e => setValues({ ...values, description: e.target.value })} />
						</div>

						<div>
							<MultiSelect options={caracteristicas} value={selected} onChange={handleChange} />
						</div>

					</div>

					<div className="contTwo-addProd">

						<div>
							<input type="url" src="" alt="url de la imagen del instrumento" placeholder='Ingrese URL imagen #1' onChange={e => handleImages(e, 0)} />
						</div>

						<div>
							<input type="url" src="" alt="url de la imagen del instrumento" placeholder='Ingrese URL imagen #2' onChange={e => handleImages(e, 1)} />
						</div>

						<div>
							<input type="url" src="" alt="url de la imagen del instrumento" placeholder='Ingrese URL imagen #3' onChange={e => handleImages(e, 2)} />
						</div>
						<div>
							<input type="url" src="" alt="url de la imagen del instrumento" placeholder='Ingrese URL imagen #4' onChange={e => handleImages(e, 3)} />
						</div>

					</div>

					<div className='contThree-addProd'>

						<div>
							<input type="url" src="" alt="url de la imagen del instrumento" placeholder='Ingrese URL imagen #5' onChange={e => handleImages(e, 4)} />
						</div>

						<div>
							<select name="categoria" id="categoria" value={values.category.categoryName} onChange={(e) => {
								const selectedCategoryName = e.target.value;
								const selectedCategory = categories.find((category) => category.categoryName === selectedCategoryName)
								const categoryId = selectedCategory ? selectedCategory.id : 0;

								setValues({...values, category: {id: categoryId, categoryName: selectedCategoryName}})
							}}>
								<option value="">Seleccione la categoria</option>
								{
									categories.map((category) => (
										<option key={category.id} value={category.categoryName}>{category.categoryName}</option>
									))
								}
							</select>
						</div>

						<div>
							<select name="branch" id="branch" value={values.branch.id} onChange={e => setValues({ ...values, branch: { id: parseInt(e.target.value) } })}>
								<option value="">Seleccione la sucursal</option>
								{
									branches.map((branch) => (
										<option key={branch.id} value={branch.id}>{branch.city}</option>
									))
								}
							</select>
						</div>

						<div>
							<input type="number" name="pricePerDay" id="pricePerDay" min={1} placeholder='Indique un precio por dia' onChange={e => setValues({ ...values, pricePerDay: parseInt(e.target.value) })} />
						</div>


					</div>

				</form>

				<div className="container-button">
					<button type="submit" form='addProduct'>Agregar</button>
				</div>
			</div>
		</div>
	)
}

export default AddProduct