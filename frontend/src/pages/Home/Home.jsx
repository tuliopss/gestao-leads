import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads } from "../../leads/slices/leads-slice";

const Home = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.lead);

  useEffect(() => {
    console.log("dispatch");
    dispatch(getAllLeads());
    getAllLeads();
  }, [dispatch]);

  return (
    <div>
      Atendimentos:
      <h2>leads:</h2>
      {console.log("a", leads)}
    </div>
  );
};

export default Home;
