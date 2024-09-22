import React from 'react'
import CRMimg from '../Images/CRMimg.png'

const Home = () => {
  return (
    <div>
      <h3>We are Internet Service provider<span className="badge rounded-pill bg-info text-dark" style={{fontSize:"15px", marginLeft:"5px"}}>CRM</span>
      </h3>
      <img src={CRMimg} width="1050px" height="450px"/>
    </div>
  )
}

export default Home