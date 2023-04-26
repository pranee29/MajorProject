import { Link } from "react-router-dom"

function Help(){
    return(
        <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }>
            <Link to={"/"} className="text-2xl bg-slate-700 text-white" style={ { textAlign:"center"} } >Home</Link><br></br>
            <div style={{marginTop:"50px"}}>
                <div>
                    <b>User needs metamask as a wallet to interact with the blockchain. Internet connection is mandatory</b>
                </div>
                <br></br>
                <div>
                    <b>Admin</b>
                    <div>Admin can add doctors and get the details of the doctors</div>
                    <div>To add the doctor details there should be ethers</div>
                    <div> For searching with the address there is no need of ethers. While searching by name there should be some amount of ethers</div>
                </div>


            </div>
        </div>
        
    )
}
export default Help