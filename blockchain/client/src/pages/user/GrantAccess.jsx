import React from "react";
import { useState } from "react";
import "./GrantAccess.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const GrantAccess = ({ setGrantAccess, contract }) => {

  const [open, setOpen] = useState(false);
  const [success,setSucc]=useState(false);
  const [pos, setpos] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = pos;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSucc(false);
  };
  const sharing = async () => {
    console.log("Clicked");
    setOpen(true);
    const address = document.querySelector("#address").value;
    await contract.grantAccessToDoctor(address,1);
    setOpen(false);
    setSucc(true);
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
            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                key={vertical + horizontal}
                                open={open}
                                message="Processing"
                            />
                            <Snackbar 
                                open={success} 
                                autoHideDuration={6000} 
                                onClose={handleClose} 
                                anchorOrigin={{ vertical, horizontal }}
                                key={vertical + horizontal}>
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        Added Doctor Successfully
                                    </Alert>
                            </Snackbar>
          </div>
        </div>
      </div>
    </>
  );
};
export default GrantAccess;
