import React, { useContext, useEffect, useState } from "react";
import {
    SubBox,
    PriceInput,
    TopBox,
    ButtonWrapper,
    OverlayContainer,
    TxtCurrentBid,
    PriceInputIIcon,
    TextWMOVR,
    BtnClose,
    TopContainer,
    TxtBid,
    BottomContainer,
    TxtLarge,
    TabWrapper
} from "./StakeConverter.elements";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-clock/dist/Clock.css";
import Icon from "../Icon/Icon";
import Close from "../../public/icons/close.svg"
import Button from "../Button/Button";
import { COLORS, FONT_SIZE, SPACING } from "../../styles/Styling.js";
import Arrow from "../../public/icons/rightArrow.svg"
import Nugget from '../../public/icons/nugget.svg';
import Duplicate from '../../public/icons/duplicate.svg';
import styled from 'styled-components';
import client from "../../pages/api/client";
import { useSession } from "next-auth/client";
import { useStore } from "../../stores/RootStore";
import { inject, observer } from "mobx-react";
import numeral from "numeral";
import InfiniteScroll from 'react-infinite-scroll-component';
import FadeLoader from "react-spinners/FadeLoader";
import { ThemeContext } from 'styled-components'


export default inject("store")(
    observer(function StakeConverter(props) {
    
    const theme = useContext(ThemeContext);
    const [priceError, setPriceError] = useState(false);
    const [priceValue, setPriceValue] = useState("");
    const [session, loading] = useSession();
    const [leftActive, setLeftActive] = useState(true);
    const [rightActive, setRightActive] = useState(false);
    const [gemStoneCount, setGemStoneCount] = useState("0")
    const [userStakeAmt,setUserStakeAmt] = useState("0");
    const [stake, setStake]= useState({})
    const [userStakes,setUserStakes] = useState([]);
    const [title, setTitle]=useState("")
    const [poolType,setPoolType] = useState("");
    const [typeIcon,setTypeIcon] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [loadingStakePos, setLoadingStakePos] = useState(false);
    const rootstore = useStore();

    const toggleTabs = () => {
        setPriceValue("");
        if (leftActive) {
            setLeftActive(false)
            setRightActive(true)
        } else {
            setLeftActive(true)
            setRightActive(false)
        }
    }

    const leftSideText = leftActive ? "FROM WALLET" : `FROM ${props.stake.poolType.toUpperCase()} POOL`;
    const rightSideText = rightActive ? "TO WALLET" : `TO ${props.stake.poolType.toUpperCase()}  POOL`;

    React.useEffect(() => {

        async function doEffect() {
        
            
        if(session){
            setIsLoading(true);
            const {user}=await client.reAuthenticate(true)
            setGemStoneCount(numeral(user.gems).format('0,0'))
            setIsLoading(false);
        }


        }
    doEffect();
    }, [session]);


    React.useEffect(() => {
        if(props.stake.poolName !==""){
            setStake(props.stake)
            setTitle(props.stake.poolName)
            setPoolType(props.stake.poolType)
            setUserStakeAmt(numeral(props.stake.userStake).format('0,0'));
        }
        let poolType = props?.stake?.poolType;
        switch (poolType){
            case 'Collective':
                setTypeIcon(Duplicate)
                break;
            case 'Staking':
                break;
            case 'Hashtag':
                setTypeIcon(Nugget)
                break;
            default:
                break;
        }
    }, [props.stake]);

    useEffect(async ()=>{
        setLoadingStakePos(true);
        let {userStakes} = await rootstore.getUserStakesInPool(props.stake.poolId);
        setUserStakes(userStakes);
        setLoadingStakePos(false);
    },[])

    async function onPressDeposit(){
        let poolId = stake.poolId;
        let stakeAmt = Number(priceValue);
        let stakingObj = {
            poolId,
            stakeAmt
        }
        if(stakeAmt > numeral(gemStoneCount).value()){
            showAppMessage(true,"You do not have enough gems to complete this deposit","error");
            return;
        }
        setIsLoading(true);
        if(leftActive){
            try{
                await rootstore.stakeGemsInPool(stakingObj);
                props.updatePool && props.updatePool(stakingObj);
                props.setStakeConvertorVisible && props.setStakeConvertorVisible(false);
                showAppMessage(true,`Successfully deposited ${stakeAmt} gems into pool.`,"success");
            }catch(err){
                console.log(err)
            }
        }
        setIsLoading(false);
    }

    async function onPressWithdraw(stakingPos){
        let poolId = stake.poolId;
        let stakeAmt = Number(stakingPos.amountStaked);
        let stakeId = stakingPos.id;
        setIsLoading(true);
        try{
            await rootstore.withdrawStakingPosition({poolId,stakeAmt,stakeId});
            showAppMessage(true,`Successfully withdrew ${stakeAmt} gems`,"success");
            props.updatePool && props.updatePool({poolId,stakeAmt:-stakeAmt});
            let newPosArr = userStakes.filter((pos)=>{
                return pos.id !== stakeId;
            })
            setUserStakes([...newPosArr]);
        }
        catch(err){
            showAppMessage(true,`There was an error when withdrawing your gems`,"error")
            console.log(err);
        }
        setIsLoading(false);
    }

    function handleStakechange(event) {
        setPriceValue(event.target.value)
    } 

    const closeStakeConverter = () => {
        props.setStakeConvertorVisible(false)
        props.setStakeChoosen("")
    }

    const renderStakePosition = (stake,index)=>{
        let stakedOn = new Date(stake.createdAt);
        let day = stakedOn.getDate();
        let month = stakedOn.getMonth()+1;
        let year = stakedOn.getFullYear();
        
        return (
            <StakePosition key={index}>
                <StakePosTxt>{`Amount Staked: ${numeral(stake.amountStaked).format('0,0')}`}</StakePosTxt>
                <StakePosTxt>{`Staked On: ${day}/${month}/${year}`}</StakePosTxt>
                <StakePostBtmBar>
                    <Button
                        text={"WITHDRAW" }
                        onClick={()=>onPressWithdraw(stake)}
                        disabled={priceError}
                        className={"FullWidth"}
                    />
                </StakePostBtmBar>
                
            </StakePosition>
        )
    }

    function renderLoading(){
        return(
            <LoadingOverlay>
                <FadeLoader color={theme.iconColor.color}/>
            </LoadingOverlay>
        )
    }

    function showAppMessage(show,message,type){
        if(!show){
            rootstore.setAppMessage(null,null)
        }
        else{
            rootstore.setAppMessage(message,type);
            setTimeout(()=>{showAppMessage(false)},10000);
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                //background: "COLORS.black50",
                background: "rgba(0, 0, 0, 0.25)",
                zIndex: 999999,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <OverlayContainer>
                <div style={{ position: 'absolute', top: 30, right: 40, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black20, borderRadius: 5 }}>
                    <BtnClose onClick={closeStakeConverter}>
                        <Icon
                            strokeWidth="3"
                            height="auto"
                            width="24px"
                            name={Close}
                            strokeColor={({ theme }) => theme.iconColor.color}
                        />
                    </BtnClose>
                </div>
                <TopContainer>
                    <TxtBid> {"Staking"}</TxtBid>
                    <div style={{ marginLeft: SPACING.large, alignItems: "flex-end", marginTop: 3 }}>
                        {typeIcon && <Icon width="auto" height="24px" name={typeIcon} />}
                        <TxtLarge>{title}</TxtLarge>
                    </div>
                     <TabWrapper>
                        <MainTabContainer margin={props.margin}>
                            <LeftTab leftActive={leftActive} onClick={toggleTabs}>
                                <TxtTab leftActive={leftActive}>{"STAKE"}</TxtTab>
                            </LeftTab>
                            <Divider />
                            <RightTab rightActive={rightActive} onClick={toggleTabs}>
                                <TxtTab rightActive={rightActive}>{"UNSTAKE"}</TxtTab>
                            </RightTab>
                        </MainTabContainer>
                    </TabWrapper>

                    <MidContainer>
                        {(isLoading || (loadingStakePos && rightActive) ) && renderLoading()}
                        {leftActive ? 
                        <>
                            <TopBox between={true}>
                                <TextWMOVR>{leftSideText}</TextWMOVR>
                                <TextWMOVR>{rightSideText}</TextWMOVR>
                            </TopBox>
                            <SubBox between={true}>
                                <PriceInputIIcon>
                                    <PriceInput
                                        type="numbers"
                                        value={gemStoneCount }
                                        readOnly={true}
                                    />
                                </PriceInputIIcon>
                                <div style={{ paddingLeft: SPACING.medium, paddingRight: SPACING.medium }}>
                                    <Icon
                                        height="auto"
                                        width="24px"
                                        name={Arrow}
                                        strokeColor={({ theme }) => theme.iconColor.color}
                                        color={({ theme }) => theme.iconColor.color}
                                    />
                                </div>
                                <PriceInputIIcon>
                                    <PriceInput
                                        type="number"
                                        inputMode="numeric"
                                        value={priceValue}
                                        placeholder={"0"}
                                        min={1}
                                        onChange={handleStakechange}
                                    />
                                </PriceInputIIcon>
                            </SubBox>
                        </>
                        : 
                        <SubBox>
                            {userStakes.length > 0 ? 
                                <InfiniteScroll
                                hasMore={false}
                                dataLength={userStakes.length}
                                style={{width:"100%"}}
                                >
                                    <StakePositionsContainer>
                                        {userStakes.map((stake,index)=>{
                                            return renderStakePosition(stake,index)
                                        })}
                                    </StakePositionsContainer>
                                </InfiniteScroll>
                            :
                                <StakePositionsContainer style={{display:"flex",marginBottom:SPACING.medium}}>
                                    <TxtLarge style={{textAlign:"center",padding:"unset"}}>{"No staking positions found"}</TxtLarge>
                                </StakePositionsContainer>
                            }
                        </SubBox>
                    }
                    <TxtCurrentBid>
                        Stake your Gemstones in the "{title}" {poolType} Pool. Your gem rewards are impacted by the ranking of the {poolType} pool, the amount of Gems you stake, and the time period you stake them for.
                    </TxtCurrentBid>
                </MidContainer>

                </TopContainer>
                {leftActive && 
                <BottomContainer>
                    <ButtonWrapper>
                        <Button
                            text={"DEPOSIT" }
                            onClick={onPressDeposit}
                            color={COLORS.purple}
                            colorText={COLORS.white}
                            size={"medium"}
                            disabled={priceError}
                            className={"FullWidth"}
                            padding={true}
                        />
                    </ButtonWrapper>
                </BottomContainer>
                }
            </OverlayContainer>
        </div >
    );
}
    ))

const MainTabContainer = styled.div`
    display: flex;
    flex: 1;
    height: 40px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.borderColor.color};
    margin-left:  ${SPACING.large}px;
    margin-right: ${SPACING.large}px;
    overflow: hidden;
`;

const LeftTab = styled.div`
   display: flex;
   flex: 1;
   height: 100% ;
   justify-content: center;
   align-items: center;
   background-color: ${props => props.theme.name == "light" && props.leftActive ? COLORS.whiteLight :
        props.theme.name == "light" && !props.leftActive ? "transparent" :
            props.theme.name == "dark" && props.leftActive ? COLORS.blackDark : "transparent"};
   cursor: pointer;
`;

const RightTab = styled.div`
   display: flex;
   flex: 1;
   height: 100% ;
   justify-content: center;
   align-items: center;
   background-color: ${props => props.theme.name == "light" && props.rightActive ? COLORS.whiteLight :
        props.theme.name == "light" && !props.rightActive ? "transparent" :
            props.theme.name == "dark" && props.rightActive ? COLORS.blackDark : "transparent"};
   cursor: pointer;
`;

const TxtTab = styled.p`
    font-family: ${props => props.rightActive ? "LatoBlack" : props.leftActive ? "LatoBlack" : "LatoRegular"};
`;

const Divider = styled.div`
    height: 48px;
    width: 1px;
    background-color: ${props => props.theme.borderColor.color};
`;

const StakePosition = styled.div`
    flex:1;
    background-color: ${props => props.theme.containerSecondary.color};
    border:1px solid ${props => props.theme.borderColor.color};
    flex-direction:column;
    width:100%;
    border-radius:10px;
    padding:${SPACING.large}px;
    justify-content: center;
    flex-direction: column;
    display: flex;
    align-items: center;
`;

const StakePositionsContainer = styled.div`
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-column-gap: ${SPACING.medium}px;
    grid-row-gap:${SPACING.medium}px;
    max-height:400px;
    overflow:auto;
    width:100%;
    margin-top:${SPACING.large}px;

    @media screen and (max-width:900px){
        grid-template-columns: repeat(1,1fr);
    }
`;

const StakePosTxt = styled.p`
    font-size:${FONT_SIZE.medium}px;
    margin-bottom:${SPACING.small}px;
    color:${props=>props.theme.textPrimary.color}px;
`;

const StakePostBtmBar = styled.footer`
    height:100%;
    position:relative;
    bottom:0;
    margin-top:${SPACING.medium}px;
`;

const LoadingOverlay = styled.div`
    background: rgba(0, 0, 0, 0.4);
    position:absolute;
    bottom:0;
    top:0;
    left:0;
    right:0;
    z-index:11;
    justify-content: center;
    align-items:center;
    border-radius:5px;
`;

const MidContainer = styled.div`
    flex-direction:column;
    position:relative;
    margin-bottom:${SPACING.large}px;
`;
