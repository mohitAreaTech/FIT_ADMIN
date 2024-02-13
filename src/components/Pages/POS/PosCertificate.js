import React from 'react'
import { useLocation } from 'react-router-dom'

const PosCertificate = () => {
  const location = useLocation();
  const Data = location.state.data;
  console.log("data", Data)

  const handlePrint = () => {
    document.getElementById('main').classList.add("d-none")
    window.print()
    setTimeout(() => {
      document.getElementById('main').classList.remove("d-none")
    }, 1000);
  }
  return (
    <>
      <div style={{ height: "100%", width: '100%' }} dangerouslySetInnerHTML={{ __html: Data }}>

      </div>
      <button onClick={() => {
        handlePrint()
      }} className="btn btn-primary position-absolute" id="main"> Download Certificate</button>
    </>
  )
}

export default PosCertificate