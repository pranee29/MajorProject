import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Nav from "./NavBar";


const MyDetails = ({ state }) => {
    
    const [account, setTransaction] = useState([]);

    const getDetails= async (event) =>{
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
      <div>
        <aside>

        <Nav/>
        </aside>
        <div className="py-40 shadow-xl bg-blue-300 flex justify-center items-center flex-col my-56 mx-80 rounded-md border">
            <p>Name : Ranfom123</p>
            <p>Phone Number : 091093904</p>
            <p>id : aqe14anf</p>
        </div>
      </div>
    );
  
}

export default MyDetails;
