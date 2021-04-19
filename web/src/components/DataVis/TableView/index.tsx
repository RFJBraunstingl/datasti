import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Datapoint } from "../../../types/Datapoint";

interface Props {
  data: Datapoint[];
}

const TableView = ({ data }: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>timestamp</TableCell>
        <TableCell>label</TableCell>
        <TableCell>value</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((datapoint) => (
        <TableRow key={datapoint.timestamp}>
          <TableCell>{datapoint.timestamp}</TableCell>
          <TableCell>{datapoint.label}</TableCell>
          <TableCell>{datapoint.value}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default TableView;
