import {
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const SelectOne = ({ handleLeadObjectionChange }) => {
  const options = [
    "INDECISO",
    "PRODUTO_EM_FALTA",
    "NAO_RESPONDEU",
    "NENHUMA",
    "PRECO",
  ];

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
    handleLeadObjectionChange(selectedOption); // Chama a função passada pelo pai com o valor selecionado
  };

  return (
    <div>
      <FormControl fullWidth onChange={handleChange}>
        <Typography variant='standard' htmlFor='uncontrolled-native'>
          Objeção?
        </Typography>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: "leadObjection",
            id: "uncontrolled-native",
          }}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {formatOptions(option)}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default SelectOne;
