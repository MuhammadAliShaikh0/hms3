import React from 'react';
import Navbar from '../../components/Navbar';
import { Button, Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Cards from '../Room/Cards';
import { productData } from '../Room/data';
import Footer from '../../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleViewRooms = () => {
    navigate("/roomlist");
  };

  const getRoomByIndex = (index) => {
    return productData[index] || null;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure it takes the full height
        overflow: 'hidden', // Prevent overflow
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <Box
        className="hero-section"
        sx={{
          minHeight: { xs: '60vh', md: '100vh' },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: { xs: '20px', md: '0' },
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '3rem' } }}>
          Welcome to Our Hotel
        </Typography>
        <Typography variant="h6" sx={{ marginTop: '20px', maxWidth: '600px', fontSize: { xs: '1rem', md: '1.25rem' } }}>
          Experience the ultimate comfort and luxury. Book your stay with us and enjoy an unforgettable experience.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '30px', padding: { xs: '8px 16px', md: '10px 20px' }, fontSize: { xs: '14px', md: '18px' }, bgcolor: "black" }}
          onClick={handleViewRooms}
        >
          View Rooms
        </Button>
      </Box>

      {/* Featured Rooms Section */}
      <Box id="rooms-section" sx={{ padding: { xs: '30px 10px', md: '50px 20px' }, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '30px' }}>
          Featured Rooms
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          {['0', '10', '7'].map(index => {
            const room = getRoomByIndex(index);
            return room ? (
              <Grid item key={room.id} xs={12} sm={6} md={4}>
                <Cards
                  id={room.id}
                  title={room.title}
                  desc={room.description}
                  image={room.image}
                  category={room.category}
                  rating={room.rating.rate}
                  price={room.price}
                />
              </Grid>
            ) : null;
          })}
        </Grid>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ padding: { xs: '30px 10px', md: '50px 20px' }, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '30px' }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {["World-class Service", "Luxury Rooms", "Premium Dining"].map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '250px', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={
                    feature === "World-class Service"
                      ? "https://media.istockphoto.com/id/674657102/photo/luggage-of-travelers.jpg?s=612x612&w=0&k=20&c=4gXuA-owv5RcoUXaryokzyheo86IIZLcoKlMzN1rfI0="
                      : feature === "Luxury Rooms"
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvtwivni5za6o__jYUVVqDqhmAfpPEqWTCA&s"
                      : "https://cdn.tatlerasia.com/asiatatler/i/my/2021/07/28160612-motokyo-resized_cover_1920x902.jpg"
                  }
                  alt={feature}
                  sx={{ objectFit: 'cover', width: '100%' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{feature}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enjoy our {feature.toLowerCase()} and make your stay unforgettable.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
