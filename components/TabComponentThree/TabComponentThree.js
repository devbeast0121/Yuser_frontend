import React from 'react'
import styled from 'styled-components';
import { COLORS, SPACING } from '../../styles/Styling.js';

export default function TabComponentThree(props) {

    const toggleTabs = (side) => {
        if (side == "left") {
            props.setLeftSide()
        }
        else if (side == "middle") {
            props.setMiddleSide()
        }
        else if (side == "right") {
            props.setRightSide()
        }
    }


    return (
        <MainTabContainer margin={props.margin}>
            <LeftTab leftActive={props.leftSide} onClick={() => toggleTabs("left")}>
                <TxtTab leftActive={props.leftSide}>{props.leftText}</TxtTab>
            </LeftTab>
            <MiddleActive middleActive={props.middleSide} onClick={() => toggleTabs("middle")}>
                <TxtTab middleActive={props.middleSide}>{props.middleText}</TxtTab>
            </MiddleActive>
            <RightTab rightActive={props.rightSide} onClick={() => toggleTabs("right")}>
                <TxtTab rightActive={props.rightSide}>{props.rightText}</TxtTab>
            </RightTab>
        </MainTabContainer>
    )
}

const MainTabContainer = styled.div`
    display: flex;
    flex: 1;
    height: 40px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.borderColor.color};
    background-color: ${({ theme }) => theme.containerSecondary.color};
    margin-left: ${props => props.margin ? SPACING.large : 0}px;
    margin-right: ${props => props.margin ? SPACING.large : 0}px;
    margin-top: ${props => props.margin ? SPACING.large : 0}px;
    overflow: hidden;

    @media screen and (max-width: 700px){
        margin-top: 0px;
        margin-left: ${SPACING.medium}px;
        margin-right: ${SPACING.medium}px;
        margin-bottom: ${props => props.margin ? SPACING.medium : 0}px;
    }
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
    border-right: 1px solid ${props => props.leftActive ? ({ theme }) => theme.borderColor.color : "transparent"};
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
    border-right: 1px solid ${props => props.middleActive ? ({ theme }) => theme.borderColor.color : "transparent"};
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
        props.theme.name == "light" && !props.rightActive ? "none" :
            props.theme.name == "dark" && props.rightActive ? COLORS.black : "none"};
    cursor: pointer;
    border-top-left-radius: ${props => props.rightActive ? 10 : 0}px;
    border-bottom-left-radius: ${props => props.rightActive ? 10 : 0}px;
    border-left: 2px solid${props => props.rightActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    box-shadow: -7px 0px 10px ${props => props.rightActive ? ({ theme }) => theme.borderColor.color : "transparent"};
    z-index:  ${props => props.rightActive ? 99 : 2};
`;

const TxtTab = styled.p`
    font-family: ${props => props.rightActive ? "LatoBlack" : props.middleActive ? "LatoBlack" : props.leftActive ? "LatoBlack" : "LatoRegular"};
`;

