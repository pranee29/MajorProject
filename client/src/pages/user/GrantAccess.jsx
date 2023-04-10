
import { useEffect } from "react";
import "./GrantAccess.css";
const GrantAccess = ({ setGrantAccess, contract }) => {
  
  const sharing = async () => {
    console.log("Clicked");
    const address = document.querySelector("#address").value;
    await contract.grantAccessToDoctor(address,1);
    setGrantAccess(false);
  };
  
  return (
    <>
      <div className="GrantAccessBackground">
        <div className="GrantAccessContainer">
              <div className="title"><b>Share with</b></div>
          <div className="body">
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
            ></input>
          </div>
          

          <div className="footer">
            <button
              onClick={() => {
                setGrantAccess(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}><b>Grant Access</b></button>
          </div>
        </div>
      </div>
    </>
  );
};
export default GrantAccess;
// const GrantAccess=()=>{
//   const grantAccess= async (event) =>{
//     event.preventDefault();
//     const { contract } = state;
    
//     console.log("Clicked get doc");
//     try{
//       const transaction = false
//       await contract.grantAccessToDoctor(address1,1);
//       // console.log(transaction);
//       // setTransaction(transaction);
//       transaction=true
//       console.log(transaction)
//     }
//     catch(error){
//       alert(error);
//     }
//     console.log(transaction[0]);
// }
// return (
//       <>
//         <div className="GrantAccessBackground">
//           <div className="GrantAccessContainer">
//                 <div className="title"><b>Share with</b></div>
//             <div className="body">
//               <input
//                 type="text"
//                 className="address"
//                 placeholder="Enter Address"
//               ></input>
//             </div>
//             <form id="myForm">
//               <select id="selectNumber">
//                 <option className="address "><b>Doctors With Access</b></option>
//               </select>
//             </form>
//             <div className="footer">
//               <button
//                 onClick={() => {
//                   setGrantAccess(false);
//                 }}
//                 id="cancelBtn"
//               >
//                 Cancel
//               </button>
//               <button onClick={() => grantAccess()}><b>Grant Access</b></button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
// }

// import { useEffect } from "react";
// import "./GrantAccess.css";
// const GrantAccess = ({ setGrantAccess, contract }) => {

//   const sharing = async () => {
//     const address = document.querySelector(".address").value;
//     await contract.grantAccessToDoctor(address,1);
//     setGrantAccess(false);
//   };
//   useEffect(() => {
//     const accessList = async () => {
//       const addressList = await contract.shareAccess();
//       let select = document.querySelector("#selectNumber");
//       const options = addressList;

//       for (let i = 0; i < options.length; i++) {
//         let opt = options[i];
//         let e1 = document.createElement("option");
//         e1.textContent = opt;
//         e1.value = opt;
//         select.appendChild(e1);
//       }
//     };
//     contract && accessList();
//   }, [contract]);
//   return (
//     <>
//       <div className="GrantAccessBackground">
//         <div className="GrantAccessContainer">
//               <div className="title"><b>Share with</b></div>
//           <div className="body">
//             <input
//               type="text"
//               className="address"
//               placeholder="Enter Address"
//             ></input>
//           </div>
//           <form id="myForm">
//             <select id="selectNumber">
//               <option className="address "><b>Doctors With Access</b></option>
//             </select>
//           </form>
//           <div className="footer">
//             <button
//               onClick={() => {
//                 setGrantAccess(false);
//               }}
//               id="cancelBtn"
//             >
//               Cancel
//             </button>
//             <button onClick={() => grantAccessToDoctor()}><b>Grant Access</b></button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

