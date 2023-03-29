import abi from "./contracts/MedicalRecord.json";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import {ethers}  from "ethers";

import DoctorLogin from "./pages/doctor/DoctorLogin";
import AddDoc from "./pages/admin/AddDoc";
import SearchDoc from "./pages/admin/SearchDoc";

import HospitalLogin from "./pages/admin/HospitalLogin";
import Login from "./pages/Login";
import UserLogin from "./pages/user/UserLogin";
import MyDetailsDoc from "./pages/doctor/MydetailsDoc";
import PatientDetails from "./pages/doctor/PatientDetails";
import SetPatientDetails from "./pages/doctor/SetPatientDetails"
import MyDetails from "./pages/user/myDetails";
import SearchDoctor from "./pages/user/searchDoctor";

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
      const contractAddress = "0x3e4a3e6c3b446fD7a59c3dAdc2ba0db9a80Fec62";
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
        <Route path="/user" element={<UserLogin state={state} account={account}/>}/>

        <Route path="/hospital" element={<HospitalLogin state={state} account={account}/>}/>
        <Route path="/hospital/adddoc" element={<AddDoc state={state} account={account}/>}/>
        <Route path="hospital/searchdoc" element={<SearchDoc state={state} account={account}/> }/>

        <Route path="/doctor" element={<DoctorLogin state={state} account={account}/>}/>
        <Route path="/doctor/:id" element={<MyDetailsDoc state={state} account={account}/>}/>
        <Route path="/doctor/searchpatient" element={<PatientDetails state={state} account={account}/>}/>
        <Route path="/doctor/addpatient" element={<SetPatientDetails state={state} account={account}/>}/>
        <Route path="/user/myDetails" element={<MyDetails state={state} account={account}/>}/>
        <Route path="/user/searchDoctor" element={<SearchDoctor state={state} account={account}/>}/>
      
      
      </Routes>
    </div>
  );
}

export default App;