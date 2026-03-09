import { useEffect } from "react";
import { Link } from "react-router";

const NoMatch = () => {
    useEffect(() => {
        localStorage.setItem("location", "")
    }, [])

    return (
      <>
       <center>
    <img className="w-3xl h-full" src="./src/assets/404.jpg" alt="Blog Image" />
</center>
  

</>
    )
}

export default NoMatch