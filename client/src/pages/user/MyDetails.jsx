import React from "react";

import { useEffect, useState } from "react";
import Nav from "./NavBar";
import Display from "./Display";


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
      <>
      <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }>
        <aside>
          <Nav/>
        </aside>
        <main>
       
        <div className="w-screen flex justify-evenly flex-col" style={ { marginLeft:"500px",width:"50%",textAlign:"center" ,marginTop:"90px"} }>
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800"  style={{backgroundColor: "white"}} >
            <div><b>Your Details...</b></div><br></br>
            <hr></hr>
            
            <div className="mb-3">
           
            <p style={{textAlign:"start", marginTop:"10px"}}><b>Name </b>           :  {details[3]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>id </b>           :  {account[0]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Phone Number</b>           :  {details.at(2)}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Prescription</b>       :  {details[4]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Files</b>          :  {details[5]}</p>
            </div><br></br>
              
         

          </form>
          
        
          <div><Display state={state} account={account}></Display></div>
        
        </div>
        
        </main>
      </div>
      </>
    );
  
}

export default MyDetails;
