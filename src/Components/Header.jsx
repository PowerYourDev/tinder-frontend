import { useSelector,useDispatch } from "react-redux"
import { userLogOut } from "../Redux/reduxThunk/userThunk"
import { useNavigate } from "react-router-dom"



const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

    const user=useSelector((store)=>store.userSlice.data)
    console.log(user)

    const handleUserLogoout=()=>{
      console.log("sjds")
      dispatch(userLogOut())
    }

    const handleNavigate=(path)=>{
      navigate(path)
    } 

   
  return (
    <div>
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">DeV MeeT</a>
  </div>
  <div className="flex-none gap-2">
    {/* <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div> */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li onClick={()=>handleNavigate("/profile")}>
          <a className="justify-between">
            Profile
           
          </a>
        </li>
        <li onClick={()=>handleNavigate("/connections")}>
          <a className="justify-between">
            connections
           
          </a>
          </li>
        <li onClick={()=>handleNavigate("/feed")}>
          <a className="justify-between">
            feed
           
          </a>
        </li>
        <li onClick={handleUserLogoout}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Header