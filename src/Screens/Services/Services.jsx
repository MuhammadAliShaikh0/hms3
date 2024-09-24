import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SpaIcon from '@mui/icons-material/Spa';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WifiIcon from '@mui/icons-material/Wifi';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const servicesList = [
  { id: 1, title: 'Room Service', icon: <RoomServiceIcon fontSize="large" /> },
  { id: 2, title: 'Spa Treatment', icon: <SpaIcon fontSize="large" /> },
  { id: 3, title: 'Laundry Service', icon: <LocalLaundryServiceIcon fontSize="large" /> },
  { id: 4, title: 'Restaurant Service', icon: <RestaurantIcon fontSize="large" /> },
  { id: 5, title: 'Wi-Fi Service', icon: <WifiIcon fontSize="large" /> },
  { id: 6, title: 'Car Rental', icon: <DirectionsCarIcon fontSize="large" /> },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    // Navigate to the Service Request page and pass the selected service
    navigate(`/servicesrequest`, { state: { serviceTitle: service.title } });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {servicesList.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, maxWidth: '400px' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {service.icon}
                  <CardContent>
                    <Typography variant="h6">{service.title}</Typography>
                  </CardContent>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() => handleServiceClick(service)}
                >
                  Request
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Services;
