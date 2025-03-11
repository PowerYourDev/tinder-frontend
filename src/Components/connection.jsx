import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {connectionsApi} from "../Redux/reduxThunk/connectionThunk"
import { useNavigate } from "react-router-dom"



const Connection = () => {
const dispatch=useDispatch()
const navigate=useNavigate()

const{connections}=useSelector((store)=>store.connectionsSlice)


const handleConnectionChat=(id)=>{
    navigate('/chat/'+id)
}

    useEffect(()=>{
        dispatch(connectionsApi())
    },[dispatch])


    if(!connections) return <h1>loading</h1> 
  return (
    <div className="w-full">
       <div className="flex justify-center items-center flex-col gap-3 ">

        <h1>
            Connections
        </h1>
<div className="w-[50%]" >
        {
            connections.map((connection,index)=>{
                return (<div key={index} className="flex items-center justify-between gap-3 border-2 my-2  p-2 ">
                    <div className="flex items-center">
                      <div className="rounded-full">
                        <img src={connection.photoUrl} alt="" className="w-16 h-16 rounded-full" />
                      </div>
                      <div>
                        <p>{connection.firstName + " " + connection.lastName}</p>
                        <p>{connection.about}</p>
                      </div>
                      </div>
                      <div>
                        <button className="border px-4 py-2 bg-slate-500 rounded-md" onClick={()=>handleConnectionChat(connection._id)}>chat</button>
                      </div>
                </div>)
            })
        }

</div>
       </div>
       </div>
  )
}

export default Connection