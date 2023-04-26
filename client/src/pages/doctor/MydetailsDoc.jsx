import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";


const MyDetailsDoc = ({ state,account }) => {
    
    const [transaction, setTransaction] = useState([]);
    const [details,setDetails] =useState([]);
    const { contract } = state;
    
    useEffect(() => {
      const memosMessage = async () => {
        try{
        const details = await contract.getDoctorDetailsForDoc(account[0]);
        setDetails(details);
        console.log(details);
        }
        catch(error){
          alert("You are not a doctor");
        }
      };
      contract && memosMessage();
    }, [contract]);


    return (
        <>

            
            <div className="flex h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }>
                <aside>
                    <Navbar/>
                </aside>   
                
                <main>
       
                <div className="w-screen flex justify-evenly flex-col" style={ { marginLeft:"300px",width:"80%",textAlign:"center" ,marginTop:"90px"} }>
                <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800"  style={{backgroundColor: "white",marginTop:"90px"}} >
            <div><b>Your Details...</b></div><br></br>
            <hr></hr>
            <div className="mb-3">
              
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Name</b>           :  {details.at(2)}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>id </b>           :  {account[0]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Phone Number</b>   :  {details[3]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Qualification</b>           :  {details[4]}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Hospital</b>           :  {details[5]}</p>
              
              
            </div><br></br>
              
            
            

          </form>
        
        
        
        </div>
        </main>
            </div>


        
        </>
    );
  
}

export default MyDetailsDoc;
