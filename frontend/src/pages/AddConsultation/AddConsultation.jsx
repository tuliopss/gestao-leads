import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./AddConsultation.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../products/slices/products-slice";
import { replace } from "react-router-dom";
import { createLead } from "../../leads/slices/leads-slice";
// import { colourOptions } from "../data";

const AddConsultation = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { error, message, success } = useSelector((state) => state.lead);
  const [isHidden, setIsHidden] = useState(false);
  const [lead, setLead] = useState({});

  const handleLeadChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const animatedComponents = makeAnimated();

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
          value: product.segment,
          label: formatOptions(product),
        };
      } else return null;
    })
    .filter((option) => option !== null);

  const handleLeadSubmit = (e) => {
    dispatch(createLead(lead));

    if (success) {
      setIsHidden(true);
    }

    e.preventDefault();
  };
  useEffect(() => {
    if (success) {
      setIsHidden(true); // Esconde o formulário quando o lead for registrado com sucesso
    }
  }, [success]); // O useEffect será chamado sempre que o valor de success mudar

  return (
    <div className={styles.formConsultationContainer}>
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

      <form style={{ display: isHidden ? "block" : "none" }}>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[products[4], products[5]]}
          isMulti
          options={options}
        />

        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'>
          <h3>Viu algum tipo de anúncio?</h3>
          <FormControlLabel value={true} control={<Radio />} label='Sim' />
          <FormControlLabel value={false} control={<Radio />} label='Não' />
        </RadioGroup>

        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'>
          <h3>Se tornou cliente?</h3>
          <FormControlLabel value={true} control={<Radio />} label='Sim' />
          <FormControlLabel value={false} control={<Radio />} label='Não' />
        </RadioGroup>

        <label>
          <p>Comprou algum produto?</p>
          <span>Valor da compra</span>
          <input type='number' name='valuePaid' />
        </label>

        <Button
          variant='contained'
          style={{ backgroundColor: "#ff5b00" }}
          type='submit'>
          Finalizar
        </Button>
      </form>
    </div>
  );
};

export default AddConsultation;
