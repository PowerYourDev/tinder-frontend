import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {connectionsApi} from "../Redux/reduxThunk/connectionThunk"
import { useNavigate } from "react-router-dom"

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";



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

        <h1 className="text-xl pt-2">
            Connections
        </h1>
<div className="w-[50%] overflow-y-scroll scrolling-hide" >
        {
            connections.map((connection,index)=>{
                return (<div key={index} className="flex items-center justify-between gap-3 border-b my-2  p-3 overflow-auto">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full">
                        <img src={connection.photoUrl} alt="" className="w-16 h-16 rounded-full" />
                      </div>
                      <div>
                        <p className="text-lg font-bold">{connection.firstName + " " + connection.lastName}</p>
                        <p>{connection.about}</p>
                      </div>
                      </div>
                      <div onClick={()=>handleConnectionChat(connection._id)} className="cursor-pointer">
                         <IoChatbubbleEllipsesOutline size={28} />
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