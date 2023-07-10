import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../Routes/Home";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  const { id } = useParams();

  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get(`${endpoint}/${id}`)
      .then(({ data }) => {
        setValues(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="carousel-container">
      {values.images && values.images.length > 0 && (
        <Carousel>
          {values.images.map((image, index) => (
            <div key={index}>
              <img src={image.imageURL} alt={`Image ${index}`} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselComponent;
