import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

const sections = [
  { title: 'Home', path: '/home' },
  { title: 'Rooms', path: '/roomlist' },
  { title: 'Services', path: '/services' },
  { title: 'Feedback', path: '/feedback' },
];

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  activeLink: {
    textDecoration: 'underline',
  },
});

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const classes = useStyles();

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSectionClick = (path, title) => {
    setActiveSection(title);
    navigate(path);
    if (isSmallScreen) {
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              {isSmallScreen && (
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleToggleDrawer}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <ApartmentIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  whiteSpace: 'nowrap',
                }}
              >
                Hotel
              </Typography>
            </Box>

            {!isSmallScreen && (
              <Box sx={{ display: 'flex' }}>
                {sections.map((section) => (
                  <Typography
                    key={section.title}
                    sx={{
                      ml: 2,
                      cursor: 'pointer',
                      fontWeight: activeSection === section.title ? 'bold' : 'normal',
                    }}
                    className={`${classes.link} ${activeSection === section.title && classes.activeLink}`}
                    onClick={() => handleSectionClick(section.path, section.title)}
                  >
                    {section.title}
                  </Typography>
                ))}
              </Box>
            )}

            <Box sx={{ ml: 2 }}>
              <Tooltip title="Logout">
                <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ mt: '64px' }} />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleToggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        <List>
          {sections.map((section) => (
            <ListItem
              button
              key={section.title}
              onClick={() => handleSectionClick(section.path, section.title)}
            >
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
