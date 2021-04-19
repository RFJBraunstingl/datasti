import React, {useState} from "react"
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link as RouterLink, useHistory} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Copyright from "../SignIn/Copyright";
import {makeStyles} from "@material-ui/core/styles";
import useApi from "../../hooks/useApi";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CreateContainerForm = () => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [iconUrl, setIconUrl] = useState('')

    const {createContainer} = useApi();

    const {push} = useHistory();

    const navigateToDashboard = () => push('/dashboard')

    const onSubmit = () => createContainer({
        name, description, iconUrl
    }).then(navigateToDashboard)
        .catch(e => console.error(e))

    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                New data container
            </Typography>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="iconUrl"
                            label="iconUrl"
                            type="text"
                            id="iconUrl"
                            value={iconUrl}
                            onChange={e => setIconUrl(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    className={classes.submit}
                >
                    create
                </Button>
                <Grid container justify="center">
                    <Grid item>
                        <RouterLink to="/dashboard">
                            Back
                        </RouterLink>
                    </Grid>
                </Grid>
            </div>
        </div>
        <Box mt={5}>
            <Copyright/>
        </Box>
    </Container>
}


export default CreateContainerForm
