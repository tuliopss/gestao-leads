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
import { getAllSalesPersons } from "../../salespersons/slices/salesperson-slice";
import { getAllConsultations } from "../../customer-services/slices/consultation-slice";

import styles from "./SalesPersonTable.module.css";

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
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={styles.row} component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell className={styles.row} align='right'>
          {row.email}
        </TableCell>
        <TableCell id={styles.leadRow} className={styles.row} align='right'>
          {row.leads ? row.leads.length : 0}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 10, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Histórico de atendimentos de {row.name}
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Lead</TableCell>

                    <TableCell align='right'>Valor da venda (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.customerServices ? (
                    row.customerServices.map((historyRow) => {
                      return (
                        <TableRow key={historyRow.id}>
                          <TableCell component='th' scope='row'>
                            {formatDate(historyRow.date)}
                          </TableCell>
                          {historyRow.lead ? historyRow.lead.name : "No Lead"}
                          <TableCell align='right'>
                            {historyRow.valuePaid}
                          </TableCell>
                          {/* <TableCell align='right'>
        {Math.round(historyRow.amount * row.price * 100) /
          100}
      </TableCell> */}
                        </TableRow>
                      );
                    })
                  ) : (
                    <span>Sem atendimentos.</span>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.number.isRequired,
    email: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const { salesPersons } = useSelector((state) => state.salesPerson);
  const dispatch = useDispatch();
  function createData(name, email, leads, customerServices) {
    return {
      name,
      email,
      leads,
      customerServices,
    };
  }

  React.useEffect(() => {
    dispatch(getAllSalesPersons());
  }, [dispatch]);

  const rows = salesPersons.map((person) => {
    const { name, email, leads, customerServices } = person;
    return createData(name, email, leads, customerServices);
  });
  return (
    <TableContainer component={Paper} id='tableContainer'>
      <Table aria-label='collapsible table'>
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell className={styles.headCell} align='right'>
              Email
            </TableCell>
            <TableCell id={styles.headLeadCell} align='right'>
              Leads&nbsp;
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
