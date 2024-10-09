import styles from "./ConsultationCard.module.css";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// const ConsultationCard = ({ consultation }) => {
//   const formatDate = (date) => {
//     const newDate = new Date(date);

//     const day = newDate.getDate() + 1;
//     const month = newDate.getMonth() + 1;
//     const year = newDate.getFullYear();

//     const formattedDay = day < 10 ? "0" + day : day;
//     const formattedMonth = month < 10 ? "0" + month : month;

//     return `${formattedDay}/${formattedMonth}/${year}`;
//   };

//   return (
//     <div
//       className={
//         consultation.becameCustomer
//           ? `${styles.consultationCard} ${styles.sailed}`
//           : `${styles.consultationCard} ${styles.noSailed}`
//       }>
//       <div className={styles.consultationInfo}>
//         <p>Data do atendimento: {formatDate(consultation.date)}</p>
//         <p>Atendente: {consultation.salesPerson.name}</p>
//         {/* <p>Quantidade total: {product.quantity}</p> */}
//       </div>

//       <div className={styles.actions}>
//         {/* <DeleteIcon onClick={() => handleDelete(product._id)} />
//         <ModalEditProduct iconEdit={<EditIconComponent />} product={product} /> */}
//         Ver mais
//         <VisibilityIcon />
//       </div>
//     </div>

//   );
// };

// export default ConsultationCard;
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component='span'
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

const formatDate = (date) => {
  const newDate = new Date(date);

  const day = newDate.getDate() + 1;
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export default function BasicCard({ consultation }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
      // className={
      //   consultation.becameCustomer
      //     ? `${styles.sailed}`
      //     : `${styles.noSailed}`
      // }
      >
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 15 }}>
          Data do atendimento: {formatDate(consultation.date)}
        </Typography>
        <Typography variant='h7' component='div'>
          {/* Atendente: {consultation.salesPerson.name} */}
          Lead: {consultation.lead.name.split(" ")[0]} - WhatsApp:{" "}
          {consultation.lead.whatsapp}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5, fontSize: 14 }}>
          {/* Lead: {consultation.lead.name.split(" ")[0]} - WhatsApp:{" "}
          {consultation.lead.whatsapp} */}
          Atendente: {consultation.salesPerson.name}
        </Typography>
        <Typography variant='body2'>
          Venda fechada?{" "}
          {consultation.becameCustomer ? <span>Sim</span> : <span>Não</span>}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
