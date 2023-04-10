import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


function Nav({state}) {

  const [account, setTransaction] = useState([]);

  const getDetails= async (event) =>{
    event.PreventDeafult();
    const { ethereum } = window;
    if (ethereum) {
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setTransaction(account);
      console.log(account[0]);
    }
    
  }
  
  return (
    <>
     
    <div className="bg-slate-700 w-46 fixed left-0 top-0 h-screen p-10">
      <nav >
      <hr />
        <Link to={"/"} className="text-white" >Home</Link><br></br>
        <hr />
        
        {/* <Link to={"/doctor"} className="text-white" >Doctor</Link><br></br>
        <hr /> */}
        <Link to={`/doctor/${account[0]}`} className="text-white">
            My Details
        </Link><br></br>
        <hr />
        <Link to={"/doctor/addpatient"} className="text-white" >
            Set Patient Details
        </Link><br></br>
        <hr />
        <Link to={"/doctor/searchpatient"} className="text-white">
            Search Patient
        </Link><br></br>
        <hr />

      </nav>
    </div>
    


    </>
  );
}

export default Nav;
