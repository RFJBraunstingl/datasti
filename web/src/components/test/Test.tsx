import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, createStyles, Grid, Paper, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    gridContainer: {},
  })
);

export default function Test() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid className={classes.gridContainer} container spacing={3}>
        <Grid item xs={3}>
          24 kg
        </Grid>
        <Grid item xs={3}>
          15.1.1111
        </Grid>
        <Grid item xs={3}>
          +3 %
        </Grid>
        <Grid item xs={3}>
          -4 %
        </Grid>
      </Grid>
    </Paper>
  );
}
