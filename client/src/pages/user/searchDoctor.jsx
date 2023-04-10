
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./NavBar";
import GrantAccess from "./GrantAccess";



const SearchDoc = ({ state,account }) => {

    const [transaction, setTransaction] = useState([]);
    const [addresses , setAddresses] = useState([]);
    const [phn , setPhn] = useState([]);
    const [name,setName]=useState("")
    const [grantAccess,setGrantAccess]=useState(false)

    const { contract } = state;

    const grant= async (address) =>{
        
        try{
            const transaction =await contract.grantAccessToDoctor(address,1);
            await transaction.wait();
            console.log(transaction);

        }
        catch(error){
            alert(error);
        }
    }
    
    //pateint details
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
                <Nav/>
            </aside>   
            <main className="flex-1 ml-44">
                    <div>
                      <h1>  Hello...{account} doctors</h1>
                    </div>
                    <div className=" shadow-xl bg-blue-300">
                    {!grantAccess && (
                        <button className="shareh-10 px-6 rounded-full bg-violet-600 text-white" onClick={() => setGrantAccess(true)}>
                          <b>Grant Access</b>
                        </button>
                    )}
                    {grantAccess && (
                         <GrantAccess setGrantAccess={setGrantAccess} contract={state.contract}></GrantAccess>
                    )}
                    </div>
                    

                    <br></br>
                    <br></br>

                    <div className="flex justify-evenly">
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDocbyName} style={{backgroundColor: "lightblue", width:"30%"}} >
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
                                
                                <button
                                  style={{
                                    backgroundColor: "#96D4D4",
                                    border: "1px solid white",
                                    borderCollapse: "collapse",
                                    padding: "7px",
                                    width: "200px",
                                  }} 
                                  onClick={()=>grant(ele)}
                                >
                                  Grant Access to Doctor
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