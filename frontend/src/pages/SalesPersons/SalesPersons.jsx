import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSalesPersons } from "../../salespersons/slices/salesperson-slice";
import styles from "./SalesPerson.module.css";
import { Button } from "@mui/material";
import ModalAddSalesPerson from "../../components/ModalAddSalesPerson/ModalAddSalesPerson";
import SalesPersonTable from "../../components/SalesPersonTables/SalesPersonTable";

const SalesPersons = () => {
  return (
    <div>
      <header className={styles.homeHeader}>
        <h2>Atendentes: </h2>
        <ModalAddSalesPerson />
      </header>

      <div className={styles.salesPersonsList}>
        <SalesPersonTable />
      </div>
    </div>
  );
};

export default SalesPersons;
