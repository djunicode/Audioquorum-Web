import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>

          <Typography sx={{ flexGrow: 1 }} variant="h4" fontWeight="bold">
            Audioquorum
          </Typography>
       
        </Toolbar>
      </AppBar>
    </Box>
  );
}

