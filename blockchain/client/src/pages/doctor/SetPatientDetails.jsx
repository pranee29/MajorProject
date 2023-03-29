import Navbar from "./Navbar";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../Login"
import MyDetailsDoc from "./MydetailsDoc";


const SetPatientDetails = ({ state,account }) => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const [ImgHash ,setImgHash] = useState(null);
    const [address,setAddress] = useState("")
    const [name,setName] = useState("")
    const [prescription,setPrescription] = useState("")
    const [phone,setPhone] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (file) {
        //     try {
        //         console.log("ENtered try" )
        //         const formData = new FormData();
        //         formData.append("file", file);
        //         const resFile = await axios({
        //             method: "post",
        //             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        //             data: formData,
        //             headers: {
        //                 pinata_api_key: `d57b517782ad7327b5c5`,
        //                 pinata_secret_api_key: `5b1f43b49452a776862beeb86da3a0633cc82ad8474ced133498d519df68efee`,
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         });
        //         const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //         //const signer = contract.connect(provider.getSigner());
        //         console.log(ImgHash)
        //         // const signer = state.contract.connect(state.provider.getSigner());
        //         //state.contract.add(account, ImgHash);
        //         alert("uploaded successfully");
        //     } 
        //     catch (error) {
        //         alert("Unable to upload image to Pinata");
        //         console.log(error);
        //     }
        // }
        // console.log(account)
        // alert("Successfully Image Uploaded");
        // setFileName("No image selected");
        // setFile(null);
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
                const imghash = `ipfs://${resFile.data.IpfsHash}`;
                setImgHash(imghash);
                //const signer = contract.connect(provider.getSigner());
                console.log(ImgHash)
                // const signer = state.contract.connect(state.provider.getSigner());
                //state.contract.add(account, ImgHash);
                // alert("uploaded successfully");
                console.log('Uploaded succ...')
            } 
            catch (error) {
                // alert("Unable to upload image to Pinata");
                console.log(error);
            }
        }
        console.log(account)
        //alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
        const { contract } = state;
        // const address = document.querySelector("#address").value;
        // const name = document.querySelector("#name").value;
        // const num = document.querySelector("#num").value;
        // const prescription = document.querySelector("#prescription").value+" ,";
        console.log("near");
        try{
          const transaction = await contract.setHealthRecordsDetails(name,address,phone,prescription,ImgHash);
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
                                <div>Upload your Files</div><br></br>
                                <div className="top">
                                    <label htmlFor="file-upload" className="choose">
                                        Choose Image
                                    </label>
                                    <input
                                        disabled={!account}
                                        type="file"
                                        id="file-upload"
                                        name="data"
                                        onChange={retrieveFile}
                                    />
                                    <span className="textArea">Image: {fileName}</span>
                                    <button onClick={handleSubmit} className="upload" disabled={!file}>
                                        Upload File
                                    </button>
                                </div>
                            </div><br></br><br></br>
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