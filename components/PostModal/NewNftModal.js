import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  ModalContainer,
  Post,
  PostBody,
  PostSideBarContainer,
  BtnLink,
  TxtLink,
  LinkBox,
  PostUserContainer,
  NFTUserContainer,
  PostBox,
  UserName,
  ContentDiscription,
  BtnClose,
  ProgressBar,
  CommentsContainer,
  BuyContainer,
  BidContainer,
  TxtCurrentBid,
  BidBox,
  TxtBid,
  TxtDollarBid,
  BtnBuy,
  TitleHistory,
  CommentInputBox,
  PostBodyInner,
  ButtonCopy,
  ButtonExpand,
  OpenGiftBarContainer,
  BackdropOverlay,
  WrapOverflow,
  WrapOverflowVertical,
  TextLarge,
  NFTOwnerNameBox,
  PropertyList,
  PropertyListContainer,
  ItemContainer,
  ButtonMore,
  BtnText,
  TitleContainer,
  TableTitle,
  TabBox,
  EmptyBox,
  PriceBoxWrap,
  PostSideBarContainerNFT,
  BtnSideBar,
  BtnTextnft,
  ContentDescriptionnft,
  TextNormal,
  ButtonWrapper70,
  ButtonWrapper50,
  UnlockedContainer,
  UnlockedMain,
  UnlockedBox,
  ImageNFT
} from "./PostModal.elements";
import {
  //PostSideBarContainer,
  //BtnSideBar,
  //BtnText,
  MainContainer,
} from '../PostSideBar/PostSideBar.elements';
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from 'file-saver'
import Share from '../../public/icons/share.svg';
import Buy from '../../public/icons/buy.svg';
import Save from '../../public/icons/Save.svg';
import Unlock from '../../public/icons/Unlock.svg';
import rock from "../../public/icons/stone50.svg"
import stone from "../../public/icons/gem.svg"
import { CopyToClipboard } from "react-copy-to-clipboard";
import Modal from "react-overlays/Modal";
import LoginBox from "../LoginBox/LoginBox";
//import PostSideBar from "../PostSideBar/PostSideBar";
import Close from "../../public/icons/close.svg";
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Present from "../../public/icons/present.svg";
import Shopping from "../../public/icons/shopping-cart.svg";
import Triangle from "../../public/icons/triangle.svg";
import CommentsList from "../CommentsList/CommentsList";
import BidsList from "../BidsList/BidsList";
import Avatar from "../Avatar/Avatar";
import GiftBar from "../GiftBar/GiftBar";
import Icon from "../Icon/Icon";
import { ImageUrl, MakePostUrl, AvatarUrl } from "../../stores/tools";
import { CLIENT_SIDE_URL, useStore } from "../../stores/RootStore";
import { inject, observer } from "mobx-react";
import PostMedia from "../PostMedia/PostMedia";
import ButtonFollow from "../ButtonFollow/ButtonFollow";
import TextInput from "../TextInput/TextInput";
import LocalPosts from "../../stores/LocalPosts";
import VideoQueue from "../../stores/VideoQueue";
import Loader from "../../pages/api/posts";
import { useSession } from "next-auth/client";
import DevInfo from "../DevInfo";
import AutolinkerComponent from '../AutolinkerComponent/AutolinkerComponent';
import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling.js';
import PriceBox from '../PriceBox/PriceBox';
import { Text } from "../Wallet/Wallet.elements";
import { ContentImage } from "../WalletList/WalletList.elements";
//import ListForSale from "../ListForSale/ListForSale"
import client from "../../pages/api/client";
import AvatarDefault from '../../public/icons/avatar.svg';
import { useRouter } from "next/router";

export const BUTTON_TYPES = Object.freeze({
  COMMENTS: 'comments',
  SHARE: 'share',
  BUY: 'buy',
  GIFT: 'gift',
  GIFT_AMOUNT: 'gift_amount',
  INVALID: 'INVALID BUTTON TYPE',
  SAVE: 'save_item'
});

//   C O N S T A N T S
const variantHorizontal = Object.freeze({
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -150 },
});

const variantVerical = Object.freeze({
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -150 },
});


export default inject("store")(
  observer(function NewNftModal(props) {
    //   H O O K S
    const rootstore = useStore();
    const [modalVisible, setModalVisible] = useState(true);
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [isSideBarOpenAnimate, setIsSideBarOpenAnimate] = useState(-1);
    const [showOverlay, setShowOverlay] = useState(false);
    const [afterGiftCallback, setAfterGiftCallback] = useState(() => () => { }); // not as funny now
    const [showGiftAmounts, setShowGiftAmounts] = useState(false);
    const [trig, setTrig] = useState(true);
    const [session, loading] = useSession();
    const [parentCommentId, setParentCommentId] = useState(null)
    const [isReply, setIsReply] = useState(false)
    const [priceBoxVisible, setPriceBoxVisible] = useState(false)
    const [properties, setProperties] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [comingSoon, setComingSoon] = useState(false)
    const [tokenId, setTokenId]= useState(null)
    var objectArray = []
    const [propertyItems, setPropertyItems] = useState([{}, {}, {}, {}, {}]);
    const [fullPropertyLenght, setFullPropertyLenght] = useState(false);
    const authUser = rootstore.getAuthUser();
    const [unlockedFeatured, setUnlockedFeatured] = useState(false)
    const [avatarHash, setAvatarHash] = useState("")
    const [updatedImgHeight, setUpdatedImgHeight] = useState(false)
    const [listingOverlayVisible,setListingOverlayVisible] = useState(false);

    const router = useRouter();
    const ACTIONS = Object.freeze({
      setComments: "SET COMMENTS",
      setIsVisible: "SET VISABILITY",
      setShowGiftBar: "SET SHOW GIFT BAR",
      setType: "SET BUTTON TYPE",
      setKeyword: "SET KEYWORD",
    });
    React.useEffect(() => {
      async function doEffect() {
        if (props.nft) {
          let tokenNumber =parseInt(props.nft.tokenId);
          setTokenId(tokenNumber)
          var pathArray = props.nft.image.split('/');
          var arrayLength = pathArray.length
          var tokenHash = pathArray[arrayLength - 1]
          tokenHash = tokenHash.substring(0, tokenHash.length - 8);
          setAvatarHash(tokenHash)
          setProperties(Object.entries(props.nft.attributes))

        }
      }
      doEffect();
    }, []);

    /*
        replaceHeight()
        listen the window width to update the NFT image height
    */
    React.useEffect(() => {
      replaceHeight();
      window.addEventListener("resize", replaceHeight);
      return () => window.removeEventListener("resize", replaceHeight);
    }, []);

    const replaceHeight = () => {
      if (window.innerWidth <= 1800) {
        setUpdatedImgHeight(true)
      } else {
        setUpdatedImgHeight(false)
      }
    }


    const closeAll = () => {
      props.setShow(false)
    }
    const showFullProperty = () => {
      setFullPropertyLenght(!fullPropertyLenght)
    }

    const PropertyListInner = () => {
      let attributes = []
      attributes = fullPropertyLenght ? properties : properties.slice(0, 2)

      return (
        <>
          {attributes.map((data, id) => {
            return <ItemContainer key={id}>
              <UserName>{data[0]}</UserName>
              <UserName NFT={true} centered={true} style={{ opacity: 0.5 }}>{(data[1] / 10000) * 100}{'% have this property'}</UserName>
            </ItemContainer>
          })}

        </>
      );

    }

    const downloadImage = () => {
      if(typeof window !== "undefined" && window.ethereum && window.ethereum.selectedAddress.toLowerCase() === props.ownerWalletAddress.toLowerCase() ){
        saveAs(props.nft.image, 'image.png') // Put your image url here.
        setUnlockedFeatured(false)
      }
      else
      {

      }
    }
    const copyToClickboardFunction = () => {
      navigator.clipboard.writeText(props.nft.image)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 3000);
      setUnlockedFeatured(false)

    }
    const comingSoonFunction = () => {
      setComingSoon(true)
      setTimeout(() => setComingSoon(false), 3000);
      setUnlockedFeatured(false)
    }

    const showUnlockedFeatures = () => {
      setUnlockedFeatured(true)
    }
    //<Icon strokeWidth="2" height="auto" width="50px" name={AvatarDefault} />
    async function claim() {
      if(session)
        {
          try {
            await client.service('set-nft-profpic').create({
              userId: session.user._id,
              hash: avatarHash,
            }).then(async () => {
              let profObj = {
                avatar: avatarHash
              }
              await client.service('change-profile')
                .create(profObj).then(() => window.location.reload())
            }
            );
          } catch (err) {
            console.log(err)
          }
        }
        else{
          loadLogin()
        }
      
      //console.log("Success! Please logout and login back to see your Avatar")

    }

    async function onList(price,endDate){
      let contractTokenId = props.nft.contractTokenId;
      rootstore.listItem(endDate,price,contractTokenId);
    }

    console.log(props.nft)
    const loadLogin =  () => {
      router.push("/signin", null, { shallow: true });
    };
  
    return (

      <Modal className="modal" show={props.show}>
        {props.nft &&
          <AnimatePresence>
            {/* <DevInfo message={`state::btnType is "${state.btnType}" | comments length is ${state?.comments?.length}`} /> */}
            {/* <DevInfo message={JSON.stringify({ ...state, comments: state?.comments?.length })} />*/}
            {modalVisible && (
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ModalContainer>
                  <Post>
                    <ImageNFT
                      updatedImgHeight={updatedImgHeight}
                      src={props.nft.image + '?fit=clip&w=1800&fm=webp$auto=format'} alt="NFT image"
                    />
                    <BtnClose onClick={closeAll}>
                      <Icon
                        strokeColor={({ theme }) => theme.iconColor.color}
                        strokeWidth="3"
                        height="auto"
                        width="24px"
                        name={Close}
                      />
                    </BtnClose>
                  </Post>
                  <PostBodyInner style={{ maxWidth: 650, backgroundColor: 'rgb(18, 25, 35)' }}>
                    <PostSideBarContainerNFT position={"horizontal"}>
                      <BtnSideBar onClick={copyToClickboardFunction}>
                        <Icon width="auto" height="35px" name={Share} />
                        <BtnTextnft>{'SHARE'}</BtnTextnft>
                      </BtnSideBar>
                      <BtnSideBar onClick={comingSoonFunction}>
                        <Icon width="auto" height="35px" name={Buy} />
                        <BtnTextnft>{'BUY'}</BtnTextnft>
                      </BtnSideBar>
                      <BtnSideBar onClick={downloadImage}>
                        <Icon width="auto" height="35px" name={Save} />
                        <BtnTextnft>{'SAVE'}</BtnTextnft>
                      </BtnSideBar>
                      <BtnSideBar onClick={showUnlockedFeatures}>
                        <Icon width="auto" height="35px" name={Unlock} />
                        <BtnTextnft>{'UNLOCK'}</BtnTextnft>
                      </BtnSideBar>
                    </PostSideBarContainerNFT>

                    {unlockedFeatured  ?
                      <UnlockedContainer>
                        <TextLarge>{'UNLOCKABLE FEATURES'}</TextLarge>
                        <UnlockedMain>
                          <TextLarge small={true}>{'Official NextGems Avatar'}</TextLarge>
                          <TextNormal>{'Show off your NextGems as your profile picture'}</TextNormal>

                          <Avatar
                            src={props.nft.image + '?fit=clip&w=1800&fm=webp$auto=format'}
                            size={"large"}
                            alt={"nft image"}
                            frame={true}
                            nft={true}
                          />
                          <ButtonWrapper70>
                          
                            <Button
                              onClick={claim}
                              color={COLORS.purple}
                              colorText={COLORS.white}
                              text={'MAKE PROFILE PIC'}
                              size={'medium'}
                              className={"FullWidth"}
                              //disabled={session && (authUser?._id) === session.user.userId?false:true}
                            />
                          </ButtonWrapper70>
                        </UnlockedMain>
                        <UnlockedMain row={true}>
                          <UnlockedBox>
                            <TextLarge small={true}>{'SVG Asset'}</TextLarge>
                            <TextNormal>{'Download the SVG drawing for your NextGems'}</TextNormal>
                          </UnlockedBox>
                          <ButtonWrapper50>
                            <Button
                               onClick={session?null:loadLogin}
                              color={COLORS.purple}
                              colorText={COLORS.white}
                              text={'COMING SOON'}
                              size={'medium'}
                              width={"50%"}
                              className={"FullWidth"}
                              disabled={true}
                            />
                          </ButtonWrapper50>
                        </UnlockedMain>
                        <UnlockedMain row={true}>
                          <UnlockedBox>
                            <TextLarge small={true}>{'Gem Hodling Reward'}</TextLarge>
                            <div style = {{flex:1,flexDirection:"row"}}>
                              <TextNormal>
                                {'You are receiving '}
                                {"500 stones and "}
                                {"1000 rocks per day per NextGems that you hold."}
                              </TextNormal>
                            </div>
                          </UnlockedBox>
                        </UnlockedMain>
                        <UnlockedMain row={true}>
                          <UnlockedBox>
                            <TextLarge small={true}>{'Power Boost'}</TextLarge>
                            <TextNormal>{'Boost the reach of your content'}</TextNormal>
                          </UnlockedBox>
                          <ButtonWrapper50>
                            <Button
                               onClick={session?null:loadLogin}
                              color={COLORS.purple}
                              colorText={COLORS.white}
                              text={'COMING SOON'}
                              size={'medium'}
                              width={"50%"}
                              className={"FullWidth"}
                              disabled={true}
                            />
                          </ButtonWrapper50>
                        </UnlockedMain>
                      </UnlockedContainer>
                      :
                      <BuyContainer>
                        <TextLarge>{props.nft.name}{" "}{tokenId}</TextLarge>
                        <NFTUserContainer NFT={true}>
                        {session ?
                          <Avatar
                            src={AvatarUrl(
                              props.userInfo?props.userInfo.avatar:session
                                .user.avatar, 'm'
                            )}
                            size={"medium"}
                            alt={"avatar"}
                            frame={true}
                            userName={session?
                              session
                                .user.uname:props.walletAddress
                            }
                            onClick={closeAll}
                          />
                          :
                          <Icon strokeWidth="2" height="auto" width="50px" name={AvatarDefault} />
                        }
                          <PostBox>
                            <NFTOwnerNameBox>
                              <UserName NFT={true}>
                                {"Minted by"}
                              </UserName>
                              <UserName>
                              {session?
                              session
                                .user.uname:props.walletAddress
                            }
                              </UserName>
                            </NFTOwnerNameBox>
                            <ContentDescriptionnft>
                              <AutolinkerComponent
                                text={props.nft.description ? props.nft.description : "Congratulations for minting this NFT"}
                              />
                            </ContentDescriptionnft>
                          </PostBox>
                        </NFTUserContainer>
                        {properties.length !== 0 &&
                          <PropertyListContainer>

                            <PropertyList>
                              <PropertyListInner />
                            </PropertyList>


                            <ButtonMore
                              onClick={showFullProperty}
                            >
                              <BtnText>{fullPropertyLenght ? 'Less properties' : 'More properties'}</BtnText>
                            </ButtonMore>
                          </PropertyListContainer>
                        }
                        <BidContainer>
                          <TxtCurrentBid>{"Price"}</TxtCurrentBid>
                          <BidBox main={true}>
                            <BidBox>
                              <Icon
                                className="MarginRightMedium"
                                height="auto"
                                width="40px"
                                name={Moonriver}
                              />
                              <TxtBid>{"0.5 MOVR"}</TxtBid>
                            </BidBox>
                          </BidBox>
                          {session?(authUser?._id) === session.user.userId ?
                            <BidBox main={true}>
                              <Button
                                onClick={()=>setListingOverlayVisible(true)}
                                isIcon={true}
                                color={COLORS.purple}
                                colorText={COLORS.white}
                                iconWidth={"20px"}
                                strokeWidth={"2px"}
                                iconName={Shopping}
                                text={'LIST COMING SOON'}
                                size={'medium'}
                                width={"100%"}
                                className={"FullWidth"}
                              />
                              {/* <Button
                                  // onClick={""}
                                  isIcon={true}
                                  color={COLORS.purple}
                                  colorText={COLORS.white}
                                  iconWidth={"20px"}
                                  strokeWidth={"2px"}
                                  iconName={Present}
                                  text={'GIFT'}
                                  width={"100%"}
                                  size={'medium'}
                                  className={"FullWidth"}
                                  disabled={true}
                                /> */}
                            </BidBox>
                            :
                            <Button
                              //onClick={''}
                              isIcon={true}
                              color={COLORS.purple}
                              colorText={COLORS.white}
                              iconWidth={"24px"}
                              iconName={Shopping}
                              text={'BUY NOW'}
                              width={"100%"}
                              size={'medium'}
                              className={"FullWidth"}
                              disabled={true}
                            />
                            : null
                          }
                        </BidContainer>
                        {/*} <TitleContainer>
                            <TitleHistory>{"Offers"}</TitleHistory>
                          </TitleContainer> */}
                        <TitleContainer>
                          <TitleHistory>{"History Coming Soon"}</TitleHistory>
                        </TitleContainer>
                        {/*
                      <TableTitle>
                        <TabBox>
                          <UserName style={{ color: COLORS.greyMedium }}>{'Event'}</UserName>
                        </TabBox>
                        <TabBox>
                          <UserName style={{ color: COLORS.greyMedium }}>{'From'}</UserName>
                        </TabBox>
                        <TabBox>
                          <UserName style={{ color: COLORS.greyMedium }}>{'To'}</UserName>
                        </TabBox>
                        <TabBox>
                          <UserName style={{ color: COLORS.greyMedium }}>{'Price'}</UserName>
                        </TabBox>
                        <TabBox>
                          <UserName style={{ color: COLORS.greyMedium }}>{'Date'}</UserName>
                        </TabBox>
                      </TableTitle>
                      <BidsList
                        bids={null
                          //   usePost
                          //     .bids
                        }
                      />*/}
                      </BuyContainer>
                    }
                  </PostBodyInner>
                </ModalContainer>
                <LinkCopiedMessage isVisible={isVisible} />
                <ComingSoonMessage comingSoon={comingSoon} />
                {listingOverlayVisible && <ListForSale onList={onList} close={()=>setListingOverlayVisible(false)}/>}
              </motion.div>
            )}
          </AnimatePresence>
        }
        {
          //rootstore.errMessage && <ErrorMessageSignIn errorMessage={rootstore.errMessage} showErrorMessage={()=>{console.log("test")}}/>
        }
      </Modal>

    );
  })
);
function LinkCopiedMessage({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible === true ? (
        <motion.div
          key="messageTop"
          className="MessageTopnftshare"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
        >
          {"Linked Copied!"}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
function ComingSoonMessage({ comingSoon }) {
  return (
    <AnimatePresence>
      {comingSoon === true ? (
        <motion.div
          key="messageTop"
          className="MessageTopnftshare"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
        >
          {"More Features Coming Soon!"}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
