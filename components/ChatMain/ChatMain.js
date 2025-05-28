import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import {
  MainContainer,
  SectionBox,
  TitleBox,
  ChatContainer,
  ResultContainer,
  Content,
  BtnChatState,
  TxtChat,
  TxtNormal,
  DeleteDropDown,
  TopBox,
  OptionsBox,
  OptionsSubBox,
  Wrapper,
  TxtTime,
  ListContainerRow,
  AvatarContainer,
  ChatNameBox,
  TxtShortNormal,
  HeaderCompponent,
  InviteBox,
  IconWrapper,
  CopyButton,
  TxtTitleInvite,
  ScrollContainer,
  TabWrapper
} from "./ChatMain.elements";
import { inject, observer } from "mobx-react";
import RootStore, { useStore } from "../../stores/RootStore";
import Icon from ".././Icon/Icon";
import Avatar from ".././Avatar/Avatar";
import { AvatarUrl } from "../../stores/tools";
import AvatarDefault from "../../public/icons/avatar.svg";
import Options from "../../public/icons/options.svg";
import DeleteIcon from "../../public/icons/deleteIcon.svg";
import { COLORS, } from "../../styles/Styling";
import { motion, AnimatePresence } from "framer-motion";
import TabComponentTwo from "../TabComponentTwo/TabComponentTwo";
import SearchChat from "../SearchChat/SearchChat";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScaleLoader } from "react-spinners";
import { action, runInAction } from "mobx";
import client from "../../pages/api/client";
import { useSession } from "next-auth/client";
import SearchModalChat from "../SearchModalChat/SearchModalChat";
import Button from "../Button/Button";
import moment from "moment";
import { ChatBox } from "../SearchModalChat/SearchModalChat.elements";
import { Name } from "../ChatList/ChatList.elements";

const ChatMain = forwardRef((props, ref) => {
  const rootstore = useStore();
  const [session, loading] = useSession();
  const [chatActive, setChatActive] = useState(true);
  const [chatRequest, setChatRequest] = useState(false);
  const [hoverId, setHoverId] = useState("");
  const [hover, setHover] = useState(false);
  const [selectedChat, setSelectedChat] = useState("");
  const [deleteId, setDeleteId] = useState();
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [chatOffset, setChatOffset] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [inviteCodeCopied, setInviteCodeCopied] = useState(false);
  const [inviteCode, setInviteCode] = useState(null);
  const [remainingUses, setRemainingUses] = useState(0);
  const inviteCodeRef = useRef(null);
  const [showChats, setShowChats] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followHasMore, setFollowHasMore] = useState(true);
  const [followOffset, setFollowOffset] = useState(0);
  const [topActive, setTopActive] = useState(true);
  const [usersActive, setUsersActive] = useState(false);

  const handleChatStateClick = (btnType) => {
    if (btnType == "active") {
      setChatActive(true);
      setChatRequest(false);
    } else if (btnType == "request") {
      setChatActive(false);
      setChatRequest(true);
    }
  };

  const handleTop = () => {
    setTopActive(true)
    setUsersActive(false)
    //TODO sorting?
  }

  const handleUsers = () => {
    setTopActive(false)
    setUsersActive(true)
    //TODO sorting?
  }

  React.useEffect(() => {
    async function doEffect() {
      const roomsTotal = await rootstore.getChatlistTotal();
      setTotalRooms(roomsTotal);
      if (roomsTotal === 0 || roomsTotal < 20) {
        setHasMore(false);
      } else {
        const roomList = await rootstore.getChatroomlist(chatOffset);
        const roomId = roomList[0].roomId;
      }
      const following = await rootstore.getFollowing(session.user._id, 0);
      setFollowingUsers(following.data);
    }
    doEffect();
  }, []);

  //The variable to determine empty chats
  React.useEffect(() => {
    async function doEffect() {
      var roomId = rootstore.roomId;
      if (roomId !== null) {
        setShowChats(true);
      } else {
        setShowChats(false);
      }
    }
    doEffect();
  }, [rootstore.roomId]);

  React.useEffect(() => {
    async function doEffect() {
      if (rootstore.selectedRoomId !== null) {
        setSelectedChat(rootstore.selectedRoomId);
      }
    }
    doEffect();
  }, [rootstore.selectedRoomId]);

  //Change the focus on adding a new chat
  // React.useEffect(() => {
  //   async function doEffect() {
  //    openChat(rootstore.roomId)
  //   }
  //   doEffect();
  // }, [rootstore.roomId]);

  //To refresh the chatlist to show the recent change
  React.useEffect(() => {
    client.service("messages").on(
      "created",
      action(async (message) => {
        if (message.userId === session?.user?._id) {
          setChatOffset(0);
          setHasMore(true);
          await rootstore.loadInitialMessageList();
          if (rootstore.messages.length < 20) {
            setHasMore(false);
          }
        } else {
          setChatOffset(0);
          setHasMore(true);
          await rootstore.loadInconmingMessages();
        }
      })
    );
  }, []);

  //Useeffect to update the chatlist on edit message
  // React.useEffect(() => {
  //   client.service("messages").on(
  //     "patched",
  //     action(async (message) => {
  //       runInAction(() => {
  //         const updatedRoomDetails = rootstore.chatRoomList.find(
  //           (m) => m.roomId == message.roomId
  //         );
  //         updatedRoomDetails.lastMessage = message.text;
  //         rootstore.messages[rootstore.messages.findIndex(msg => msg._id == message._id)] = message
  //       });
  //       // runInAction(() => )
  //     })
  //   );
  // }, []);

  useEffect(async () => {
    try {
      let { invitesRemaining, inviteCode } = await client
        .service("generate-invite-code")
        .create({});
      setInviteCode(inviteCode);
      setRemainingUses(invitesRemaining);
    } catch (err) {
      setInviteCode(null);
      setRemainingUses(0);
    }
  }, []);

  async function openChat(roomId) {
    setSelectedChat(roomId);
    await rootstore.loadMessagesOnClick(roomId, 0);
  }

  //Useeffect event listener for for delete chat and leave chat list
  React.useEffect(() => {
    client.service("user-rooms").on(
      "removed",
      action((data) => {
        runInAction(() => {
          const updatedChatList = rootstore.chatRoomList.filter(
            (m) => m.roomId !== data.roomId
          );

          rootstore.chatRoomList = updatedChatList;
        });
      })
    );
  }, []);

  function handleCopyInvite() {
    setInviteCodeCopied(true);
    setTimeout(() => {
      setInviteCodeCopied(false);
    }, 3000);
  }

  async function clickDeleteOption(roomId) {
    onOptionsHover(false, roomId);
    onOptionsTap(false, roomId);
    await rootstore.deleteChatroom(roomId);
  }

  async function clickLeaveOption(roomId) {
    onOptionsHover(false, roomId);
    onOptionsTap(false, roomId);
    //console.log("You left the chat room");
    await rootstore.leaveChatroom(roomId, session?.user?._id);
  }

  // const convertDate = (hoursMinutesPosted) => {
  //   //console.log(hoursMinutesPosted,"the timestamp")
  //   let postedDate = moment.unix(hoursMinutesPosted);
  //   return postedDate.format("H:MM A");
  // };
  const convertDate = (timeStamp) => {
    let postedDate = moment(timeStamp);
    let nowDate = moment();
    let yesterday = moment().subtract(1, "days").startOf("day");
    let dateDayMonth = "";

    if (postedDate.isSame(nowDate, "day")) {
      dateDayMonth = "Today";
    } else if (postedDate.isSame(yesterday, "day")) {
      dateDayMonth = "Yesterday";
    } else {
      let newD = postedDate.format("ll");
      dateDayMonth = newD.slice(0, 5);
    }
    return dateDayMonth;
  };

  const onOptionsHover = (value, roomId) => {
    if (value) {
      setHoverId(roomId);
      setHover(true);
    } else {
      if (deleteButtonVisible) {
        setHover(true);
      } else {
        setHoverId("");
        setHover(false);
      }
    }
  };

  const onOptionsTap = (value, roomId) => {
    setDeleteId(roomId);
    setDeleteButtonVisible(value);
  };

  useImperativeHandle(ref, () => ({
    closeAll() {
      if (deleteButtonVisible) {
        setDeleteId("");
        setDeleteButtonVisible(false);
        setHoverId("");
        setHover(false);
      }
    },
  }));

  const optionsVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  async function loadMoreChatList() {
    //console.log("-------------entering fetcmore");
    const newOffset = chatOffset + 20;
    setChatOffset(newOffset);
    await rootstore.getChatroomlist(newOffset);
    if (newOffset > totalRooms) {
      setHasMore(false);
    }
  }

  //----------------------------------------Showing unread chats---------------------------------------------

  const isUnread = (chatItem) => {
    if (!chatItem.lastRead || chatItem.timestamp > chatItem.lastRead) {
      return true;
    } else {
      return false;
    }
  };

  //----------------------------------------For a new user without any existing chats------------------------

  async function loadMoreUsers() {
    //console.log("-------------entering fetcmore");
    const newOffset = followOffset + 20;
    setFollowOffset(newOffset);
    const following = await rootstore.getFollowing(session.user._id, newOffset);
    setFollowingUsers(following.data);
    if (newOffset > following.total) {
      setFollowHasMore(false);
    }
  }

  async function createChat(userId) {
    await rootstore.joinPrivateChat(userId);
    //onHide()
  }

  return (
    <>
      {props.smallWindow ? (
        <div className="flex" id="chatroomsList" style={{}}>
          <InfiniteScroll
            dataLength={rootstore.chatRoomList.length}
            hasMore={hasMore}
            /*loader={
              <div className="flex" style={{ alignSelf: "center" }}>
                <ScaleLoader color={COLORS.purple} loading={true} size={150} />
              </div>
            }*/
            scrollableTarget="chatroomsList"
            style={{
              width: "100%",
              flexDirection: "column",
              overflowX: "hidden",
            }}
            next={loadMoreChatList}
            scrollThreshold={0.8}
          // height={"99.5%"}  <-here ho height, this is horizontal list
          // pullDownToRefresh={true}
          // refreshFunction={pullToRefresh}
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={<div className="flex" style={{alignSelf:"center",}}><ScaleLoader color={COLORS.yellow} loading={true} size={150} /></div>}
          >
            <ListContainerRow>
              {rootstore.chatRoomList.map((chat, index) => (
                <AvatarContainer
                  key={index}
                  style={{
                    backgroundColor:
                      chat.roomId === selectedChat ? COLORS.whiteLight : null,
                    borderRadius: 10,
                    padding: 5,
                    marginTop: 3,
                  }}
                  onClick={() => {
                    openChat(chat.roomId);
                  }}
                  as={motion.div}
                  //className={hover && deleteButtonVisible ? 'noHover' : ''}
                  whileHover={"visible"}
                  onHoverStart={() => onOptionsHover(true, chat.roomId)}
                  onHoverEnd={() => onOptionsHover(false, chat.roomId)}
                >
                  {chat.profilePic ? (
                    <Avatar
                      src={AvatarUrl(chat.profilePic, "m")}
                      size={"medium"}
                      alt={"Avatar"}
                      frame={false}
                      edit={false}
                      userName={chat.rname}
                      userId={chat.userId}
                      isUnread={isUnread(chat)}
                      navBar={true}
                    />
                  ) : (
                    <Icon
                      strokeWidth="2"
                      height="30px"
                      width="30px"
                      name={AvatarDefault}
                    />
                  )}
                  <AnimatePresence>
                    <ChatNameBox
                      as={motion.div}
                      variants={optionsVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {hover && chat.roomId === hoverId ? (
                        <TxtShortNormal>
                          {chat.rname !== "" ? chat.rname : "Chat Group"}
                        </TxtShortNormal>
                      ) : null}
                    </ChatNameBox>
                  </AnimatePresence>
                </AvatarContainer>
              ))}
            </ListContainerRow>
          </InfiniteScroll>
        </div>
      ) : (
        <MainContainer>
          <HeaderCompponent>
           {/*} <TabWrapper>
              <TabComponentTwo
                leftText={"Top"}
                rightText={"Users"}
                setLeftSide={handleTop}
                setRightSide={handleUsers}
                leftSide={topActive}
                rightSide={usersActive}
                margin={true}
              />
            </TabWrapper> */}
            {/* <SearchBarMobile notMobile={true} /> */}
            <SearchChat
              notMobile={true}
              setOpenSearchModal={setOpenSearchModal}
              setSearchText={setSearchText}
              searchText={searchText}
              setSuggestions={setSuggestions}
            />
            {/*<InviteBox>
              <TopBox>
                <IconWrapper>
                  <Icon width="auto" height={"50px"} name={Gem} />
                </IconWrapper>
                <SectionBox innerBox={true}>
                  <TxtTitleInvite>{"Invite others to yuser"}</TxtTitleInvite>
                  <p>{"Tap to copy and share your invite code"}</p>
                </SectionBox>
              </TopBox>
              <CopyButton>
                <CopyToClipboard text={inviteCode} onCopy={handleCopyInvite}>
                  <p style={{ fontFamily: "LatoBlack", color: COLORS.white }}>
                    {!inviteCodeCopied ? inviteCode : "Invite code copied!"}
                  </p>
                </CopyToClipboard>
              </CopyButton>
            </InviteBox>*/}
            {/*<TitleBox>
              <BtnChatState
                onClick={() => handleChatStateClick("active")}
                click={chatActive}
                chatState={chatActive}
              >
                <TxtChat innerBox={true} chatState={chatActive}>
                  {"Active Chats"}
                </TxtChat>
              </BtnChatState> */}
            {/* <BtnChatState
                onClick={() => handleChatStateClick("request")}
                click={chatRequest}
                chatState={chatRequest}
              >
                <TxtChat innerBox={true} chatState={chatRequest}>
                  {"Chat Request"}
                </TxtChat>
              </BtnChatState> */}
            {/**</TitleBox> */}
          </HeaderCompponent>
          {showChats === true ? (
            <ScrollContainer>
              <InfiniteScroll
                dataLength={rootstore.chatRoomList.length}
                hasMore={hasMore}
                loader={
                  <div className="flex" style={{ justifyContent: "center" }}>
                    <ScaleLoader
                      color={COLORS.purple}
                      loading={true}
                      size={150}
                    />
                  </div>
                }
                scrollableTarget="chatroomsList"
                next={loadMoreChatList}
                scrollThreshold={0.8}
                style={{
                  display: "block",
                  flex: 1,
                  flexDirection: "column",
                  overflowX: "hidden",
                }}
                height={"100%"}
                className={"TransparentScrollbar"}
              // pullDownToRefresh={true}
              // refreshFunction={pullToRefresh}
              // pullDownToRefreshThreshold={50}
              // pullDownToRefreshContent={<div className="flex" style={{alignSelf :"center",}}><ScaleLoader color={COLORS.yellow} loading={true} size={150} /></div>}
              >
                {rootstore.chatRoomList.length > 0 ? (
                  <ChatContainer className="Flex">
                    {rootstore.chatRoomList.map((chat, index) => (
                      <Wrapper
                        key={chat.roomId}
                        hover={hover}
                        onHoverChat={chat.roomId === hoverId ? true : false}
                        onMouseOver={() => onOptionsHover(true, chat.roomId)}
                        className="Flex"
                      >
                        <ResultContainer
                          selectedChat={chat.roomId === selectedChat ? true : false}
                          chat={chat}
                          onClick={() => {
                            openChat(chat.roomId);
                          }}
                        >
                          {chat.profilePic ? (
                            <Avatar
                              src={AvatarUrl(chat.profilePic, "m")}
                              size={"medium"}
                              alt={"Avatar"}
                              frame={false}
                              edit={false}
                              userName={chat.rname}
                              //userId={chat.userId}
                              isUnread={isUnread(chat)}
                            />
                          ) : (
                            <Icon
                              strokeWidth="2"
                              height="auto"
                              width="50px"
                              name={AvatarDefault}
                            />
                          )}
                          <SectionBox innerBox={true} className="Flex">
                            <TopBox className="Flex">
                              <TxtNormal>
                                {chat.rname !== "" ? chat.rname : "Chat Group"}
                              </TxtNormal>
                              <TxtTime>{convertDate(chat.timestamp)}</TxtTime>
                            </TopBox>
                            <Content>{chat.lastMessage}</Content>
                          </SectionBox>
                          {/* {
                         isUnread(chat)?
                         <div className="flex" style={{width:15,height:15,borderRadius:"50%",backgroundColor:COLORS.purple}}></div>:null
                        } */}
                          <AnimatePresence>
                            <OptionsBox
                              className={
                                hover && deleteButtonVisible ? "noHover" : ""
                              }
                              as={motion.div}
                              whileHover={"visible"}
                              onHoverStart={() =>
                                onOptionsHover(true, chat.roomId)
                              }
                              onHoverEnd={() =>
                                onOptionsHover(false, chat.roomId)
                              }
                            >
                              {hover && chat.roomId === hoverId ? (
                                <OptionsSubBox
                                  as={motion.div}
                                  variants={optionsVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  onClick={() =>
                                    onOptionsTap(true, chat.roomId)
                                  }
                                  className="Flex"
                                >
                                  <Icon
                                    height="24px"
                                    width="24px"
                                    name={Options}
                                    color={({ theme }) => theme.iconColor.color}
                                  />
                                </OptionsSubBox>
                              ) : null}
                            </OptionsBox>

                            {deleteId === chat.roomId &&
                              deleteButtonVisible &&
                              chat.isAdmin ? (
                              <DeleteDropDown
                                as={motion.div}
                                variants={optionsVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={() => {
                                  clickDeleteOption(chat.roomId);
                                }}
                              >
                                <Icon
                                  height="24px"
                                  width="24px"
                                  name={DeleteIcon}
                                />
                                <TxtChat>Delete room</TxtChat>
                              </DeleteDropDown>
                            ) : deleteId === chat.roomId &&
                              deleteButtonVisible &&
                              !chat.isAdmin ? (
                              <DeleteDropDown
                                as={motion.div}
                                variants={optionsVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={() => {
                                  clickLeaveOption(chat.roomId);
                                }}
                              >
                                <Icon
                                  height="24px"
                                  width="24px"
                                  name={DeleteIcon}
                                  strokeColor={({ theme }) => theme.iconColor.color}
                                  strokeWidth="2"
                                />
                                <TxtChat>Leave room</TxtChat>
                              </DeleteDropDown>
                            ) : null}
                          </AnimatePresence>
                        </ResultContainer>
                        <div className="flex" ider />
                      </Wrapper>
                    ))}
                  </ChatContainer>
                ) : null}
              </InfiniteScroll>
            </ScrollContainer>
          ) : (
            <div className="flex">
              <InfiniteScroll
                dataLength={followingUsers}
                hasMore={followHasMore}
                loader={
                  <div className="flex" style={{ justifyContent: "center" }}>
                    <ScaleLoader
                      color={COLORS.purple}
                      loading={true}
                      size={150}
                    />
                  </div>
                }
                scrollableTarget="chatroomsList"
                next={loadMoreUsers}
                scrollThreshold={0.8}
                style={{
                  display: "block",
                  flex: 1,
                  flexDirection: "column",
                  overflowX: "hidden",
                }}
                height={"100%"}
                className={"TransparentScrollbar"}
              // pullDownToRefresh={true}
              // refreshFunction={pullToRefresh}
              // pullDownToRefreshThreshold={50}
              // pullDownToRefreshContent={<div className="flex" style={{alignSelf :"center",}}><ScaleLoader color={COLORS.yellow} loading={true} size={150} /></div>}
              >
                {followingUsers.map((suggestion, index) => (
                  <ChatBox key={index}>
                    <div className="flex">
                      <Avatar
                        src={AvatarUrl(suggestion.user.avatar, "s")}
                        size={"medium"}
                        alt={"Author Avatar"}
                        frame={false}
                        edit={false}
                      />
                      <Name>
                        {suggestion.user.uname !== ""
                          ? suggestion.user.uname
                          : "Anonymous"}
                      </Name>
                    </div>
                    <Button
                      text={"Chat"}
                      onClick={() => createChat(suggestion.user._id)}
                      isIcon={false}
                      color={COLORS.purple}
                      colorText={COLORS.white}
                      //className={'FullWidth'}
                      className={"MarginRightLarge"}
                    />
                  </ChatBox>
                ))}
              </InfiniteScroll>
            </div>
          )}
          {openSearchModal && (
            <SearchModalChat
              setSearchText={setSearchText}
              setSuggestions={setSuggestions}
              setOpenSearchModal={setOpenSearchModal}
              suggestions={suggestions}
            />
          )}
        </MainContainer>
      )}
    </>
  );
});

export default inject("store")(observer(ChatMain));
