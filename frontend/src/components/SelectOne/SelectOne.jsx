import {
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Select.module.css";
const SelectOne = ({ handleLeadObjectionChange }) => {
  const objections = [
    "INDECISO",
    "PRODUTO_EM_FALTA",
    "NAO_RESPONDEU",
    "NENHUMA",
    "PRECO",
  ];

  const [selectedOption, setSelectedOption] = useState(objections[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    handleLeadObjectionChange(selectedOption); // Chama a função passada pelo pai com o valor selecionado
  };

  useEffect(() => {
    console.log("OBJECAO", selectedOption);
  }, []);

  const formatOptions = (option) => {
    if (option && option.length > 0) {
      let formmated = option.replace(/_/g, " ");

      const firstLetter = formmated[0];
      const formattedName = formmated.toLowerCase().slice(1, formmated.length);

      return firstLetter + formattedName;
    }

    return "";
  };
  return (
    <div>
      <FormControl fullWidth onChange={handleChange}>
        <Typography variant='standard' htmlFor='uncontrolled-native'>
          Objeção?
        </Typography>
        <NativeSelect
          className={styles.select}
          defaultValue={objections[0]}
          inputProps={{
            name: "leadObjection",
            id: "uncontrolled-native",
          }}>
          {objections.map((option, index) => (
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
