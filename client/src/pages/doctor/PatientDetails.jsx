import React from "react";
import { Link } from "react-router-dom";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Snackbar from '@mui/material/Snackbar';

const PatientDetails = ({ state }) => {
   
    
    const [transaction, setTransaction] = useState([]);
    const [addresses , setAddresses] = useState([]);
    const [phn , setPhn] = useState([]);
    const [data, setData]=useState([]);

    const [open, setOpen] = useState(false);
    const [opensb, setOpensb] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const getPatient= async (event) =>{
        event.preventDefault();
        console.log("Clicked");
        const { contract } = state;
        const address1 = document.querySelector("#address1").value;
        try{
          //console.log("Clicked");
          const transaction =await contract.getPatientDetails(address1);
          console.log("Clicked");
          setTransaction(transaction); 
          setOpen(true);     
        }
        catch(error){
          alert(error);
        }
        console.log(transaction);
    }

    const getPatientView =async (addrv) =>{
        // event.preventDefault();
         const { contract } = state;
         
         console.log("Clicked get doc");
         try{
           const transaction =await contract.getPatientDetails(addrv);
           setTransaction(transaction);
           setOpen(true); 
         }
         catch(error){
           alert(error);
         }
    }

    const getPatientByName=async(event)=>{
        event.preventDefault();
        setOpensb(true);
        const { contract } = state;
        const name = document.querySelector("#name").value;
        console.log("Clicked get doc");
        try{
            const data1 =await contract.getPatientbyName_mod(name);
            await data1.wait();
            const data=await contract.getPatientbyName();
            console.log(data);
            const addresses=data[0];
            const phn=data[1];
            setOpensb(false);
            setAddresses(addresses);
            setPhn(phn);
            console.log(addresses+" "+phn);      
        }
        catch(error){
            alert(error);
        }
        
    }
    


    return (
        <>

            
            <div className="w-full h-screen"  style={ { textAlign:"center", backgroundColor: "azure"} }>
                <aside>
                    <Navbar/>
                </aside>   
                <main className="flex-1 ml-44">
                        <div>
                            Patient Details
                        </div>
                        <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"70px"} }>
                            <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatient} style={{backgroundColor: "lightblue", width:"30%"}} >
                                <h1><b>Patient Details</b> </h1><br></br>
                                <hr />
                                <br />
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
                                <Dialog onClose={handleClose} open={open} >
                                    <DialogTitle>Patient Details</DialogTitle>
                                        <div style={{ margin:"10px"}}>
                                        <div style={{color:"black"}}>Address :  {transaction.at(1)} </div>
                                        <div> Name:  {transaction.at(3)}</div>
                                        {/* <div>Phone Number : {transaction.at(2).toNumber()}</div> */}
                                        <div> Records : {transaction.at(4)}</div>
                                        <div>Files :{transaction.at(5)}</div>
                                        </div>
                                </Dialog>
                               
                            </form>

                            <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatientByName} style={{backgroundColor: "lightblue", width:"30%"}} >
                                <h1><b>Patient Details</b> </h1><br></br>
                                <hr></hr>
                                
                                <br />
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
                                <Snackbar
                                open={opensb}
                                message="Processing"
                                />
  
                            </form>
                            

                        </div>

                        <br></br>
                        <br></br>

                        

                        {
                            addresses.map((ele)=>{
                                return(
                                <div style={{ marginLeft:"50px" , width:"100%"}}>
                                    <table>
                                    <tbody>
                                        <tr>
                                        <td
                                            
                                            style={{
                                            backgroundColor: "#96D4D4",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "400px",           
                                            }}
                                            >
                                            {ele}
                                            </td>
                                            <td
                                            style={{
                                                backgroundColor: "#96D4D4",
                                                border: "1px solid white",
                                                borderCollapse: "collapse",
                                                padding: "7px",
                                                width: "200px",
                                            }}
                                            >
                                            {/* {phn[addresses.indexOf(ele)].toNumber()} */}
                                            </td>
                                            
                                            <button
                                            style={{
                                                backgroundColor: "#96D4D4",
                                                border: "1px solid white",
                                                borderCollapse: "collapse",
                                                padding: "7px",
                                                width: "200px",
                                            }} 
                                            onClick={()=>getPatientView(ele)}
                                            >
                                            view
                                            </button>

                                            
                                            
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                );
                                }
                            )
                        }
                        



                </main>
            </div>


        
        </>
    );
  
}

export default PatientDetails;
