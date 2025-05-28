import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const ModalContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${({ theme }) => theme.container.color};
    flex-direction: row;
    z-index:1;
    justify-content: center;

    @media screen and (max-width: 900px){
        flex-direction: column;
    }
`;

export const Post = styled.div`
    position: relative;
    //max-width: 640px;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   // margin-bottom: 1px;   //progress bar is missing if remove margin-bottom: 1px

    @media screen and (max-width: 900px){
        align-items: flex-start;
    }
`;

export const PostBody = styled.div`
    max-width: 640px;
    //flex:1;
    background-color: ${({ theme }) => theme.containerSecondary.color};
    flex-direction: column; 
    align-items: center;
    overflow-y:auto;
    padding-top: ${SPACING.large}px;

    @media screen and (max-width: 900px){
        max-width:none
    }
`;

export const PostBodyInner = styled.div`
    flex:1;
    flex-direction: column; 
    align-items: center;
    width: 100%;
    overflow-y: scroll;

    ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
    display: none; /* for Chrome, Safari, and Opera */
}
    @media screen and (max-width: 700px){
      display: none;
    } 
`;

export const BtnClose = styled.div`
    border-radius: 30px;
    background-color:${({ theme }) => theme.container.color};
    position: absolute;
    z-index: 999;
    top: ${SPACING.large}px;
    left: ${SPACING.large}px;
    cursor: pointer;
    height:40px;
    width:40px;
    align-items: center;
    justify-content: center;
`;

export const ProgressBar = styled.div`
    height: 10px;
    width:  100%;
    background-color: ${COLORS.purple};
    position: absolute;
    z-index: 999;
    bottom: 0;
`;

export const WrapOverflow = styled.div`
    overflow: hidden;
    z-index: 999;
    position: relative;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.container.color};
`;

export const WrapOverflowVertical = styled.div`
    position: absolute;
    right: 0;
    bottom: 0; 
`;
//-----------------------------------------------------   PostSideBarContainer
export const PostSideBarContainer = styled.div`
    display: flex;
    align-self: flex-start;
    height:83px; 
    z-index: ${props => props.priceBoxVisible ? 1 : props.textareaOverlayVisible ? 1 : 9999}; 
    position:relative;
    flex-shrink:0;
    padding-left:${SPACING.large}px;
`;
export const PostSideBarContainerNFT = styled.div`
    display: flex;
    align-self: flex-start;
    height:83px;
    z-index: ${props => props.priceBoxVisible ? 1 : 99999};
    flex-shrink:0;
    padding-left:${SPACING.large}px;
    
`;
export const BtnSideBar = styled.div`
    margin-right:24px;
    justify-content:flex-start ;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items:center;
    margin-top:0px;
`;
//-----------------------------------------------------   LinkContainer

export const ButtonCopy = styled.button`
    display:flex;
    width: 100%;
    align-items: center;
    flex-direction: row;
    margin-top: ${SPACING.medium}px;
    background-color:transparent;
    border:0;
    cursor: pointer;
`

export const LinkBox = styled.div`
    width: 100%;
    height: 50px;
    align-items: center;
    padding-left:${SPACING.medium}px;
    border-width: 1px;
    border-style: solid !important;
    border-top-color: #333;
    border-left-color: #333;
    border-bottom-color:#333;
    border-right-color: transparent;
`;

export const TxtLink = styled.div`
    align-items: center;
    color:  ${({ theme }) => theme.textSecondary.color};
`;

export const BtnLink = styled.div`
    height: 50px;
    width: 140px;
    color: ${({ theme }) => theme.textPrimary.color};
    font-size: ${FONT_SIZE.extraSmall}px;
    font-family: 'LatoBlack';
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: #333;
    border-style: solid !important;;
    cursor: pointer;
`;
//-----------------------------------------------   PostUserContainer
export const PostUserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom:${SPACING.medium}px;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
`
export const NFTUserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom:${SPACING.medium}px;
`

export const PostBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: ${SPACING.medium}px;
`

export const UserName = styled.p`
    font-family: 'LatoBlack';
    margin-bottom: ${SPACING.small}px;
    padding-right: ${props => props.NFT ? 5 : 0}px;
    text-align: ${props => props.centered ? "center" : ""};
`
export const ContentDiscription = styled.div`
`
export const ContentDescriptionnft = styled.div`
    flex-direction: column;
`
//----------------------------------- CommentsContainer

export const CommentsContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
`;

export const CommentInputBox = styled.div`
    width: 100%;
    position: sticky;
    bottom: 0;
    left:0;
    right:0;
    z-index: 9999;
    display: flex;
    background-color:${({ theme }) => theme.colorGrey.color};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

//------------------------------------- BuyContainer
export const BuyContainer = styled.div`
    width: 100%;
    flex-direction: column;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    overflow: auto;
`;

export const BidContainer = styled.div`
    flex-direction: column;
    margin-top: ${SPACING.medium}px;
    margin-bottom: ${SPACING.medium}px;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius:10px;
    padding: ${SPACING.large}px;
`;

export const TxtCurrentBid = styled.p`
    text-align: left;
    margin-bottom: ${SPACING.large}px;
`;

export const BidBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.main ? "space-between" : ''};
    align-items: center;
    margin-bottom: ${SPACING.medium}px;
`;

export const TxtBid = styled.p`
    font-size: ${FONT_SIZE.extraLarge}px;
    font-family: 'LatoBlack';
    text-align: left;
`;

export const TxtDollarBid = styled.p`
    color:  #ccc;
    text-align: left;
    margin-bottom: ${SPACING.large}px;
`;

export const BtnBuy = styled.div`
    border-radius: 5px;
    background-image: linear-gradient(to right, #DC3BC3, #D2344D);
    padding: 12px;
    cursor: pointer;
    font-family: 'LatoBlack';
    justify-content: center;
`;

export const TitleHistory = styled.p`
     font-family: 'LatoBlack';
    text-align: left;
`;

export const ButtonExpand = styled.div`
    position: absolute;
    right: 0;
    top: ${SPACING.large}px;
    background-color:${({ theme }) => theme.colorDark.color};
    width:40px;
    height:40px;
    justify-content:center;
    align-items:center;
    border-top-left-radius:5px;
    border-bottom-left-radius:5px;
`;

export const OpenGiftBarContainer = styled.div`
    position: absolute;
    right: ${SPACING.large}px;
    bottom: ${SPACING.large}px;
    z-index:9999;
`;

export const BackdropOverlay = styled.div`
   position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${COLORS.black50};
    z-index: 999;
`;

export const TextLarge = styled.p`
    font-family: "LatoBlack";
    font-size: ${FONT_SIZE.large}px;
    padding-top: ${props => props.small ? SPACING.small : SPACING.large}px;
    padding-bottom:${SPACING.medium}px;
`;
export const TextNormal = styled.p`
    padding-bottom:${SPACING.large}px;
`;

export const NFTOwnerNameBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

export const PropertyListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: ${SPACING.medium}px;
`;

export const PropertyList = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns:  repeat(2, 1fr);
   // grid-template-rows: 1fr 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 20px;
    margin-top: ${SPACING.medium}px;
    margin-left: ${SPACING.medium}px;
    margin-right: ${SPACING.medium}px;
`;

export const ItemContainer = styled.div`
    max-width: 600px;
    width: 100%;
    height: 85px;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.borderColor.color};
    border-width: 2px;
    border-style: solid;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colorGrey.color};
`;

export const ButtonMore = styled.div`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border-color: ${COLORS.purple};
    border-width: 2px;
    border-style: solid;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin-top: ${SPACING.large}px;
    cursor: pointer;
`;

export const BtnText = styled.p`
    color: ${COLORS.purple};
    font-family: "LatoBlack";
`
export const BtnTextnft = styled.p`
   text-align: center ;
    padding-top: ${SPACING.small}px;
    font-size: 13px;
    font-family: "LatoBlack";
`

export const TitleContainer = styled.div`
    flex-direction: column;
    margin-top: ${SPACING.medium}px;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius: 5px;
    padding: 8px;
    padding-left: 18px;
`;

export const TableTitle = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    margin-top: ${SPACING.large}px;
`;

export const TabBox = styled.div`
    flex: 1;
`;

export const EmptyBox = styled.div`
    width: 30px;
    height: 50px;
`;

export const PriceBoxWrap = styled.div`
    padding: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    margin-top: -${SPACING.large}px;
    z-index: 99999;
`;

export const ButtonWrapper70 = styled.div`
    width: 70%;
    margin-top: ${SPACING.large}px;
`;

export const ButtonWrapper50 = styled.div`
    width: 50%;
    justify-content: center;
    align-items: center;
`;

export const UnlockedContainer = styled.div`
    width: 100%;
    flex-direction: column;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
`;


export const UnlockedMain = styled.div`
    flex-direction: ${props => props.row ? 'row' : 'column'};
    margin-top: ${SPACING.medium}px;
    margin-bottom: ${SPACING.medium}px;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius:10px;
    border-style: solid;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colorMediumDark.color};
    padding: ${SPACING.large}px;
    align-items: center;
    justify-content: ${props => props.row ? "space-between" : "center"};
    position: relative;
`;

export const UnlockedBox = styled.div`
    width: 100%;
    flex-direction: column;
    padding-right: ${SPACING.large}px;
    text-align: center;
`;

export const ImageNFT = styled.img`
    display: flex;
    width: ${props => props.updatedImgHeight ? "100%" : "width"};
	height: ${props => props.updatedImgHeight ? "width" : "100%"};
    object-fit: cover;

    @media screen and (max-width: 900px){
        max-width: 650px;
        max-height: max-width;
    }
`;