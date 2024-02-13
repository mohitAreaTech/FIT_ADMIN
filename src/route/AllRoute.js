import React from "react";
import { Routes, Route } from "react-router-dom";
// Auth
import Login from "../components/Auth/Login";
// Dashboard
import Dashboard from "../components/Pages/Dashboard/Dashboard";

// Auth
import CheckAuth from "./CheckAuth";
import Employee from "../components/Pages/Employee/Employee";
import AddEmployee from "../components/Pages/Employee/AddEmployee";
// import EditEmployee from '../components/Pages/Employee/EditEmployee'
import EmployeeDetails from "../components/Pages/Employee/EmployeeDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActiveEmployee from "../components/Pages/Employee/ActiveEmployee";
import DeactivatedEmployee from "../components/Pages/Employee/DeactivatedEmployee";
import EditEmployee from "../components/Pages/Employee/EditEmployee";
// POS
import AllPOS from "../components/Pages/POS/AllPOS";
import PosDetails from "../components/Pages/POS/PosDetails";
import AddPos from "../components/Pages/POS/AddPos";
import EditPos from "../components/Pages/POS/EditPos";
import Designations from "../components/Pages/Management/Designations";
import Roles from "../components/Pages/Management/Roles";
import Mis from "../components/Pages/Mis/mis";
import Department from "../components/Pages/Management/Department";
import PendingLeads from "../components/Pages/Mis/pendingLeads";
import MyPool from "../components/Pages/Mis/myPool";
import MisDetails from "../components/Pages/Mis/misDetails";
import EditLead from "../components/Pages/Mis/editLead";
import TotalBooked from "../components/Pages/Mis/totalBooked";

const AllRoute = () => {
  const randomGen = () => {
    return Math.floor(Math.random() * 1000000);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<CheckAuth />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Employee Route */}
          <Route path="/employee" element={<Employee />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/active-employee" element={<ActiveEmployee />} />
          <Route
            path="/deactivated-employee"
            element={<DeactivatedEmployee />}
          />
          <Route path="/edit-employee" element={<EditEmployee />} />
          <Route path="/employee-details" element={<EmployeeDetails />} />

          {/* Utility Routes */}
          <Route path="/designations" element={<Designations />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/department" element={<Department />} />

          {/* MIS Routes */}
          <Route path="/mis" element={<Mis />} />
          <Route path="/pending-leads" element={<PendingLeads />} />
          <Route path="/my-pool" element={<MyPool />} />
          <Route path="/mis-details" element={<MisDetails />} />
          <Route path="/edit-lead" element={<EditLead />} />
          <Route path="/total-booked" element={<TotalBooked />} />
          {/* POS */}
          <Route path="/all-pos" key={randomGen()} element={<AllPOS />} />
          <Route
            path="/pos-underTraining"
            key={randomGen()}
            element={<AllPOS />}
          />
          {/* <Route path="/pos-accepted" key={randomGen()} element={<AllPOS />} /> */}
          <Route path="/pos-rejected" key={randomGen()} element={<AllPOS />} />
          <Route
            path="/pos-incomplete"
            key={randomGen()}
            element={<AllPOS />}
          />
          <Route path="/pos-certified" key={randomGen()} element={<AllPOS />} />
          <Route path="/new-pos" key={randomGen()} element={<AllPOS />} />
          {/* <Route path="/add-pos" element={<AddPos />} /> */}
          <Route path="/add-pos" element={<AddPos />} />
          <Route path="/pos-details" element={<PosDetails />} />
          <Route path="/edit-pos" element={<EditPos />} />
          {/* <Route path="/pos-certificate" element={<PosCertificate />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default AllRoute;
