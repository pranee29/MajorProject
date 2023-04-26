import { Link } from "react-router-dom"

import {
    Carousel,
    initTE,
  } from "tw-elements";
  import { useEffect } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Login(){
  
  useEffect(() => {
    initTE({ Carousel });
  }, []);
    
  return(
        // <div className="bg-[url('./assests/202.gif')] bg-cover bg-no-repeat">
        //     <br></br>
        //     <h1 style={{ textAlign:"center"}} className="text-4xl text-pink-500 italic" > Medical Record Management System </h1>
            
        //     <div className="flex w-full h-screen justify-evenly items-center ">
            
            // <Link to={'/hospital'}>
            // <img src="hospital-buildings.png" alt="Hospital" width="150" height="150" className="bg-gray-300 rounded-full hover:scale-110 ease-out duration-300"/>
            // <p style={{ textAlign:"center"} } className="bg-violet-300 italic">ADMIN</p>
            // </Link>

        //     <Link to={'/doctor'}>
        //     <img src="doctor.png" alt="Doctor" width="150" height="150" className="bg-gray-300 rounded-full hover:scale-110 ease-out duration-300"/>
        //     <p style={{ textAlign:"center"} } className="bg-violet-300 italic">DOCTOR</p>
        //     </Link>
            
        //     <Link to={'/user'}>
        //         <img src="user.png" alt="User" width="150" height="150" className="bg-gray-300 rounded-full hover:scale-110 ease-out duration-300"/>
        //         <p style={{ textAlign:"center"} } className=" bg-violet-300 italic">PATIENT</p>
        //     </Link>

        //     <Link to={'/help'}>
        //         <img src="help.png" alt="User" width="150" height="150" className="bg-gray-300 rounded-full hover:scale-110 ease-out duration-300"/>
        //         <p style={{ textAlign:"center"} } className=" bg-violet-300 italic">HELP</p>
        //     </Link>
            
            
        // </div>
        // </div>
        <>
           
        <div
  id="carouselExampleCaptions"
  className="relative w-full"
  
  data-te-carousel-init
  data-te-carousel-slide>
    
  <div
    className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
    data-te-carousel-indicators>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="0"
      data-te-carousel-active
      className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-current="true"
      aria-label="Slide 1"></button>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="1"
      className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 2"></button>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="2"
      className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 3"></button>
      
  </div>

  <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
    <div
      className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-active
      data-te-carousel-item
      style={{ backfaceVisibility: "hidden"}}>
          
      <img
        src="eth4.jpg"
        className="block w-full h-screen"
        alt="..." />
      <div>
        <div className="absolute inset-x-[15%] top-5 hidden py-5 text-center text-white md:block">
            <h5 className="text-xl"><b>Medical Record Management System </b></h5>
            <br></br>
            <Link to={'/hospital'}><h5 className="text-xl"><b>Admin </b></h5> </Link>
            <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 350 }}
                    image="doc.png"
                    title="Add doctor"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Add Doctor Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Add Doctor details like Name, Metamask Address, Phone Number, Qualification, Hospital Name 

                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button>
                      <Link to={'/hospital/adddoc'}> Add Doctors </Link>
                    </Button>
                    
                  </CardActions>
            </Card>                
        </div>
              
        <div className="absolute hidden py-5 text-center text-white md:block right-72 top-28">   
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 350 }}
                    image="search.png"
                    title="search"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Search Doctor Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Search for doctor details by using the metamask address or by the name
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button>
                      <Link to={'/hospital/searchdoc'}> Search Doctors </Link>
                    </Button>
                    
                  </CardActions>
                </Card>
          
        </div>

      </div>
    </div>
    

    <div
      className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      style={{ backfaceVisibility: "hidden"}}>
      <img
        src="eth.jpg"
        className="block w-full h-screen"
        alt="..." />
      <div>
        <div
          className="absolute inset-x-[15%] top-5 hidden py-5 text-center text-black md:block">
            <h5 className="text-xl"><b>Medical Record Management System </b></h5>
                <br></br>
                <Link to={'/doctor'}><h5 className="text-xl"><b> Doctor </b></h5> </Link>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 350 }}
                    image="search1.png"
                    title="search"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Search Pateint Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Search for Patient details by using the metamask address or by the name
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button>
                      <Link to={'/doctor/searchpatient'}> Patient Doctors </Link>
                    </Button>
                    
                  </CardActions>
                  
                </Card>
          
                
        </div>
              
              <div
                className="absolute hidden py-5 text-center text-white md:block right-72 top-28">
                
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 350 }}
                    image="files.png"
                    title="files"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Add Patient Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Add Patient details like Name, Metamask Address, Phone Number, Prescription, Files 

                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button>
                      <Link to={'/doctor/addpatient'}> Add Patient </Link>
                    </Button>
                    
                  </CardActions>

                </Card>
          
                
              </div>
              
      </div>
    </div>
    
    <div
      className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      style={{ backfaceVisibility: "hidden"}} >
      <img
        src="docbg.jpg"
        className="block w-full h-screen"
        alt="..." />
      <div>
              <div
                className="absolute inset-x-[15%] top-5 hidden py-5 text-center text-black md:block">
                <h5 className="text-xl"><b>Medical Record Management System </b></h5>
                <br></br>
                <Link to={'/user'}><h5 className="text-xl"><b>Patient </b></h5> </Link>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 350 }}
                    image="patient.jpg"
                    title="My details"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Patient Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Patient Profile

                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button>
                      <Link to={'/user/myDetails'}> Details</Link>
                    </Button>
                    
                  </CardActions>
                </Card>
          
                
              </div>
              
              <div
                className="absolute hidden py-5 text-center text-white md:block right-72 top-28">
                
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 300 }}
                    image="grant.png"
                    title="Grant"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Grant Access 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Give Access to the doctors by entering the address of the doctor or search by name and give access to doctor
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button>
                      <Link to={'/user/searchDoctor'}> Grant  </Link>
                    </Button>
                    
                  </CardActions>
                </Card>
          
                
              </div>
              <div></div>
      </div>
    </div>
  </div>


  <button
    className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    data-te-target="#carouselExampleCaptions"
    data-te-slide="prev">
    <span className="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </span>
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Previous</span
    >Previous
  </button>
  
  <button
    className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    data-te-target="#carouselExampleCaptions"
    data-te-slide="next">
    <span className="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </span>
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Next</span
    > Next 
  </button>
</div>

        </>
    );
}
export default Login