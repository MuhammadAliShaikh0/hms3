import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ServiceReq = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', room: '', request: '' });
  const location = useLocation();
  const navigate = useNavigate();

  // Get the selected service title from the navigation state
  const serviceTitle = location.state?.serviceTitle || 'Service';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/services');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Box sx={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {serviceTitle} Request
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Selected Service"
              name="service"
              required
              value={serviceTitle}
              margin="normal"
              disabled
            />
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Room Number"
              name="room"
              required
              value={formData.room}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Request Details"
              name="request"
              required
              value={formData.request}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Submit Request
            </Button>
          </form>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request Submitted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you! Your {serviceTitle.toLowerCase()} request has been submitted. We will get back to you shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default ServiceReq;
