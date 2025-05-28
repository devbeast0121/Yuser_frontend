import React from 'react';
import styled from 'styled-components';

/**
 * HOW TO USE  see: ProtocolComponent.js
 *              <Box>
                    <GradientSection
                        gradient1={red} deg1={190} opaque1Start={.9}
                        gradient2={violet} deg2={140} opaque2Start={.9}
                        gradient3={pink} deg3={360} opaque3Start={.9}
                        gradient4={blue} deg4={0} opaque4Start={.9} 
                        />
                    <WrapperNav>   <---------- if have the navigation
                        <NavMenuHorizontal
                            ...
                        />
                    </WrapperNav> 
                    <WrapperComponent style={{top: 90}}>  // {top: 90} if have the navigation or other additional styles (like: style={{flexDirection: "column", justifyContent: "center"}})
                        <ImageContentComponent
                           ...
                        />
                    </WrapperComponent>
                </Box>
 * wrap into WrapperComponent to center elements or components 
 * 
 * export const Box = styled.div`
    display: flex;
    position: relative;
`;

 * export const WrapperComponent = styled.div`
    position: absolute;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;
 */

const GradientSection = (props) => {
    return (
        <Section
            bagroundColor={props.bagroundColor}
            opacity={props.opacity}
            angle={props.angle}
            colorStart={props.colorStart}
            colorStartLength={props.colorStartLength}
            colorSecond={props.colorSecond}
            colorSecondLength={props.colorSecondLength}
            colorMiddle={props.colorMiddle}
            colorMiddleLength={props.colorMiddleLength}
            colorStop={props.colorStop}
            zIndex={props.zIndex}
         >
        </Section>
    )
}

export default GradientSection

const Section = styled.div`
    display: flex;
    flex-direction: column;
    height:100%;
    width: 100%;
    justify-content:center;
    align-items:center;
    background-color: ${props => props.bagroundColor};
    opacity:  ${props => props.opacity};
    background: linear-gradient(${props => props.angle}deg, ${props => props.colorStart} ${props => props.colorStartLength}, ${props => props.colorSecond} ${props => props.colorSecondLength} ${props => props.colorSecond ? ',' : null} ${props => props.colorMiddle} ${props => props.colorMiddleLength} ${props => props.colorMiddle ? ',' : null} ${props => props.colorStop});       
    position: absolute;
    z-index:  ${props => props.zIndex};//99;
`;