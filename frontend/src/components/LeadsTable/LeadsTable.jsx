import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads } from "../../leads/slices/leads-slice";
import { getAllConsultations } from "../../customer-services/slices/consultation-slice";

import styles from "./LeadsTable.module.css";

const formatDate = (date) => {
  const newDate = new Date(date);

  const day =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  const month =
    newDate.getMonth() < 10 ? "0" + newDate.getMonth() : newDate.getMonth();
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
};
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell></TableCell>
        <TableCell className={styles.row} component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell className={styles.row} align='right'>
          {row.whatsapp}
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.number.isRequired,
    email: PropTypes.number.isRequired,
  }).isRequired,
};

export default function LeadsTable() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  function createData(name, whatsapp) {
    return {
      name,
      whatsapp,
    };
  }

  React.useEffect(() => {
    dispatch(getAllLeads());
  }, [dispatch]);

  const rows = leads.map((lead) => {
    const { name, whatsapp } = lead;
    return createData(name, whatsapp);
  });
  return (
    <TableContainer component={Paper} id='tableContainer'>
      <Table aria-label='collapsible table'>
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell className={styles.headCell} align='right'>
              WhatsApp
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} /> // Use `row.name` como chave única.
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
