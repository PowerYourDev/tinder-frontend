import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";

import { RxCross2 } from "react-icons/rx";

const ProfileCard = ({userFeed,handleShowProfile}) => {
    const {firstName,lastName,photoUrl,about,age,gender}=userFeed 
  return (
    <div className="w-full">
       <div className="flex justify-center">
        <div className="flex justify-end  w-[24%]">
       <div onClick={handleShowProfile} className={`w-[150px] flex cursor-pointer gap-2 justify-center items-center p-2 bg-green-500 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300 `}>
            <CgProfile className="text-white text-3xl" /> <p className="text-white">show form</p>
          </div>
          </div>
       </div>
     <div className="flex  justify-center items-center w-full mt-2 ">
       
    
      <div className="w-[24%] flex flex-col items-center p-3 bg-[#323650] rounded-xl  ">
        
    
          <div className="w-[100%]   pt-2">
            <img src={photoUrl} alt="" className=" w-full rounded object-cover h-[300px]" />
          </div>
    
          <div className="pt-5 flex flex-col items-center">
            <h2 className="text-[#fdffff] text-2xl ">{firstName +" "+ lastName}</h2>
    
            <h2 className="text-[#9fa1bc] mt-2 text-lg">{age + " "+ gender}</h2>
            <p className="text-[#fdffff] font-normal text-lg">{about}</p>
          </div>
    
          <div className="flex justify-center gap-3 mt-3">
            <div className="bg-[#db4386] cursor-pointer p-4 rounded-full flex justify-center items-center " ><FaRegHeart size={28} className="text-white"/></div>
            <div className="bg-[#1272fd] cursor-pointer p-4 rounded-full flex justify-center items-center " ><RxCross2 size={28} className="text-white"/></div>
          
          </div>
    
          
      </div>
    
    
      </div>
      </div>
  )
}

export default ProfileCard