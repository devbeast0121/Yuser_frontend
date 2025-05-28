import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const HashtagMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:${SPACING.large}px;
    margin-left:${SPACING.large}px;
    margin-right:${SPACING.large}px;
`;

export const HashtagPostsContainer = styled.div`
    display: grid;
    grid-template-columns:  auto auto auto;
`;

export const ItemBox = styled.div`
    width: 265px;
    height: 310px;
   // background-color: blue;
   // border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 10px;
    flex-direction: column;
    position: relative;
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SubInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items:  "flex-start";
    margin-left: ${SPACING.medium}px;
`;

export const ContentSection = styled.img`
    display: flex;
    flex: 1;
    background-color: lightskyblue;
    border-radius: 10px;
    margin-top: ${SPACING.medium}px;
    margin-bottom: ${SPACING.medium}px;
`;

export const BottomBox = styled.div`
    position: absolute;
    z-index: 999;
    left: 24px;
    bottom: 34px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const TxtBold = styled.p`
    font-family: 'LatoBlack';
    text-align:  "left";
`;

export const TxtSmall = styled.p`
   font-size: ${FONT_SIZE.small}px;
   color: ${({ theme }) => theme.textSecondary.color};
   font-family: 'LatoBlack';
   padding-left: ${props => props.small ? "5" : null}px;
`;

export const TxtGemAmount = styled.p`
    font-family: 'LatoBlack';
    text-align:  "left";
    font-stretch: "semi-expanded";
    padding-left: ${SPACING.small}px;
`;

//----------------------------- list search
export const HashtagListSearchBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colorDark.color};
    margin-bottom: ${SPACING.large}px;
`;

export const BtnListSearch = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const ListType = styled.p`
    color: ${props => props.type ? COLORS.white : COLORS.whiteLight};
    font-family: ${props => props.type ? 'LatoBlack' : 'LatoRegular'};
`;

export const TopContainer = styled.div`
    display: flex;
    height: 250px;
    width: 100%;
    flex-direction: row;
    margin-bottom: ${SPACING.large}px;
`;
export const ChallengeBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    position: relative;
`;
export const RulesLinkContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
export const TimerBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    position: relative;
    justify-content: center;
`;

export const Background = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
`;
export const BackgroundBody = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    flex-direction: column;
    padding: ${SPACING.large}px;
    justify-content: center;
`;

export const ChallengeText = styled.div`
    width: 60%;
    margin-bottom: ${SPACING.large}px;
    margin-top: ${SPACING.large}px;
`;

export const IconWrapper = styled.div`
    display: flex;
    z-index: 999; 
    height: 100px;
    width: auto;
    justify-content: center;
`;

export const HashtagTask = styled.p`
    text-align:  center;
    padding-top: ${SPACING.medium}px;
    padding-bottom: ${SPACING.medium}px;
`;

export const Timer = styled.p`
    text-align:  center;
    font-size: 26px;
    font-family: 'LatoBlack';
`;

export const HashtagTimer = styled.p`
    font-size: ${FONT_SIZE.small}px;
    color: ${({ theme }) => theme.textSecondary.color};
    font-family: 'LatoBlack';
    text-align: center;
    padding-top: ${SPACING.small}px;;
`;