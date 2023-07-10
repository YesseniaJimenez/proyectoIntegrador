import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import RecomendationCard from "../Components/RecomendationCard";
export const endpoint = "http://localhost:8080/instruments";
import axios from "axios";

const Home = () => {
    const [branches, setBranches] = useState([])

    const [branchValues, setBranchValues] = useState({
        country: "",
        province: "",
        city: "",
        address: ""
    })

    const [axiosValues, setAxiosValues] = useState([]);

    const [isLoading, setIsLoading] = useState(true)

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

    useEffect(() => {
        axios.get(`${endpoint}/showAll`)
            .then(({ data }) => {
                setAxiosValues(data);
                setIsLoading(false)
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false)
            });
    }, []);

    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        setFilteredList(axiosValues)
    }, [axiosValues])


    const filterSearch = (e) => {
        const query = e.target.value;

        let updatedList = [...axiosValues]

        updatedList = updatedList.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
        })

        setFilteredList(updatedList)
    }

    const withoutRepeatedOptions = (fieldName) => {
        const uniqueOptions = [...new Set(branches.map(branch => branch[fieldName]))]
        return uniqueOptions
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get("http://localhost:8080/instruments/filterByBranch", branchValues)
        .then(({data}) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        })
        console.log(branchValues);
    };

    const navigate = useNavigate();

    const detail = () => {
        navigate("/detail");
    };

    return (
        <main className="main-home">
            <div className="search-div">
                <h1>Desarrollá tu pasión sin gastar de más</h1>
                <form action="" onSubmit={handleSubmit}>

                    <select name="country" id="country" value={branchValues.country} onChange={(e) => setBranchValues({ ...branchValues, country: e.target.value })}>
                        <option value="">Seleccione pais</option>
                        {
                            withoutRepeatedOptions("country").map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))
                        }
                    </select>

                    <select name="province" id="province" value={branchValues.province} onChange={(e) => setBranchValues({ ...branchValues, province: e.target.value })}>
                        <option value="">Seleccione una provincia</option>
                        {
                            withoutRepeatedOptions("province").map(province => (
                                <option key={province} value={province}>{province}</option>
                            ))
                        }
                    </select>

                    <select name="city" id="city" value={branchValues.city} onChange={(e) => setBranchValues({ ...branchValues, city: e.target.value })}>
                        <option value="">Seleccione una ciudad</option>
                        {
                            withoutRepeatedOptions("city").map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))
                        }
                    </select>

                    <select name="address" id="address" value={branchValues.address} onChange={(e) => setBranchValues({ ...branchValues, address: e.target.value })}>
                        <option value="">Seleccione la direccion</option>
                        {
                            withoutRepeatedOptions("address").map(address => (
                                <option key={address} value={address}>{address}</option>
                            ))
                        }
                    </select>

                    <button type="submit" className="search-button">Buscar</button>
                </form>
            </div>

            <div className="search-category">
                <h2>Buscar por Categoría</h2>
                <div className="category-cards">
                    <Card />
                </div>
            </div>

            <div className="recomendations">
                <h2>Recomendaciones</h2>
                <div className="recomendation-cards">
                    {/* {axiosValues.map((value) => {
                        return (
                            <RecomendationCard
                                key={value.id}
                                name={value.name}
                                description={value.description}
                                brand={value.brand.brandName}
                                category={value.category.categoryName}
                                imageURL={value.images[0]?.imageURL}
                                pricePerDay={value.pricePerDay}
                                id={value.id}
                            />
                        );
                    })} */}

                    {
                        isLoading ? (
                            <div>
                                <h2>Cargando productos...</h2>
                            </div>
                        ) : (
                            filteredList.map((value) => {
                                return (
                                    <RecomendationCard
                                        key={value.id}
                                        name={value.name}
                                        description={value.description}
                                        brand={value.brand.brandName}
                                        imageURL={value.images[0]?.imageURL}
                                        pricePerDay={value.pricePerDay}
                                        id={value.id}
                                    />
                                );
                            })
                        )
                    }


                </div>
            </div>
        </main>
    );
};

export default Home;
