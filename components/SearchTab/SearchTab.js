import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { COLORS, SPACING } from '../../styles/Styling.js';

export default function SearchTab(props) {
    const [leftActive, setLeftActive] = useState(props.leftSide);
    const [rightActive, setRightActive] = useState(props.rightSide);
    const [middleActive, setMiddleActive]= useState(props.middleSide);


    useEffect(() => {
        if (props.leftSide) {
            setRightActive(false)
            setMiddleActive(false)
            setLeftActive(true)
        } else if (props.middleSide) {
            setRightActive(false)
            setMiddleActive(true)
            setLeftActive(false)
        } else if (props.rightSide) {
            setRightActive(true) 
            setMiddleActive(false)
            setLeftActive(false)
        }
    }, [props.leftSide, props.rightSide, props.middleSide]);


    const toggleTabs = (side) => {
       if(side === "TOP"){
        setLeftActive(true)
        props.setLeftSide(true)
        setMiddleActive(false)
        props.setMiddleSide(false)
        setRightActive(false)
        props.setRightSide(false)
       }
       else if(side === "USERS"){
        setLeftActive(false)
        props.setLeftSide(false)
        setMiddleActive(true)
        props.setMiddleSide(true)
        setRightActive(false)
        props.setRightSide(false)
       }
       else if(side === "POSTS"){
        setLeftActive(false)
        props.setLeftSide(false)
        setMiddleActive(false)
        props.setMiddleSide(false)
        setRightActive(true)
        props.setRightSide(true)
       }
    }


    return (
        <MainTabContainer margin={props.margin}>
            <LeftTab leftActive={leftActive} onClick={()=>toggleTabs(props.leftText)}>
                <TxtTab leftActive={leftActive}>{props.leftText}</TxtTab>
            </LeftTab>
            <MiddleActive middleActive={middleActive} onClick={()=>toggleTabs(props.middleText)}>
                <TxtTab middleActive={middleActive}>{props.middleText}</TxtTab>
            </MiddleActive>
            <RightTab rightActive={rightActive} onClick={()=>toggleTabs(props.rightText)}>
                <TxtTab rightActive={rightActive}>{props.rightText}</TxtTab>
            </RightTab>
        </MainTabContainer>
    )
}

const MainTabContainer = styled.div`
    display: flex;
    height: 40px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.borderColor.color};
    background-color: ${({ theme }) => theme.containerSecondary.color};
    margin-left: ${props => props.margin ? SPACING.large : 0}px;
    margin-right: ${props => props.margin ? SPACING.large : 0}px;
    overflow: hidden;
`;

const LeftTab = styled.div`
    display: flex;
    flex: 1;
    height: 100% ;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.name == "light" && props.leftActive ? COLORS.white :
                                        props.theme.name == "light" && !props.leftActive ? "none" :
                                            props.theme.name == "dark" && props.leftActive ? COLORS.black : "none"};
    cursor: pointer;
    border-top-right-radius: ${props => props.leftActive ? 10 : 0}px;
    border-bottom-right-radius: ${props => props.leftActive ? 10 : 0}px;
    border-right: 2px solid ${props => props.leftActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    box-shadow: 7px 0px 10px ${props => props.leftActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    z-index:  ${props => props.leftActive ? 99 : 1};
`;
const MiddleActive = styled.div`
    display: flex;
    flex: 1;
    height: 100% ;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.name == "light" && props.middleActive ? COLORS.white :
                                        props.theme.name == "light" && !props.middleActive ? "none" :
                                            props.theme.name == "dark" && props.middleActive ? COLORS.black : "none"};
    cursor: pointer;
    border-top-right-radius: ${props => props.middleActive ? 10 : 0}px;
    border-top-left-radius: ${props => props.middleActive ? 10 : 0}px;
    border-bottom-right-radius: ${props => props.middleActive ? 10 : 0}px;
    border-bottom-left-radius: ${props => props.middleActive ? 10 : 0}px;
    border-right: 2px solid ${props => props.middleActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    border-left: 2px solid ${props => props.middleActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    box-shadow: 7px 0px 10px ${props => props.middleActive ? ({ theme }) => theme.borderColor.color : "transparent"}, -7px 0px 10px ${props => props.middleActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    z-index:  ${props => props.middleActive ? 99 : 1};
`;

const RightTab = styled.div`
    display: flex;
    flex: 1;
    height: 100% ;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.name == "light" && props.rightActive ? COLORS.white :
                                    props.theme.name == "light" && !props.rightActive ? "none":
                                        props.theme.name == "dark" && props.rightActive ? COLORS.black : "none"};
    cursor: pointer;
    border-top-left-radius: ${props => props.rightActive ? 10 : 0}px;
    border-bottom-left-radius: ${props => props.rightActive ? 10 : 0}px;
    border-left: 2px solid${props => props.rightActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    box-shadow: -7px 0px 10px ${props => props.rightActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    z-index:  ${props => props.rightActive ? 99 : 2};
`;

const TxtTab = styled.p`
    font-family: ${props => props.rightActive ? "LatoBlack" : props.leftActive ? "LatoBlack" : "LatoRegular"};
`;

