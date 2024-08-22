import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import DetailEmployee from "./components/Cards/DetailEmployee.jsx";
import EditData from "./components/Input/EditData.jsx";
import AddData from "./components/Input/AddData.jsx";

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/employe/detail/:nik" exact element={<DetailEmployee />} />
      <Route path="/employee/edit/:nik" exact element={<EditData />} />
      <Route path="/employee/create" exact element={<AddData/>} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
