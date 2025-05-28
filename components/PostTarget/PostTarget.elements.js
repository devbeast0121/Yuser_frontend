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

export const MainContainer = styled.div`
    display: flex;
    height: 100vh;
    flex: 1;
    background-color: ${({ theme }) => theme.container.color};
    flex-direction: column;
`;


export const Post = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
    background-color: ${({ theme }) => theme.container.color};
    overflow: auto;//hidden;

    @media screen and (max-width: 900px){
        flex: 4;
    }
`;

export const FullPost = styled.div`
    display: block;
    max-width: 1120px;
    overflow: auto;
    justify-content: center;    
    align-items: center;
    background-color: ${({ theme }) => theme.container.color};
`;

export const PostBody = styled.div`
    max-width: 640px;
    flex: 1;
    background-color: ${({ theme }) => theme.containerSecondary.color};
    flex-direction: column;
    align-items: center;
    overflow-y: auto;

    @media screen and (max-width: 900px){
      flex: 1;
      max-width: 900px;
      width: 100%;
      height: fit-content;
    }
`;

export const PostBodyInner = styled.div`
    flex: 1;
    flex-direction: column; 
    align-items: center;
    width: 100%;
    overflow: clip;

    @media screen and (max-width: 900px){
        height: fit-content;
        overflow: auto;
    }
    
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
        display: none;
    }
`;

export const WrapOverflow = styled.div`
    overflow: hidden;
    z-index: 999;
    position: relative;
`;

//-----------------------------------------------------   PostSideBarContainer

export const PostSideBarContainer = styled.div`
    display: flex;
    align-self: ${props => props.postPage === true ? 'flex-end' : 'flex-start'};
    z-index: ${props => props.priceBoxVisible ? 1 : props.textareaOverlayVisible ? 1 : 9999};
    position:relative;
    flex-shrink: 0;
    padding-left: ${props => props.position === 'horizontal' ? 0 : SPACING.large}px;
`;

//-----------------------------------------------------   LinkContainer

export const ButtonCopy = styled.button`
    display:flex;
    width: 100%;
    align-items: center;
    flex-direction: row;
    margin-top: ${SPACING.small}px;
    margin-bottom: ${SPACING.large}px;
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
    color:  ${({ theme }) => theme.textPrimary.color};
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
    padding-top:${SPACING.medium}px;
    padding-bottom:${SPACING.medium}px;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
   // border-bottom: 1px solid ${({ theme }) => theme.borderColor.color};

    @media screen and (max-width: 900px){
        padding-top: ${SPACING.large}px;
        padding-bottom:${SPACING.large}px;
    }
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
    margin-top: ${SPACING.small}px;
    margin-bottom: ${SPACING.small}px;
    padding-right: ${props => props.NFT ? 5 : 0}px;
    text-align: ${props => props.centered ? "center" : ""};
`
export const ContentDiscription = styled.div`
`
export const PostContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: row;
    @media screen and (max-width: 900px){
        flex-direction: column;
        flex: 1; 
    }
`;
//----------------------------------- CommentsContainer

export const CommentsContainer = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    position: relative;
    min-width: 320px;
    margin-top: ${SPACING.medium}px;
    border-top: 1px solid ${({ theme }) => theme.borderColor.color};

    @media screen and (max-width: 900px){
        display: none;
    }
`;

export const CommentInputBox = styled.div`
    width: 100%;
    position: sticky;
    bottom: 0;
    left:0;
    right:0;
    z-index: ${props => props.textareaOverlayVisible ? 9999 : 1}; 
    display: flex;
    background-color: ${({ theme }) => theme.colorGrey.color};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 900px){
        display: none;
    }
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
    background-color: ${COLORS.blackDarkMedium};
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

export const TitleHistory = styled.p`
     font-family: 'LatoBlack';
    text-align: left;
`;

export const ButtonExpand = styled.div`
    position: absolute;
    right: 0;
    top: ${SPACING.large}px;
    background-color:${props => props.theme.name == "light" ? COLORS.greyMedium : COLORS.blackDark}; 
    width:40px;
    height:40px;
    justify-content:center;
    align-items:center;
    border-top-left-radius:5px;
    border-bottom-left-radius:5px;
`;

export const BackdropOverlay = styled.div`
    position: fixed; /* Sit on top of the page content */
    width: 100vw; /* Full width (cover the whole page) */
    height: 100vh; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent; //rgba(0,0,0,0.4); /* Black background with opacity */
    z-index: 99; /* Specify a stack order in case you're using a different order for other elements */
`;

export const TextLarge = styled.p`
    font-family: "LatoBlack";
    font-size: ${FONT_SIZE.large}px;
    padding-top: ${props => props.small ? SPACING.small : SPACING.large}px;
    padding-bottom:${SPACING.medium}px;
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
    border-color: #2f3d57;
    border-width: 2px;
    border-style: solid;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${COLORS.blackDarkMedium};
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
`;

export const TitleContainer = styled.div`
    flex-direction: column;
    margin-top: ${SPACING.medium}px;
    background-color: ${COLORS.blackDarkMedium};
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

export const LargeText = styled.p`
    padding: ${SPACING.large}px;
    font-size: ${FONT_SIZE.large}px;
    font-family: 'LatoBlack';
`

export const TopBlock = styled.div`
    display: flex;
    height: auto;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: ${SPACING.large}px;
    padding-bottom:  ${SPACING.medium}px;
`;

export const BtnClose = styled.div`
    cursor: pointer;
    height:30px;
    width:30px;
    align-items: center;
    justify-content: center;
`;

export const BtnModalClose = styled.div`
    border-radius: 50%;
    background-color:${props => props.theme.name == "light" ?  COLORS.greyMedium : COLORS.blackDark};
    position: absolute;
    z-index: 999;
    top: ${SPACING.large}px;
    left: ${SPACING.medium}px;
    cursor: pointer;
    height:40px;
    width:40px;
    align-items: center;
    justify-content: center;
`; 