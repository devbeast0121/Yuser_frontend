import React, { useState } from "react";
import {
  ChatContainer,
  MainContainer,
  DateContainer,
  Date,
  MessageInputBox,
  MainOuterContainer,
} from "./DaysList.elements";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ScaleLoader from "react-spinners/ScaleLoader";
import { COLORS } from "../../styles/Styling";
import { useStore } from "../../stores/RootStore";
import { runInAction } from "mobx";
import ChatInput from "../ChatInput/ChatInput";
import moment from "moment";
import MessageList from "../MessageList/MessageList";
import { session, useSession } from "next-auth/client";
import EmptyChat from "../EmptyChat/EmptyChat";
import client from "../../pages/api/client";

//for grouping messages by days, a list of messages (one day) inside a list of days
export default inject("store")(
  observer(function DaysList({ messages = [] }) {
    const rootstore = useStore();
    const [session, loading] = useSession();
    const [offset, setOffset] = useState(25);
    const [hasMore, setHasMore] = useState(true);
    const [replyToId, setReplyToId] = useState(null);
    const [editMessageDetails, setEditMessageDetails] = useState(null);
    const [replyText, setReplyText] = useState(null);
    const [groupByDayList, setGroupByDayList] = useState([]);
    const [groupIndex, setGroupIndex] = useState(0);
    const [roomId, setRoomId] = useState("");
    const [marginBottom, setMarginBottom] = useState(143);

    React.useEffect(() => {
      async function doEffect() {
        var roomId = rootstore.roomId;
        setRoomId(roomId);
        setHasMore(true);
        setOffset(25);
        if (rootstore.roomId !== null) {
          let nowDate = moment().valueOf();
          //console.log(nowDate)
          const roomIndex = rootstore.chatRoomList.findIndex(
            (chatroom) => chatroom.roomId === rootstore.roomId
          );
          if (roomIndex !== -1) {
            await client
              .service("user-rooms")
              .patch(rootstore.chatRoomList[roomIndex]._id, {
                lastRead: nowDate,
              });
          }
          runInAction(() => {
            const updatedRoomDetails = rootstore.chatRoomList[roomIndex];
            updatedRoomDetails.lastRead = nowDate;
          });
        }
      }
      doEffect();
    }, [rootstore.roomId]);

    //The use effect to handle the empty chat lists
    React.useEffect(() => {
      async function doEffect() {
        if (messages.length === 0) {
          setHasMore(false);
        }
      }
      doEffect();
    }, [rootstore.messages]);

    React.useEffect(() => {
      async function doEffect() {
        groupMessagesByDate(messages);
      }
      doEffect();
    }, [rootstore.messages.length]);

    async function LoadMoreMessages() {
      //console.log("entering fetcmore");
      const messageList = await rootstore.getMessages(roomId, offset);
      //console.log(messageList)
      setOffset(offset + 25);
      runInAction(() => {
        if (rootstore.messages.length === 0)
          rootstore.messages = messageList.data;
        else rootstore.messages.push(...messageList.data);
      });
      if (messageList.data.length === 0) {
        setHasMore(false);
      }
    }

    async function groupMessagesByDate(messages) {
      const list = [...messages];
      const groups = await list.reduce((groups, msg) => {
        const date = moment(msg.createdAt).startOf("date");

        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(msg);
        return groups;
      }, {});

      setGroupByDayList(groups);
    }

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
        dateDayMonth = postedDate.format("dddd, MMMM Do");
      }
      return dateDayMonth;
    };

    return (
      <div
        className="flex"
        style={{
          position: "relative",
          flexDirection: "column",
          height: "100%",
          alignItems: "flex-end",
        }}
      >
        {roomId !== null ? (
          <ChatContainer id="scrollableDiv" marginBottom={0} className="Flex">
            <InfiniteScroll
              dataLength={rootstore.messages.length}
              hasMore={hasMore}
              loader={
                <div className="flex" style={{ alignSelf: "center" }}>
                  <ScaleLoader
                    color={COLORS.purple}
                    loading={true}
                    size={150}
                  />
                </div>
              }
              scrollableTarget="scrollableDiv"
              style={{
                width: "100%",
                flexDirection: "column-reverse",
                paddingTop: 30,
                overflow: 'visible',
              }}
              next={LoadMoreMessages}
              scrollThreshold={0.5}
              inverse={true}
            >
              {Object.values(groupByDayList).map((group, index) => (
                <MainOuterContainer
                  key={group[0]._id}
                  onMouseOver={() => setGroupIndex(index)}
                >
                  <MainContainer index={index} className="Flex">
                    <DateContainer className="Flex">
                      <Date>{convertDate(group[0].createdAt)}</Date>
                    </DateContainer>
                    <MessageList
                      group={group}
                      setReplyToId={setReplyToId}
                      setReplyText={setReplyText}
                      groupIndex={groupIndex}
                    />
                  </MainContainer>
                </MainOuterContainer>
              ))}
            </InfiniteScroll>
          </ChatContainer>
        ) : (
          <EmptyChat />
        )}
        {roomId !== null && (
          <MessageInputBox className="Flex">
            <ChatInput
              replyToId={replyToId}
              editMessage={rootstore.editMessageText}
              setReplyToId={setReplyToId}
              //setEditMessage={setEditMessageDetails}
              setReplyText={setReplyText}
              replyText={replyText}
              setMarginBottom={setMarginBottom}
              page={"chat"}
            />
          </MessageInputBox>
        )}
      </div>
    );
  })
);
