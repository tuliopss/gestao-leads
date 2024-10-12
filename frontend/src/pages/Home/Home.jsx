import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads } from "../../leads/slices/leads-slice";
import { Button } from "@mui/material";
import styles from "./Home.module.css";
import { getAllConsultations } from "../../customer-services/slices/consultation-slice";
import ConsultationCard from "../../components/Consultation/ConsultationCard";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading/LoadingComponent";
const Home = () => {
  const dispatch = useDispatch();
  const { consultations, loading } = useSelector((state) => state.consultation);

  useEffect(() => {
    dispatch(getAllConsultations());
    console.log(consultations);
  }, [dispatch]);

  if (loading) return <LoadingComponent />;
  return (
    <div>
      <header className={styles.homeHeader}>
        <h1>Atendimentos:</h1>

        <Link to='/addConsultation'>
          <Button variant='contained' color='success'>
            Registrar novo atendimento
          </Button>
        </Link>
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
