import { Button } from "@mui/material";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import styles from "./Roulette.module.css";
import ModalAward from "../ModalAward/ModalAward";

const data = [
  { option: "CASHBACK", number: 0 },
  { option: "DESCONTOS", number: 1 },
  { option: "BRINDES", number: 2 },
  { option: "VOUCHER", number: 3 },
  { option: "COMPRE1LEVE2", number: 4 },
  { option: "ENTREGA", number: 5 },
];

const backgroundColors = [
  "red", // Vermelho
  "orange", // Laranja
  "yellow", // Amarelo
  "green", // Verde
  "blue", // Azul
  "cyan", // Ciano
];

const Roulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [award, setAward] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);

      setAward(data[newPrizeNumber]);
      setMustSpin(true);
    }
  };

  return (
    <div className={styles.rouletteContainer}>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={backgroundColors}
        onStopSpinning={() => {
          setMustSpin(false);

          handleOpen();
          setTimeout(() => handleClose(), 5000);
          console.log(award);
        }}
      />
      {open && <ModalAward award={award.option} open={open} />}
      {/* <ModalAward award={award} /> */}
      <Button
        style={{ backgroundColor: "#ff5b00", color: "#fff" }}
        onClick={handleSpinClick}>
        Girar!
      </Button>
    </div>
  );
};

export default Roulette;
