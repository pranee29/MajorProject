
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "../admin/Navbar";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddDoc = ({ state,account }) => {
    const [address,setAddress]=useState("");
    const [name,setName]=useState("");
    const [num,setNum]=useState("");
    const [qual,setQual]=useState("");
    const [hosp,setHosp]=useState("");
    const [open, setOpen] = useState(false);
    const [success,setSucc]=useState(false);

    const [pos, setpos] = useState({
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal } = pos;
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSucc(false);
      };


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
          setOpen(false);
          setSucc(true);
          console.log(transaction);
        }
        catch(error){
            alert(error);
            setOpen(false);
        }
        
        
    };


    
    return(
        <>
            <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }>
                <aside>
                    <Navbar/>
                </aside>   
                
                <main className="flex-1 ml-44">
                    <div>
                        <b>Add Doctor Details</b>
                    </div>
                    <div className="flex  justify-evenly" style={ {  marginTop:"90px" , marginLeft:"220px"} }>
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={setDoc} style={{backgroundColor: "white", width:"50%"}}>
                            <div className="mb-3" style={{textAlign:"left", marginTop:"10px"}}>
                                <TextField
                                    id="address"
                                    label="Address of Doctor"
                                    type="text"
                                    onChange={(e)=>setAddress(e.target.value)}
                                    value = {address}
                                    size="small"
                                    fullWidth
                                />
                                
                            </div>
                            <div className="mb-3" style={{textAlign:"left", marginTop:"10px"}}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    type="text"
                                    onChange={(e)=>setName(e.target.value)}
                                    value = {name}
                                    size="small"
                                    fullWidth
                                />
                                
                            </div>
                            <div className="mb-3" style={{textAlign:"left", marginTop:"10px"}}>
                                <TextField
                                    id="num"
                                    label="Phone number"
                                    type="text"
                                    onChange={(e)=>setNum(e.target.value)}
                                    value = {num}
                                    size="small"
                                    fullWidth
                                />
                                
                            </div>
                            <div className="mb-3" style={{textAlign:"left", marginTop:"10px"}}>
                                <TextField
                                    id="qual"
                                    label="Qualification"
                                    type="text"
                                    onChange={(e)=>setQual(e.target.value)}
                                    value = {qual}
                                    size="small"
                                    fullWidth
                                />
                                
                            </div>
                            <div className="mb-3" style={{textAlign:"left", marginTop:"10px"}}>
                                <TextField
                                    id="hosp"
                                    label="Hospital Name"
                                    type="text"
                                    onChange={(e)=>setHosp(e.target.value)}
                                    value = {hosp}
                                    size="small"
                                    fullWidth
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
                                anchorOrigin={{ vertical, horizontal }}
                                
                                open={open}
                                message="Processing"
                            />
                            <Snackbar 
                                open={success} 
                                autoHideDuration={6000} 
                                onClose={handleClose} 
                                anchorOrigin={{ vertical, horizontal }}
                                >
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        Added Doctor Successfully
                                    </Alert>
                            </Snackbar>


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