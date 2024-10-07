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
import Continue from "./pages/AddConsultation/Continue";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/salesPersons' element={<SalesPersons />} />
        <Route path='/leads' element={<Leads />} />
        <Route path='/addConsultation' element={<AddConsultation />} />
        <Route path='/continue' element={<Continue />} />
      </Routes>
      <Container />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
