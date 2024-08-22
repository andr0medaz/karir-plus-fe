import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddData = () => {
  const [name, setName] = useState("");
  const [tanggal_masuk, setTanggalMasuk] = useState("");
  const [pangkat, setPangkat] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [academic_background, setAcademicBackground] = useState("");
  const [nomor_telepon, setNomorTelepon] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employee/create", {
        name,
        tanggal_masuk,
        pangkat,
        jabatan,
        academic_background,
        nomor_telepon,
      });
      setSuccessMessage("Data successfully Added!");
      setTimeout(() => {
        setSuccessMessage(""); // Clear the message after a few seconds
        navigate("/dashboard"); // Redirect after showing the message
      }, 3000);
    } catch (error) {
      console.log("Error create data silahkan check backend");
    }
  };

  return (
    <div className="mt-5 columns is-centered">
      <div className="column is-half">
        {successMessage && <div className="p-4 mb-4 text-white bg-green-500 rounded">{successMessage}</div>}
        <form onSubmit={createUser}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Name</label>
            <div className="control">
              <input type="text" className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Tanggal Masuk</label>
            <div className="control">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tanggal_masuk}
                onChange={(e) => setTanggalMasuk(e.target.value)}
                placeholder="yyyy-mm-dd"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Pangkat</label>
            <div className="control">
              <input type="text" className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={pangkat} onChange={(e) => setPangkat(e.target.value)} placeholder="Pangkat" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Jabatan</label>
            <div className="control">
              <input type="text" className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={jabatan} onChange={(e) => setJabatan(e.target.value)} placeholder="Jabatan" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Academic Background</label>
            <div className="control">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={academic_background}
                onChange={(e) => setAcademicBackground(e.target.value)}
                placeholder="Academic Background"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Nomor Telepon</label>
            <div className="control">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nomor_telepon}
                onChange={(e) => setNomorTelepon(e.target.value)}
                placeholder="Nomor Telepon"
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddData;
