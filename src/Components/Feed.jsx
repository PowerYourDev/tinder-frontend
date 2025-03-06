import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"

import FeedCard from "./FeedCard"

import { feedData } from "../Redux/reduxThunk/feedThunk"

const Feed = () => {
  const dispatch=useDispatch()

const {error,loading,data}=useSelector((store)=>store.FeedSlice)
console.log(data,"djjdjd")
const userFeed=data&&data[0]
    
console.log(error,loading,data)


useEffect(()=>{
  dispatch(feedData())

},[dispatch])

if(!data) return
    
  return (

    
    <div>
      

      <FeedCard userFeed={userFeed}/>
      
    </div>
  )
}

export default Feed