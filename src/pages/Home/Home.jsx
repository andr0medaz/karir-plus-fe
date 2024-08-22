import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import UserList from "../../components/UserList/UserList";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <UserList />
      </div>

      <Link to={`/employee/create`} className="absolute flex items-center justify-center w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10">
        <MdAdd className="text-[32px] text-white" />
      </Link>
    </>
  );
};

export default Home;
