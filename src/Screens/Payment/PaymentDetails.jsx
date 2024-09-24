import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Import your Firestore instance
import { collection, getDocs } from "firebase/firestore"; 
import StaffNavbar from '../../components/StaffNavbar';
import { Box, Typography, Card, CardContent } from '@mui/material';

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage errors

  // Fetch payments from Firestore
  const fetchPayments = async () => {
    try {
      const paymentCollection = collection(db, "payments");
      const paymentSnapshot = await getDocs(paymentCollection);
      const paymentList = paymentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched payments: ", paymentList); // Debugging statement
      setPayments(paymentList);
    } catch (err) {
      console.error("Error fetching payments: ", err); // Log any error
      setError(err);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div>
      <StaffNavbar />
      <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '240px', 
      padding: 2,
      width: 'calc(100% - 240px)',
      overflowX: 'hidden', 
      '@media (max-width: 600px)': {
        marginLeft: 0,
        width: '100%',
      },
    }}
  >
        <Typography variant="h4" align="center" gutterBottom>
          Payment Details
        </Typography>
        {loading && <Typography align="center">Loading...</Typography>}
        {error && <Typography align="center" color="error">Error loading payments.</Typography>}
        {!loading && payments.length === 0 && (
          <Typography align="center">No payment details available.</Typography>
        )}
        {payments.map((payment) => (
          <Card key={payment.id} sx={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">
                Room: {payment.room}
              </Typography>
              <Typography variant="body1">
                Nights: {payment.nights}
              </Typography>
              <Typography variant="body1">
                Total Price: ${payment.totalPrice}
              </Typography>
              <Typography variant="body1">
                Paid with Card: **** **** **** {payment.cardNumber.slice(-4)}
              </Typography>
              <Typography variant="body1">
                Name on Card: {payment.nameOnCard}
              </Typography>
              <Typography variant="body1">
                Expiry Date: {payment.expiryDate}
              </Typography>
              <Typography variant="body1">
                Payment Date: {payment.timestamp ? payment.timestamp.toDate().toLocaleString() : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default PaymentDetails;
