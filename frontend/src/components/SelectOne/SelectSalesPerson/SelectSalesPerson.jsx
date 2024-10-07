import {
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesPersons } from "../../../salespersons/slices/salesperson-slice";

const SelectSalesPerson = ({ handleSalesPersonChange }) => {
  const { salesPersons } = useSelector((state) => state.salesPerson);
  const dispatch = useDispatch();

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
    const selectedOption = e.target.value;
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
          defaultValue={30}
          inputProps={{
            name: "salesPersonId",
            id: "uncontrolled-native",
          }}>
          {salesPersons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
          {/* {options.map((option, index) => (
            <option key={index} value={option}>
              {formatOptions(option)}
            </option>
          ))} */}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default SelectSalesPerson;
