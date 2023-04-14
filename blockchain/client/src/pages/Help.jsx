import { Link } from "react-router-dom"

function Help(){
    return(
        <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }>
            <Link to={"/"} className="text-2xl bg-slate-700 text-white" style={ { textAlign:"center"} } >Home</Link><br></br>
            <div>
                
            </div>
        </div>
        
    )
}
export default Help