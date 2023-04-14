import { useState } from "react";
import "./display.css";
const Display = ({ state, account }) => {
    const { contract } = state;
   console.log("This ia acoi"+account) 
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    
    console.log("This is dA"+contract[0]+" " + account);
    dataArray = await contract.getPatientDetails(account);
    if(dataArray)  console.log(dataArray)
    else console.log("you dont have access")
    console.log("hello    "+dataArray)
    const isEmpty = Object.keys(dataArray[5]).length === 0;
    console.log("hello")

    if (!isEmpty) {
      const str = dataArray[5].toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to getHealthRecords");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      {/* <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input> */}
      <button className="center button" onClick={getdata}>
        show My Files
      </button>
    </>
  );
};
export default Display;