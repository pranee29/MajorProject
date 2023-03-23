import React from "react";
import { Link } from "react-router-dom";


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";


const PatientDetails = ({ state }) => {
   
    
    const [transaction, setTransaction] = useState([]);
    
    const [data, setData]=useState([]);

    const getPatient= async (event) =>{
        event.preventDefault();
        console.log("Clicked");
        const { contract } = state;
        const address1 = document.querySelector("#address1").value;
        try{
          console.log("Clicked");
          const transaction =await contract.getPatientDetails(address1);
          console.log("Clicked");
          setTransaction(transaction);      
        }
        catch(error){
          alert(error);
        }
    }

    const getPatientByName=async(event)=>{
        event.preventDefault();
        console.log("Clicked");
        const { contract } = state;
        const name = document.querySelector("#name").value;
        try{
          console.log("Clicked");
          const data =await contract.getPatientDetails(name);
          console.log("Clicked");
          setTransaction(data);      
        }
        catch(error){
          alert(error);
        }
    }
    


    return (
        <>

            
            <div  style={ { textAlign:"center", backgroundColor: "azure"} }>
                <aside>
                    <Navbar/>
                </aside>   
                <main className="flex-1 ml-44">
                        <div>
                            Patient Details
                        </div>
                        <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"70px"} }>
                            <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatient} style={{backgroundColor: "lightblue", width:"30%"}} >
                                <h1>Patient Details </h1><br></br>
                                <div className="mb-3">
                                    <label className="form-label">Get Patient Details by address  </label>
                                    <input
                                        type="text"
                                        className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                        id="address1"
                                        placeholder="Enter Address"
                                    />
                                </div><br></br>
                                <button
                                    type="submit"
                                    className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                    disabled={!state.contract}
                                >
                                    Get Patient Details
                                </button>
                                <div style={{ marginTop:"30px"}}>
                                    <div>
                                        <p style={{textAlign: "center"}}>Patient Detials</p>
                                        <div style={{textAlign:"start", marginTop:"10px"}}>Patient Address :   </div>
                                        <div style={{textAlign:"start"}}>Patient Name    :  </div>
                                        <div style={{textAlign:"start"}}>Prescription    :  </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <br></br>
                        <br></br>

                        <div className="flex justify-evenly">
                            <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatientByName} style={{backgroundColor: "lightblue", width:"30%"}} >
                                <h1>Patient Details </h1><br></br>
                                <div className="mb-3">
                                    <label className="form-label">Get Patient Details by Name </label>
                                    <input
                                        type="text"
                                        className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                        id="name"
                                        placeholder="Enter Name"
                                    />
                                </div><br></br>
                                <button
                                    type="submit"
                                    className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                    disabled={!state.contract}
                                >
                                    Get Details
                                </button>
  
                            </form>
                        </div>

                        <div>
                            {data.map((ele) => {
                                return (
                                    <div key={ele.id}>
                                        <p>{ele.id}</p>
                                        <p>{ele.patientName}</p>
                                        <p>{ele.patientRecord}</p>
                                        <p>{ele.state}</p>
                                        <Link to={`/patient/${ele.id}`}>set</Link>
                                        <hr />
                                    </div>
                                );
                            })}
                        </div>



                </main>
            </div>


        
        </>
    );
  
}

export default PatientDetails;
