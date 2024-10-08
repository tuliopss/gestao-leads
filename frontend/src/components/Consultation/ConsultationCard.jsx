import styles from "./ConsultationCard.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
const ConsultationCard = ({ consultation }) => {
  const formatDate = (date) => {
    const newDate = new Date(date);

    const day = newDate.getDate() + 1;
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <div
      className={
        consultation.becameCustomer
          ? `${styles.consultationCard} ${styles.sailed}`
          : `${styles.consultationCard} ${styles.noSailed}`
      }>
      <div className={styles.consultationInfo}>
        <p>Data do atendimento: {formatDate(consultation.date)}</p>
        <p>Atendente: {consultation.salesPerson.name}</p>
        {/* <p>Quantidade total: {product.quantity}</p> */}
      </div>

      <div className={styles.actions}>
        {/* <DeleteIcon onClick={() => handleDelete(product._id)} />
        <ModalEditProduct iconEdit={<EditIconComponent />} product={product} /> */}
        Ver mais
        <VisibilityIcon />
      </div>
    </div>
  );
};

export default ConsultationCard;
