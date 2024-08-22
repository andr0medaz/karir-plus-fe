import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import DetailEmployee from "../Cards/DetailEmployee";
import { MdMoreHoriz } from "react-icons/md";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  // untuk modal
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getUsers();
  }, [page, keyword]);

  // untuk delete data
  const deleteData = async (nik) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/delete/${nik}`);
      getUsers();
      setOpen(false);
      setSuccessMessage("Delete Successful!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.log("error delete data silahkan check backend");
    }
  };

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:5000/api/get-employee-v2?search_query=${keyword}&page=${page}&limit=${limit}`);
    console.log("Fetched data for page:", page, response.data);
    setUsers(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 2) {
      setMsg("Jika tidak menemukan data yang anda cari, silahkan cari data dnegna kata kunci yang spesifik!");
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="columns">
        <div className="column is-centered">
          {/* Pop Up Success delete */}
          {successMessage && <div className="p-4 mb-4 text-white bg-green-500 rounded">{successMessage}</div>}
          <form onSubmit={searchData}>
            <div className="flex items-center justify-center mb-9">
              <div className="flex items-center px-4 rounded-md w-80 bg-slate-100">
                <input type="text" className="w-full text-xs bg-transparent py-[11px] outline-none" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search NIK/Nama.." />

                <div className="control">
                  <button type="submit" className="button is-info">
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </form>
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">NIK</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Tanggal Masuk</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Pangkat</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Jabatan</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Lulusan</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Hari Kenaikan</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Tanggal Kenaikan</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.nik} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-left text-gray-700">{user.nik}</td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">{user.tanggal_masuk}</td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">{user.pangkat}</td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">{user.jabatan}</td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">{user.academic_background}</td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">{user.daysToNextPromotion}</td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">{user.nextPromotionDate }</td>
                  <td className="px-6 py-4 text-sm text-left text-gray-700">
                    <td>
                      <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => setOpen(true)}>
                        <MdMoreHoriz />
                      </button>
                      {/* Untuk Pop Up Modal */}
                      <DetailEmployee open={open} onClose={() => setOpen(false)}>
                        <div className="w-56 text-center">
                          <MdMoreHoriz size={36} className="mx-auto" />
                          <div className="w-48 mx-auto my-4">
                            <h3 className="text-lg font-black text-gray-800">Edit/Delete</h3>
                            <p className="text-sm text-gray-500">pilih aksi yang diinginkan</p>
                          </div>
                          <div className="flex gap-4">
                            <Link to={`/employee/edit/${user.nik}`} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 btn">
                              Edit
                            </Link>
                            <button onClick={() => deleteData(user.nik)} className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-800 btn">
                              Delete
                            </button>
                            {/* <button className="w-full px-4 py-2 border-4 border-solid rounded border-sky-500" onClick={() => setOpen(false)}>
                              Cancel
                            </button> */}
                          </div>
                        </div>
                      </DetailEmployee>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
          </p>
          <p className="has-text-centered has-text-danger">{msg}</p>
          <nav className="flex justify-center max-w-screen-md mx-auto gap-x-4" key={rows} role="navigation" aria-label="pagination">
            <ReactPaginate
              previousLabel={"< Prev"}
              nextLabel={"Next >"}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName="flex justify-center"
              pageLinkClassName="text-gray-700 hover:text-blue-500 cursor-pointer"
              previousLinkClassName="text-gray-800 font-bold"
              activeLinkClassName="bg-blue-500 text-white font-bold"
              disabledLinkClassName="text-gray-400 cursor-not-allowed"
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserList;
