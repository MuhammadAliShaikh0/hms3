// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography, FormControl, FormLabel, MenuItem, Select } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [UID, setUID] = useState('');
//   const [Name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [contactInfo, setContactInfo] = useState('');
//   const [rolePassword, setRolePassword] = useState('');
//   const [showRolePassword, setShowRolePassword] = useState(false);
//   const navigate = useNavigate();

//   const handleRoleChange = (e) => {
//     const selectedRole = e.target.value;
//     setRole(selectedRole);
    
//     // Only show password prompt for special roles
//     if (['Staff', 'Manager', 'Admin'].includes(selectedRole)) {
//       setShowRolePassword(true);
//     } else {
//       setShowRolePassword(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate role-specific password if applicable
//     if (showRolePassword) {
//       if (
//         (role === 'Staff' && rolePassword !== 'staff') ||
//         (role === 'Manager' && rolePassword !== 'manager') ||
//         (role === 'Admin' && rolePassword !== 'admin')
//       ) {
//         alert('Invalid role-specific password');
//         return;
//       }
//     }
    
//     // After validation, send user to their respective page
//     if (role === 'Staff') {
//       navigate('/staff');
//     } else if (role === 'Manager') {
//       navigate('/manager');
//     } else if (role === 'Admin') {
//       navigate('/admin');
//     } else {
//       navigate('/home'); // For other users, like customers
//     }
//   };

//   return (
//     <Box sx={{ marginTop: '20px', padding: '20px', textAlign: 'center' }}>
//       <Typography variant="h4" gutterBottom>User Registration</Typography>

//       <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '400px', margin: '0 auto' }}>
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <FormLabel>User ID:</FormLabel>
//           <TextField
//             variant="outlined"
//             value={UID}
//             onChange={(e) => setUID(e.target.value)}
//             required
//           />
//         </FormControl>

//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <FormLabel>Name:</FormLabel>
//           <TextField
//             variant="outlined"
//             value={Name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </FormControl>

//         {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <FormLabel>Email:</FormLabel>
//           <TextField
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </FormControl>

//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <FormLabel>Password:</FormLabel>
//           <TextField
//             variant="outlined"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </FormControl> */}

//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <FormLabel>Role:</FormLabel>
//           <Select
//             value={role}
//             onChange={handleRoleChange}
//             required
//           >
//             <MenuItem value="Customer">Customer</MenuItem>
//             <MenuItem value="Staff">Staff</MenuItem>
//             <MenuItem value="Manager">Manager</MenuItem>
//             <MenuItem value="Admin">Admin</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <FormLabel>Contact Info:</FormLabel>
//           <TextField
//             variant="outlined"
//             value={contactInfo}
//             onChange={(e) => setContactInfo(e.target.value)}
//             required
//           />
//         </FormControl>

//         {showRolePassword && (
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <FormLabel>{role} Password:</FormLabel>
//             <TextField
//               variant="outlined"
//               type="password"
//               value={rolePassword}
//               onChange={(e) => setRolePassword(e.target.value)}
//               placeholder={`Enter ${role} password`}
//               required
//             />
//           </FormControl>
//         )}

//         <Button type="submit" variant="contained" fullWidth>
//           Register
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Registration;
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Config/Firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

const Registration = () => {
  const [UID, setUID] = useState('');
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [rolePassword, setRolePassword] = useState('');
  const [showRolePassword, setShowRolePassword] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    
    // Only show password prompt for special roles
    if (['Staff', 'Manager', 'Admin'].includes(selectedRole)) {
      setShowRolePassword(true);
    } else {
      setShowRolePassword(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate role-specific password if applicable
    if (showRolePassword) {
      if (
        (role === 'Staff' && rolePassword !== 'staff') ||
        (role === 'Manager' && rolePassword !== 'manager') ||
        (role === 'Admin' && rolePassword !== 'admin')
      ) {
        alert('Invalid role-specific password');
        return;
      }
    }

    // Create customer data object
    const customerData = {
      UID,
      Name,
      email,
      contactInfo,
    };

    try {
      // Add customer data to Firestore
      await addDoc(collection(db, 'userhms'), customerData);
      alert('Registration successful!');

      // After validation, send user to their respective page
      if (role === 'Staff') {
        navigate('/staff');
      } else if (role === 'Manager') {
        navigate('/manager');
      } else if (role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/home'); // For other users, like customers
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <Box sx={{ marginTop: '20px', padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>User Registration</Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '400px', margin: '0 auto' }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <FormLabel>User ID:</FormLabel>
          <TextField
            variant="outlined"
            value={UID}
            onChange={(e) => setUID(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <FormLabel>Name:</FormLabel>
          <TextField
            variant="outlined"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <FormLabel>Email:</FormLabel>
          <TextField
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <FormLabel>Role:</FormLabel>
          <Select
            value={role}
            onChange={handleRoleChange}
            required
          >
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <FormLabel>Contact Info:</FormLabel>
          <TextField
            variant="outlined"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </FormControl>

        {showRolePassword && (
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>{role} Password:</FormLabel>
            <TextField
              variant="outlined"
              type="password"
              value={rolePassword}
              onChange={(e) => setRolePassword(e.target.value)}
              placeholder={`Enter ${role} password`}
              required
            />
          </FormControl>
        )}

        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Registration;
