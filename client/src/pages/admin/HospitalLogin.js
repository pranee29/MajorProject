import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./Navbar";

const HospitalLogin = ({ state, account }) => {
  
  const [transaction, setTransaction] = useState([]);
  
  const { contract } = state;
  
    // useEffect(() => {
    //   const memosMessage = async () => {
    //     const address = document.querySelector("#address1").value;
    //     const memos = await contract.getDoctorDetails("0x58a063BbCA839A181E16b1EB79ce40503b1C676F").call();
    //     setMemos(memos);
    //   };
    //   contract && memosMessage();
    // }, [contract]);

  const getDoc= async (event) =>{
    event.preventDefault();
    const { contract } = state;
    const address1 = document.querySelector("#address1").value;
    console.log("Clicked get doc");
    try{
      const transaction =await contract.getDoctorDetails(address1);
      setTransaction(transaction);
    }
    catch(error){
      alert(error);
    }
  }

  const setDoc = async (event) => {
      
      event.preventDefault();
      const { contract } = state;
      const address = document.querySelector("#address").value;
      const name = document.querySelector("#name").value;
      const num = document.querySelector("#num").value;
      console.log("abcdef");
      try{  
        const transaction = await contract.setDoctorDetails(true,address,num,name);
        await transaction.wait();
        alert("Done");
      }
      catch(error){
        alert(error);
      }
      
    };




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
            <div className="mb-3">
              {/* <label className="form-label">Get by Doctor address     </label>
              <input
                type="text"
                className="form-control placeholder:italic outline outline-offset-2 outline-1"
                id="address1"
                placeholder="Enter Address"
              /> */}
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Name</b>           :  Demo</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>id </b>           :  1234567</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Phone Number</b>   :  9012345678</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Location</b>       :  Hyderabad</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>Public Address</b> :  {account}</p>
              <p style={{textAlign:"start", marginTop:"10px"}}><b>email</b>          :  demo_1@gmail.com</p>
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

      </>
    );
  };
 


export default HospitalLogin