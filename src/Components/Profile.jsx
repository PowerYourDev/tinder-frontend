import { useEffect, useRef, useState } from "react"
import { useSelector,useDispatch } from "react-redux";
import FeedCard from "./FeedCard";
import {userProfileUpdate,getUserProfileData} from "../Redux/reduxThunk/ProfileThunk"
import { FaUserEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCameraOutline } from "react-icons/io5";
import Cropper from 'react-easy-crop';
import ProfileCard from "./ProfileCard";


const Profile = () => {
const dispatch =useDispatch()
    const {loading,data}=useSelector((store)=>store?.ProfileSlice)
    console.log(data,",,,,,")

    const [editProfile,setEditProfile]=useState(false)
    const [showCard,setShowCard]=useState(false)


    const [image, setImage] = useState(null);  
  const [crop, setCrop] = useState({ x: 0, y: 0 });  
  const [zoom, setZoom] = useState(1);  
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };


    const onCropComplete = (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    };
   

    const getCroppedImage = async () => {
      if (!image || !croppedAreaPixels) return;
    
      // Create a canvas to generate the cropped image
      const imageElement = document.createElement('img');
      imageElement.src = image;
    
      // Return a promise that resolves when the image is loaded
      const imageLoadPromise = new Promise((resolve, reject) => {
        imageElement.onload = () => resolve(imageElement);
        imageElement.onerror = reject; // In case of an error loading the image
      });
    
      try {
        // Wait until the image is fully loaded
        await imageLoadPromise;
    
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        const { x, y, width, height } = croppedAreaPixels;
    
        // Set canvas size to the cropped area size
        canvas.width = width;
        canvas.height = height;
    
        // Draw the cropped image to the canvas
        ctx.drawImage(imageElement, x, y, width, height, 0, 0, width, height);
    
        // Convert the canvas to a data URL (base64 string)
        const croppedImageUrl = canvas.toDataURL('image/jpeg');
    
        console.log(croppedImageUrl, "Cropped Image URL");
        setImage(null) 
        setUserData((prevData) => ({
          ...prevData, 
          photoUrl: croppedImageUrl, 
        }));


      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    
  
    const [userData, setUserData] = useState({
      firstName:data?.firstName,
      lastName: data?.lastName,
      age: data?.age,
      gender: data?.gender,
      about:data?.about,
      photoUrl:data?.photoUrl

    });

    

    console.log(userData,"dskdskdlkl")
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
    
  
      dispatch(userProfileUpdate(userData))
      setEditProfile(false)
    };

   const handleEditProfile=()=>{
    setEditProfile(!editProfile)
   }

   const handleShowProfile=()=>{
    setShowCard(!showCard)

    
   }

   const fileInputRef =useRef(null);

  // Function to trigger file input click
  const handleCameraClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

    useEffect(()=>{
      if(!data?.firstName){
        dispatch(getUserProfileData())
      }
      
    },[dispatch])

    useEffect(() => {
      if (data) {
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          age: data.age || "",
          gender: data.gender || "",
          about: data.about || "",
          photoUrl: data.photoUrl || "",
        });
      }
    }, [data]);

     if(loading){
      return <h1>loading</h1>
     } 
  
    return (
      <div className="w-full flex-1 flex justify-center items-center ">
     {image && (
    
    <div className="absolute h-screen w-full flex justify-center items-center z-40">
   <div className="absolute w-[50%] h-[70%] p-4 bg-black mb-8 ">



   <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}// Aspect ratio of 1:1 for square cropping
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        objectFit = "contain"

      
      />
   <div className="absolute bottom-2 right-2 z-50">
  <button onClick={getCroppedImage} className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
    Crop
  </button>
</div>
         </div>
     
   
   </div>
 
)}



{ !showCard &&<div className="flex flex-col justify-center items-center">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
          <div className="flex relative items-center p-4 space-x-4 mb-4">

 {!editProfile && 
 <div  onClick={handleEditProfile} className="flex  cursor-pointer gap-2 justify-center items-center p-2 bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ">
    <FaUserEdit className="text-white text-3xl" /><p className="text-white">edit Profile</p>
  </div>}

  

<div onClick={handleShowProfile} className={`absolute right-0 flex cursor-pointer gap-2 justify-center items-center p-2 bg-green-500 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300 `}>
    <CgProfile className="text-white text-3xl" /> <p className="text-white">show card</p>
  </div>

</div>
{!showCard&&<>
           <div className="flex justify-center  ">
      <div className="relative">
      <img src={userData.photoUrl} alt=""  className="w-36 h-36 rounded-full border"/>
{ editProfile&&     <IoCameraOutline size={28} onClick={handleCameraClick} className="text-white  absolute bottom-2 right-2 cursor-pointer "/>}
      <input type="file" accept="image/*" onChange={onFileChange} ref={fileInputRef}   className="hidden"   disabled={!editProfile}/>
      
      </div>
           
           </div>
           <div  className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  required
                  className={`bg-transparent border p-1.5 rounded-md ${!editProfile&& "cursor-not-allowed"}`}
                  disabled={!editProfile}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  required
                  className={`bg-transparent border p-1.5 rounded-md ${!editProfile&& "cursor-not-allowed"}`}
                  disabled={!editProfile}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                  required
                  className={`bg-transparent border p-1.5 rounded-md ${!editProfile&& "cursor-not-allowed"}`}
                  disabled={!editProfile}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  required
                  className={`bg-transparent border p-1.5 rounded-md ${!editProfile&& "cursor-not-allowed"}`}
                  disabled={!editProfile}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  value={userData.about}
                  onChange={handleInputChange}
                  required
                  className={`bg-transparent border p-1.5 rounded-md ${!editProfile&& "cursor-not-allowed"}`}
                  disabled={!editProfile}
                />
              </div>
              <div className="flex justify-center my-2">
                <button  className="btn w-28" onClick={handleSubmit} >
                  Submit
                </button>
              </div>
            </div>
            </>
}
          </div>
        </div>
       

        
        

      </div>}
      {showCard&& <ProfileCard userFeed={userData} handleShowProfile={handleShowProfile}/> }
      </div>
    );
  };
  
  export default Profile;