import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {connectionsRequestApi,connectionsRequestReviewApi} from "../Redux/reduxThunk/connectionThunk"


const ConnectionRequests = () => {
    const dispatch=useDispatch()

    const {connectionRequests,loading}=useSelector((store)=>store.connectionsSlice)

    console.log(connectionRequests,"uediw")


    useEffect(()=>{
        dispatch(connectionsRequestApi())
    },[dispatch])

const accepectOrRejectRequest=(status,_id)=>{
    dispatch(connectionsRequestReviewApi({status,_id}))

}

if(loading){
    return <>
    
    <h1> loading</h1>
    
    </>
}

if (!connectionRequests || connectionRequests.length <= 0) {
    return <h1>No pending requests</h1>;
  }


    
  return (
    <div className="flex justify-center items-center flex-col gap-3">

        <h1>
            Connections Requests
        </h1>
<div >
        {
            connectionRequests?.map((connection,index)=>{
                return (<div key={index} className="w-[90%] md:w-[50%] flex items-center gap-3 border-2 my-2  p-2">
                      <div className="rounded-full">
                        <img src={connection.fromUserId.photoUrl} alt="" className="w-16 h-16 rounded-full" />
                      </div>
                      <div>
                        <p>{connection.fromUserId.firstName + " " + connection.fromUserId.lastName}</p>
                        <p>{connection.fromUserId.about}</p>
                        
                        <div className="flex gap-2 mt-2">
                            <button className="btn "  onClick={()=>accepectOrRejectRequest("accepted",connection._id)}>accepted</button>
                            <button className="btn" onClick={()=>accepectOrRejectRequest("rejected",connection._id)}>rejected</button>
                        </div>
                      </div>
                </div>)
            })
            
        }

</div>
       </div>
  )
}

export default ConnectionRequests