import React, {useState} from "react"
import {Button, FormControl, FormHelperText, NativeSelect} from "@material-ui/core";
import useStyles from "./styles";
import AddDatapointDialog from "./AddDatapointDialog";

interface Props {
    container: string;
    dataMode: string;
    possibleModes: Array<string>;
    setDataMode: (mode: string) => void;
}

const Header = ({container, dataMode, possibleModes, setDataMode}: Props) => {
    const classes = useStyles();
    const [displayAddDatapointDialog, setDisplayAddDatapointDialog] = useState(false);

    const onModeUpdate = (event: { target: { value: string; }; }) => setDataMode(event.target.value)

    return <>
        <AddDatapointDialog container={container} hidden={!displayAddDatapointDialog} onClose={() => setDisplayAddDatapointDialog(false)}/>
        <div className={classes.header}>
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
            <Button variant="contained" color="primary" onClick={() => setDisplayAddDatapointDialog(true)}>
                Add Datapoint
            </Button>
        </div>
    </>
}

export default Header
