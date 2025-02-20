

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
<div className="card bg-base-300 w-96 shadow-xl ">
  <div className="card-body">
   <div className="flex flex-col gap-2">
   <label htmlFor="">email</label>
   <input type="email" />
   </div>
   <div className="flex flex-col gap-2">
   <label htmlFor="">password</label>
   <input type="password" />
   </div>
  </div>
</div>

    </div>
    
  )
}

export default Login