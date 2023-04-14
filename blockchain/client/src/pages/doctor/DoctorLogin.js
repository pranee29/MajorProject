
import { ethers } from "ethers";
import { useState } from "react";

import Nav from "./Navbar";



const DoctorLogin = ({ state }) => {

    const [transaction, setTransaction] = useState([]);
    
    
    const getPatient= async (event) =>{
       //  event.preventDefault();
        console.log("Clicked");
        const { contract } = state;
        const address1 = document.querySelector("#address1").value;
        try{
          console.log("Clicked");
          const transaction =await contract.getPatientDetails(address1);
          console.log("Clicked");
          setTransaction(transaction);      
        }
        catch(error){
          alert(error);
        }
    }

    const setHealthRecordsDetails = async (event) => {
      event.preventDefault();
      const { contract } = state;
      const address = document.querySelector("#address").value;
      const name = document.querySelector("#name").value;
      const prescription = document.querySelector("#prescription").value+" ,";
      try{
        const transaction = await contract.setHealthRecordsDetails(name,address,prescription);
        await transaction.wait();
        alert("Done");  
      }
      catch(error){
        alert(error);
      } 
    };
    
    


    return (
      <>
      
        <div className="flex w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }> 
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