import Navbar from "./Navbar";
import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../Login"
import MyDetailsDoc from "./MydetailsDoc";


const SetPatientDetails = ({ state }) => {



    const [account, setTransaction] = useState([]);

    const setHealthRecordsDetails = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const address = document.querySelector("#address").value;
        const name = document.querySelector("#name").value;
        const prescription = document.querySelector("#prescription").value+" ,";
        try{
          const transaction = await contract.setHealthRecordsDetails(name,address,prescription);
          await transaction.wait();
          alert("Done");  
        }
        catch(error){
          alert(error);
        } 
      };


    return(
        <>
            <div  style={ { textAlign:"center", backgroundColor: "azure"} }>
                <aside>
                    <Navbar/>
                </aside>   
                <main className="flex-1 ml-44">
                    <h1>
                        Add Patient Details
                    </h1>
                    <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"90px"} }>
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={setHealthRecordsDetails} style={{backgroundColor: "lightblue", width:"30%"}}>
                            <div>
                                Add Patient Details
                            </div><br></br>
                            <div className="mb-3">
                                <label className="form-label">Patient address </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="address"
                                    placeholder="Enter Address"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Patient Name </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="name"
                                    placeholder="Enter Patient Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Patient Prescription </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="prescription"
                                    placeholder="Enter Prescription"
                                />
                            </div><br></br>
                            <button
                                type="submit"
                                className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                disabled={!state.contract}
                            >
                                Add Patient
                            </button> <br></br>
                        </form>
                        <br></br>
                        <br></br>
                    </div>
                </main>
            </div>
        </>
    );

}

export default SetPatientDetails