import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Nav() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Doctor 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        MENU
        <br></br><br></br>
        <Divider />
        <nav>
            <Link to={"/"} className="text-black" ><HomeIcon/> Home</Link><br></br>

            <br></br>

            <Link to={"/doctor/myDetails"} className="text-black"> Doctor </Link><br></br>
            
            <br></br>

            <Link to={"/doctor/searchpatient"} className="text-black" ><SearchIcon/> Search Patient</Link><br></br>
            
            <br></br>
            
            <Link to={"/doctor/addpatient"} className="text-black" ><PersonAddIcon/> Add Patient Details</Link>
        </nav>
        
        
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}


// import React from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";


// function Nav({state}) {

//   const [account, setTransaction] = useState([]);

//   const getDetails= async (event) =>{
//     event.PreventDeafult();
//     const { ethereum } = window;
//     if (ethereum) {
//       const account = await ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setTransaction(account);
//       console.log(account[0]);
//     }
    
//   }
  
//   return (
//     <>
     
//     <div className="bg-slate-700 w-46 fixed left-0 top-0 h-screen p-10">
//       <nav >
//       <hr />
//         <Link to={"/"} className="text-white" >Home</Link><br></br>
//         <hr />
        
//         {/* <Link to={"/doctor"} className="text-white" >Doctor</Link><br></br>
//         <hr /> */}
//         <Link to={`/doctor/${account[0]}`} className="text-white">
//             My Details
//         </Link><br></br>
//         <hr />
//         <Link to={"/doctor/addpatient"} className="text-white" >
//             Set Patient Details
//         </Link><br></br>
//         <hr />
//         <Link to={"/doctor/searchpatient"} className="text-white">
//             Search Patient
//         </Link><br></br>
//         <hr />

//       </nav>
//     </div>
    


//     </>
//   );
// }

// export default Nav;
