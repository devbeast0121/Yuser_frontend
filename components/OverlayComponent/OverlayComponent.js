import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';



export default inject('store')(observer(
    function OverlayComponent(props) {

        return (
            <>
                <OverlayMain
                style={{backgroundColor:props.backgroundColor?props.backgroundColor:"rgba(0,0,0,0.5)"}}
                    onClick={props.closeOverlay}
                    overlayVisible={props.overlayVisible}
                />
            </>
        )
    }
))

const OverlayMain = styled.div`
    position: fixed; /* Sit on top of the page content */
    display: ${props => props.overlayVisible ? "block" : "none"};
    width: 100vw; /* Full width (cover the whole page) */
    height: 100vh; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 99; /* Specify a stack order in case you're using a different order for other elements */
  `;