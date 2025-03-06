import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {connectionsApi} from "../Redux/reduxThunk/connectionThunk"


const Connection = () => {
const dispatch=useDispatch()

const{connections}=useSelector((store)=>store.connectionsSlice)

console.log(connections)

    useEffect(()=>{
        dispatch(connectionsApi())
    },[dispatch])


    if(!connections) return <h1>loading</h1> 
  return (
       <div className="flex justify-center items-center flex-col gap-3">

        <h1>
            Connections
        </h1>
<div >
        {
            connections.map((connection,index)=>{
                return (<div key={index} className="flex items-center gap-3 border-2 my-2  p-2">
                      <div className="rounded-full">
                        <img src={connection.photoUrl} alt="" className="w-16 h-16 rounded-full" />
                      </div>
                      <div>
                        <p>{connection.firstName + " " + connection.lastName}</p>
                        <p>{connection.about}</p>
                      </div>
                </div>)
            })
        }

</div>
       </div>
  )
}

export default Connection