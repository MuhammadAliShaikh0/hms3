// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Box, Typography, Button, TextField, Modal, Grid, Card, CardContent } from '@mui/material';
// import Navbar from '../../components/Navbar';

// const PMethod = () => {
//   const { state } = useLocation();
//   const { room, nights, totalPrice } = state || {};
//   const navigate = useNavigate();

//   const [cardNumber, setCardNumber] = useState('');
//   const [nameOnCard, setNameOnCard] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [showModal, setShowModal] = useState(false);

//   const handlePayment = (e) => {
//     e.preventDefault(); // Prevents the default form submission
//     setShowModal(true); 
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     navigate('/'); 
//   };

//   return (
//     <Box sx={{ marginTop: '20px', padding: '20px' }}>
//       <Navbar />
//       <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Payment Method
//         </Typography>
//         <Card sx={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
//           <CardContent>
//             <Typography variant="h6">
//               You are booking: {room?.title} for {nights} night(s)
//             </Typography>
//             <Typography variant="h6" sx={{ marginBottom: '20px' }}>
//               Total Price: <strong>${totalPrice}</strong>
//             </Typography>
            
//             {/* Form to wrap the inputs */}
//             <form onSubmit={handlePayment}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Card Number"
//                     value={cardNumber}
//                     onChange={(e) => setCardNumber(e.target.value)}
//                     type="text"
//                     placeholder="XXXX-XXXX-XXXX-XXXX"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Name on Card"
//                     value={nameOnCard}
//                     onChange={(e) => setNameOnCard(e.target.value)}
//                     type="text"
//                     placeholder="John Doe"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="Expiry Date"
//                     value={expiryDate}
//                     onChange={(e) => setExpiryDate(e.target.value)}
//                     type="text"
//                     placeholder="MM/YY"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="CVV"
//                     value={cvv}
//                     onChange={(e) => setCvv(e.target.value)}
//                     type="password"
//                     placeholder="123"
//                     required
//                   />
//                 </Grid>
//               </Grid>
//               <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                   Pay ${totalPrice}
//                 </Button>
//               </Box>
//             </form>
//           </CardContent>
//         </Card>
//       </Box>

//       <Modal
//         open={showModal}
//         onClose={closeModal}
//         aria-labelledby="payment-success-modal"
//         aria-describedby="payment-confirmation"
//       >
//         <Box sx={{
//           position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//           width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px'
//         }}>
//           <Typography id="payment-success-modal" variant="h5" align="center" gutterBottom>
//             Payment Successful!
//           </Typography>
//           <Typography id="payment-confirmation" variant="body1" align="center" gutterBottom>
//             Your booking for {room?.title} is confirmed.
//           </Typography>
//           <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
//             <Button variant="contained" color="primary" onClick={closeModal}>
//               Back to Home
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default PMethod;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Modal, Grid, Card, CardContent } from '@mui/material';
import Navbar from '../../components/Navbar';
import { db } from '../../Config/Firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

const PMethod = () => {
  const { state } = useLocation();
  const { room, nights, totalPrice } = state || {};
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // Add payment details to Firebase
      await addDoc(collection(db, 'payments'), {
        roomTitle: room.title,
        nights,
        totalPrice,
        cardNumber,
        nameOnCard,
        expiryDate,
        cvv,
        date: new Date(),
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/'); 
  };

  return (
    <Box sx={{ marginTop: '20px', padding: '20px' }}>
      <Navbar />
      <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Payment Method
        </Typography>
        <Card sx={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6">
              You are booking: {room?.title} for {nights} night(s)
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Total Price: <strong>${totalPrice}</strong>
            </Typography>
            
            <form onSubmit={handlePayment}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    type="text"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name on Card"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    type="text"
                    placeholder="MM/YY"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    type="password"
                    placeholder="123"
                    required
                  />
                </Grid>
              </Grid>
              <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Pay ${totalPrice}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="payment-success-modal"
        aria-describedby="payment-confirmation"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px'
        }}>
          <Typography id="payment-success-modal" variant="h5" align="center" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography id="payment-confirmation" variant="body1" align="center" gutterBottom>
            Your booking for {room?.title} is confirmed.
          </Typography>
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={closeModal}>
              Back to Home
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PMethod;
