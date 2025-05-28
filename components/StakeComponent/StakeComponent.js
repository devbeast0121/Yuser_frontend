import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { COLORS, SPACING, FONT_SIZE } from '../../styles/Styling.js';
import Icon from "../Icon/Icon";
import { DetermineSource } from '../../stores/tools.js';
import Button from "../Button/Button";
import GemPink from '../../public/icons/gem-pink.svg';
import Diamond from "../../public/icons/diamond.svg";
import Nugget from '../../public/icons/nugget.svg';
import Duplicate from '../../public/icons/duplicate.svg';
import StakeConverter from '.././StakeConverter/StakeConverter';

export default function StakeComponent(props) {

    const [stake, setStake] = useState(props.stake);
    const [stakeChoosen, setStakeChoosen] = useState("");
    const [stakeConvertorVisible, setStakeConvertorVisible] = useState(false)
    const [cornerIcon,setCornerIcon] = useState(null);
    

    useEffect(()=>{
        let type = stake?.poolType;
        switch(type){
            case "Staking":
                setCornerIcon(null);
                break;
            case "Hashtag":
                setCornerIcon(Nugget)
                break;
            case "Collective":
                setCornerIcon(Duplicate)
                break;
            default:
                break;
        }
    },[stake])

    useEffect(()=>{
        if(stakeConvertorVisible){
            document.body.style.overflow="hidden";
        }
        else{
            document.body.style.overflow="auto";
        }
    },[stakeConvertorVisible])

    function onStakeClick(choosenStake) {
        setStakeConvertorVisible(!stakeConvertorVisible);
        if (choosenStake._id == stake._id) {
            setStakeChoosen(choosenStake)
        }
    }

    return (
        <StakeContainer  // onClick={() => { OpenSideBarModal(props.stake) }}
        >
            <ImageNFT
                //src={DetermineSource(props.stake.image, "m")}
                src={props.stake.poolImage}
            />
            <TopBox>
                <div style={{ flexDirection: "column" }}>
                    <TxtLarge>{stake.poolName}</TxtLarge>
                    {stake.challenge && <TxtChallenge>{stake.challenge}</TxtChallenge>}
                </div>
                {cornerIcon && <Icon width="auto" height="24px" name={cornerIcon} />}
            </TopBox>
            <BottomBox>
                <div style={{ flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start'  }}>
                    <p style={{ textAlign: "center",color:"white"}}>{"Staking"}</p>
                    <BtnWrap positionLeft={true}>
                        <Icon width="auto" height="34px" name={GemPink} />
                        <TxtLarge style={{ textAlign: "left" }} paddingLeft={true}>
                            {stake.userStake}
                        </TxtLarge>
                    </BtnWrap>
                </div>
                <div style={{ flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-end'  }}>
                    <p style={{ textAlign: "center",color:"white"}}>{"Rewards"}</p>
                    <BtnWrap positionLeft={false}>
                        <Icon width="auto" height="34px" name={Diamond} />
                        <TxtLarge style={{ textAlign: "right" }} paddingLeft={true}>
                            {stake.userRewards}
                        </TxtLarge>
                    </BtnWrap>
                </div>
            </BottomBox>
            <BtnWrapper>
                <Button
                    text={'STAKE'}
                    onClick={() => onStakeClick(stake)}
                    isIcon={false}
                    color={"transparent"}
                    size={"small"}
                    className={"FullWidth"}
                    border={true}
                    borderColor={COLORS.purple}
                    colorText={COLORS.white}
                />
            </BtnWrapper>
            {stakeConvertorVisible && (stakeChoosen._id == stake._id) ?
                <StakeConverter
                    stake={stakeChoosen}
                    stakeConvertorVisible={stakeConvertorVisible}
                    setStakeConvertorVisible={setStakeConvertorVisible}
                    setStakeChoosen={setStakeChoosen}
                    updatePool={props.updatePool}
                />
                : null}
        </StakeContainer>
    )
}

const StakeContainer = styled.div`
    width: 100%; 
    max-height: 280px;
    height: 75vw;
    flex-direction: column;
    position: relative;
    margin-bottom: ${SPACING.large}px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.containerSecondary.color};
    border: none;
`;

const ImageNFT = styled.img`
    display: flex;
    width:  100%;
	height: 100%;
    object-fit: cover;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

    @media screen and (max-width: 900px){
        max-width: 650px;
        max-height: max-width;
    }
`;

const BottomBox = styled.div`
    position: absolute;
    bottom: 75px;
    left: ${SPACING.large}px;
    right: ${SPACING.large}px;
    z-index: 1;
    flex-direction: row;
    justify-content: space-between;
`;

const BtnWrap = styled.div`
   background-color: transparent;
   font-family: 'LatoBlack';
   justify-content: ${props => props.positionLeft ? "flex-start" : "flex-end"};
   align-items: center;
   height: 40px;
   display: flex;
`;

const TxtLarge = styled.p`
    font-size: ${FONT_SIZE.large}px;
    font-family: 'LatoBlack';
    padding-left: ${props => props.paddingLeft ? SPACING.small : 0}px;
    color: ${COLORS.white};
`;

const BtnWrapper = styled.div`
    position: absolute;
    bottom: ${SPACING.large}px;
    left: ${SPACING.large}px;
    right: ${SPACING.large}px;
    z-index: 9;
`;

const TopBox = styled.div`
    position: absolute;
    top:  ${SPACING.large}px;
    left: ${SPACING.large}px;
    right: ${SPACING.large}px;
    z-index: 1;
    flex-direction: row;
    justify-content: space-between;
`;

const TxtChallenge = styled.p`
    color: ${COLORS.yellow};
    font-family: 'LatoBlack';
    padding-top: ${SPACING.medium}px;
`;