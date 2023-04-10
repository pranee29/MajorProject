import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Nav from "./NavBar";


const MyDetails = ({ state,account }) => {
    
    const [transcation, setTransaction] = useState([]);
    const [details,setDetails] =useState([]);
    const { contract } = state;
    
    useEffect(() => {
      const memosMessage = async () => {
        try{
        const details = await contract.getPatientDetails(account[0]);
        setDetails(details);
        console.log(details);
        }
        catch(error){
          alert("You are not a patient");
        }
      };
      contract && memosMessage();
    }, [contract]);
    
    

    return (
      <div className="w-full h-screen" >
        <aside>

        <Nav/>
        </aside>
        <main>
       <p className="text-4xl" style={ { textAlign:"center" ,marginTop:"90px"} }>Hello..   {account}</p>
        <div className="w-screen flex justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800"  style={{backgroundColor: "white"}} >
            <div><b>Your Details...</b></div><br></br>
            <hr></hr>
            <div className="mb-3">
              {/* <label className="form-label">Get by Doctor address     </label>
              <input
                type="text"
                className="form-control placeholder:italic outline outline-offset-2 outline-1"
                id="address1"
                placeholder="Enter Address"
              /> */}
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Name</b>           :  {details[3]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>id </b>           :  {account[0]}</p>
              {/* <p style={{textAlign:"start", marginTop:"10px"}}><b>Phone Number</b>   :  {details[2].toNumber()}</p> */}
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Prescription</b>       :  {details[4]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Files</b>          :  {details[5]}</p>
            </div><br></br>
              
            
            {/* <div style={{ marginTop:"30px"}}>
              <div>
                <p style={{textAlign: "center"}}>Doctor Detials</p>
                <div style={{textAlign:"start", marginTop:"10px"}}>Doctor Address :  {transaction.at(1)} </div>
                <div style={{textAlign:"start"}}>Doctor Name    :  {transaction.at(2)}</div>
                </div>
            </div> */}

          </form>
        
        
        
        </div>
        </main>
      </div>
    );
  
}

export default MyDetails;
