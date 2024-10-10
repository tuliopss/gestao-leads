import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConsultationById } from "../../customer-services/slices/consultation-slice";
import styles from "./ConsultationDetails.module.css";
import formats from "../../utils/formats";
const ConsultationDetails = () => {
  const dispatch = useDispatch();
  const { consultation, loading } = useSelector((state) => state.consultation);
  const { id } = useParams();
  const fetchGetConsultationById = (id) => {
    dispatch(getConsultationById(id));
  };

  useEffect(() => {
    fetchGetConsultationById(id);
    console.log(consultation);
  }, [dispatch]);

  if (loading || !consultation.salesPerson) return <p>Loading...</p>;

  // return (
  //   <div className={styles.consultationDetailsContainer}>
  //     <header className={styles.consultationHeader}>
  //       <h2>Atendente responsável: {consultation.salesPerson.name}</h2>
  //       <h3>Data: {formats.formatDate(consultation.date)}</h3>
  //     </header>

  //     <div className={styles.consultationInfo}>
  //       <span>Quais segmentos de produtos o cliente estava buscando?</span>
  //       <div className={styles.productsList}>
  //         <ul>
  //           {consultation.productSegments.length > 0 &&
  //             consultation.productSegments.map((product) => (
  //               <li>{formats.formatOptions(product.segment)}</li>
  //             ))}
  //         </ul>
  //       </div>
  //     </div>

  //     <span>
  //       Lead viu algum tipo de anúncio/patrocínio?{" "}
  //       {consultation.seeAds ? "Sim" : "Não"}
  //     </span>
  //     <span>
  //       Se tornou cliente? {consultation.becameCustomer ? "Sim" : "Não"}
  //     </span>
  //     <span>Valor da compra: {consultation.valuePaid}</span>

  //     <span>
  //       Qual foi sua objeção?{" "}
  //       {formats.formatOptions(consultation.leadObjection)}
  //     </span>
  //   </div>
  // );
  return (
    <div className={styles.consultationDetailsContainer}>
      <header className={styles.consultationHeader}>
        <h2 className={styles.headerTitle}>
          Atendente responsável: {consultation.salesPerson.name}
        </h2>
        <h3 className={styles.headerDate}>
          Data: {formats.formatDate(consultation.date)}
        </h3>
      </header>

      <section className={styles.consultationInfo}>
        <h4>
          Quais segmentos de produtos {consultation.lead.name} estava buscando?
        </h4>
        <ul className={styles.productsList}>
          {consultation.productSegments.length > 0 ? (
            consultation.productSegments.map((product) => (
              <li key={product.segment}>
                {formats.formatOptions(product.segment)}
              </li>
            ))
          ) : (
            <li>Nenhum segmento de produto informado.</li>
          )}
        </ul>
      </section>

      <div className={styles.consultationLead}>
        <h4 className={styles.leadTitle}>Informações do Lead</h4>
        <div className={styles.leadDetails}>
          <p>
            <strong>Nome:</strong> {consultation.lead?.name || "Sem Nome"}
          </p>
          <p>
            <strong>WhatsApp:</strong>{" "}
            {consultation.lead?.whatsapp || "Sem WhatsApp"}
          </p>
        </div>
      </div>

      <section className={styles.consultationMetrics}>
        <div className={styles.metricItem}>
          <strong>Viu algum anúncio/patrocínio?</strong>
          <p>{consultation.seeAds ? "Sim" : "Não"}</p>
        </div>

        <div className={styles.metricItem}>
          <strong>Se tornou cliente?</strong>
          <p>{consultation.becameCustomer ? "Sim" : "Não"}</p>
        </div>

        <div className={styles.metricItem}>
          <strong>Valor da compra:</strong>
          <p>
            {consultation.valuePaid
              ? `R$ ${consultation.valuePaid}`
              : "Não comprou."}
          </p>
        </div>

        <div className={styles.metricItem}>
          <strong>Objeção do cliente:</strong>
          <p>{formats.formatOptions(consultation.leadObjection)}.</p>
        </div>
      </section>
    </div>
  );
};

export default ConsultationDetails;
