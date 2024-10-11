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
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import { getAllLeads } from "../../leads/slices/leads-slice";

import styles from "./LeadsTable.module.css";
import { useState } from "react";
import { useEffect } from "react";

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
    name: PropTypes.string.isRequired,
    whatsapp: PropTypes.string.isRequired,
  }).isRequired,
};

export default function LeadsTable() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 8;

  // Calcula o índice do primeiro e último lead da página atual
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;

  // Leads paginados para exibir na página atual
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

  // Total de páginas
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  // Função para criar os dados das linhas da tabela
  function createData(name, whatsapp) {
    return { name, whatsapp };
  }

  // Efeito para buscar os leads apenas uma vez ao carregar o componente
  useEffect(() => {
    if (leads.length === 0) {
      dispatch(getAllLeads());
    }
  }, [dispatch, leads.length]);

  const rows = currentLeads.map((lead) => {
    const { name, whatsapp } = lead;
    return createData(name, whatsapp);
  });

  return (
    <TableContainer component={Paper} id='tableContainer'>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell align='right'>WhatsApp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>

      {/* Paginação */}
      <div className={styles.paginationContainer}>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Anterior
        </button>
        <span className={styles.paginationInfo}>
          {currentPage} de {totalPages}
        </span>
        <button
          className={styles.paginationButton}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </TableContainer>
  );
}
