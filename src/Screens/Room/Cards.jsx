import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarRateOutlinedIcon from "@mui/icons-material/StarRateOutlined";
import "./Cards.css";

export default function Cards({ title, desc, image, id, category, rating, price }) {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(`/booking/${id}`, {
      state: { id, title, desc, image, category, rating, price },
    });
  };

  const ratingFunc = (rate) => {
    let validRate = Math.min(Math.max(parseFloat(rate), 0), 5);
    let filledStars = Math.round(validRate);
    let emptyStars = 5 - filledStars;

    return (
      <div className="rating-container">
        {Array.from({ length: filledStars }, (_, i) => (
          <span key={i} className="filled-star">
            <StarRateIcon />
          </span>
        ))}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={i} className="empty-star">
            <StarRateOutlinedIcon />
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card sx={{ maxWidth: 345, marginTop: "20px", position: "relative" }} className="card">
      <CardMedia sx={{ width: "100%", height: "300px" }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className="card-category">
          {category}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {title.slice(0, 20)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc.length > 50 ? `${desc.slice(0, 50)}...` : desc}
        </Typography>
        <div className="rating-price-container">
          {ratingFunc(rating)}
          <Typography variant="h6" component="div">
            ${price}
          </Typography>
        </div>
      </CardContent>
      <CardActions> 
        <Button onClick={handleAdd} className="card-button">Book</Button>
      </CardActions>
    </Card>
  );
}
