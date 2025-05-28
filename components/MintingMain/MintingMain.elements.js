import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MintingContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow:hidden;
`
export const NavBox = styled.div`
    height: 50px;
    width: 100%;
    background-color: ${({ theme }) => theme.colorMedium.color};
    justify-content: flex-start;
    align-items: center;
    margin-top: ${SPACING.large}px;
    padding-top:24px;
    padding-bottom:12px;
    padding-left:12px;
    padding-right:12px;

    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: unset;
    flex-wrap: wrap;

    @media screen and (max-width: 750px){
        overflow: hidden;
    }
`
export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    position: relative;
    margin-left: ${SPACING.large}px;
    margin-right: ${SPACING.large}px;
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.large}px;

    @media screen and (max-width: 750px){
        margin: 0;
    }
`

export const MainContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    position: relative;

    @media screen and (max-width: 750px){
        margin: 0;
    }
`

export const NavButton = styled.div`
    display: flex;
    cursor: pointer;
    margin-bottom:12px;
`

export const Divider = styled.div`
    height: 20px;
    width: 2px;
    border-radius: 1px;
    align-self: center;
    margin-bottom:12px;
    background-color: ${({ theme }) => theme.borderColor.color};
`

export const ButtonTitle = styled.p`
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    font-family: ${props => props.active ? "LatoBlack" : "LatoRegular"};
    font-size:16px;   
`
export const Background = styled.div`
    flex-direction: column;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    border-radius: 15px;
    overflow: hidden;

    @media screen and (max-width: 750px){
        border-radius: 0;
    }
`;

export const LinearGradient = styled.div`
    position:absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 70%;
    z-index: 1;
   // background: linear-gradient(#0d101721,#0d1017b3, #0d1017e6);
    //background: linear-gradient(#0d101721,  #0d1017b3 11%, #0d1017e6 14%, #0c1017);
    background: ${({ theme }) => theme.name == "light" ? "linear-gradient(#0d101721,  #0d1017b3 11%,  #f0f1f3 20% )" : "linear-gradient(#0d101721,  #0d1017b3 11%, #0d1017e6 14%, #0c1017)"};
`;

export const LinearGradient2 = styled.div`
    position:absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 30%;
    z-index: 0;
    //background: linear-gradient(90deg, #341A33,  #441E26, #3C234B);
    background: ${({ theme }) => theme.name == "light" ? "linear-gradient(90deg, #f0f1f3,  #441E26, #3C234B)" : "linear-gradient(90deg, #341A33,  #441E26, #3C234B)"};
`;

export const LinearGradient3 = styled.div`
    position:absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 30%;
    z-index: 1;
    //background: linear-gradient(0deg, #0c1017, #0c101700);
    background: ${({ theme }) => theme.name == "light" ? "linear-gradient(0deg, #f0f1f3, #0c101700)" : "linear-gradient(0deg, #0c1017, #0c101700)"};
`;

export const ContentBox = styled.div`
    position: relative;
    z-index: 1;
    flex-direction:row;
    background-color:#121923;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    padding-left:12px;
    padding-right:12px;

    @media screen and (max-width: 740px){
        flex-direction:column;
   }
`;

export const ContentInfo = styled.div`
    width: 40%;
    justify-content: flex-start;
    padding-right: ${SPACING.large}px;
    flex-direction: column;

    @media screen and (max-width: 950px){
         width: 100%;
        padding-right: ${SPACING.large}px;
    }

    @media screen and (max-width: 740px){
        padding-right: ${SPACING.large}px;
        padding-left:${SPACING.large}px;
    }
`;
export const ContentUI = styled.div`
    width: 60%;
    justify-content: flex-start;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    flex-direction: column;

    @media screen and (max-width: 950px){
        width: 100%;
   }
`;

export const MintList = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns:  repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.large}px;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
    position: relative;
    z-index: 1;

    @media screen and (max-width: 750px){
        grid-template-columns:  repeat(2, 1fr);
    }
`;

export const TextLarge = styled.p`
    font-family: "LatoBlack";
    font-size: ${FONT_SIZE.medium}px;
    text-shadow: ${props => props.button ? '0 1px 2px rgb(0 0 0 / 10%)' : '0 1px 12px COLORS.black50'};
    flex-direction: row;
    
`;

export const TextMintButton = styled.p`
    font-family: "LatoBlack";
    font-size: ${FONT_SIZE.medium}px;
    text-shadow: ${props => props.button ? '0 1px 2px rgb(0 0 0 / 10%)' : '0 1px 12px COLORS.black50'};
    flex-direction: row;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Description = styled.p`
    line-height: 24px;
    font-size: 18px;
    margin-bottom:24px;
    text-shadow: 0 1px 12px COLORS.black50;
`;

export const HorizontalBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const DropDownAmount = styled.div`
    height: 60px;
    width: 60px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius: 10px;
    margin-left:${SPACING.medium}px;
    box-shadow: 0 1px 12px rgb(0 0 0 / 20%);
`
export const Select = styled.select`
   height: 60px;
    width: 60px;
    background-color: transparent;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.borderColor.color};
    border-style: solid;
    text-align: center;
    font-family: "LatoBlack";
`

export const Option = styled.option`
    height: 50px;
    width: 50px;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius: 10px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.borderColor.color};
    border-style: solid;
    text-align: center;
    font-family: "LatoBlack";
`

export const ButtonWrap = styled.div`
    height: 60px;
    background-color: ${COLORS.blue};
    flex:1;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    padding: 12px;
    border-radius: 5px;
    height: 60px;
    width: 100%;
    flex: 1;
    box-shadow: 0 1px 12px rgb(0 0 0 / 20%);
`

export const ButtonMint = styled.div`
    height: 60px;
    background-color: ${COLORS.purple};
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    padding: 12px;
    border-radius: 5px;
    height: 60px;
    width: 100%;
    flex: 1;
    box-shadow: 0 1px 12px rgb(0 0 0 / 20%);
`

export const ItemContainer = styled.img`
    max-height: 480px;
    max-width: 480px;
    width:100%;
    justify-content: center;
    align-items: center;
`
export const FirstMintItem = styled.div`
    margin-top: 40px;
    margin-right: 35px;
    margin-left: auto;
    
    @media screen and (max-width: 1200px){
       display: none 
    }
`

export const ButtonOuter = styled.div`
    margin-bottom: 24px;
    flex:1;
`

export const CurrencyDropDown = styled.div`
    height: 30px;
    width: 98px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
    border-radius: 10px;
`;

export const CurrencySelect = styled.select`
   height: 30px;
    width: 98px;
    background-color: transparent;
    border-radius: 10px;
    border-width: 2px;
    border-color: transparent;
    border-style: solid;
    text-align: center;
    font-family: "LatoBlack";
    font-size: ${FONT_SIZE.medium}px;
`;

export const PromoImagesContainer = styled.div`
    display: grid;
    max-width: 500px;
    max-height: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
`;

export const Section = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    z-index:1;
    margin:60px 0;
`;

export const ImageNFT1 = styled.img`
    display: flex;
    width:  100%;
	height: 100%;
    object-fit: contain;
`;

export const ImageNFT2 = styled.img`
    display: flex;
    width:  100%;
	height: 100%;
    object-fit: contain;
`;