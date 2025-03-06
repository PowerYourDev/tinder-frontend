import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux";
import FeedCard from "./FeedCard";
import {userProfileUpdate,getUserProfileData} from "../Redux/reduxThunk/ProfileThunk"


const Profile = () => {
const dispatch =useDispatch()
    const {loading,data}=useSelector((store)=>store?.ProfileSlice)
   
  
    const [userData, setUserData] = useState({
      firstName:data?.firstName,
      lastName: data?.lastName,
      age: data?.age,
      gender: data?.gender,
      about:data?.about,
    });

    console.log(data,"dskdskdlkl")
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
    
  
      dispatch(userProfileUpdate(userData))
    };

    useEffect(()=>{
      if(!data?.firstName){
        dispatch(getUserProfileData())
      }
      
    },[dispatch])

     if(loading){
      return <h1>loading</h1>
     } 
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <div  className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  value={userData.about}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-center my-3">
                <button  className="btn w-28" onClick={handleSubmit} >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <FeedCard userFeed={userData}/>
      </div>
    );
  };
  
  export default Profile;