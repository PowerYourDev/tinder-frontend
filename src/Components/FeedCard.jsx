import { useDispatch } from "react-redux"
import { sendFriendRequest } from "../Redux/reduxThunk/feedThunk"
import { FaRegHeart } from "react-icons/fa";

import { RxCross2 } from "react-icons/rx";





const FeedCard = ({userFeed}) => {
  console.log()
  const dispatch =useDispatch()
    const {firstName,lastName,photoUrl,about,age,gender}=userFeed 





const handleSendRequest=(status,_id)=>{

  console.log(_id,"dsfjkksdlsdlklk")
    dispatch(sendFriendRequest({status,_id}))

}



  return (
   


    <div className="flex  justify-center items-center  w-full">
    {/* <div className="card bg-[rgba(0,0,0,0.7)]  w-96 shadow-xl ">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      <p>{age +" " + gender}</p>
      <p>{about}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" onClick={()=>handleSendRequest("interested",userFeed._id)}>Interested</button>
        <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",userFeed._id)}>Ignore</button>
      </div>
    </div>
  </div> */}

  <div className="w-[24%]  flex flex-col items-center justify-center  p-3 bg-[#323650] rounded-xl  ">
      {/* <div className="w-[30%] h-[30%] pt-[6%]">
        <img src={photoUrl} alt="" className="rounded-full w-full h-full border" />
      </div> */}

      <div className="w-[100%]   pt-2">
        <img src={photoUrl} alt="" className=" w-full rounded object-cover h-[300px]" />
      </div>

      <div className="pt-5 flex flex-col items-center">
        <h2 className="text-[#fdffff] text-2xl ">{firstName +" "+ lastName}</h2>

        <h2 className="text-[#9fa1bc] mt-2 text-lg">{age + " "+ gender}</h2>
        <p className="text-[#fdffff] font-normal text-lg">{about}</p>
      </div>

      <div className="flex justify-center gap-3 mt-3">
        <div className="bg-[#db4386] cursor-pointer p-4 rounded-full flex justify-center items-center " onClick={()=>handleSendRequest("interested",userFeed._id)}><FaRegHeart size={28} className="text-white"/></div>
        <div className="bg-[#1272fd] cursor-pointer p-4 rounded-full flex justify-center items-center " onClick={()=>handleSendRequest("ignored",userFeed._id)}><RxCross2 size={28} className="text-white"/></div>
      
      </div>

      
  </div>


  </div>
 
  )
}

export default FeedCard