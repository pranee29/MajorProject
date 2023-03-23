import React from "react";
import { Link } from "react-router-dom";


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";


const MyDetailsDoc = ({ state }) => {
   
    
   
   
    
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
        <>

            
            <div className="flex w-full h-screen" style={ { textAlign:"center", backgroundColor: "azure"} }>
                <aside>
                    <Navbar/>
                </aside>   
                <main className="flex-1 ml-44">
                    <button type="submit" onClick={getDetails}>Details</button>
                        <div>
                        abcsdf {account[0]}
                        </div>
                </main>
            </div>


        
        </>
    );
  
}

export default MyDetailsDoc;
