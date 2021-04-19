import React from "react";
import MarketingImage from "./landing_image_v2.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    zIndex: -1,
  },
  button: {
    position: "absolute",
    top: "88%",
    left: "55px",
  },
  button2: {
    position: "absolute",
    top: "88%",
    left: "235px",
  },
  button3: {
    position: "absolute",
    top: "88%",
    left: "307px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.main_image} />
      <Fab
        component={Link}
        to={"/register"}
        variant="extended"
        color="default"
        className={classes.button}
      >
        <Icon className={classes.extendedIcon}>menu_book</Icon> Learn More!
      </Fab>
      <Fab
        component={Link}
        to={"/androidshit"}
        className={classes.button2}
        disabled
      >
        <Icon>android</Icon>
      </Fab>
      <Fab
        component={Link}
        to={"/appleshit"}
        color="default"
        className={classes.button3}
        disabled
      >
        <Icon>anchor</Icon>
      </Fab>
    </div>
  );
}
