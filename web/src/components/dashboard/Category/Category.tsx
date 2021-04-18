import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Icon, Paper, Theme, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

type CategoryProps = {
    id: string
    icon: React.ReactNode
    name: string
    color: string
    url?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "150px",
        },
        paper: {
            width: "100px",
            lineHeight: "100px",
            height: "100px",
            marginTop: "40px",
            textAlign: "center",

            margin: "auto"
        },
        icon: {
            display: "inline-block",
            verticalAlign: "middle",
            lineHeight: "normal",

            fontSize: "65px",
            margin: "auto",
        },
        title: {
            marginTop: "10px",
            textAlign: 'center',
        }
    }),
);


export default function Category(props: CategoryProps) {
    const classes = useStyles();

    // @ts-ignore
    return (
        <div className={classes.root}>
            <Link to={props.url ?? "/vis/" + props.name} style={{ textDecoration: 'none' }}>
                <Paper className={classes.paper} style={{backgroundColor: props.color}}>
                    <Icon className={classes.icon} style={{color:getColorBasedOnBackground(props.color)}}>star</Icon>
                </Paper>
                <Typography variant="h6" className={classes.title}>
                    {props.name}
                </Typography>
            </Link>
        </div>
    );
}

function getColorBasedOnBackground(hexcolor: string){
    hexcolor = hexcolor.replace("#", "");
    let r = parseInt(hexcolor.substr(0,2),16);
    let g = parseInt(hexcolor.substr(2,2),16);
    let b = parseInt(hexcolor.substr(4,2),16);
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? "#111111" : "#f1f1f1";
}

Category.defaultProps = {
    id: "NoID",
    color: "#4D70CC"
};
