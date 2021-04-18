import React, {useEffect, useState} from "react";
import {Container, Grid} from "@material-ui/core";
import Category from "./Category/Category";
import useApi from "../../hooks/useApi";
import {Container as ContainerType} from '../../types/Container'
import {useHistory} from "react-router-dom";

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
    }, [getAllContainers, replace])

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
