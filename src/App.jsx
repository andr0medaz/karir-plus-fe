import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import UserList from "./components/UserList/UserList.jsx";
import DetailEmployee from "./components/Cards/DetailEmployee.jsx";
import EditData from "./components/Input/EditData.jsx";
import AddData from "./components/Input/AddData.jsx";

const routes = (
  <Router>
    <Routes>
      <Route path="/test" element={<UserList />} />
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/detail/:nik" exact element={<DetailEmployee />} />
      <Route path="/api/employee/update/:nik" exact element={<EditData />} />
      <Route path="/employee/create" exact element={<AddData/>} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
