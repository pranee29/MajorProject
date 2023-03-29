
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./NavBar";
import GrantAccess from "./GrantAccess";



const SearchDoc = ({ state,account }) => {

    const [transaction, setTransaction] = useState([]);
    const [data,setData] = useState("");
    const [address1,setAddress1]=useState("")
    const [name,setName]=useState("")
    const [grantAccess,setGrantAccess]=useState(false)


    const getDoc= async (event) =>{
        event.preventDefault();
        const { contract } = state;
        
        console.log("Clicked get doc");
        try{
          const transaction =await contract.getDoctorDetails(address1);
          console.log(transaction);
          setTransaction(transaction);
        }
        catch(error){
          alert(error);
        }
        console.log(transaction[0]);
    }
    
    //pateint details
    const getDoctorByName=async(event)=>{
      event.preventDefault();
      console.log("Clicked");
      const { contract } = state;
      
      try{
        console.log("Clicked");
        const data =await contract.getDoctorbyName(name);
        console.log("Clicked");
        setData(data);      
      }
      catch(error){
        alert(error);
      }
      console.log(data);
  }

  return (
    <>

        
        <div  style={ { textAlign:"center", backgroundColor: "azure"} }>
            <aside>
                <Nav/>
            </aside>   
            <main className="flex-1 ml-44">
                    <div>
                      <h1>  Hello...{account}</h1>
                    </div>
                    <div className=" shadow-xl bg-blue-300">
                    {!grantAccess && (
                        <button className="share bg-green-500" onClick={() => setGrantAccess(true)}>
                          <b>Grant Access</b>
                        </button>
                    )}
                    {grantAccess && (
                         <GrantAccess setGrantAccess={setGrantAccess} contract={state.contract}></GrantAccess>
                    )}
                    </div>
                    <div className="flex  justify-evenly" style={ { textAlign:"center" ,marginTop:"70px"} }>
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoc} style={{backgroundColor: "lightblue", width:"30%"}} >
                            <h1><b>Get Doctor Details by Address</b> </h1><br></br>
                            <div className="mb-3">
                                <label className="form-label"><b>Enter address</b>  </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="address1"
                                    placeholder="Enter Address"
                                    onClick={(e)=>setAddress1(e.target.value)}
                                    value={address1}
                                />
                            </div><br></br>
                            <button
                                type="submit"
                                className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                disabled={!state.contract}
                            >
                                Get Details
                            </button>
                            <div style={{ marginTop:"30px"}}>
                                <div>
                                    <p style={{textAlign: "center"}}>Doctor Details</p>
                                    <div style={{textAlign:"start", marginTop:"10px"}}>Patient Address :   </div>
                                    <div style={{textAlign:"start"}}>Doctor Name    :  </div>
                                    <div style={{textAlign:"start"}}>Qualification    :  </div>
                                    <div style={{textAlign:"start"}}>Phone Number    :  </div>
                                    <div style={{textAlign:"start"}}>Address    :  </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <br></br>
                    <br></br>

                    <div className="flex justify-evenly">
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoctorByName} style={{backgroundColor: "lightblue", width:"30%"}} >
                            <h1><b>Get Doctor Details By Name </b></h1><br></br>
                            <div className="mb-3">
                                <label className="form-label"><b> Name : </b> </label>
                                <input
                                    type="text"
                                    className="form-control placeholder:italic outline outline-offset-2 outline-1"
                                    id="name"
                                    placeholder="Enter Name"
                                    onChange={(e)=>setName(e.target.value)}
                                    value={name}
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
                    {/* <div>{data}</div> */}
                    {/* <div>
                        {data.map((ele) => {
                            return (
                                <div key={ele.id}>
                                    <p>{ele.id}</p>
                                    <p>{ele.patientName}</p>
                                    <p>{ele.patientRecord}</p>
                                    <p>{ele.state}</p>
                                    <Link to={`/docotr/${ele.id}`}>Update</Link>
                                    <hr />
                                </div>
                            );
                        })}
                    </div> */}



            </main>
        </div>


    
    </>
);


    
    // return(
    //     <>
    //         <div  style={ {textAlign:"center", backgroundColor: "azure"} }>
    //             <aside>
    //                 <Navbar/>
    //             </aside>   
    //             <main className="flex-1 ml-44">
    //                 <h1>
    //                     Search Doctor Details
    //                 </h1>
    //                 <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
    //                     <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoc} style={{backgroundColor: "white", width:"30%"}} >
    //                     <div>Get Doctor Details</div><br></br>
    //         <div className="mb-3">
    //           <label className="form-label">Get by Doctor address     </label>
    //           <input
    //             type="text"
    //             className="form-control placeholder:italic outline outline-offset-2 outline-1"
    //             id="address1"
    //             placeholder="Enter Address"
    //             onChange={(e)=>setAddress1(e.target.value)}
    //               value = {address1}

    //           />
    //         </div><br></br>
    //         <button
    //           type="submit"
    //           className="h-10 px-6 rounded-full bg-violet-600 text-white" 
    //           disabled={!state.contract}
    //         >
    //           Get
    //         </button>
    //         <div style={{ marginTop:"30px"}}>
    //           <div>
    //             {/* <p style={{textAlign: "center"}}>Doctor Detials</p>
    //             <div style={{textAlign:"start", marginTop:"10px"}}>Doctor Address :  {transaction.at(1)} </div>
    //             <div style={{textAlign:"start"}}>Doctor Name    :  {transaction.at(2)}</div> */}
    //             </div>
    //         </div>

    //       </form>
    //       <br></br>
    //                     <br></br>

    //                     <div className="flex justify-evenly">
    //                         <form className="w-screen shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatientByName} style={{backgroundColor: "lightblue", width:"30%"}} >
    //                             <h1>Patient Details </h1><br></br>
    //                             <div className="mb-3">
    //                                 <label className="form-label">Get Patient Details by Name </label>
    //                                 <input
    //                                     type="text"
    //                                     className="form-control placeholder:italic outline outline-offset-2 outline-1"
    //                                     id="name"
    //                                     placeholder="Enter Name"
    //                                     onChange={(e)=>setName(e.target.value)}
    //                                      value = {name}
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
    //                     </div>
        
        
    //     </div>
    //             </main>
    //         </div>
    //     </>
    // );

}

export default SearchDoc