import { useEffect } from "react";

export default function useClickDetecter(ref, funct, except, bool) {
  useEffect(() => {
    function handleClickOutside(myEvent) {

      if (ref.current && !ref.current.contains(myEvent.target) &&
       (!except.current.contains(myEvent.target) && bool))
      {
        funct();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, funct, except, bool]);
}

