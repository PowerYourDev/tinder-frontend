import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { feedData } from "../Redux/reduxThunk/feedThunk";

const Feed = () => {
  const dispatch = useDispatch();
  const { error, loading, data } = useSelector((store) => store.FeedSlice);

  useEffect(() => {
    dispatch(feedData());
  }, [dispatch]);

 
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }


  if (error) {
    return (
      <div>
        <h1>Something went wrong, please try again later.</h1>
      </div>
    );
  }


  if (!data || data.length === 0) {
    return (
      <div>
        <h1>No profiles found</h1>
      </div>
    );
  }

 
  return (
    <div className="flex flex-1 justify-center items-center ">
      
        <FeedCard key={data[0]._id} userFeed={data[0]} />
  
    </div>
  );
};

export default Feed;
