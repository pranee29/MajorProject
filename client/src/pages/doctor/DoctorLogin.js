
import { ethers } from "ethers";
import { useState } from "react";

import Nav from "./Navbar";



const DoctorLogin = ({ state }) => {

    
    
    


    return (
      <>
      
        <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }> 
        <Nav/>
          <main className="flex-1 ml-44">  
            <p className="text-4xl">Doctor Page</p>
            <br></br><br></br>
            <p>Here you can add Patient Details and can also search for the Patient Details </p><br></br><br></br>
            </main>
        </div>
      </>
    );
  };
 


export default DoctorLogin