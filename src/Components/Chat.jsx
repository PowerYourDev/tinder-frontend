
import { useEffect,  useRef,  useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createSocketConnnection } from "../utilis/socket"
import axios from "axios"
import { BASE_URL } from "../utilis/constant"




const Chat = () => {
   const {userRequestId} =useParams()
   const loggedInUser=useSelector((store)=>store.userSlice.data)
   const loggedInUserId=loggedInUser._id

   const [messages,setMessages]=useState([])
   const [newMessage,setNewMessage]=useState("")

console.log(messages)

  

   console.log(userRequestId,loggedInUserId)

   const handleSendNEwMessage=({loggedInUserId,userRequestId,newMessage})=>{

    const socket=createSocketConnnection()

    socket.emit("sendMessage",{firstName:loggedInUser.firstName,loggedInUserId,userRequestId,newMessage})
    setNewMessage("")

   

   }

   const fetchPrevmessage=async()=>{
       const response=await axios.get(`${BASE_URL}/api/chat/view/${userRequestId}`,{withCredentials:true})
       const chatMessages = response?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          _id:senderId._id
        };
      });
      setMessages(chatMessages);
    };
   

   useEffect(()=>{
    const socket=createSocketConnnection()

    socket.emit("joinChat",{firstName:loggedInUser.firstName,loggedInUserId,userRequestId})

    socket.on("messageReceived", ({ firstName, newMessage,loggedInUserId  }) => {
        console.log(firstName + " :  " + newMessage);
        setMessages((messages) => [...messages, { firstName,  text:newMessage,_id:loggedInUserId }]);
      });


    return ()=>{
        socket.disconnect()
    }

   },[])

   useEffect(()=>{
      fetchPrevmessage()
   },[])



   const messagesEndRef = useRef(null);

   // Use useEffect to scroll to the last message when messages change
   useEffect(() => {
     // Scroll to the bottom of the container
     if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
      }
   }, [messages]);




  return (
    <div className="w-full flex justify-center flex-1  my-3">
    <div className="w-[95%] md:w-[70%]  border flex flex-col">
         <div className="border-b ">
            <h3>Chat</h3>
         </div>

         {/* messages */}
         
        <div className="flex flex-col  flex-1   "> 
        <div className="flex-1 flex overflow-y-auto mb-10 scroll">
            <div className="w-full m-2 ">

                {messages?.map((message,index)=>{

                
                
                return  <div key={index} className={`chat ${message._id===loggedInUserId?'chat-end':'chat-start'} `}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="chat-header">
                {message.firstName }
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>



              </div>


                }
                )}
           
 <div ref={messagesEndRef} />

            </div>
      
         </div>


         <div className="border-t p-2 flex ">
          <input type="text " value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className="flex-1 text-white bg-transparent border " placeholder="type your mesage"/>
          <button className="border-t-indigo-900 mx-2 "  onClick={()=>handleSendNEwMessage({loggedInUserId,userRequestId,newMessage})} >send</button>
         </div>
        </div>
    </div>
    </div>
  )
}

export default Chat