import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Link, Box, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/Firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Redirect to login after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: '90%', sm: '400px' },
        margin: 'auto',
        marginTop: '10vh',
        padding: '2rem',
        boxShadow: 3,
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Signup
        </Button>
        <Link href="/login" underline="hover" style={{ display: 'block', marginTop: '10px' }}>
          Already have a profile? Login
        </Link>
      </form>
    </Box>
  );
};

export default Signup;
