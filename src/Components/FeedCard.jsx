import { useDispatch } from "react-redux"
import { sendFriendRequest } from "../Redux/reduxThunk/feedThunk"



const FeedCard = ({userFeed}) => {
  console.log()
  const dispatch =useDispatch()
    const {firstName,lastName,photoUrl,about}=userFeed 





const handleSendRequest=(status,_id)=>{

  console.log(_id,"dsfjkksdlsdlklk")
    dispatch(sendFriendRequest({status,_id}))

}



  return (
    <div className="flex justify-center items-center">
    <div className="card bg-base-100 w-96 shadow-xl ">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      {/* <p>{age +" " + gender}</p> */}
      <p>{about}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" onClick={()=>handleSendRequest("interested",userFeed._id)}>Interested</button>
        <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",userFeed._id)}>Ignore</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default FeedCard