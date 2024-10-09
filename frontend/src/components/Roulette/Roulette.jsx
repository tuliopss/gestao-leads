import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "CASHBACK", number: 0 },
  { option: "DESCONTOS", number: 1 },
  { option: "BRINDES", number: 2 },
  { option: "VOUCHER", number: 3 },
  { option: "COMPRE1LEVE2", number: 4 },
  { option: "ENTREGA", number: 5 },
];

const Roulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [award, setAward] = useState("");
  //   CASHBACK
  //   DESCONTOS
  //   BRINDES
  //   VOUCHER
  //   COMPRE1_LEVE2
  //   ENTREGA
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);

      setAward(data[newPrizeNumber]);
      setMustSpin(true);
      console.log(award);
    }
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  );
};

export default Roulette;
