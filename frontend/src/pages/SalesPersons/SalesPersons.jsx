import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSalesPersons } from "../../salespersons/slices/salesperson-slice";
import styles from "./SalesPerson.module.css";
import { Button } from "@mui/material";
import ModalAddSalesPerson from "../../components/ModalAddSalesPerson/ModalAddSalesPerson";

const SalesPersons = () => {
  const dispatch = useDispatch();
  const { salesPersons } = useSelector((state) => state.salesPerson);

  useEffect(() => {
    dispatch(getAllSalesPersons());
  }, [dispatch]);

  return (
    <div>
      <header className={styles.homeHeader}>
        <h1>Atendentes:</h1>

        <ModalAddSalesPerson />
      </header>
    </div>
  );
};

export default SalesPersons;
