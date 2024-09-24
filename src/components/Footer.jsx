import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <Box sx={{ padding: '20px', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
        <Typography variant="body1">© 2024 Hotel. All Rights Reserved.</Typography>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          123 Hotel St,City, Country | Phone:  123-456-7890
        </Typography>
      </Box>
    </div>
  )
}

export default Footer