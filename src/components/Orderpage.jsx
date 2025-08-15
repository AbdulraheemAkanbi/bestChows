import React, { useState } from 'react';
import {
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  IconButton,
  CssBaseline,
} from '@material-ui/core';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Order from './Order/index';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(4),
  },
  list: {
    width: 250,
  },
  sectionDesktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  footer: {
    backgroundColor: 'orange',
    padding: theme.spacing(2),
    marginTop: 'auto',
  },
}));

function Orderpage() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
      
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const drawerList = (
    <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {['Home', 'About Us', 'Contact Us'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Navbar />
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerList}
        </Drawer>
        <Container maxWidth="md" className={classes.container}>
          {/**<Typography gutterBottom variant="h2" align="center">
            Welcome to Our Simple Restaurant, please make an order right away.
          </Typography>*/}
          <Order />
        </Container>
        <footer className={classes.footer}>
          <Typography variant="body1" align="center">
            © 2024 Best Chows by httpraheem. All rights reserved.
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default Orderpage;
