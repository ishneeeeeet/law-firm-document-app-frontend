import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
 logo: {
    flexGrow: "1",
    cursor: "pointer",
    color: '#555b6d',
    fontSize: '0.9rem',
    fontWeight:'bold'
  },
  link: {
    textDecoration: "none",
    color: '#555b6d',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    padding: "0.47rem 0.75rem",
    fontWeight: '400'
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar className="page-topbar" style={{backgroundColor: '#ffffff'}} >
      <CssBaseline />
       <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Mortgage 
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/Mydeal" className={classes.link}>
              My Deal
            </Link>
            <Link to="/calender" className={classes.link}>
              Calender
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;