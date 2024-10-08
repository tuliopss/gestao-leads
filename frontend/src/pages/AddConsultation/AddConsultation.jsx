import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./AddConsultation.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../products/slices/products-slice";
import { redirect, replace } from "react-router-dom";
import { createLead } from "../../leads/slices/leads-slice";
import SelectOne from "../../components/SelectOne/SelectOne";
import {
  createConsultation,
  resetMessage,
} from "../../customer-services/slices/consultation-slice";
import SelectSalesPerson from "../../components/SelectOne/SelectSalesPerson/SelectSalesPerson";
import Message from "../../components/Message/Message";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

const AddConsultation = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { message, error, success } = useSelector((state) => state.message); // Seleciona a mensagem global
  const { lead } = useSelector((state) => state.lead);

  const [isHidden, setIsHidden] = useState(false);
  const [localLead, setLocalLead] = useState({ name: "", whatsapp: "" });
  const [consultation, setConsultation] = useState({});
  const [date, setDate] = useState("");
  const [valuePaid, setValuePaid] = useState(0);

  const animatedComponents = makeAnimated();
  const resetComponentMessage = useResetComponentMessage(dispatch);

  console.log("SUCCESS", success);
  console.log("error", error);
  const handleLeadChange = (e) => {
    setLocalLead({ ...localLead, [e.target.name]: e.target.value });
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();

    dispatch(createLead(localLead));
  };

  const handleConsultationChange = (e) => {
    const value =
      e.target.value === "true"
        ? true
        : e.target.value === "false"
        ? false
        : e.target.value;

    setConsultation((prev) => ({
      ...prev,
      date: date,
      seeAds: value,
      becameCustomer: value,
      leadId: lead.id,
      valuePaid:
        e.target.name === "becameCustomer" && value === false
          ? 0
          : prev.valuePaid,
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    // const selectedOptions = e.map((segment) => {
    //   console.log("PRODUTO", segment.idProduct);
    //   return { productSegmentsId: segment.idProduct };
    // });

    // setConsultation({ ...consultation, productSegmentsId: selectedOptions });
    // return selectedOptions;
    const selectedIds = selectedOptions.map((segment) => {
      console.log("PRODUTO", segment.idProduct); // Certifique-se de que idProduct é um UUID válido
      return segment.idProduct; // Retornando o valor direto
    });

    setConsultation({
      ...consultation,
      productSegmentsId: selectedIds, // Agora você está passando um array de UUIDs
    });
  };

  const handleSalesPersonChange = (person) => {
    setConsultation({ ...consultation, salesPersonId: person });
  };

  const handleLeadObjectionChange = (option) => {
    setConsultation({ ...consultation, leadObjection: option });
  };

  const handleValuePaidChange = (e) => {
    const paidValue = Number(e.target.value); // Converta o valor para número
    setValuePaid(paidValue);

    setConsultation((prev) => ({
      ...prev,
      valuePaid: paidValue, // Atualiza o valor de valuePaid no estado consultation
    }));
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();

    dispatch(createConsultation(consultation));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(resetMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (message) {
      resetComponentMessage();
    }
  }, [message, resetComponentMessage]);

  const formatOptions = (product) => {
    if (product.segment && product.segment.length > 0) {
      let formmatedSegment = product.segment.replace(/_/g, " ");

      const firstLetter = formmatedSegment[0];
      const formattedName = formmatedSegment
        .toLowerCase()
        .slice(1, formmatedSegment.length);

      return firstLetter + formattedName;
    }

    return "";
  };

  const options = products
    .map((product) => {
      if (product.segment) {
        return {
          idProduct: product.id,
          value: product.segment,
          label: formatOptions(product),
        };
      } else return null;
    })
    .filter((option) => option !== null);

  useEffect(() => {
    if (success) {
      setIsHidden(true);
    }
  }, [success]);

  return (
    <div className={styles.formConsultationContainer}>
      {error && <Message msg={message} type='error' />}
      {message && !error && success && <Message msg={message} type='success' />}

      <form
        onSubmit={handleLeadSubmit}
        style={{ display: !isHidden ? "block" : "none" }}
        className={styles.formConsultation}>
        <h2>Informe os dados de atendimento</h2>
        <label>
          <span>Seu nome: </span>
          <input
            type='text'
            placeholder='Digite seu nome...'
            name='name'
            onChange={handleLeadChange}
            // required
            // value={title || ""}w
          />
        </label>

        <label>
          <span>WhatsApp: </span>
          <input
            type='text'
            name='whatsapp'
            placeholder='Digite seu WhatsApp'
            onChange={handleLeadChange}
            // defaultValue={initialProduct.quantity}
            // onChange={handleChange}
          />
        </label>

        <Button
          variant='contained'
          style={{ backgroundColor: "#ff5b00" }}
          type='submit'>
          Enviar
        </Button>
      </form>

      {
        <form
          className={styles.formConsultationInfo}
          style={{ display: isHidden ? "block" : "none" }}
          onSubmit={handleConsultationSubmit}>
          <Typography variant='standard' htmlFor='uncontrolled-native'>
            Quais produtos o cliente está buscando?
          </Typography>
          <Select
            className={styles.select}
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[products[4], products[5]]}
            isMulti
            options={options}
            onChange={handleSelectChange}
            name='idProduct'
          />

          <h3>Data:</h3>
          <input
            type='date'
            name='date'
            id=''
            onChange={(e) => setDate(e.target.value)}
          />

          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='seeAds'>
            <h3>Viu algum tipo de anúncio?</h3>
            <FormControlLabel
              value={true}
              control={<Radio />}
              label='Sim'
              onChange={handleConsultationChange}
            />

            <FormControlLabel
              value={false}
              control={<Radio />}
              label='Não'
              onChange={handleConsultationChange}
            />
          </RadioGroup>

          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='becameCustomer'>
            <h3>Se tornou cliente?</h3>
            <FormControlLabel
              value={true}
              control={<Radio />}
              label='Sim'
              onChange={handleConsultationChange}
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label='Não'
              onChange={handleConsultationChange}
            />
          </RadioGroup>

          <label
            className={
              consultation.becameCustomer === false
                ? `${styles.hiddenField}`
                : ""
            }>
            <span>Valor da compra</span>

            <input
              type='number'
              value={valuePaid}
              name='valuePaid'
              onChange={handleValuePaidChange}
            />
          </label>

          <SelectOne handleLeadObjectionChange={handleLeadObjectionChange} />
          <SelectSalesPerson
            handleSalesPersonChange={handleSalesPersonChange}
          />
          <Button
            variant='contained'
            style={{ backgroundColor: "#ff5b00" }}
            type='submit'>
            Finalizar
          </Button>
        </form>
      }
    </div>
  );
};

export default AddConsultation;
