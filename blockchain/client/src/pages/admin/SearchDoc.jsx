import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import Snackbar from '@mui/material/Snackbar';
const SearchDoc = ({ state,account }) => {

  const [transaction, setTransaction] = useState([]);
  const [addresses , setAddresses] = useState([]);
  const [phn , setPhn] = useState([]);
  const[hosp,setHosp]=useState([]);
  const [sopen, setsOpen] = useState(false);
  const [pos, setpos] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = pos;
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
    setsOpen(true);
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
      setsOpen(false);
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
            <p className="text-4xl">Search For Doctor</p>
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
                      {/* <div>Phone Number : {transaction.at(3).toNumber()}</div> */}
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
                <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                key={vertical + horizontal}
                                open={sopen}
                                message="Processing"
                            />
              </form>
            </div>
            <div style={{ marginTop:"30px"}}>
              
                
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
                                {/* <td
                                  style={{
                                    backgroundColor: "#96D4D4",
                                    border: "1px solid white",
                                    borderCollapse: "collapse",
                                    padding: "7px",
                                    width: "200px",
                                  }}
                                >
                                  {phn[addresses.indexOf(ele)].toNumber()}
                                </td> */}
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

