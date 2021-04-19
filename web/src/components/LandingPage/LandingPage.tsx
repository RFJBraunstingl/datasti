import React, { useEffect, useState } from "react";

//Images
import Clock from "./01-clock.svg";
import Statistics from "./18-statistics.svg";
import Team from "./35-team.svg";
import Hanger from "./49-coat hanger.svg";

import MarketingImage from "./landing_image.jpg";
import useWindowDimensions from "../../utils/GetWindowDimensions";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { url } from "inspector";

const card1 = {
  id: 1,
  icon: Clock,
  heading: "Keep Track",
  text: "Notify your ass if you are a lazy fuck!",
};

const card2 = {
  id: 2,
  icon: Statistics,
  heading: "Visualize",
  text: "Visualize your data to acctually see the fucking change",
};

const card3 = {
  id: 3,
  icon: Team,
  heading: "Share",
  text: "Share your graphs with your non existent friends!",
};

const card4 = {
  id: 4,
  icon: Hanger,
  heading: "Abort",
  text: "Pretty self explanatory!",
};

const cards = [card1, card2, card3, card4];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  paper: {
    height: 112,
    width: "250px",
    marginBottom: "35px",
    padding: "10px",
  },
  paper_icon: {
    float: "left",
  },
  paper_icon_surrounding: {
    marginLeft: "10px",
    padding: "10px",
    backgroundColor: "#5575CF",
    borderRadius: "50%",
    overflow: "auto",
    float: "left",
  },
  paper_heading: {
    float: "left",
    marginTop: "13px",
    marginLeft: "25px",
  },
  paper_body: {
    marginTop: "63px",
  },
  container: {
    position: "absolute",
    bottom: "0",
    width: "100%",
  },
  main_image: {
    backgroundImage: `url(${MarketingImage})`,
    /* Center and scale the image nicely */
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: -1,
  },
}));

export default function LandingPage() {
  const { height, width } = useWindowDimensions();
  const classes = useStyles();

  return (
    <div>
      <div className={classes.main_image} />
      <div className={classes.container}>
        <Grid item xs={12}>
          <Grid container justify="space-around">
            {cards.map((card) => (
              <Grid key={card.id} item>
                <Paper className={classes.paper}>
                  <div className={classes.paper_icon_surrounding}>
                    <img
                      className={classes.paper_icon}
                      src={card.icon}
                      alt="icon"
                      width="35px"
                    />
                  </div>
                  <Typography variant="h5" className={classes.paper_heading}>
                    {card.heading}
                  </Typography>
                  <Typography variant="body2" className={classes.paper_body}>
                    {card.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
