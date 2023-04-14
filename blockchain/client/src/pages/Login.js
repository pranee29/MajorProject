import { Link } from "react-router-dom"

function Login(){
    return(
        <div className="bg-[url('./assests/202.gif')] bg-cover bg-no-repeat">
            <br></br>
            <h1 style={{ textAlign:"center"}} className="text-4xl text-pink-500 italic" > Medical Record Management System </h1>
            
            <div className="flex w-full h-screen justify-evenly items-center ">
            
            <Link to={'/hospital'}>
            <img src="hospital-buildings.png" alt="Hospital" width="150" height="150" className="bg-gray-300 rounded-full hover:scale-110 ease-out duration-300"/>
            <p style={{ textAlign:"center"} } className="bg-violet-300 italic">ADMIN</p>
            </Link>

            <Link to={'/doctor'}>
            <img src="doctor.png" alt="Doctor" width="150" height="150" className="bg-gray-300 rounded-full hover:scale-110 ease-out duration-300"/>
            <p style={{ textAlign:"center"} } className="bg-violet-300 italic">DOCTOR</p>
            </Link>
            
            <Link to={'/user'}>
                <img src="user.png" alt="User" width="150" height="150" className="bg-gray-300 rounded-full hover:scale-110 ease-out duration-300"/>
                <p style={{ textAlign:"center"} } className=" bg-violet-300 italic">PATIENT</p>
            </Link>

            <Link to={'/help'}>
                <img src="help.png" alt="User" width="150" height="150" className="bg-gray-300 rounded-full hover:scale-110 ease-out duration-300"/>
                <p style={{ textAlign:"center"} } className=" bg-violet-300 italic">HELP</p>
            </Link>
            
            
        </div>
        </div>
    )
}
export default Login