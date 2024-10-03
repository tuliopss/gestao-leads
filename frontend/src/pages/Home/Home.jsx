import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads } from "../../leads/slices/leads-slice";
import { Button } from "@mui/material";
import styles from "./Home.module.css";
import { getAllConsultations } from "../../customer-services/slices/consultation-slice";
import ConsultationCard from "../../components/Consultation/ConsultationCard";
const Home = () => {
  const dispatch = useDispatch();
  const { consultations } = useSelector((state) => state.consultation);

  useEffect(() => {
    console.log("dispatch");
    dispatch(getAllConsultations());
  }, [dispatch]);

  console.log(consultations);

  return (
    <div>
      <header className={styles.homeHeader}>
        <h1>Atendimentos:</h1>

        <Button variant='contained' color='success'>
          Criar novo atendentimento
        </Button>
      </header>

      <div className={styles.ConsultationList}>
        {consultations.length > 0 ? (
          consultations.map((consultation) => (
            <ConsultationCard
              consultation={consultation}
              key={consultation.id}
            />
          ))
        ) : (
          <h2>Sem atendentimentos</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
