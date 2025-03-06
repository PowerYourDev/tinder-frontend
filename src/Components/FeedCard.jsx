

const FeedCard = ({userFeed}) => {
    const {firstName,lastName,photoUrl,about}=userFeed
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      {/* <p>{age +" " + gender}</p> */}
      <p>{about}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
  )
}

export default FeedCard