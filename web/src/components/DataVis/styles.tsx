import { makeStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visualization: {
      margin: theme.spacing(6),
    },
  })
);

export default useStyles;
