import styles from "./ConsultationCard.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
const ConsultationCard = ({ consultation }) => {
  const formatDate = (date) => {
    const newDate = new Date(date);

    const day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    const month =
      newDate.getMonth() < 10 ? "0" + newDate.getMonth() : newDate.getMonth();
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
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
