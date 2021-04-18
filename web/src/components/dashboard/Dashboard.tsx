import React, {useEffect, useState} from "react";
import {Container, createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Category from "./Category/Category";
import useApi from "../../hooks/useApi";
import {Container as ContainerType} from '../../types/Container'
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            marginTop: "40px",
        },
    }),
);

export default function Dashboard() {

    const [categories, setCategories] = useState<ContainerType[]>([]);
    const {getAllContainers} = useApi();
    const {replace} = useHistory()

    useEffect(() => {
        getAllContainers()
            .then(setCategories)
            .catch(e => {
                console.error(e)
                replace('/login')
            })
    }, [getAllContainers])

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} >
                {categories && categories.map(category =>
                    <Grid item xs={6} sm={3}>
                        <Category
                            name={category.name}
                            icon={<></>}/>
                    </Grid>
                )}
                <Grid item xs={6} sm={3}>
                    <Category
                        name={"new"}
                        url='/create-new-container'
                        icon={<></>}/>
                </Grid>
            </Grid>
        </Container>
    );
}
