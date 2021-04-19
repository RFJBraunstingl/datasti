import React, {useState} from "react"
import {Button, FormControl, FormHelperText, NativeSelect} from "@material-ui/core";
import useStyles from "./styles";

interface Props {
    dataMode: string;
    possibleModes: Array<string>;
    setDataMode: (mode: string) => void;
}

const Header = ({dataMode, possibleModes, setDataMode}: Props) => {
    const classes = useStyles();

    const onModeUpdate = (event: { target: { value: string; }; }) => setDataMode(event.target.value)

    return <div className={classes.header}>
        <FormControl className={classes.formControl}>
            <NativeSelect
                value={dataMode}
                onChange={onModeUpdate}
                name="mode"
                className={classes.selectEmpty}
                inputProps={{"aria-label": "age"}}
            >
                {possibleModes.map((mode) => (
                    <option value={mode}>{mode}</option>
                ))}
            </NativeSelect>
            <FormHelperText>
                Chose how your data should be displayed
            </FormHelperText>
        </FormControl>
        <Button variant="contained" color="primary">
            Add Datapoint
        </Button>
    </div>
}

export default Header
