import React from 'react'
import "./style.css";

const Loader = () => {
  return (
    <div className='flex h-screen justify-center items-center gap-3'>
        <div className="container1">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
        <div className="container1">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
        <div className="container1">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
   </div>
  )
}

export default Loader