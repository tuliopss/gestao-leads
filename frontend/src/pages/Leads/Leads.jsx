import React from "react";
import LeadsTable from "../../components/LeadsTable/LeadsTable";
import styles from "./Leads.module.css";
const Leads = () => {
  return (
    <div>
      <header className={styles.homeHeader}>
        <h2>Leads: </h2>
      </header>

      <div className={styles.salesPersonsList}>
        <LeadsTable />
      </div>
    </div>
  );
};

export default Leads;
