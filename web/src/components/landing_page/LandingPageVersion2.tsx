import React from "react";
//Images
import Clock from "./01-clock.svg"
import Statistics from "./18-statistics.svg"
import Team from "./35-team.svg"
import Hanger from "./49-coat hanger.svg"

import MarketingImage from "./landing_image_v2.jpg"
import useWindowDimensions from "../../utils/GetWindowDimensions";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Fab, Icon} from "@material-ui/core";
import {Link} from "react-router-dom";

const card1 = {
    id: 1,
    icon: Clock,
    heading: "Keep Track",
    text: "Notify your ass if you are a lazy fuck!"
}

const card2 = {
    id: 2,
    icon: Statistics,
    heading: "Visualize",
    text: "Visualize your data to acctually see the fucking change"
}

const card3 = {
    id: 3,
    icon: Team,
    heading: "Share",
    text: "Share your graphs with your non existent friends!"
}

const card4 = {
    id: 4,
    icon: Hanger,
    heading: "Abort",
    text: "Pretty self explanatory!"
}

const cards = [card1, card2, card3, card4]


const useStyles = makeStyles((theme) => ({
    main_image: {
        backgroundImage: `url(${MarketingImage})`,
        /* Center and scale the image nicely */
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundPosition: "0% 50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: -1
    },
    button:{
        position: "absolute",
        top: "88%",
        left: "55px",
    },
    button2:{
        position: "absolute",
        top: "88%",
        left: "235px",
    },
    button3:{
        position: "absolute",
        top: "88%",
        left: "307px",
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}));


export default function LandingPage() {
    const {height, width} = useWindowDimensions();
    const classes = useStyles();

    return (
        <div>
            <div className={classes.main_image}/>
            <Fab component={Link} to={'/register'} variant="extended" color='default' className={classes.button}>
                <Icon className={classes.extendedIcon}>menu_book</Icon> Learn More!
            </Fab>
            <Fab component={Link} to={'/androidshit'} className={classes.button2} disabled>
                <Icon>android</Icon>
            </Fab>
            <Fab component={Link} to={'/appleshit'} color='default' className={classes.button3} disabled>
                <Icon>anchor</Icon>
            </Fab>
        </div>
    )
}