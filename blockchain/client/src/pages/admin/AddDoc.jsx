
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "../admin/Navbar";


const AddDoc = ({ state,account }) => {
    const [address,setAddress]=useState("");
    const [name,setName]=useState("");
    const [num,setNum]=useState("");

    const setDoc = async (event) => {
      
        event.preventDefault();
        const { contract } = state;
        
        console.log("abcdef");
        try{  
          const transaction = await contract.setDoctorDetails(true,address,num,name);
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
                        Add Doctor Details
                    </h1>
                    <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"90px"} }>
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={setDoc} style={{backgroundColor: "lightblue", width:"30%"}}>
                            <div className="mb-3">
                                <label className="form-label">Doctor address </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="address"
                                    placeholder="Enter Address"
                                    onChange={(e)=>setAddress(e.target.value)}
                                    value = {address}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Doctor Name </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="name"
                                    placeholder="Enter Patient Name"
                                    onChange={(e)=>setName(e.target.value)}
                                    value = {name}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Doctor phone number </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="num"
                                    placeholder="Enter Number"
                                    onChange={(e)=>setNum(e.target.value)}
                                    value = {num}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Doctor Qualification </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="qualification"
                                    placeholder="Enter Qualification"
                                />
                            </div><br></br>
                            <button
                                type="submit"
                                className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                disabled={!state.contract}
                            >
                                Add Doctor
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

export default AddDoc