import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  MainContainer,
  Post,
  PostBody,
  PostSideBarContainer,
  PostUserContainer,
  NFTUserContainer,
  PostBox,
  UserName,
  ContentDiscription,
  CommentsContainer,
  BuyContainer,
  BidContainer,
  TxtCurrentBid,
  BidBox,
  TxtBid,
  TxtDollarBid,
  TitleHistory,
  CommentInputBox,
  PostBodyInner,
  ButtonExpand,
  BackdropOverlay,
  WrapOverflow,
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
  TopBlock,
  BtnClose,
  BtnModalClose,
  ModalContainer
} from "../PostTarget/PostTarget.elements";
import { motion, AnimatePresence } from "framer-motion";
import LoginBox from "../LoginBox/LoginBox";
import PostSideBar from "../PostSideBar/PostSideBar";
import Close from "../../public/icons/close.svg";
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Present from "../../public/icons/present.svg";
import Shopping from "../../public/icons/shopping-cart.svg";
import Triangle from "../../public/icons/triangle.svg";
import BidsList from "../BidsList/BidsList";
import Avatar from "../Avatar/Avatar";
import GiftBar from "../GiftBar/GiftBar";
import Icon from "../Icon/Icon";
import { AvatarUrl } from "../../stores/tools";
import { useStore } from "../../stores/RootStore";
import { inject, observer } from "mobx-react";
import PostMedia from "../PostMedia/PostMedia";
import ButtonFollow from "../ButtonFollow/ButtonFollow";
import LocalPosts from "../../stores/LocalPosts";
import VideoQueue from "../../stores/VideoQueue";
import Loader from "../../pages/api/posts";
import { useSession } from "next-auth/client";
import AutolinkerComponent from '../AutolinkerComponent/AutolinkerComponent';
import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling.js';
import PriceBox from '../PriceBox/PriceBox';
import TextArea from "../TextArea/TextArea";
import CommentsListInfiniteScroll from "../CommentsListInfinteScroll/CommentsListInfiniteScroll";
import { Delegate } from "../../stores/ClassTools";
import Modal from "react-overlays/Modal";
import { runInAction } from "mobx";
import { MessageAppComponent } from "../MessageAppComponent/MessageAppComponent";


export const BUTTON_TYPES = Object.freeze({
  COMMENTS: 'comments',
  SHARE: 'share',
  BUY: 'buy',
  GIFT: 'gift',
  GIFT_AMOUNT: 'gift_amount',
  INVALID: 'INVALID BUTTON TYPE',
  SAVE: 'save_item'
});

//   C O N S T A N T s
//   C O N S T A N T S
const variantHorizontal = Object.freeze({
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -150 },
});

const variantVerical = Object.freeze({
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 200 },
});

export default inject("store")(
  observer(function PostModal(props) {
    //   H O O K S
    const rootstore = useStore();
    let fullscreenOpenedAt = useRef(0);

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [isSideBarOpenAnimate, setIsSideBarOpenAnimate] = useState(-1);
    const [showOverlay, setShowOverlay] = useState(false);

    // const [afterGiftCallback, setAfterGiftCallback] = useState(() => () => { }); // not as funny now
    const [gemAnimationDelegate, setGemAnimationDelegate] = useState(new Delegate(() => console.log(`STUB: gem animation delegate not set`)));

    const [showGiftAmounts, setShowGiftAmounts] = useState(false);
    const [trig, setTrig] = useState(true);
    const [session, loading] = useSession();
    const [parentCommentId, setParentCommentId] = useState(null)
    const [isReply, setIsReply] = useState(false)
    const [priceBoxVisible, setPriceBoxVisible] = useState(false)
    const initialState = {
      comments: [],
      isVisible: false,
      showGiftBar: false,
      btnType: props?.btnType,
      keyword: "",
    };
    const [propertyItems, setPropertyItems] = useState([{}, {}, {}, {}, {}]);
    const [fullPropertyLenght, setFullPropertyLenght] = useState(false);
    const authUser = rootstore.getAuthUser();

    const postUserContainerHeightRef = React.createRef();
    const commentsMobileContainerHeightRef = React.createRef();
    const [userContainerHeight, setUserContainerHeight] = useState(0)
    const [commentsMobileContainerHeight, setCommentsMobileContainerHeight] = useState(0)
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [narrowWindow, setNarrowWindow] = useState(false);
    const [textareaOverlayVisible, setTextareaOverlayVisible] = useState(false)
    const [messageVisible, setMessageVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

    const ACTIONS = Object.freeze({
      setComments: "SET COMMENTS",
      setIsVisible: "SET VISABILITY",
      setShowGiftBar: "SET SHOW GIFT BAR",
      setType: "SET BUTTON TYPE",
      setKeyword: "SET KEYWORD",
    });

    function reducer(state, action) {
      switch (action?.type) {
        case ACTIONS.setComments:
          return { ...state, comments: action?.value ?? [] }
        case ACTIONS.setIsVisible:
          return { ...state, isVisible: action?.value }
        case ACTIONS.setShowGiftBar:
          return { ...state, showGiftBar: action?.value }
        case ACTIONS.setType:
          if (Object.values(BUTTON_TYPES).includes(action?.value))
            return { ...state, btnType: action?.value ?? BUTTON_TYPES.INVALID }
          console.warn(`⛔ rejecting request to set button type to "${action?.value}" acceptable values include ${Object.values(BUTTON_TYPES)}. Please use BUTTON_TYPES to avoid invalid set requests`);
          return { ...state, btnType: BUTTON_TYPES.INVALID };
        case ACTIONS.setKeyword:
          return { ...state, keyword: action?.value }
        default:
          console.warn(`Unknown action type ${action?.type}`);
      }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
      let start = new Date().getTime();
      props.store.createViewRelationship({type:"opencomment",postId:props.targetPostId});
      return ()=>{
        let end = new Date().getTime();
        let duration = (end-start)/1000.0;
        if(isSideBarOpen){
          props.store.createViewRelationship({type:"opencomment",postId:props.targetPostId,duration});
        }
      }
    },[])

    useEffect(()=>{
      if(!isSideBarOpen){
        fullscreenOpenedAt.current = new Date().getTime();
        props.store.createViewRelationship({type:"fullscreen",postId:props.targetPostId})
      }
      else{
        if(fullscreenOpenedAt.current !== 0){
          let duration = (new Date().getTime()-fullscreenOpenedAt.current)/1000.0;
          props.store.createViewRelationship({type:"fullscreen",postId:props.targetPostId,duration})
          fullscreenOpenedAt.current = 0;
        }
      }
    },[isSideBarOpen])

    async function pullTrigger() {
      console.info(`🔫`);
      setTrig(!trig);
      await refreshComments()
    }
     //showing the app message (inform/success/error)   Working example: settings.js,  Natalia
     const showAppMessage = (isVisible, type, message) => {
      if (isVisible) {
        setMessageVisible(isVisible)
        setMessageType(type)
        setMessage(message)
        const timer = setTimeout(() => {
          setMessageVisible(false)
          setMessageType('')
          setMessage('')
        }, 3000)
        return () => clearTimeout(timer)
      } else {
        setMessageVisible(isVisible)
        setMessageType('')
        setMessage('')
      }
    }

    const showFullProperty = () => {
      setFullPropertyLenght(!fullPropertyLenght)
    }

    /*
            Pause any video that may be playing when we load an Image post
            then when this modal unmounts resume that video
            Aug 10th 2021
            William Doyle
    */
    useEffect(() => {
      VideoQueue.pause();

      // --below--  do on unmount
      return function resume_interupted_video___clear_comments() {
        LocalPosts.getInstance().comments = [];
        VideoQueue.play();
      };
    }, []);

    //-----------------The fix for comment update---------------
    const MINUTE_MS = 2000;
    useEffect(() => {
      //const interval = setInterval(() => {
      (async () => dispatch({ type: ACTIONS.setComments, value: await Loader.LoadComments(props.targetPostId, 0, true) }))();
      // }, MINUTE_MS);
      //return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      return function cleanup() {
        (async () => dispatch({ type: ACTIONS.setComments, value: 0 }))();
      }
    }, []);

    async function refreshComments() {
      dispatch({ type: ACTIONS.setComments, value: await Loader.LoadComments(props.targetPostId, 0, true) })
    }

    //-----------------The fix for comment update-----------------
    // useReducer to manage reply data / reply state
    const [replyData, setReplyData] = useReducer(replyReducer, {
      isReply: false,
      replyingTo: {},
    });

    //    used by useReducer hook to manage reply data
    function replyReducer(state, action) {
      switch (action.type) {
        case "cancelReply":
          return { ...state, isReply: false };
        case "setReply":
          return {
            ...state,
            isReply: true,
            replyingTo: action.payload.replyTarget,
          };
        default:
          throw new Error(`Unknown type passed to replyReducer()`);
      }
    }

    //   F U N C T I O N S
    const toggleOpen = () => {
      setIsSideBarOpen(!isSideBarOpen);
      if (isSideBarOpenAnimate == -1)
        return setIsSideBarOpenAnimate(1);
      setIsSideBarOpenAnimate(-1);
    };

    const handleClick = (_btnType, post) => {
      if (typeof _btnType !== "string")
        return;

      if (_btnType == BUTTON_TYPES.GIFT) {
        setShowOverlay(true)
        setTextareaOverlayVisible(false)
      } else if (_btnType == BUTTON_TYPES.BUY) {
        setShowOverlay(true)
        setPriceBoxVisible(true)
      } else if (_btnType == BUTTON_TYPES.COMMENTS && narrowWindow) {
        setShowCommentsModal(true)
      }


      if (!Object.values(BUTTON_TYPES).includes(_btnType))
        console.warn(`handleClick :: postmodel invalid btntype "${_btnType}"`);

      dispatch({ type: ACTIONS.setType, value: _btnType });
      switch (_btnType) {
        case BUTTON_TYPES.GIFT:
          setShowGiftAmounts(true);
          break;
        case BUTTON_TYPES.COMMENTS:
        case BUTTON_TYPES.SHARE:
        case BUTTON_TYPES.BUY:
          break;
        case BUTTON_TYPES.INVALID:
          console.warn(`Why are you trying to set btnType to invalid value?`);
          break;
        default:
          console.error(`handleClick() called with unknown case:: ${_btnType}`);
      }
    };

    /*
           setNewWindowsWidth()
           listen the window width to update the reaction on handleClick(BUTTON_TYPES.COMMENTS)
       */
    React.useEffect(() => {
      setNewWindowsWidth();
      window.addEventListener("resize", setNewWindowsWidth);
      return () => window.removeEventListener("resize", setNewWindowsWidth);
    }, []);

    const setNewWindowsWidth = () => {
      if (window.innerWidth < 900) {
        setNarrowWindow(true)
      } else {
        setNarrowWindow(false)
      }
    }


    /**
     * */
    const showCopyAlert = () => {
      dispatch({ type: ACTIONS.setIsVisible, value: true })
      const timer = setTimeout(() => dispatch({ type: ACTIONS.setIsVisible, value: false }), 3000);
      return () => clearTimeout(timer);
    };


    /**
     * */
    const closeOverlay = () => {
      closeGiftBar()
      setShowOverlay(false);
      setPriceBoxVisible(false)
      dispatch({ type: ACTIONS.setShowGiftBar, value: false });

    };

    /*
            findTopLevelCommentId()
            used to make nested replies simply replies to the top level comment
            William Doyle
            July 28th 2021
        */
    // function findTopLevelCommentId(llcid) {
    //   const comment = state.comments
    //     .flatMap((com) => [
    //       com,
    //       ...(com?.replies?.length > 0 ? com.replies : []),
    //     ])
    //     .find((c) => c._id === llcid);
    //   // console.log(llcid);
    //   if ("parentCommentId" in comment && comment?.parentCommentId)
    //     return findTopLevelCommentId(comment.parentCommentId);
    //   return llcid;
    // }


    /*
                 closeGiftBar()
    */
    const closeGiftBar = () => {
      setShowOverlay(false);
      setShowGiftAmounts(false);
      dispatch({ type: ACTIONS.setShowGiftBar, value: false });
    };

    /*
              sendGems()
              William Doyle
              ~July 19th 2021
    */
    async function sendGems(count, pid, recipientID) {
      // console.log(`%ctrying to send gems from PostModal.js`, "color: orange");
      const authUser = await rootstore.getAuthUser();
      if (authUser?._id === recipientID)
        return setShowGiftAmounts(false);//  U S E R S    M A Y    N O T    G I F T    S E L F
      await rootstore.giftStonesAndUpdateLocal(recipientID, pid, count);
      afterGiftCallback();
      setShowGiftAmounts(false);
      closeOverlay();
    }
    let usePost = null;
    if (props.fromMarket) {
      usePost = props.usePost;
    }
    else {
      usePost = rootstore.localPosts.getById(props.targetPostId);
    }

    /*
        get&set the item (image/video/audio) height after rendering, this height != usePost.height and depends from the <PostContainer> width and the item width ratio
    */
    React.useEffect(() => {
      setUserContainerHeight(postUserContainerHeightRef.current.clientHeight)
      if (showCommentsModal) {
        setCommentsMobileContainerHeight(commentsMobileContainerHeightRef.current.clientHeight)
      }
    }, [showCommentsModal]);

    const closeAll = () => {
      props.setShow(false)
      runInAction(() => {
        rootstore.postModalVisible = false;
      })
    };

    return (
      <Modal className="modal" show={props.show}>
        <AnimatePresence>
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {isSideBarOpen &&
              <BtnModalClose onClick={closeAll}>
                <Icon
                  strokeWidth="3"
                  height="auto"
                  width="24px"
                  name={Close}
                  strokeColor={COLORS.white}
                />
              </BtnModalClose>
            }
            <ModalContainer>
              {isSideBarOpen ?
                <Post>
                  <PostMedia
                    post={usePost}
                    singleMode={true}
                  /** this has to be added in the posts lists that has <PostMedia */
                  //position={"auction"} // position: minting/auction (see <NFTLabel> or <PostMedia>)   ----> required for NFT
                  //status={"time"}      // status: if minting: null || if auction: won/end/time        ----> required for NFT
                  //bid={true}           // true/false                                                  ----> required for NFT
                  //bidStaus={"new"}     // status: outbid/new                                          ----> required for NFT
                  />

                  <ButtonExpand onClick={toggleOpen}>
                    <motion.div
                      key="triangle"
                      animate={{ scaleX: isSideBarOpenAnimate }}
                    >
                      <Icon height="auto" width="10px" name={Triangle} />
                    </motion.div>
                  </ButtonExpand>
                  {/**<NFTLabel> is added here because it will be covered by the PostSideBar if it's the "action"(a yellow label) */}
                  {/** the left top label */}
                  {/*}   <NFTLabel
              position={"auction"} // position: minting/auction (see <NFTLabel> or <PostMedia>)   ----> required for NFT
              status={"time"}      // status: if minting: null || if auction: won/end/time        ----> required for NFT
              bid={true}           // true/false                                                  ----> required for NFT
             
            /> */}
                  {/** the right bottom label */}
                  {/*} {true ?  //bid ?
              <NFTLabel
                position={"bid"}    	//position: bid
                bidStaus={"new"}     // status: outbid/new                                          ----> required for NFT
              />
              : null} */}
                </Post>
                :
                <Post className="TransparentScrollbar">
                  <PostMedia
                    post={usePost}
                    singleMode={true}
                    size={'l'}
                  />
                  <ButtonExpand onClick={toggleOpen} >
                    <motion.div
                      key="triangle"
                      animate={{ scaleX: isSideBarOpenAnimate }}
                    >
                      <Icon height="auto" width="10px" name={Triangle} />
                    </motion.div>
                  </ButtonExpand>
                </Post>
              }

              {isSideBarOpen && (
                <PostBody>
                  <PostBodyInner >
                    <PostUserContainer ref={postUserContainerHeightRef}>
                      <Avatar
                        src={AvatarUrl(
                          usePost
                            .user.avatar, 'm'
                        )}
                        size={"medium"}
                        alt={"avatar"}
                        frame={true}
                        userName={usePost.user.uname}
                      // userName={`${usePost.user.uname} :: ${props?.owner}`}
                      //onClick={closeAll}
                      />
                      <PostBox>
                        <UserName>
                          {
                            usePost
                              .user.uname
                          }
                        </UserName>
                        <ContentDiscription>
                          <AutolinkerComponent
                            text={usePost.text}
                          />
                        </ContentDiscription>
                      </PostBox>
                      <ButtonFollow
                        userId={
                          usePost
                            .userId
                        }
                        colored={true}
                        border={false}
                        size={"small"}
                        modal={true}
                      />
                    </PostUserContainer>
                    <PostSideBarContainer
                      position={'horizontal'}
                      textareaOverlayVisible={textareaOverlayVisible}
                      priceBoxVisible={priceBoxVisible}>
                      <motion.div
                        key="postSideBarHorizontal"
                        style={{
                          zIndex: state.showGiftBar ? 1 : 99,
                          width: state.showGiftBar ? "auto" : "100%",
                          marginLeft: 24,
                        }}
                      >
                        <PostSideBar
                          post={usePost}
                          setGemAnimationDelegate={setGemAnimationDelegate}
                          onButtonClick={handleClick}
                          position={"horizontal"}
                          showAppMessage={showAppMessage}
                        />
                      </motion.div>

                      <motion.div
                        key="giftBarHorizontal"
                        onClick={handleClick}
                        variants={variantHorizontal}
                        initial={
                          showGiftAmounts
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -150 }
                        }
                        exit={
                          showGiftAmounts
                            ? { opacity: 0, x: 0 }
                            : { opacity: 1, x: 0 }
                        }
                        animate={showGiftAmounts ? "visible" : "hidden"}
                        transition={{
                          type: "spring",
                          ease: [0.17, 0.67, 0.83, 0.67],
                          damping: 30,
                          mass: 1,
                          stiffness: 400,
                        }}
                        style={{
                          overflow: state.showGiftBar ? "visible" : "hidden",
                          position: 'absolute',
                          left: 24,
                          zIndex: 999,
                        }}
                      >
                        <WrapOverflow>
                          {showGiftAmounts && (
                            <GiftBar
                              itemInfo={{
                                type: "post",
                                id: props.targetPostId,
                                owner_id: usePost.userId,
                                auth_user_id: session.userId,
                              }}
                              callback={() => {               // things to do after the user has gifted
                                // 1. hide the gift bar
                                closeGiftBar();
                                // 2. animate the gem icon
                                gemAnimationDelegate.run();
                              }}
                              position={"horizontal"}
                            />
                          )}
                        </WrapOverflow>
                      </motion.div>
                    </PostSideBarContainer>
                    {state.btnType != BUTTON_TYPES.BUY ? (
                     <div></div>
                    ) : (
                      <BuyContainer>
                        <TextLarge>{'NEXTGEMS'}</TextLarge>
                        <NFTUserContainer NFT={true}>
                          <Avatar
                            src={AvatarUrl(
                              usePost
                                .user.avatar, 'm'
                            )}
                            size={"medium"}
                            alt={"avatar"}
                            frame={true}
                            userName={
                              usePost
                                .user.uname
                            }
                          //onClick={closeAll}
                          />
                          <PostBox>
                            <NFTOwnerNameBox>
                              <UserName NFT={true}>
                                {"Minted by"}
                              </UserName>
                              <UserName>
                                {usePost.user.uname}
                              </UserName>
                            </NFTOwnerNameBox>
                            <ContentDiscription>
                              <AutolinkerComponent
                                text={usePost.text}
                              />
                            </ContentDiscription>
                          </PostBox>
                        </NFTUserContainer>
                        {propertyItems.length !== 0 &&
                          <PropertyListContainer>
                            {fullPropertyLenght ?
                              <PropertyList>
                                {propertyItems.map((property, index) => (
                                  <ItemContainer key={index} >
                                    <UserName>{'Steampunk Goggles'}</UserName>
                                    <UserName NFT={true}>{'20% have this property'}</UserName>
                                  </ItemContainer>
                                ))}
                              </PropertyList>
                              :
                              <PropertyList>
                                {propertyItems.slice(0, 2).map((property, index) => (
                                  <ItemContainer key={index} >
                                    <UserName>{'Steampunk Goggles'}</UserName>
                                    <UserName NFT={true}>{'20% have this property'}</UserName>
                                  </ItemContainer>
                                ))}
                              </PropertyList>
                            }
                            <ButtonMore
                              onClick={showFullProperty}
                            >
                              <BtnText>{'More properties'}</BtnText>
                            </ButtonMore>
                          </PropertyListContainer>
                        }
                        <BidContainer>
                          <TxtCurrentBid>{"Current Bid"}</TxtCurrentBid>
                          <BidBox main={true}>
                            <BidBox>
                              <Icon
                                className="MarginRightMedium"
                                height="auto"
                                width="40px"
                                name={Moonriver}
                              />
                              <TxtBid>{"l.567 MOVR"}</TxtBid>
                            </BidBox>
                            <TxtDollarBid>{"$3,456.89"}</TxtDollarBid>
                          </BidBox>
                          {(authUser?._id) === usePost.user.userId ?
                            <BidBox main={true}>
                              <Button
                                // onClick={''}
                                isIcon={true}
                                color={COLORS.purple}
                                colorText={COLORS.white}
                                iconWidth={"20px"}
                                strokeWidth={"2px"}
                                iconName={Shopping}
                                text={'LIST NOW'}
                                size={'medium'}
                                width={"100%"}
                                className={"FullWidth"}
                                disabled={true}
                              />
                              <EmptyBox />
                              <Button
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
                              />
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
                          }
                        </BidContainer>
                        {/*} <TitleContainer>
                            <TitleHistory>{"Offers"}</TitleHistory>
                          </TitleContainer> */}
                        <TitleContainer>
                          <TitleHistory>{"History"}</TitleHistory>
                        </TitleContainer>
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
                          bids={
                            usePost
                              .bids
                          }
                        />
                      </BuyContainer>
                    )}
                    {!session && (
                      <LoginBox
                        title={"Login to see comments"}
                        textOne={"Login to see comments and gift videos"}
                        textTwo={
                          "Don't have an account? Check out our discord for invites"
                        }
                      />
                    )}
                    {state.btnType !== BUTTON_TYPES.BUY && session && (
                      <>
                        <CommentsContainer>
                          <CommentsListInfiniteScroll
                            comments={state.comments ?? []}
                            setReplyData={setReplyData}
                            setParentCommentId={setParentCommentId}
                            setIsReply={setIsReply}
                            pullTrigger={pullTrigger}
                            refreshComments={refreshComments}
                            targetPostId={props.targetPostId}
                            postComments={props.postComments}
                            userContainerHeight={userContainerHeight}
                            mobileSize={false}
                          />
                        </CommentsContainer>
                        {state.btnType !== BUTTON_TYPES.BUY && session && (
                          <CommentInputBox textareaOverlayVisible={textareaOverlayVisible}>
                            <TextArea
                              targetId={props.targetPostId}
                              parentCommentId={parentCommentId}
                              setReplyData={setReplyData}
                              setIsReply={setIsReply}
                              replyData={replyData}
                              replyDataIsReply={replyData.isReply}
                              setShowOverlay={setShowOverlay}
                              showOverlay={showOverlay}
                              setTextareaOverlayVisible={setTextareaOverlayVisible}
                            />
                          </CommentInputBox>
                        )}
                      </>
                    )}
                  </PostBodyInner>
                  {showOverlay &&
                    <BackdropOverlay
                      onClick={closeOverlay}
                      priceBoxVisible={priceBoxVisible}
                    />
                  }

                </PostBody>
              )}
              <LinkCopiedMessage isVisible={state.isVisible} />
            </ModalContainer>

            {/* <LargeText>{"More from " + usePost.user.uname}</LargeText>
        <PostsListGrid /> */}

            {priceBoxVisible &&
              <PriceBoxWrap>
                <PriceBox />
              </PriceBoxWrap>
            }

            {showCommentsModal &&
              <Modal
                className="modal"
                show={showCommentsModal}
              >
                <MainContainer>
                  <TopBlock>
                    <p style={{ fontFamily: "LatoBlack" }}>{"Comments"}</p>
                    <BtnClose onClick={() => setShowCommentsModal(false)}>
                      <Icon
                        strokeWidth="3"
                        height="auto"
                        width="24px"
                        name={Close}
                        strokeColor={({ theme }) => theme.iconColor.color}
                      />
                    </BtnClose>
                  </TopBlock>
                  <PostUserContainer>
                    <Avatar
                      src={AvatarUrl(
                        usePost
                          .user.avatar, 'm'
                      )}
                      size={"medium"}
                      alt={"avatar"}
                      frame={true}
                      userName={usePost.user.uname}
                    // userName={`${usePost.user.uname} :: ${props?.owner}`}
                    //onClick={closeAll}
                    />
                    <PostBox>
                      <UserName>
                        {
                          usePost
                            .user.uname
                        }
                      </UserName>
                      <ContentDiscription>
                        <AutolinkerComponent
                          text={usePost.text}
                        />
                      </ContentDiscription>
                    </PostBox>
                    <ButtonFollow
                      userId={
                        usePost
                          .userId
                      }
                      colored={true}
                      border={1}
                      size={"small"}
                      modal={true}
                    />
                  </PostUserContainer>

                  <div style={{ display: "flex", flex: 1 }} ref={commentsMobileContainerHeightRef} >
                    <CommentsListInfiniteScroll
                      comments={state.comments ?? []}
                      setReplyData={setReplyData}
                      setParentCommentId={setParentCommentId}
                      setIsReply={setIsReply}
                      pullTrigger={pullTrigger}
                      refreshComments={refreshComments}
                      targetPostId={props.targetPostId}
                      postComments={props.postComments}
                      scrollingContainerHeight={"88%"}//{commentsMobileContainerHeight}
                      mobileSize={true}
                    />
                  </div>
                  <CommentInputBox style={{ display: "block" }}>
                    <TextArea
                      targetId={props.targetPostId}
                      parentCommentId={parentCommentId}
                      setReplyData={setReplyData}
                      setIsReply={setIsReply}
                      replyData={replyData}
                      replyDataIsReply={replyData.isReply}
                      setShowOverlay={setShowOverlay}
                      showOverlay={showOverlay}
                      setTextareaOverlayVisible={setTextareaOverlayVisible}
                    />
                  </CommentInputBox>
                </MainContainer>
              </Modal>
            }
            {priceBoxVisible &&
              <PriceBoxWrap>
                <PriceBox />
              </PriceBoxWrap>
            }
             {
          messageVisible &&
          <MessageAppComponent
          showAppMessage={showAppMessage}
          type={messageType}
          textMessage={message}
          />
        }
          </motion.div>



        </AnimatePresence>
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
          className="MessageTop"
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