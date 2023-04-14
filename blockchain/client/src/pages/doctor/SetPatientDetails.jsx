import Navbar from "./Navbar";
import React from "react";
import axios from "axios";

import { useState } from "react";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SetPatientDetails = ({ state,account }) => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const [ImgHash ,setImgHash] = useState(null);
    const [address,setAddress] = useState("")
    const [name,setName] = useState("")
    const [prescription,setPrescription] = useState("")
    const [phone,setPhone] = useState("")
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

    
    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    }

    const setHealthRecordsDetails = async (event) => {
        event.preventDefault();
        setOpen(true);
        if (file) {
            try {
                console.log("Entered try" )
                const formData = new FormData();
                formData.append("file", file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `d57b517782ad7327b5c5`,
                        pinata_secret_api_key: `5b1f43b49452a776862beeb86da3a0633cc82ad8474ced133498d519df68efee`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const imghash = `ipfs://${resFile.data.IpfsHash},`;
                setImgHash(imghash);
                console.log(ImgHash)

                console.log('Uploaded succ...')
            } 
            catch (error) {
                console.log(error);
            }
        }
        console.log(account)
        setFileName("No image selected");
        setFile(null);
        const { contract } = state;
        
        console.log("near");
        try{
          const transaction = await contract.setHealthRecordsDetails(name,address,phone,prescription,ImgHash);
          await transaction.wait();
          setOpen(false);
          setSucc(true);
            
        }
        catch(error){
          alert(error);
        } 
        
      };


    return(
        <>
            <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }>
                <aside>
                    <Navbar/>
                </aside>   
                <main className="flex-1 ml-44">
                    <h1 className="text-4xl">
                        Add Patient Details
                    </h1>
                    <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"90px"} }>
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={setHealthRecordsDetails} style={{backgroundColor: "white", width:"30%"}}>
                            <div>
                               <b> Add Patient Details </b>
                            </div><br></br>
                            <div className="mb-3">
                                <label className="form-label">Patient address </label>
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
                                <label className="form-label">Patient Name </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="name"
                                    placeholder="Enter Patient Name"
                                    onChange={(e)=>setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Patient phone number </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="num"
                                    placeholder="Enter Number"
                                    onChange={(e)=>setPhone(e.target.value)}
                                    value = {phone}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Patient Prescription </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="prescription"
                                    placeholder="Enter Prescription"
                                    onChange={(e)=>setPrescription(e.target.value)}
                                    value={prescription}
                                />
                            </div><br></br>
                            <div className="mb-3">
                                
                                <div className="top">
                                    <label htmlFor="file-upload" className="choose">
                                      <b>  Choose Image </b>
                                    </label>
                                    <input
                                        disabled={!account}
                                        type="file"
                                        id="file-upload"
                                        name="data"
                                        onChange={retrieveFile}
                                    /><br></br>
                                    <span className="textArea">Image: {fileName}</span>
                                    <br></br>
                                    
                                </div>
                            </div><br></br><br></br>
                            <button
                                type="submit"
                                className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                disabled={!state.contract}
                            >
                                Add Patient
                            </button> <br></br>
                            <Snackbar
                                open={open}
                                message="Processing"
                            />
                            <Snackbar 
                                open={success} 
                                autoHideDuration={6000} 
                                onClose={handleClose} 
                                anchorOrigin={{ vertical, horizontal }}
                                key={vertical + horizontal}>
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        Added Doctor Successfully
                                    </Alert>
                            </Snackbar>
                        </form>
                        <br></br>
                        <br></br>
                        
                        {/* <p>{address}</p>
                        <p>{name}</p>
                        <p>{phone}</p>
                        <p>{prescription}</p> */}
                    </div>
                </main>
            </div>
        </>
    );

}

export default SetPatientDetails