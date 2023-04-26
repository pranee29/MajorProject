
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./NavBar";
import GrantAccess from "./GrantAccess";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SearchDoc = ({ state,account }) => {

    const [transaction, setTransaction] = useState([]);
    const [addresses , setAddresses] = useState([]);
    const [phn , setPhn] = useState([]);
    const [name,setName]=useState("")
    const [grantAccess,setGrantAccess]=useState(false)
    const [open, setOpen] = useState(false);
    const [success,setSucc]=useState(false);
    const[hosp,setHosp]=useState([]);
    const [topen, setTOpen] = useState("none");
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

    const { contract } = state;

    const grant= async (address) =>{
        
        try{
            setOpen(true);
            const transaction =await contract.grantAccessToDoctor(address,1);
            await transaction.wait();
            setOpen(false);
            setSucc(true);
            console.log(transaction);

        }
        catch(error){
            alert(error);
        }
    }
    
    // details
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
          setHosp(hosp);
          setAddresses(addresses);
          setPhn(phn);
          setTOpen("");
          setOpen(false);
          console.log(addresses+" "+phn);      
        }
        catch(error){
          alert(error);
        }
      }

  return (
    <>

        
        <div className="w-full h-screen"  style={ { textAlign:"center", backgroundColor: "lightblue"} }>
            <aside>
                <Nav/>
            </aside>   
            <main className="flex-1 ml-44">
                    <div>
                      <h1>  Hello...{account}</h1>
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
                        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDocbyName} style={{backgroundColor: "white", width:"30%"}} >
                            <h1><b>Search Doctor Details By Name </b></h1><br></br>
                            <div className="mb-3">
                                  <TextField
                                    id="name"
                                    label="Name of Doctor"
                                    type="text"
                                    size="small"
                                    onChange={(e)=>setName(e.target.value)}
                                    value={name}
                                    fullWidth
                                  />
                                
                            </div><br></br>
                            <button
                                type="submit"
                                className="h-10 px-6 rounded-full bg-violet-600 text-white" 
                                disabled={!state.contract}
                            >
                              <SearchIcon/>  Search Details
                            </button>
                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                key={vertical + horizontal}
                                open={open}
                                message="Processing"
                            />
                            
                        </form>
                        
                        
                    </div>
                    <div style={{display:`${topen}`,marginTop:"50px", marginLeft:"80px" , width:"100%"}}>
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
                                  onClick={()=>grant(ele)}
                                >
                                  Grant Access to Doctor
                                </button>
                                
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

export default SearchDoc