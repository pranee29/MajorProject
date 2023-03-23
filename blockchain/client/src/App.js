import abi from "./contracts/chai.json";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import {ethers}  from "ethers";

import DoctorLogin from "./pages/doctor/DoctorLogin";
import MyDetailsDoc from "./pages/doctor/MydetailsDoc";
import HospitalLogin from "./pages/admin/HospitalLogin";
import Login from "./pages/Login";
import UserLogin from "./pages/patient/UserLogin";
import PatientDetails from "./pages/doctor/PatientDetails";
import SetPatientDetails from "./pages/doctor/SetPatientDetails"

//const ethers = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    account:null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x72DD5C83aF6cbAf13C3cf16e7779FCE11B2288b2";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          console.log(account);
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
            account
          );
          setAccount(account);
          setState({ provider, signer, contract,account});
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log(state);
    connectWallet();
  }, []);
  console.log(state);
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/user" element={<UserLogin state={state}/>}/>
        <Route path="/hospital" element={<HospitalLogin state={state}/>}/>

        <Route path="/doctor" element={<DoctorLogin state={state}/>}/>
        <Route path="/doctor/:id" element={<MyDetailsDoc state={state}/>}/>
        <Route path="/doctor/searchpatient" element={<PatientDetails state={state}/>}/>
        <Route path="/doctor/addpatient" element={<SetPatientDetails state={state}/>}/>
      
      
      </Routes>
    </div>
  );
}

export default App;