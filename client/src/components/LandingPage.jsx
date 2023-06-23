import React from 'react'
import ReactPlayer from 'react-player';
import videoFile from '../img/bjjvid.mp4';
// import bjjvid.mp4 from 'bjjvid.mp4';


const LandingPage = () => {
  return (
    <>
      <h1 className='text-overlay container text-white banner mt-4 pt-4 ' >Register to view Brazilian Jiu Jitsu Open Mats near you!</h1>
      <div className="background-video bg-black">
        <ReactPlayer 
          url={videoFile}
          playing
          loop
          muted
          width="100%"
            height="100%"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', objectFit: 'cover' }}
          // margin= "0px"
          // padding= "0px"
          // width="100%"
          // height="100%"
          // style={{ position: 'absolute', top: 0, left: 0 }}
      />
      </div>
  </>
  
  )
}

export default LandingPage