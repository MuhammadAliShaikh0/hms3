import React, { useEffect, useState } from 'react';
import StaffNavbar from '../../components/StaffNavbar';
import { Box, Typography } from '@mui/material';
import { db } from '../../Config/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'UID', headerName: 'User ID', width: 150 },
  { field: 'Name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'contactInfo', headerName: 'Contact Info', width: 200 },
];

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const querySnapshot = await getDocs(collection(db, 'userhms'));
      const customerData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Using doc ID as the unique identifier
        ...doc.data(),
      }));
      setCustomers(customerData);
    };

    fetchCustomers();
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
      
        <Typography variant="h4" gutterBottom>Customer Details</Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={customers}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default CustomerDetails;
