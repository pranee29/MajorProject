
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "../admin/Navbar";
import Snackbar from '@mui/material/Snackbar';

const AddDoc = ({ state,account }) => {
    const [address,setAddress]=useState("");
    const [name,setName]=useState("");
    const [num,setNum]=useState("");
    const [qual,setQual]=useState("");
    const [hosp,setHosp]=useState("");
    const [open, setOpen] = useState(false);
    
    
    const setDoc = async (event) => {
        
        event.preventDefault();
        setOpen(true);
        const { contract } = state;
        
        console.log("abcdef");
        try{  
            console.log(address +" add of doctor")
          const transaction = await contract.setDoctorDetails(true,address,num,name,qual,hosp);
          console.log(transaction);
          await transaction.wait();
          console.log(transaction);
        }
        catch(error){
          alert(error);
        }
        setOpen(false);
        alert("Done");
    };


    
    return(
        <>
            <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }>
                <aside>
                    <Navbar/>
                </aside>   
                
                <main className="flex-1 ml-44">
                    <h1>
                        Add Doctor Details
                    </h1>
                    <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"90px"} }>
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={setDoc} style={{backgroundColor: "white", width:"30%"}}>
                            <div className="mb-3">
                                <label className="form-label" >Doctor address </label>
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
                                <label className="form-label"> Name </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="name"
                                    placeholder="Enter Doctor Name"
                                    onChange={(e)=>setName(e.target.value)}
                                    value = {name}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> Phone number </label>
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
                                <label className="form-label"> Qualification </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="qual"
                                    placeholder="Enter Doctor Qualification"
                                    onChange={(e)=>setQual(e.target.value)}
                                    value = {qual}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> Hospital Name </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="name"
                                    placeholder="Enter Hospital Name"
                                    onChange={(e)=>setHosp(e.target.value)}
                                    value = {hosp}
                                />
                            </div><br></br>
                            <button
                                type="submit"
                                className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                disabled={!state.contract}
                            >
                                Add Doctor
                            </button> <br></br>
                            <Snackbar
                                open={open}
                                message="Processing"
                            />
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