import React, { useContext } from "react";
import acousticGuitar from "../assets/images/guitarraAcustica.png";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ContextLogin } from "../Context/LoginContext";

const RecomendationCard = ({
  name,
  description,
  category,
  imageURL,
  pricePerDay,
  brand,
  id,
}) => {
  const navigate = useNavigate();
  const { state } = useContext(ContextLogin);

  const handleButton = () => {
    navigate(`/detail/${id}`);
  };

  const handleRatingChange = (rating) => {
    console.log(rating);
  };

  return (
    <div className="div-cardRecomend">
      <div className="img-cardRecomend">
        <img src={imageURL} alt="imagen de instrumento" />
      </div>
      <div className="info-cardRecomend">
        <h3>{name}</h3>
        <p>{brand.brandName}</p>
        <p>{description}</p>

        <button onClick={handleButton}>Ver mas</button>
      </div>
    </div>
  );
};

export default RecomendationCard;
