/*
  subscribeToReloadWarning
  William Doyle
  March 2nd 2022
  To be called in a useEffect hook like this:
    React.useEffect(subscribeToReloadWarning, [])
  
  The effect of this function is to subscribe to a warning about leaving the page when the component calling this function from useEffect is mounted.
  It returns a function that unsubscribes from the warning.
*/
export default function subscribeToReloadWarning() {
  if (typeof window === "undefined") return;

  // console.log(`👂 Begin listening for 'beforeunload' event`);

  const warnUserWhenTheyTryToLeave = e => {
    e.preventDefault();
    e.returnValue = "";
  }

  window.addEventListener("beforeunload", warnUserWhenTheyTryToLeave);

  return () => {
    // console.log(`🛑👂 Stop listening for 'beforeunload' event`);
    window.removeEventListener("beforeunload", warnUserWhenTheyTryToLeave);
  }
}