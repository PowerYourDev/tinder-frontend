import { useEffect, useRef, useState } from "react"
import { useSelector,useDispatch } from "react-redux";
import FeedCard from "./FeedCard";
import {userProfileUpdate,getUserProfileData} from "../Redux/reduxThunk/ProfileThunk"
import { FaUserEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCameraOutline } from "react-icons/io5";
import Cropper from 'react-easy-crop';
import ProfileCard from "./ProfileCard";

import { useForm } from "react-hook-form";

const Profile = () => {
const dispatch =useDispatch()
const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const {loading,data}=useSelector((store)=>store?.ProfileSlice)
    console.log(data,",,,,,")

    const [editProfile,setEditProfile]=useState(false)
    const [showCard,setShowCard]=useState(false)

    const [errorPhotoUrl,setErrorPhotoUrl]=useState(false)

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
          setValue("photoUrl", reader.result);
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
  
    const handleSubmitForm = (data) => {
   console.log(data,"dsjodoodsois")
  
      dispatch(userProfileUpdate(data))
      setEditProfile(false)
    };

   const handleEditProfile=()=>{
    setEditProfile(!editProfile)
   }

   const handleShowProfile=()=>{
    setShowCard(!showCard)

    
   }

   const fileInputRef =useRef(null);

  
  const handleCameraClick = () => {
    fileInputRef.current.click(); 
  };

    useEffect(()=>{
      if(!data?.firstName){
        dispatch(getUserProfileData())
      }
      
    },[dispatch])

    useEffect(() => {
      if (data) {
        setValue("firstName", data.firstName || "");
        setValue("lastName", data.lastName || "");
        setValue("age", data.age || "");
        setValue("gender", data.gender || "");
        setValue("about", data.about || "");
        setValue("photoUrl", data.photoUrl || "");
      }
    }, [data ]);

     if(loading){
      return <h1>loading</h1>
     } 
  
     return (
      <div className="w-full flex-1 flex justify-center items-center">
        {image && (
          <div className="absolute h-screen w-full flex justify-center items-center z-40">
            <div className="absolute w-[50%] h-[70%] p-4 bg-black mb-8 ">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                objectFit="contain"
              />
              <div className="absolute bottom-2 right-2 z-50">
                <button
                  onClick={getCroppedImage}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  Crop
                </button>
              </div>
            </div>
          </div>
        )}
  
        {!showCard && (
          <div className="flex flex-col justify-center items-center">
            <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                <div className="flex relative items-center p-4 space-x-4 mb-4">
                  {!editProfile && (
                    <div
                      onClick={handleEditProfile}
                      className="flex cursor-pointer gap-2 justify-center items-center p-2 bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 "
                    >
                      <FaUserEdit className="text-white text-3xl" />
                      <p className="text-white">Edit Profile</p>
                    </div>
                  )}
  
                  <div
                    onClick={handleShowProfile}
                    className="absolute right-0 flex cursor-pointer gap-2 justify-center items-center p-2 bg-green-500 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300 "
                  >
                    <CgProfile className="text-white text-3xl" /> <p className="text-white">Show Card</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                  <div className="flex justify-center ">
                    <div className="relative">
                      <img
                        src={userData.photoUrl}
                        alt=""
                        className="w-36 h-36 rounded-full border"
                      />
                      {editProfile && (
                        <IoCameraOutline
                          size={28}
                          onClick={handleCameraClick}
                          className="text-white absolute bottom-2 right-2 cursor-pointer"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        ref={fileInputRef}
                        className="hidden"
                        disabled={!editProfile}
                        // {...register("photoUrl", { required: "profile photo is required" })}
                        // defaultValue={userData.photoUrl}
                      />
                      {errorPhotoUrl && (
                        <p className="text-red-500 text-sm">pkjdfi</p>
                      )}
                    </div>
                  </div>
  
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        {...register("firstName", { required: "First name is required" })}
                        defaultValue={userData.firstName}
                        className={`bg-transparent border p-1.5 rounded-md ${!editProfile && "cursor-not-allowed"}`}
                        disabled={!editProfile}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                      )}
                    </div>
  
                    <div className="flex flex-col gap-1">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        {...register("lastName", { required: "Last name is required" })}
                        defaultValue={userData.lastName}
                        className={`bg-transparent border p-1.5 rounded-md ${!editProfile && "cursor-not-allowed"}`}
                        disabled={!editProfile}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                      )}
                    </div>
  
                    <div className="flex flex-col gap-1">
                      <label htmlFor="age">Age</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        {...register("age", { required: "Age is required",  min: {
                          value: 18, 
                          message: "Age must be at least 18"
                        }, 
                        max: {
                          value: 100,
                          message: "Age must be less than or equal to 100"
                        }})}
                        defaultValue={userData.age}
                        className={`bg-transparent border p-1.5 rounded-md ${!editProfile && "cursor-not-allowed"}`}
                        disabled={!editProfile}
                      />
                      {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                    </div>
  
                    <div className="flex flex-col gap-1">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        {...register("gender", { required: "Gender is required" })}
                        defaultValue={userData.gender}
                        className={`bg-transparent border p-1.5 rounded-md ${!editProfile && "cursor-not-allowed"}`}
                        disabled={!editProfile}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm">{errors.gender.message}</p>
                      )}
                    </div>
  
                    <div className="flex flex-col gap-1">
                      <label htmlFor="about">About</label>
                      <textarea
                        id="about"
                        name="about"
                        {...register("about", { required: "About is required" })}
                        defaultValue={userData.about}
                        className={`bg-transparent border p-1.5 rounded-md ${!editProfile && "cursor-not-allowed"}`}
                        disabled={!editProfile}
                      />
                      {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
                    </div>
  
                    <div className="flex justify-center my-2">
                      <button
                        disabled={!editProfile}
                        className={`btn w-28 ${!editProfile && "cursor-not-allowed"}`}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {showCard && <ProfileCard userFeed={userData} handleShowProfile={handleShowProfile} />}
      </div>
    );
  };
  
  export default Profile;