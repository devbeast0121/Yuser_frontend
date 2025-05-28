import React, { useState, useRef } from "react";
import {
  SectionBox,
  ChatContainer,
  MainContainer,
  ResultContainer,
  Name,
  Comment,
  Date,
  ReplyContainer,
  OptionsMenu,
  MenuButton,
  OptionsSubMenu,
  SubMenuButton,
  BtnText,
  Image,
  DeleteButton,
  ImageWrapper,
} from "./MessageList.elements";
import Avatar from ".././Avatar/Avatar";
import { inject, observer } from "mobx-react";
import { AvatarUrl } from "../../stores/tools";
import AvatarDefault from "../../public/icons/avatar.svg";
import { useStore } from "../../stores/RootStore";
import { action, runInAction } from "mobx";
import ReplyComponent from "../ReplyComponent/ReplyComponent";
import Icon from "../Icon/Icon";
import Emoji from "../../public/icons/emoji3.svg";
import Reply from "../../public/icons/reply.svg";
import Options from "../../public/icons/dots2.svg";
import Edit from "../../public/icons/pencil.svg";
import Copy from "../../public/icons/copy.svg";
import Delete from "../../public/icons/deleteIcon.svg";
import { session, useSession } from "next-auth/client";
import OverlayComponent from "../OverlayComponent/OverlayComponent";
import moment from "moment";
import ImageModal from "../ImageModal/ImageModal";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling";
import client from "../../pages/api/client";
import dynamic from 'next/dynamic';
import MessageReactions from "../EmojiReactions/EmojiReactions";
import { AutolinkerComponent } from "..";
import useOnClickOutside from '../../Hooks/useOnClickOutside';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default inject("store")(
  observer(function MessageList(props) {
    const [session, loading] = useSession();
    const rootstore = useStore();
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [offset, setOffset] = useState(25);
    const [hasMore, setHasMore] = useState(true);
    const [subMenuVisible, setSubMenuVisible] = useState(false);
    const [selectedMessageID, setSelectedMessageID] = useState("");
    const [hover, setHover] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [groupIndexLocal, setGroupIndexLocal] = useState("");
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState("");
    const [groupMessages, setGroupMessages] = useState([]); // messages are grouped by days
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
    const [selectedEmojiMessage, setSelectedEmojiMessage] = useState(null)
    const [selectedChat, setselectedChat] = useState(null)
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false)
    const [messageId, setMessageId] = useState(false)
    const optionsSubMenuRef = useRef(null);
    let timer = 0;

    React.useEffect(() => {
      async function doEffect() {
        var roomId = rootstore.roomId;
        setRoomId(roomId);
        setHasMore(true);
        setOffset(25);
        if (rootstore.roomId !== null && session?.user?._id) {
          const adminInfo = await rootstore.isUserAdminOfRoom(
            session.user._id,
            rootstore.roomId
          );
          setIsAdmin(adminInfo);
        }
      }
      doEffect();
    }, [rootstore.roomId]);


    //Rerender everytime the incoming prop changes
    React.useEffect(() => {
      setGroupIndexLocal(props.groupIndex);
      setGroupMessages(props.group);
    }, [props.group]);

    // const convertDate = (hoursMinutesPosted) => {
    //   //console.log(hoursMinutesPosted,"the timestamp")
    //   let postedDate = moment.unix(hoursMinutesPosted);
    //   return postedDate.format("H:MM A");
    // };
    const convertDate = (timeStamp) => {
      let postedDate = moment(timeStamp);
      let nowDate = moment()
      let yesterday = moment().subtract(1, 'days').startOf('day');
      let dateDayMonth = ""
      dateDayMonth = postedDate.format("LT")
      return dateDayMonth
    };

    // const removeGif = () => {
    //   console.log("pressed remove")
    // }
    async function removeGif(message) {
      await rootstore.deleteMessage(message._id).then(async (chat) => {
        const newRoom = await client.service("user-rooms").find({
          query: {
            $limit: 1,
            roomId: chat.roomId,
            userId: session?.user?._id,
          },
        });
        runInAction(() => {
          rootstore.messages = rootstore.messages.filter(
            (m) => m._id != chat._id
          );
          const updatedRoomDetails = rootstore.chatRoomList.find(
            (m) => m.roomId == chat.roomId
          );
          //console.log(updatedRoomDetails, newRoom.data[0].lastMessage);
          updatedRoomDetails.lastMessage = newRoom.data[0].lastMessage;
        });
      });
      //closeOverlay();
    }

    function onHoverGif(value, messageId) {
      if (value) {
        setMessageId(messageId);
        setDeleteButtonVisible(true)
        const timers = setTimeout(() => {
          setMessageId("");
          setDeleteButtonVisible(false)
        }, 3000)
        return () => clearTimeout(timers)
      }
    }

    const ShowImage = (chatInst) => {
      let uriImage;
      let chat = chatInst.chat;
      if (chat.imageType == "jpeg") {
        uriImage = chat.images[0];
      } else if (
        (chat.imageType == "gif" && chat.images[0].includes("giphy.com")) ||
        chat.imageType == "sticker"
      ) {
        const urlYuser = chat.images[0].substring(29); // remove yuser part
        const urlGiphy = urlYuser.substring(31); //remove giphy part

        const idEnd = urlGiphy.indexOf("/");
        const id = urlGiphy.substring(0, idEnd); //pure id
        const url = "https://media1.giphy.com/media/" + id + "/giphy.gif";
        uriImage = url;
      }
      else if (chat.imageType == "image/jpeg" || chat.imageType == "image/png") {
        uriImage = chat.images[0];
      }

      return (
        <div style={{ flexDirection: "row" }}>
          {chat.imageType == undefined ?
            null
            :
            <ImageWrapper
              onClick={() => openImageModal(chatInst.chat)}
              onMouseOver={() =>
                onHoverGif(true, chatInst.chat._id)
              }
            >
              {(chat.imageType == "jpeg" || chat.imageType == "image/jpeg" || chat.imageType == "image/png") &&
                <Image
                  uriImage={uriImage}
                  alt={"message image"}
                />
              }
              {chat.imageType == "gif" &&
                <Image
                  uriImage={uriImage}
                  alt={"message gif"}
                />
              }
            </ImageWrapper>
          }
          {chat.imageType == undefined ?
            null
            :
            <>
              {deleteButtonVisible && chatInst.chat._id == messageId && chatInst.chat.user.uname === session?.user?.uname ?
                <DeleteButton
                  onClick={() => removeGif(chatInst.chat)}
                >
                  <Icon height="18px" width="auto" name={Delete} />
                </DeleteButton>
                : null
              }
            </>
          }
        </div>
      );
    };

    function onOptionsHover(value, messageId) {
      setSelectedMessageID(messageId);
      setHover(true);
      setGroupIndexLocal(props.groupIndex);
      //timer = setTimeout(() => {
      // setSelectedMessageID("");
      //setHover(false);
      //setGroupIndexLocal("");
      // }, 4000);
      //return () => clearTimeout(timer)
    }

    function toggleSubMenu(chatId) {
      // const timer = setTimeout(() => {
      setOverlayVisible(!overlayVisible);
      setSubMenuVisible(!subMenuVisible);

      if (subMenuVisible) {
        //clearTimeout(timer)
        setSelectedMessageID("");
        useOnClickOutside(optionsSubMenuRef, closeOverlay)
      } else {
        setSelectedMessageID(chatId);
      }
      // }, 300);
      return () => clearTimeout(timer)
    }

    function onEmojiPress(chat) {
      setSelectedEmojiMessage(chat._id)
      setselectedChat(chat)
      setHover(false);
      setEmojiPickerVisible(true);
      setOverlayVisible(true)
    }

    function replyMessage(message) {
      props.setReplyToId(message._id);
      props.setReplyText(message.text);
      closeOverlay();
    }

    function editMessage(message) {
      runInAction(() => {
        rootstore.editMessageText = message
      });

      closeOverlay();
    }

    function copyMessage(message) {
      if (message.text !== "") {
        navigator.clipboard.writeText(message.text);
      }
      closeOverlay();
    }

    //the function to delete a message and to refresh the message list and the chat list
    async function deleteMessage(message) {
      await rootstore.deleteMessage(message._id).then(async (chat) => {
        const newRoom = await client.service("user-rooms").find({
          query: {
            $limit: 1,
            roomId: chat.roomId,
            userId: session?.user?._id,
          },
        });
        runInAction(() => {
          rootstore.messages = rootstore.messages.filter(
            (m) => m._id != chat._id
          );
          const updatedRoomDetails = rootstore.chatRoomList.find(
            (m) => m.roomId == chat.roomId
          );
          //console.log(updatedRoomDetails, newRoom.data[0].lastMessage);
          updatedRoomDetails.lastMessage = newRoom.data[0].lastMessage;
        });
      });
      closeOverlay();
    }

    const closeOverlay = () => {
      setOverlayVisible(false);
      setSubMenuVisible(false);
      setHover(false);
      setEmojiPickerVisible(false);
    };

    const closeImageModal = () => {
      setImageModalVisible(false);
    };

    const openImageModal = (message) => {
      if (message.imageType == "jpeg") {
        let uriImage = message.images[0];
        setImageHeight(message.imageHeight * 3);
        setImageWidth(message.imageWidth * 3);
        setImageUri(uriImage);
      }
      else if (message.imageType == "image/jpeg" || message.imageType == "image/png") {

        let uriImage = message.images[0];
        setImageHeight(message.imageHeight * 3);
        setImageWidth(message.imageWidth * 3);
        setImageUri(uriImage);
      }
      else if (
        (message.imageType == "gif" &&
          message.images[0].includes("giphy.com")) ||
        message.imageType == "sticker"
      ) {
        const urlYuser = message.images[0].substring(29); // remove yuser part
        const urlGiphy = urlYuser.substring(31); //remove giphy part
        const url = "https://media1.giphy.com/media/" + urlGiphy;

        setImageHeight(message.imageHeight);
        setImageWidth(message.imageWidth);
        setImageUri(url);
      }
      setImageModalVisible(true);
    };

    //Emoji reactions


    async function onEmojiClick(event, emojiObject) {
      //console.log(selectedChat,"selected chat")
      let newMessage = selectedChat
      let newReaction = { code: emojiObject.unified, count: 1, reactors: [session?.user?._id] }
      //newMessage.reactions=emojiObject.unified
      if (newMessage.reactions)
        newMessage.reactions.push(newReaction)
      else {
        newMessage.reactions = []
        newMessage.reactions.push(newReaction)
      }
      //console.log(newMessage,"the new rwacjkkl")
      // console.log(newMessage,"the new message")
      runInAction(() => rootstore.messages[rootstore.messages.findIndex(msg => msg._id == selectedEmojiMessage._id)] = newMessage)
      await rootstore.reactToMessage(selectedEmojiMessage, emojiObject.unified)
      setEmojiPickerVisible(false)
      setOverlayVisible(false);
      //reactToMessageWithCallback(selectedEmojiMessage,emojiObject.unified)
    };

    async function undoEmojiPress(msg, emoCode) {
      await rootstore.reactToMessage(msg._id, emoCode)
    };


    //Useeffect to update the chatlist on edit message
    React.useEffect(() => {
      client.service("messages").on(
        "patched",
        action(async (message) => {

          props.group[props.group.findIndex(msg => msg._id == message._id)] = message
          //groupMessages[groupMessages.findIndex(msg=>msg._id==message._id)]=message
          runInAction(() => {
            const updatedRoomDetails = rootstore.chatRoomList.find(
              (m) => m.roomId == message.roomId
            );
            updatedRoomDetails.lastMessage = message.text;
            rootstore.messages[rootstore.messages.findIndex(msg => msg._id == message._id)] = message
          });

        })
      );
    }, []);

    const unamePress = (userName) => {
      window.open('/' + userName, '_ blank')
    }

    return (
      <ChatContainer id="scrollableDiv">
        {groupMessages.map((message, index) => (
          <MainContainer
            key={index}
            chat={message}
            onMouseOver={() => onOptionsHover(true, message._id)}
            //onMouseOut={() => onOptionsHover(false, message._id)}
            hover={hover}
            groupIndexLocal={groupIndexLocal == props.groupIndex ? true : false}
            selectedMessageID={selectedMessageID == message._id ? true : false}
          >
            <ReplyContainer>
              {message.replyingTo ? (
                <ReplyComponent
                  replyToId={message.replyingTo}
                  roomId={rootstore.roomId}
                  offset={offset}
                  messages={groupMessages}
                />
              ) : null}
              <ResultContainer>
                {message.user ? (
                  <Avatar
                    src={AvatarUrl(message.user.avatar, "s")}
                    size={"medium"}
                    alt={"Author Avatar"}
                    frame={false}
                    edit={false}
                    userId={message.userId}
                  />
                ) : (
                  <Avatar
                    src={AvatarDefault}
                    size={"medium"}
                    alt={"Author Avatar"}
                    frame={false}
                    edit={false}
                  />
                )}

                <SectionBox>
                  <div>
                    <Name onClick={() => unamePress(message.user.uname)} style={{ cursor: "pointer" }}>{message.user.uname}</Name>
                    <Date>{convertDate(message.createdAt)}</Date>
                  </div>
                  <Comment>{message.text}</Comment>
                  {
                    message.images.length !== 0 && (
                      <ShowImage chat={message} />
                    )
                    // <img src={chat.images[0]} alt="this is a image relating to the comment, the line above it says chat.commentImage" />
                  }
                  {
                    ((message.reactions) && (message.reactions.length > 0)) &&
                    <MessageReactions
                      //reactToMessageWithCallback={(msgId, code) => reactToMessageWithCallback(msgId, code)}
                      //openEmojiSheetOnMsg={this.props.openEmojiSheetOnMsg}
                      hostMsgId={message._id}
                      reactions={message.reactions}
                      onEmojiPress={onEmojiPress}
                      hostMsg={message}
                      undoEmojiPress={undoEmojiPress}
                    />
                  }
                </SectionBox>
                {hover &&
                  groupIndexLocal == props.groupIndex &&
                  selectedMessageID == message._id ? (
                  <OptionsMenu>
                    <MenuButton onClick={() => onEmojiPress(message)}>
                      <Icon height="20px" width="20px" name={Emoji} color={({ theme }) => theme.iconColor.color} />
                    </MenuButton>
                    <MenuButton onClick={() => replyMessage(message)}>
                      <Icon height="18px" width="auto" name={Reply} strokeWidth="1.5" strokeColor={({ theme }) => theme.iconColor.color} />
                    </MenuButton>
                    <MenuButton onClick={() => toggleSubMenu(message._id)}>
                      <Icon height="15px" width="auto" name={Options}
                        color={({ theme }) => theme.iconColor.color}
                      />
                    </MenuButton>
                  </OptionsMenu>
                ) : null}
                {emojiPickerVisible && selectedEmojiMessage == message._id ? (
                  <div style={{ zIndex: 999, position: "sticky", top: 0, right: 0 }}>
                    <Picker
                      onEmojiClick={onEmojiClick}
                      pickerStyle={{ className: "aside.emoji-picker-react" }} // globalStyles: aside.emoji-picker-react
                      disableSearchBar={true}
                    />
                  </div>
                ) : null}
                {subMenuVisible && selectedMessageID == message._id ? (
                  <OptionsSubMenu ref={optionsSubMenuRef}>
                    <SubMenuButton onClick={() => replyMessage(message)}>
                      <BtnText>{"Reply"}</BtnText>
                      <Icon height="18px" width="auto" name={Reply} strokeWidth="1.5" strokeColor={({ theme }) => theme.iconColor.color} />
                    </SubMenuButton>
                    {message.userId === session?.user?._id && (
                      <SubMenuButton onClick={() => editMessage(message)}>
                        <BtnText>{"Edit"}</BtnText>
                        <Icon height="18px" width="auto" name={Edit} strokeWidth="2" strokeColor={({ theme }) => theme.iconColor.color} />
                      </SubMenuButton>
                    )}

                    <SubMenuButton onClick={() => copyMessage(message)}>
                      <BtnText>{"Copy"}</BtnText>
                      <Icon height="18px" width="auto" name={Copy} strokeWidth="2" strokeColor={({ theme }) => theme.iconColor.color} />
                    </SubMenuButton>
                    {(message.userId === session?.user?._id || isAdmin) && (
                      <SubMenuButton onClick={() => deleteMessage(message)}>
                        <BtnText>{"Delete"}</BtnText>
                        <Icon height="18px" width="auto" name={Delete} strokeWidth="2" strokeColor={({ theme }) => theme.iconColor.color} />
                      </SubMenuButton>
                    )}
                  </OptionsSubMenu>
                ) : null}
              </ResultContainer>
            </ReplyContainer>
          </MainContainer>
        ))}
        <OverlayComponent
          overlayVisible={overlayVisible}
          closeOverlay={closeOverlay}
          backgroundColor={"transparent"}
        />
        {imageModalVisible && (
          <ImageModal
            closeImageModal={closeImageModal}
            uriImage={imageUri}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
          />
        )}
      </ChatContainer>
    );
  })
);
