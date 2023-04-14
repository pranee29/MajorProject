import { useState, useEffect } from "react";
import {ethers}  from "ethers";
import Nav from "./NavBar";



const UserLogin = ({ state, account }) => {

      return (
        <>
        
          <div className="flex w-full h-screen" style={ { textAlign:"center", backgroundColor: "azure"} }> 
          <Nav/>
            <main className="flex-1 ml-44">  
              <p className="text-4xl">Hello : {account}</p>
            </main>
          </div>
        </>
      );

      }

export default UserLogin