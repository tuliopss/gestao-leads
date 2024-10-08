import {
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesPersons } from "../../../salespersons/slices/salesperson-slice";
import styles from "../Select.module.css";
const SelectSalesPerson = ({ handleSalesPersonChange }) => {
  const { salesPersons } = useSelector((state) => state.salesPerson);
  const dispatch = useDispatch();
  // console.log("SALES", salesPersons[0].id);
  useEffect(() => {
    dispatch(getAllSalesPersons());
  }, [dispatch]);

  //   const options = [
  //     "INDECISO",
  //     "PRODUTO_EM_FALTA",
  //     "NAO_RESPONDEU",
  //     "NENHUMA",
  //     "PRECO",
  //   ];

  // const [option, setOption] = useState([]);

  const formatOptions = (option) => {
    if (option && option.length > 0) {
      let formmated = option.replace(/_/g, " ");

      const firstLetter = formmated[0];
      const formattedName = formmated.toLowerCase().slice(1, formmated.length);

      return firstLetter + formattedName;
    }

    return "";
  };

  const handleChange = (e) => {
    const selectedOption = e.target.value || salesPersons[0];
    // console.log("SALESPERSON: ", selectedOption);
    handleSalesPersonChange(selectedOption);
  };

  return (
    <div>
      <FormControl fullWidth onChange={handleChange}>
        <Typography variant='standard' htmlFor='uncontrolled-native'>
          Atendentes
        </Typography>
        <NativeSelect
          className={styles.select}
          // defaultValue={salesPersons}
          // value={salesPersons[0].id}
          inputProps={{
            name: "salesPersonId",
            id: "uncontrolled-native",
          }}>
          <option value='placeholder'>Selecione um vendedor</option>{" "}
          {/* Placeholder */}
          {salesPersons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default SelectSalesPerson;
