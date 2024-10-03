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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log("prop", row);
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
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>{row.email}</TableCell>
        <TableCell align='right'>{row.leads.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
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
    // fat: PropTypes.number.isRequired,
    // history: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     amount: PropTypes.number.isRequired,
    //     customerId: PropTypes.string.isRequired,
    //     date: PropTypes.string.isRequired,
    //   })
    // ).isRequired,
    // name: PropTypes.string.isRequired,
    // price: PropTypes.number.isRequired,
    // protein: PropTypes.number.isRequired,
  }).isRequired,
};

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable() {
  const { salesPersons } = useSelector((state) => state.salesPerson);
  const dispatch = useDispatch();

  //   function createData(name, email) {
  //     return {
  //       name,
  //       email,
  //       history: [
  //         {
  //           date: "2020-01-05",
  //           customerId: "11091700",
  //           amount: 3,
  //         },
  //         {
  //           date: "2020-01-02",
  //           customerId: "Anonymous",
  //           amount: 1,
  //         },
  //       ],
  //     };
  //   }

  //   React.useEffect(() => {
  //     dispatch(getAllSalesPersons());
  //   }, [dispatch]);

  //   const rows = salesPersons.map((person) => {
  //     const { name, email } = person;

  //     const persons = [{ ...createData(name, email) }];
  //     return persons;
  //   });
  //   //   console.log("ROOWS", rows[0][0].name);
  //   return (
  //     <TableContainer component={Paper}>
  //       <Table aria-label='collapsible table'>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell />
  //             <TableCell>Nome</TableCell>
  //             {/* <TableCell align='right'>Name</TableCell> */}
  //             <TableCell align='right'>Email</TableCell>
  //             <TableCell align='right'>Leads&nbsp;</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {rows.map((row, index) => {
  //             console.log(row);
  //             return <Row key={row[index]} row={row} />;
  //           })}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  function createData(name, email, leads) {
    return {
      name,
      email,
      leads,
      history: [
        {
          date: "2020-01-05",
          customerId: "11091700",
          amount: 3,
        },
        {
          date: "2020-01-02",
          customerId: "Anonymous",
          amount: 1,
        },
      ],
    };
  }

  React.useEffect(() => {
    dispatch(getAllSalesPersons());
  }, [dispatch]);

  const rows = salesPersons.map((person) => {
    const { name, email, leads } = person;
    return createData(name, email, leads);
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell align='right'>Email</TableCell>
            <TableCell align='right'>Leads&nbsp;</TableCell>
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
