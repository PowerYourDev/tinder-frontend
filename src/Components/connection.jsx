import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import connections from "../Redux/reduxThunk/connectionThunk"


const Connection = () => {
const dispatch=useDispatch()

const{data}=useSelector((store)=>store.connectionsSlice)
console.log(data,"sddkdks")


    useEffect(()=>{
        dispatch(connections())
    },[dispatch])
  return (
       <div className="flex justify-center items-center flex-col gap-3">

        <h1>
            Connections
        </h1>
<div >
        {
            data.map((connection,index)=>{
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