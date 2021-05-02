import React, {useState} from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import useApi from "../../../../hooks/useApi";

interface Props {
    container: string;
    hidden: boolean;
    onClose: () => void;
    onDataAdded?: () => void;
}

const AddDatapointDialog = ({container, hidden, onClose, onDataAdded = () => {}}: Props) => {

    const [value, setValue] = useState<string>('');
    const [label, setLabel] = useState<string>('');

    const {saveDatapoint} = useApi();

    const saveData = () => saveDatapoint(container, {
        value,
        label,
    }).then(_ => {
        onDataAdded()
        onClose()
    }).catch(e => console.error(e))

    return <Dialog open={!hidden} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add datapoint</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="value"
                label="Value"
                type="text"
                fullWidth
                onChange={e => setValue(e.target.value)}
            />
            <TextField
                margin="dense"
                id="label"
                label="Label"
                type="text"
                fullWidth
                onChange={e => setLabel(e.target.value)}
            />
            <DialogContentText>
                Just enter a value (and optionally a label) and click on save.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                cancel
            </Button>
            <Button onClick={saveData} color="primary" variant='contained'>
                save
            </Button>
        </DialogActions>
    </Dialog>
}

export default AddDatapointDialog
