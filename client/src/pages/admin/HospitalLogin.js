import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./Navbar";

const HospitalLogin = ({ state, account }) => {
  
    return (
      <>  
       <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }> 
       <aside>
       <Navbar/>
       
      </aside>
       <main>
       <p className="text-4xl">Hello..   {account}</p>
        <div className="w-screen flex justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800"  style={{backgroundColor: "white"}} >
            <div><b>Your Details...</b></div><br></br>
            <hr></hr>
            <div className="mb-3" >
            
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Name</b>           :  Admin</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>id </b>           :   {account[0]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Phone Number</b>   :  9012345678</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Location</b>       :  Hyderabad</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>email</b>          :  demo_1@gmail.com</p>
            </div><br></br>

          </form>  
        </div>
        </main>
      </div>
      </>
    );
  };
 


export default HospitalLogin