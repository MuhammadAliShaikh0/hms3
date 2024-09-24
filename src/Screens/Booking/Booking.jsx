import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productData } from '../Room/data';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Rating, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = productData.find(item => item.id === parseInt(id));
  const [nights, setNights] = React.useState(1);

  const numericPrice = parseFloat(room.price.match(/\d+/)[0]);

  const handleBooking = () => {
    navigate('/paymentmethod', { state: { room, nights, totalPrice: numericPrice * nights } });
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Navbar />
      <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Card sx={{ display: 'flex', flexDirection: ['column', 'row'], padding: '20px' }}>
          <CardMedia
            component="img"
            sx={{ width: ['100%', '50%'], height: 'auto', borderRadius: '8px' }}
            image={room.image}
            alt={room.title}
          />
          <CardContent sx={{ paddingLeft: '20px' }}>
            <Typography variant="h4" component="div" gutterBottom>
              {room.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {room.description}
            </Typography>
            <Typography variant="h6" component="div" sx={{ marginTop: '10px' }}>
              Price per night: <strong>${numericPrice}</strong>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Typography variant="h6" component="div">
                Rating:
              </Typography>
              <Rating
                name="read-only"
                value={room.rating.rate}
                readOnly
                precision={0.1}
                sx={{ marginLeft: '10px' }}
              />
            </Box>
            <Box sx={{ marginTop: '20px' }}>
              <TextField
                label="Number of nights"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 30 } }}
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                sx={{ marginBottom: '20px' }}
              />
              <Typography variant="h6" component="div">
                Total Price: <strong>${numericPrice * nights}</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <CardActions sx={{ justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleBooking}>
            Book Now
          </Button>
        </CardActions>
      </Box>
      <Footer/>
    </Box>
    
  );
};

export default Booking;
