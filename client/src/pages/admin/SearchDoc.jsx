import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import SearchIcon from '@mui/icons-material/Search';
const SearchDoc = ({ state,account }) => {

  const [transaction, setTransaction] = useState([]);
  const [addresses , setAddresses] = useState([]);
  const [phn , setPhn] = useState([]);
  const[hosp,setHosp]=useState([]);
  const [sopen, setsOpen] = useState(false);
  const [topen, setTOpen] = useState("none");
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
      setTOpen("");
      console.log(addresses+" "+phn+" "+hosp);      
    }
    catch(error){
      alert(error);
    }
  }

    return (
      <>  
      <div className="w-full h-screen"   style={ { textAlign:"center", backgroundColor: "lightblue"} }>
        <aside>
          <Navbar/>
        </aside>   
        <main className="flex-1 ml-44">
          <div className="w-full" style={ { textAlign:"center", backgroundColor: "lightblue"} }> 
            <p className="text-4xl">Search For Doctor</p>
            <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
              <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoc} style={{backgroundColor: "white", width:"30%"}} >
                
                <div className="mb-3">
                  
                  <TextField
                    id="address1"
                    label="Address of Doctor"
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
                  <DialogTitle>Doctor Details</DialogTitle>
                    <div style={{ margin:"20px"}}>
                      <div style={{color:"black"}}>Address :  {transaction.at(1)} </div> <br/>
                      <div> Name:  {transaction.at(2)}</div> <br/>
                      <div>Phone Number : {transaction.at(3)}</div> <br/>
                      <div> Qualification :  {transaction.at(4)}</div> <br/>
                      <div> Hospital :  {transaction.at(5)}</div> <br/>
                    </div>
                </Dialog>

          
              </form>
              <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDocbyName} style={{backgroundColor: "white", width:"30%"}} >
                
                <div className="mb-3">
                  
                  <TextField
                                    id="name"
                                    label="Name of Doctor"
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
                <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                key={vertical + horizontal}
                                open={sopen}
                                message="Processing"
                            />
              </form>
            </div>
            <div style={{ marginTop:"30px",}}>
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
                                  Hospital Name
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
                                <td
                                  style={{
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

