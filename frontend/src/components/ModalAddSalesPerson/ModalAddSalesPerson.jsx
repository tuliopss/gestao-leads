import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import "./ModalAddSalesPerson.css";
import {
  registerSalesPerson,
  resetMessage,
} from "../../salespersons/slices/salesperson-slice";
import styles from "./ModalAddSalesPerson.module.css";
import Message from "../Message/Message";

const style = {
  color: "#000",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalAddSalesPerson() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialProduct = {
    _id: "",
    title: "",
    quantity: 1,
    price: 0,
  };
  const { error, message, success } = useSelector((state) => state.salesPerson);
  const [salesPerson, setSalesPerson] = useState({});

  const handleChange = (e) => {
    setSalesPerson({ ...salesPerson, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    dispatch(registerSalesPerson(salesPerson));
    console.log("error", error);
    console.log("sucesso", success);

    e.preventDefault();
  };
  useEffect(() => {
    if (success) {
      handleClose();
      dispatch(resetMessage());
    }
  }, [success, dispatch, handleClose]);

  return (
    <div>
      <Button variant='contained' color='success' onClick={handleOpen}>
        Registrar novo atendente
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className={styles.message_container}>
            {error && <Message msg={message} type='error' />}{" "}
            {message && !error && <Message msg={message} type='success' />}{" "}
          </div>

          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Insira as informações
          </Typography>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome do(a) atendente: </span>
              <input
                type='text'
                placeholder='Maria'
                name='name'
                onChange={handleChange}
                // required
                // value={title || ""}w
              />
            </label>

            <label>
              <span>Email: </span>
              <input
                type='email'
                name='email'
                placeholder='maria@email.com'
                // defaultValue={initialProduct.quantity}
                onChange={handleChange}
              />
            </label>

            <Button variant='contained' color='success' type='submit'>
              Cadastrar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
