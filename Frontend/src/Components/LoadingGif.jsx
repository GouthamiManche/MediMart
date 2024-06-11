import React from 'react'
import loadingGif2 from "../assets/loadinggif.gif"
import loadinggif from "../assets/282.gif"
//import loadingGif from "../assets/Infinity@1x-2.8s-200px-200px.gif"
//import loadinggif from "../assets/LoadingGIFF.gif"

function LoadingGif() {
    return (
        // <img src={loadingGif} alt="loading..." />
        <div className="h-[36rem] flex justify-center">
<img className="my-auto" src={loadinggif} alt="Loading icon" />
  {/* <img className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" /> */}
</div>
    )
}

export default LoadingGif