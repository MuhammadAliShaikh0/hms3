import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Rating } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: '20px', md: '40px' },
        }}
      >
        {submitted ? (
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Thank you for your feedback!
          </Typography>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: '500px',
              width: '100%',
              backgroundColor: '#f9f9f9',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
              Share Your Feedback
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
              Please provide your rating and feedback to help us improve.
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Rating
                name="user-rating"
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                size="large"
              />
            </Box>
            <TextField
              fullWidth
              label="Your Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
              required 
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                padding: '10px 20px',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              Submit Feedback
            </Button>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Feedback;
