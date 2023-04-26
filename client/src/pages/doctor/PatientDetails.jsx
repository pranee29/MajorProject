import React from "react";
import { Link } from "react-router-dom";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import Display from "./Display";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Snackbar from '@mui/material/Snackbar';
import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';
const PatientDetails = ({ state,account }) => {
   
    
    const [transaction, setTransaction] = useState([]);
    const [addresses , setAddresses] = useState([]);
    const [phn , setPhn] = useState([]);
    const [data, setData]=useState([]);
    const [topen, setTOpen] = useState("none");
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
            setTOpen("");   
            console.log(addresses+" "+phn);      
        }
        catch(error){
            alert(error);
        }
        
    }
    


    return (
        <>

            
            <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }>
                <aside>
                    <Navbar/>
                </aside>   
                <main className="flex-1 ml-44">
                        <div className="text-4xl">
                            Patient Details
                        </div>
                        <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"70px"} }>
                            <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatient} style={{backgroundColor: "white", width:"30%"}} >
                                <br />
                                <div className="mb-3">
                                    <TextField
                                    id="address1"
                                    label="Enter Address"
                                    type="text"
                                    size="small"
                                    fullWidth
                                />
                                
                                </div><br></br>
                                <button
                                    type="submit"
                                    className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                    disabled={!state.contract}
                                >
                                  <SearchIcon/> Search
                                </button>
                                <Dialog onClose={handleClose} open={open} >
                                    <DialogTitle>Patient Details</DialogTitle>
                                        <div style={{ margin:"20px"}}>
                                        <div style={{color:"black"}}>Address :  {transaction.at(1)} </div> <br/>
                                        <div> Name:  {transaction.at(3)}</div> <br/>
                                        <div>Phone Number : {transaction.at(2)}</div> <br/>
                                        <div> Prescription : {transaction.at(4)}</div> <br/>
                                        <div><Display state={state} account={transaction.at(1)}/></div>
                                        </div>
                                </Dialog>
                               
                            </form>

                            <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatientByName} style={{backgroundColor: "white", width:"30%"}} >
                                
                                <div className="mb-3">
                                    <br/>
                                    <TextField
                                        id="name"
                                        label="Enter Name"
                                        type="text"
                                        size="small"
                                        fullWidth
                                    />
                                    
                                </div><br></br>
                                <button
                                    type="submit"
                                    className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                    disabled={!state.contract}
                                >
                                <SearchIcon/>    Get Details
                                </button>
                                <Snackbar
                                open={opensb}
                                message="Processing"
                                />
  
                            </form>
                            

                        </div>

                        <br></br>
                        <br></br>

                        <div style={{display:`${topen}`, marginLeft:"80px" , width:"100%"}}>
                            <table>
                            <tbody>
                                <tr>
                                <td
                                            
                                            style={{
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "500px",           
                                            }}
                                            >
                                            Address
                                            </td>
                                            <td
                                            style={{
                                                border: "1px solid white",
                                                borderCollapse: "collapse",
                                                padding: "7px",
                                                width: "200px",
                                            }}
                                            >
                                            Phone Number
                                            </td>
                                            
                                        
                                            
                                            <td
                                            style={{
                                                border: "1px solid white",
                                                borderCollapse: "collapse",
                                                padding: "7px",
                                                width: "200px",
                                            }} 
                                            
                                            >
                                            Click For Details
                                            </td>
                                </tr>
                            </tbody>
                            </table>

                        </div>
              
                        

                        {
                            addresses.map((ele)=>{
                                return(
                                <div style={{ marginLeft:"80px" , width:"100%"}}>
                                    <table>
                                    <tbody>
                                        <tr>
                                        <td
                                            
                                            style={{
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "500px",           
                                            }}
                                            >
                                            {ele}
                                            </td>
                                            <td
                                            style={{
                                                border: "1px solid white",
                                                borderCollapse: "collapse",
                                                padding: "7px",
                                                width: "200px",
                                            }}
                                            >
                                            {phn[addresses.indexOf(ele)]}
                                            </td>
                                            
                                            <button
                                            style={{
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
