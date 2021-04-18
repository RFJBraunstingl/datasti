import React from "react";
import {AppBar, Button, createStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Logo from "./Logo.svg"
import {Link} from "react-router-dom";

const useStyles =  makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: "rgba(241, 241, 241,0.9)",
        color: '#041E34',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo:{
        marginTop: "3px"
    }
}));

export default function StandardNavBar(){
    const classes = useStyles();

    return(
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Link to="/">
                    <img className={classes.logo} src={Logo} alt="datasti" width="95"/>
                </Link>
                <Typography variant="h6" className={classes.title}>
                </Typography>
                <Button component={Link} to={'/login'} color="inherit">Login</Button>
                <Button component={Link} to={'/register'} color="inherit">Register</Button>
            </Toolbar>
        </AppBar>
    )
}
