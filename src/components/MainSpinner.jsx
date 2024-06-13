import React from 'react'
import { PuffLoader } from "react-spinners"
const MainSpinner = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <PuffLoader color="#0000FF" size={80}/>
        </div>
    )
}

export default MainSpinner