import React from "react";

/*
    useOnClickOutside
    based on: {
      https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
      solution by: https://stackoverflow.com/users/1212039/ben-bud
      retrieved on: April 5th 2022
      retrieved by: William Doyle
    }
    Adapted By William Doyle
    April 5th 2022
    Originally for use with the WrappedPost and its GiftBar children
    Runs the callback function when the user clicks outside of the component
*/
export default function useOnClickOutside(ref, callback) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) 
        callback();
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside); // Unbind the event listener on clean up
  }, [ref]);
}