import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Datapoint } from "../../types/Datapoint";
import {
  FormControl,
  FormHelperText,
  NativeSelect,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import TableView from "./TableView";
import LineGraphView from "./LineGraphView";

const dataModes = ["Table", "Line"] as const;

type DataMode = typeof dataModes[number];

export default function DataVis(props: any) {
  const classes = useStyles();
  const [data, setData] = useState<Datapoint[]>([]);
  const { getAllDatapoints } = useApi();
  const [dataMode, setDataMode] = useState<DataMode>("Table");

  useEffect(() => {
    getAllDatapoints(props.match.params.container)
      .then(setData)
      .catch((e) => console.error(e));
  }, [getAllDatapoints, props.match.params.container]);

  const handleDataModeSelect = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const value = event.target.value as DataMode;
    setDataMode(value);
  };

  const renderDataView = () => {
    switch (dataMode) {
      case "Line":
        return <LineGraphView data={data} />;

      default:
      case "Table":
        return <TableView data={data} />;
    }
  };

  return (
    <>
      <div className={classes.header}>
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={dataMode}
            onChange={handleDataModeSelect}
            name="mode"
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "age" }}
          >
            {dataModes.map((mode) => (
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
      <div className={classes.visualization}>{renderDataView()}</div>
    </>
  );
}
