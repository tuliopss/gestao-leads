import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createConsultation } from "../../customer-services/slices/consultation-slice";
import SelectOne from "../../components/SelectOne/SelectOne";
import SelectSalesPerson from "../../components/SelectOne/SelectSalesPerson/SelectSalesPerson";

const Continue = () => {
  const { products } = useSelector((state) => state.product);

  const { leadId, error, message, success } = useSelector(
    (state) => state.lead
  );
  const [consultation, setConsultation] = useState({});
  const [isHidden, setIsHidden] = useState(false);

  const handleConsultationChange = (e) => {
    setConsultation({
      ...consultation,
      [e.target.name]: e.target.value,
      leadId: leadId,
    });
  };

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

  const handleSelectChange = (e) => {
    const selectedOptions = e.map((segment) => {
      return { productSegmentsId: segment.idProduct };
    });

    setConsultation({ ...consultation, productSegmentsId: selectedOptions });
    return selectedOptions;
  };

  const handleLeadObjectionChange = (option) => {
    setConsultation({ ...consultation, leadObjection: option });
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    console.log(leadId);
    dispatch(createConsultation(consultation));
  };

  useEffect(() => {
    console.log("LEAD", leadId);
  }, []);

  return (
    <div>
      <form
        style={{ display: isHidden ? "block" : "none" }}
        onSubmit={handleConsultationSubmit}>
        <Select
          closeMenuOnSelect={false}
          defaultValue={[products[4], products[5]]}
          isMulti
          options={options}
          onChange={handleSelectChange}
          name='idProduct'
        />
        <input type='hidden' name='leadId' value={leadId} />

        <input
          type='date'
          name='date'
          id=''
          onChange={handleConsultationChange}
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
            consultation.becameCustomer === "false"
              ? `${styles.hiddenField}`
              : ""
          }>
          <p>Comprou algum produto?</p>
          <span>Valor da compra</span>

          <input
            type='number'
            name='valuePaid'
            onChange={handleConsultationChange}
          />
        </label>

        <SelectOne handleLeadObjectionChange={handleLeadObjectionChange} />

        <SelectSalesPerson handleSalesPersonChange={handleSalesPersonChange} />
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

export default Continue;
