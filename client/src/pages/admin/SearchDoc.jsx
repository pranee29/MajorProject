import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
const SearchDoc = ({ state,account }) => {

  const [transaction, setTransaction] = useState([]);
  const [addresses , setAddresses] = useState([]);
  const [phn , setPhn] = useState([]);
  const[hosp,setHosp]=useState([]);
  
  const { contract } = state;

  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };


  const getDoc= async (event) =>{
    event.preventDefault();
    const { contract } = state;
    const address1 = document.querySelector("#address1").value;
    console.log("Clicked get doc");
    try{
      const transaction =await contract.getDoctorDetails(address1);
      setTransaction(transaction);
      setOpen(true);
      console.log(transaction);
    }
    catch(error){
      alert(error);
    }
  }
  const getDocView =async (addrv) =>{
   // event.preventDefault();
    const { contract } = state;
    
    console.log("Clicked get doc");
    try{
      const transaction =await contract.getDoctorDetails(addrv);
      setTransaction(transaction);
      setOpen(true);
    }
    catch(error){
      alert(error);
    }
  }
  const getDocbyName= async (event) =>{
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    console.log("Clicked get doc");
    try{
      const data1 =await contract.getDocbyName__mod(name);
      await data1.wait();
      const data=await contract.getDocbyName();
      console.log(data);
      const addresses=data[0];
      const phn=data[1];
      const hosp=data[2];
      setAddresses(addresses);
      setPhn(phn);
      setHosp(hosp);
      console.log(addresses+" "+phn+" "+hosp);      
    }
    catch(error){
      alert(error);
    }
  }

    return (
      <>  
      <div className="w-full h-screen"   style={ { textAlign:"center", backgroundColor: "azure"} }>
        <aside>
          <Navbar/>
        </aside>   
        <main className="flex-1 ml-44">
          <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }> 
            <p className="text-4xl">Hospital Page</p>
            <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
              <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoc} style={{backgroundColor: "white", width:"30%"}} >
                <div>Get Doctor Details</div><br></br>
                <div className="mb-3">
                  <label className="form-label">Get by Doctor address     </label>
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
                  Get
                </button>
                <Dialog onClose={handleClose} open={open} >
                  <DialogTitle>Doctor Details</DialogTitle>
                    <div style={{ margin:"10px"}}>
                      <div style={{color:"black"}}>Address :  {transaction.at(1)} </div>
                      <div> Name:  {transaction.at(2)}</div>
                      <div>Phone Number : {transaction.at(3).toNumber()}</div>
                      <div> Qualification :  {transaction.at(4)}</div>
                      <div> Hospital :  {transaction.at(5)}</div>
                    </div>
                </Dialog>

          
              </form>
              <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDocbyName} style={{backgroundColor: "white", width:"30%"}} >
                <div>Get Doctor Details</div><br></br>
                <div className="mb-3">
                  <label className="form-label">Get by Doctor Name     </label>
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
                  Get
                </button>
                
              </form>
            </div>
            <div style={{ marginTop:"30px"}}>
              Doctor Details
              <div>
                Name    :   Phone Number 
              </div>
                
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
                                  {phn[addresses.indexOf(ele)].toNumber()}
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
                                  {hosp[addresses.indexOf(ele)]}
                                </td>
                               
                                
                                <button
                                  style={{
                                    backgroundColor: "#96D4D4",
                                    border: "1px solid white",
                                    borderCollapse: "collapse",
                                    padding: "7px",
                                    width: "200px",
                                  }} 
                                  onClick={()=>getDocView(ele)}
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
              
            </div>

          </div>
          

      </main>
      </div>

      </>
    );
  };



export default SearchDoc;


// import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./Navbar";



// const SearchDoc = ({ state,account }) => {

//     const [transaction, setTransaction] = useState([]);
//     const [data,setData] = useState([]);
//     const [address,setAddress1]=useState("")
//     const [name,setName]=useState("")


//     const getDoc= async (event) =>{
//         event.preventDefault();
//         const { contract } = state;
//         console.log(state)
        
//         // const contract=state.contract
//         console.log(contract)
//         console.log(address)
        
//         console.log("Clicked get doc");
//         try{
            
//                 const transaction =await contract.getDoctorDetails(address);
//                 console.log(transaction[0]);
//                 setTransaction(transaction);
//             }
//         catch(error){
//           alert(error);
//         }
//         console.log("transtaction....")
//         console.log(transaction[0],transaction[1]);
//     }
    
//     //pateint details
//     const getDoctorByName=async(event)=>{
//       event.preventDefault();
//       console.log("Clicked");
//       const { contract } = state;
      
//       try{
//         console.log("Clicked");
//         const data =await contract.getDocbyName(name);
//         console.log(data);
//         console.log("Clicked");
//         setData(data);      
//       }
//       catch(error){
//         alert(error);
//       }
//       console.log(data);
//   }

//   return (
//     <>

        
//         <div  style={ { textAlign:"center", backgroundColor: "azure"} }>
//             <aside>
//                 <Navbar/>
//             </aside>   
//             <main className="flex-1 ml-44">
//                     <div>
//                       <h1>  Hello...{account}</h1>
//                     </div>
//                     <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"70px"} }>
//                         <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoc} style={{backgroundColor: "lightblue", width:"30%"}} >
//                             <h1><b>Get Doctor Details by Address</b> </h1><br></br>
//                             <div className="mb-3">
//                                 <label className="form-label"><b>Enter address</b>  </label>
//                                 <input
//                                     type="text"
//                                     className="form-control placeholder:italic outline outline-offset-2 outline-1"
//                                     id="address1"
//                                     placeholder="Enter Address"
//                                     onChange={(e)=>setAddress1(e.target.value)}
//                                     value={address}
//                                 />
//                             </div><br></br>
//                             <button
//                                 type="submit"
//                                 className="h-10 px-6 rounded-full bg-violet-600 text-white" 
//                                 disabled={!state.contract}
//                             >
//                                 Get Details
//                             </button>
//                             {/* <div style={{ marginTop:"30px"}}>
//                                 <div>
//                                     <p style={{textAlign: "center"}}>Doctor Details</p>
//                                     <div style={{textAlign:"start", marginTop:"10px"}}>Patient Address :   </div>
//                                     <div style={{textAlign:"start"}}>Doctor Name    :  </div>
//                                     <div style={{textAlign:"start"}}>Qualification    :  </div>
//                                     <div style={{textAlign:"start"}}>Phone Number    :  </div>
//                                     <div style={{textAlign:"start"}}>Address    :  </div>
//                                 </div>
//                             </div> */}
                           
//                         </form>
//                     </div>

//                     <br></br>
//                     <br></br>

//                     <div className="flex justify-evenly">
//                         <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoctorByName} style={{backgroundColor: "lightblue", width:"30%"}} >
//                             <h1><b>Get Doctor Details By Name </b></h1><br></br>
//                             <div className="mb-3">
//                                 <label className="form-label"><b> Name : </b> </label>
//                                 <input
//                                     type="text"
//                                     className="form-control placeholder:italic outline outline-offset-2 outline-1"
//                                     id="name"
//                                     placeholder="Enter Name"
//                                     onChange={(e)=>setName(e.target.value)}
//                                     value={name}
//                                 />
//                             </div><br></br>
//                             <button
//                                 type="submit"
//                                 className="h-10 px-6 rounded-full bg-violet-600 text-white" 
//                                 disabled={!state.contract}
//                             >
//                                 Get Details
//                             </button>
                            

//                         </form>
//                         {/* <div style={{textAlign:"start"}}>Qualification    :  </div> */}
//                         {/* <div style={{textAlign:"start"}}>Address    :  </div> */}
//                        {/* <div className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800"  style={{backgroundColor: "lightblue", width:"30%"}}>
//                             <p style={{textAlign: "center"}}><b>Doctor Details</b></p>
//                             <div style={{textAlign:"start", marginTop:"10px"}}>Doctor Address :  {transaction[1]} </div>
//                             <div style={{textAlign:"start"}}>Doctor Name    :  {transaction[2]}</div> 
                
                            
//                             <div style={{textAlign:"start"}}>Phone Number    :  {transaction[3]}</div>
                            
//                             </div> */}
//                     </div>
                    
                
//                     {/* <div>{data}</div> */}
//                     {/* <div>
//                         {data.map((ele) => {
//                             return (
//                                 <div key={ele.id}>
//                                     <p>{ele.id}</p>
//                                     <p>{ele.patientName}</p>
//                                     <p>{ele.patientRecord}</p>
//                                     <p>{ele.state}</p>
//                                     <Link to={`/docotr/${ele.id}`}>Update</Link>
//                                     <hr />
//                                 </div>
//                             );
//                         })}
//                     </div> */}



//             </main>
//         </div>


    
//     </>
// );


    
//     // return(
//     //     <>
//     //         <div  style={ {textAlign:"center", backgroundColor: "azure"} }>
//     //             <aside>
//     //                 <Navbar/>
//     //             </aside>   
//     //             <main className="flex-1 ml-44">
//     //                 <h1>
//     //                     Search Doctor Details
//     //                 </h1>
//     //                 <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
//     //                     <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoc} style={{backgroundColor: "white", width:"30%"}} >
//     //                     <div>Get Doctor Details</div><br></br>
//     //         <div className="mb-3">
//     //           <label className="form-label">Get by Doctor address     </label>
//     //           <input
//     //             type="text"
//     //             className="form-control placeholder:italic outline outline-offset-2 outline-1"
//     //             id="address1"
//     //             placeholder="Enter Address"
//     //             onChange={(e)=>setAddress1(e.target.value)}
//     //               value = {address1}

//     //           />
//     //         </div><br></br>
//     //         <button
//     //           type="submit"
//     //           className="h-10 px-6 rounded-full bg-violet-600 text-white" 
//     //           disabled={!state.contract}
//     //         >
//     //           Get
//     //         </button>
//     //         <div style={{ marginTop:"30px"}}>
//     //           <div>
//     //             {/* <p style={{textAlign: "center"}}>Doctor Detials</p>
//     //             <div style={{textAlign:"start", marginTop:"10px"}}>Doctor Address :  {transaction.at(1)} </div>
//     //             <div style={{textAlign:"start"}}>Doctor Name    :  {transaction.at(2)}</div> */}
//     //             </div>
//     //         </div>

//     //       </form>
//     //       <br></br>
//     //                     <br></br>

//     //                     <div className="flex justify-evenly">
//     //                         <form className="w-screen shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatientByName} style={{backgroundColor: "lightblue", width:"30%"}} >
//     //                             <h1>Patient Details </h1><br></br>
//     //                             <div className="mb-3">
//     //                                 <label className="form-label">Get Patient Details by Name </label>
//     //                                 <input
//     //                                     type="text"
//     //                                     className="form-control placeholder:italic outline outline-offset-2 outline-1"
//     //                                     id="name"
//     //                                     placeholder="Enter Name"
//     //                                     onChange={(e)=>setName(e.target.value)}
//     //                                      value = {name}
//     //                                 />
//     //                             </div><br></br>
//     //                             <button
//     //                                 type="submit"
//     //                                 className="h-10 px-6 rounded-full bg-violet-600 text-white" 
//     //                                 disabled={!state.contract}
//     //                             >
//     //                                 Get Details
//     //                             </button>
  
//     //                         </form>
//     //                     </div>
        
        
//     //     </div>
//     //             </main>
//     //         </div>
//     //     </>
//     // );

// }

// export default SearchDoc