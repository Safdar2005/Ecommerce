import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import logo from '../Assets/logo.png';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { cartItems } = useContext(ShopContext);
  const totalItems = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
      const name = localStorage.getItem("username") || "User";
      setIsLoggedIn(!!token);
      setUsername(name);
    };

    checkLogin(); // run on mount
    window.addEventListener('focus', checkLogin); // update on focus

    return () => {
      window.removeEventListener('focus', checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        {['Shop', 'Men', 'Women', 'Kids'].map((text) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={`/${text.toLowerCase() === 'shop' ? '' : text.toLowerCase()}`}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider />
        {isLoggedIn ? (
          <>
            <ListItem>
              <ListItemText primary={`Hello, ${username}`} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component={Link}
            to="/"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#fff' }}
          >
            <img src={logo} alt="logo" style={{ height: 32, marginRight: 8 }} />
            <Typography variant="h6" noWrap>
              SHOPSY
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            <Button component={Link} to="/" color="inherit">Shop</Button>
            <Button component={Link} to="/mens" color="inherit">Men</Button>
            <Button component={Link} to="/womens" color="inherit">Women</Button>
            <Button component={Link} to="/kids" color="inherit">Kids</Button>
          </Box>

          {isLoggedIn ? (
            <>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Typography variant="body1" sx={{ mx: 1 }}>{username}</Typography>
              <Button
                onClick={handleLogout}
                color="inherit"
                variant="outlined"
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  ml: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: '#fff',
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}

          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};
