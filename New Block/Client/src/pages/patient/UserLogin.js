import { useState, useEffect } from "react";
import {ethers}  from "ethers";



const UserLogin = ({ state }) => {

    const [transaction, setTransaction] = useState([]);

    const grantAccessToDoctor = async (event) => {
        console.log("abcdef");
        event.preventDefault();
        const { contract } = state;
        const address = document.querySelector("#address").value;
        console.log(address,contract);
        console.log(address,contract);
        try{
          const transaction = await contract.grantAccessToDoctor(address,1);
            await transaction.wait();
            alert("Done");
            console.log("Transaction is done"+" "+transaction);

        }
        catch(error){
            console.log(error["message"]);
        }
        
      };

      
    
    var hidval=false;
    const getPatient= async (event) =>{
        event.preventDefault();
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log(account[0]);
          const { contract } = state;
        
        const address1 = account;
        console.log("Clicked get doc");
        try{
          const transaction =await contract.getPatientDetails(account[0]);
          setTransaction(transaction);
          hidval=true;
          alert("Done");
        }
        catch(error){
          alert(error);
        }
        console.log("After  ");
     
        
        }
        
      }


    return(
        <>

<div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "whitesmoke"} }> 

      <p className="text-4xl">User Page</p>

      <div
  class="mb-4 rounded-lg bg-neutral-800 py-5 px-6 text-base text-neutral-50 dark:bg-neutral-900"
  role="alert">
  A simple dark alert—check it out!
</div>

        <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={grantAccessToDoctor} style={{backgroundColor: "lightblue", width:"30%"}} >
            <h1>Grant Access to Doctor</h1><br></br>
            <div className="mb-3">
              <label className="form-label">Enter Doctor Address </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
              />
            </div><br></br>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-violet-600 text-white " 
              
            >
              
              Grant
            </button>
          </form>
          <br></br>
          <br></br>
          <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatient} style={{backgroundColor: "lightblue", width:"30%"}} >
            <br></br>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-violet-600 text-white" 
              disabled={!state.contract}
            >
              Get Details
            </button>
            <br></br>
            <div style={{ marginTop:"30px"}}>
              <div>
                <p style={{textAlign: "center"}}>Patient Detials</p><br></br>
                <div style={{textAlign:"start", marginTop:"10px"}}>Patient Address :  {transaction.at(1)} </div>
                <div style={{textAlign:"start"}}>Patient Name    :  {transaction.at(2)}</div>
                <div style={{textAlign:"start"}}>Prescription    :  {transaction.at(3)} </div>
              </div>
            </div>
          </form>

      </div>
      <div>
      <br></br>
        <br></br>
        <br></br>
        
        
        </div>
      </div>


        </>
    )
}

export default UserLogin