import { useState } from "react";

import "./App.css";
import Container from "./components/Container/Container";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SalesPersons from "./pages/SalesPersons/SalesPersons";
import Leads from "./pages/Leads/Leads";
import AddConsultation from "./pages/AddConsultation/AddConsultation";
import Message from "./components/Message/Message";
import Roulette from "./components/Roulette/Roulette";
import ConsultationDetails from "./pages/ConsultationDetails/ConsultationDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/salesPersons' element={<SalesPersons />} />
        <Route path='/leads' element={<Leads />} />
        <Route path='/addConsultation' element={<AddConsultation />} />
        <Route path='/roulette' element={<Roulette />} />
        <Route path='/consultation/:id' element={<ConsultationDetails />} />
        <Route path='*' element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <Container />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
