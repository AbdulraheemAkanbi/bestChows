import React from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
     footer: {
    backgroundColor: 'orange',
    padding: theme.spacing(2),
    marginTop: 'auto',
  },
})) 

const Footer = () => {
     const classes = useStyles();
    
  return (
    <footer className={classes.footer}>
          <Typography variant="body1" align="center">
            © 2024 Best Chows by httpraheem. All rights reserved.
          </Typography>
        </footer>
  )
}

export default Footer