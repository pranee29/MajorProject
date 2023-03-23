import Navbar from "./Navbar";
import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../Login"
import MyDetailsDoc from "./MydetailsDoc";


const SetPatientDetails = ({ state }) => {


    const [account, setTransaction] = useState([]);

    return(
        <>
            <div className="w-46 fixed left-0 top-0 h-screen bg-slate-700 p-10">
                <h1>side</h1>
            {/* <button className="text-white" type="submit" onSubmit={changeVal}> Add Patient </button>
            <button className="text-white" type="submit" onSubmit={changeVal}> Get Patient </button> */}
      {/* <nav>
        <Link to={"/"}>Home</Link><br></br>
        
        
        <Link to={`/doctor/${account[0]}`} >
            My Details
        </Link><br></br>
        
        <Link to={"/doctor/addpatient"} >
            Set Patient Details
        </Link><br></br>
        
        <Link to={"/doctor/searchpatient"} >
            Search Patient
        </Link><br></br>

      </nav> */}
    </div>
        </>
    );

}

export default SetPatientDetails