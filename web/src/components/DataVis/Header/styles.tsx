import { makeStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: theme.spacing(2),
        },
    })
);

export default useStyles;
