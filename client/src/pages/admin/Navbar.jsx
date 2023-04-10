import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";




function Navbar({state}) {

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

     <div className="bg-slate-700 w-46 fixed left-0 top-0 h-screen p-10 ">
      
      <nav>
      <hr />
        <Link to={"/"} className="text-white" >Home</Link><br></br>
        <hr />
        <Link to={"/hospital"} className="text-white"> Hospital </Link><br></br>
        <hr />
        <Link to={"/hospital/searchdoc"} className="text-white" >
          Search Doctor
        </Link><br></br>
        <hr />
        <Link to={"/hospital/adddoc"} className="text-white" >
          Add Doctor Details
        </Link>
        <hr />

      </nav>
    </div>
    


    </>
  );
}

export default Navbar;
