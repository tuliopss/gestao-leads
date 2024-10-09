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

  const handleChange = (e) => {
    const selectedOption = e.target.value || objections[0];
    handleLeadObjectionChange(selectedOption);
  };

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
