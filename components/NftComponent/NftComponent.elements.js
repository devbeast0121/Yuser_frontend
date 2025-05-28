import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ModalContainer = styled.div`
    height: 100%;
    max-width: 1200px;
    width:100%;
    background-color: ${({ theme }) => theme.container.color};
    flex-direction: column;
    align-self:center;

    @media screen and (max-width: 991px){
        flex-direction: column;
    }
`;

export const Post = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1px; //progress bar is missing if remove margin-bottom: 1px
  padding: 24px;
  order: 1;

  @media screen and (max-width: 991px) {
    padding: 12px;
    order: 2;
  }
`;

export const PostBody = styled.div`
  display: flex;
  max-width: 640px;
  flex: 1;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  @media screen and (max-width: 991px) {
    max-width: none;
  }
`;

export const PostBodyInner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${SPACING.large}px 0;
  overflow: auto;
  order: 2;

  @media screen and (max-width: 991px) {
    padding: ${SPACING.medium}px;
    order: 1;
  }
`;

export const BtnClose = styled.div`
  display: flex;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.container.color};
  position: absolute;
  z-index: 999;
  top: ${SPACING.large}px;
  left: ${SPACING.large}px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
`;

export const ProgressBar = styled.div`
  display: flex;
  height: 10px;
  width: 100%;
  background-color: ${COLORS.purple};
  position: absolute;
  z-index: 999;
  bottom: 0;
`;

export const WrapOverflow = styled.div`
  display: flex;
  overflow: hidden;
  z-index: 999;
  position: relative;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.container.color};
`;

export const WrapOverflowVertical = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
`;
//-----------------------------------------------------   PostSideBarContainer
export const PostSideBarContainer = styled.div`
  display: flex;
  align-self: flex-start;
  height: 83px;
  z-index: ${(props) => (props.priceBoxVisible ? 1 : 99999)};
  position: relative;
  flex-shrink: 0;
  padding-left: ${SPACING.large}px;
`;
export const PostSideBarContainerNFT = styled.div`
  display: flex;
  align-self: flex-start;
  height: 83px;
  z-index: ${(props) => (props.priceBoxVisible ? 1 : 99999)};
  flex-shrink: 0;
  padding-left: ${SPACING.large}px;
`;
export const BtnSideBar = styled.div`
  display: flex;
  margin-right: 24px;
  justify-content: flex-start;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  margin-top: 0px;
`;
//-----------------------------------------------------   LinkContainer

export const ButtonCopy = styled.button`
  width: 100%;
  align-items: center;
  flex-direction: row;
  margin-top: ${SPACING.medium}px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

export const LinkBox = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding-left: ${SPACING.medium}px;
  border-width: 1px;
  border-style: solid !important;
  border-top-color: #333;
  border-left-color: #333;
  border-bottom-color: #333;
  border-right-color: transparent;
`;

export const TxtLink = styled.div`
  display: flex;
  align-items: center;
`;

export const BtnLink = styled.div`
  display: flex;
  height: 50px;
  width: 140px;
  color: ${({ theme }) => theme.textPrimary.color};
  font-size: ${FONT_SIZE.extraSmall}px;
  font-family: "LatoBlack";
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.borderColor.color};
  border-style: solid !important;
  cursor: pointer;
`;
//-----------------------------------------------   PostUserContainer
export const PostUserContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${SPACING.medium}px;
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
`;
export const NFTUserContainer = styled.div`
  display: flex;
  padding: 12px 0;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.borderColor.color};
`;

export const NFTOfferUser = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Divider = styled.div`
  display: flex;
  height: 2px;
  width: 85%;
  align-self: flex-end;
  background-color: ${({ theme }) => theme.containerSecondary.color};
`;

export const PostBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: ${SPACING.medium}px;
`;

export const Label = styled.p`
  padding-right: ${(props) => (props.NFT ? 5 : 0)}px;
  margin-bottom: 3px;
  text-align: ${(props) => (props.centered ? "center" : "")};
  color: ${(props) => props.theme.textSecondary.color};
  font-size: ${FONT_SIZE.small}px;
  font-family: "LatoBlack";
`;

export const UserName = styled.p`
  margin-bottom: ${SPACING.small}px;
  padding-right: ${(props) => (props.NFT ? 5 : 0)}px;
  text-align: ${(props) => (props.centered ? "center" : "")};
  //font-family:'LatoBlack';
`;
export const ContentDiscription = styled.div`
  display: flex;
`;
export const ContentDescriptionnft = styled.div`
  display: flex;
  flex-direction: column;
`;
//----------------------------------- CommentsContainer

export const CommentsContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  position: relative;
`;

export const CommentInputBox = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

//------------------------------------- BuyContainer
export const BuyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-right: ${SPACING.large}px;
  overflow: auto;

  @media screen and (max-width: 991px) {
    padding: 0;
    margin-top: ${SPACING.large}px;
  }
`;

export const BidContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${SPACING.medium}px;
  margin-bottom: ${SPACING.medium}px;
  border-radius: 10px;

  @media screen and (max-width: 991px) {
    padding: 12px;
  }
`;

export const TxtCurrentBid = styled.p`
  text-align: left;
  margin-bottom: ${SPACING.medium}px;
`;

export const BidBox = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  margin-bottom: ${SPACING.large}px;

  @media screen and (max-width: 991px) {
    margin-bottom: ${SPACING.medium}px;
  }
`;

export const TxtBid = styled.p`
  font-size: ${FONT_SIZE.large}px;
  font-family: "LatoBlack";
  text-align: left;
  text-overflow: ellipsis;
`;

export const TxtOffer = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoBlack";
  text-align: left;
`;

export const TxtDollarBid = styled.p`
  color: #ccc;
  text-align: left;
  margin-bottom: ${SPACING.large}px;
`;

export const BtnBuy = styled.div`
  display: flex;
  border-radius: 5px;
  background-image: linear-gradient(to right, #dc3bc3, #d2344d);
  padding: 12px;
  cursor: pointer;
  font-family: "LatoBlack";
  justify-content: center;
`;

export const TitleHistory = styled.p`
  font-family: "LatoBlack";
  text-align: left;
  padding: 5px 12px 5px 12px;
`;

export const ButtonExpand = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: ${SPACING.large}px;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const OpenGiftBarContainer = styled.div`
  display: flex;
  position: absolute;
  right: ${SPACING.large}px;
  bottom: ${SPACING.large}px;
  z-index: 9999;
`;

export const BackdropOverlay = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.inactiveColor.color};
  z-index: 999;
`;

export const TextLarge = styled.p`
  font-family: "LatoBlack";
  font-size: ${FONT_SIZE.large}px;
  padding-top: ${(props) => (props.small ? SPACING.small : SPACING.medium)}px;
  padding-bottom: ${SPACING.small}px;
  text-align: center;
`;
export const TextNormal = styled.p`
  padding-bottom: ${SPACING.large}px;
  width: 80%;
  text-align: center;
`;

export const NFTOwnerNameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PropertyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${SPACING.medium}px;
`;

export const PropertyList = styled.div`
  display: flex;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // grid-template-rows: 1fr 1fr;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  margin-top: ${SPACING.medium}px;
  margin-left: ${SPACING.medium}px;
  margin-right: ${SPACING.medium}px;

  @media screen and (max-width: 520px) {
    grid-template-columns: 100%;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  max-width: 600px;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.borderColor.color};
  border-width: 2px;
  border-style: solid;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background-color: ${({ theme }) =>
    theme.name == "light" ? "transparent" : COLORS.blackDarkMedium};
`;

export const ButtonMore = styled.div`
  display: flex;
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
  color: ${({ theme }) => theme.textPrimary.color};
  font-family: "LatoBlack";
`;
export const BtnTextnft = styled.p`
  text-align: center;
  padding-top: ${SPACING.small}px;
  font-size: 13px;
  font-family: "LatoBlack";
`;

export const TitleContainer = styled.div`
    flex-direction: column;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteMediumLight : COLORS.greyDark};
    margin-bottom: 5px;
    margin-top:5px;
    width: 100%;
`;

export const Table = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow:hidden;
    overflow-x:auto;
    display: flex;
    flex-direction: column;
    margin-top: ${SPACING.medium}px;
    margin-bottom: ${SPACING.medium}px;
    border-radius: ${props => props.mobileLayoutVisible ? null : "10px"};
    border-width: ${props => props.mobileLayoutVisible ? null : "1px"};
    border-style: ${props => props.mobileLayoutVisible ? null : "solid"};
    border-color: ${({ theme }) => theme.borderColor.color};
`;

export const TableTitle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

export const TableRow = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 0 100px !important;
  margin-right: ${SPACING.medium}px;
  margin-left: ${SPACING.medium}px;
`;

export const TabBox = styled.div`
  display: flex;
  flex: 1;
`;

export const EmptyBox = styled.div`
  display: flex;
  width: 30px;
  height: 50px;
`;

export const PriceBoxWrap = styled.div`
  display: flex;
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin-top: -${SPACING.large}px;
  z-index: 99999;
`;

export const ButtonWrapper100 = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${SPACING.large}px;
`;

export const ButtonWrapper50 = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

export const UnlockedContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const UnlockedMain = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  margin-top: ${SPACING.medium}px;
  margin-bottom: ${SPACING.medium}px;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.borderColor.color};
  padding: ${SPACING.large}px;
  align-items: center;
  justify-content: ${(props) => (props.row ? "space-between" : "center")};
  position: relative;

  @media screen and (max-width: 700px) {
    padding: 12px;
  }
`;

export const UnlockedBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImageNFT = styled.img`
  width: 100%;
  height: auto;
  background-color: #121923;
  border-radius: ${(props) =>
    props.mobileLayoutVisible ? "10px" : "10px 10px 0 0"};

  @media screen and (max-width: 700px) {
    margin-top: 70px;
  }
`;
