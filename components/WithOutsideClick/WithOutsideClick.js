
import React from "react";
import useOnClickOutside from '../../Hooks/useOnClickOutside';

/*
    WithOutsideClick:: ReactComponent -> ReactComponent 
    A function which takes a callback function and returns a functional component which, when the user clicks outside of, the callback is triggered
    useful when you want something to hide itself when a user clicks on something (anything) else
    William Doyle
    April 22nd 2022
*/
export default function WithOutsideClick(ComponentToWrap) {

    return function WrappedWithClick({wrapperCallback, ...props}) {
        const wrapperRef = React.useRef(null);
        useOnClickOutside(wrapperRef, wrapperCallback);
        return <div ref={wrapperRef}>
            <ComponentToWrap {...props}/>
        </div>
    }
}