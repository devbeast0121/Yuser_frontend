import React, { useState } from "react";
import {
    ModalContainer,
    ChatContainer,
    MainContainer,
    DateContainer,
    Date,
    BtnClose,
} from "./ChatModal.elements";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useStore } from "../../stores/RootStore";
import { action, runInAction } from "mobx";
import ChatInput from "../ChatInput/ChatInput";
import moment from 'moment';
import MessageList from '../MessageList/MessageList';
import { session, useSession } from "next-auth/client";
import { COLORS } from "../../styles/Styling.js";
import Close from "../../public/icons/close.svg";
import Icon from "../Icon/Icon";
import client from "../../pages/api/client";


//for grouping messages by days, a list of messages (one day) inside a list of days
export default inject("store")(
    observer(function ChatModal(props) {
        const rootstore = useStore();
        const [session, loading] = useSession();
        const [offset, setOffset] = useState(25);
        const [hasMore, setHasMore] = useState(true);
        const [replyToId, setReplyToId] = useState(null);
        const [editMessageDetails, setEditMessageDetails] = useState(null);
        const [replyText, setReplyText] = useState(null)
        const [groupByDayList, setGroupByDayList] = useState([])
        const [groupIndex, setGroupIndex] = useState(0);
        const [roomId, setRoomId] = useState("");

        React.useEffect(() => {
            async function doEffect() {
                let userId = props?.user?._id ? props.user._id : props?.user?.id;
                const newRoomId = await client.service('start-private-chat').create({
                    userId: userId,
                });
                setRoomId(newRoomId)
                //console.log(newRoomId, "from the usee effect")
            }
            doEffect();
        }, []);

        //The use effect to handle the empty chat lists
        React.useEffect(() => {
            async function doEffect() {
                if (rootstore.privateChatlist.length === 0) {
                    setHasMore(false);
                }
            }
            doEffect();
        }, [rootstore.privateChatlist]);

        React.useEffect(() => {
            async function doEffect() {
                groupMessagesByDate(rootstore.privateChatlist)
            }
            doEffect();
        }, [rootstore.privateChatlist]);

        async function LoadMoreMessages() {
            //console.log("entering fetcmore");
            const messageList = await rootstore.getMessages(roomId, offset);
            
            setOffset(offset + 25);
            runInAction(() => {
                if (rootstore.privateChatlist.length === 0)
                    rootstore.privateChatlist = messageList.data;
                else rootstore.privateChatlist.push(...messageList.data);
            });
            if (messageList.data.length === 0) {
                setHasMore(false);
            }
        }

        async function groupMessagesByDate(messages) {
            const list = [...messages];
            const groups = await list.reduce((groups, msg) => {
                const date = moment(msg.createdAt).startOf('date');

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
            let nowDate = moment()
            let yesterday = moment().subtract(1, 'days').startOf('day');
            let dateDayMonth = ""

            if (postedDate.isSame(nowDate, 'day')) {
                dateDayMonth = "Today"
            } else if (postedDate.isSame(yesterday, 'day')) {
                dateDayMonth = "Yesterday"
            } else {
                dateDayMonth = postedDate.format("dddd, MMMM Do")
            }
            return dateDayMonth
        };


        //To refresh the messages
        //To refresh the chatlist to show the recent change
        React.useEffect(() => {
            client.service("messages").on(
                "created",
                action(async (message) => {
                    let userId = props?.user?._id ? props.user._id : props?.user?.id;
                    await rootstore.joinPrivateChat(userId);
                }))
        }, []);


        return (
            <ModalContainer>
                <BtnClose onClick={props.onHide}>
                    <Icon
                        strokeColor="white"
                        strokeWidth="4"
                        height="24px"
                        width="24px"
                        name={Close}
                    />
                </BtnClose>
                <ChatContainer id="scrollableDiv">
                    <InfiniteScroll
                        dataLength={rootstore.privateChatlist.length}
                        hasMore={hasMore}
                        loader={
                            <div style={{ alignSelf: "center" }}>
                                <ScaleLoader color={COLORS.purple} loading={true} size={150} />
                            </div>
                        }
                        scrollableTarget="scrollableDiv"
                        style={{
                            width: "100%",
                            flexDirection: "column-reverse",
                            overflowY: "hidden"
                        }}
                        next={LoadMoreMessages}
                        scrollThreshold={0.8}
                        inverse={true}
                    >
                        {Object.values(groupByDayList).map((group, index) => (
                            <div key={group[0]._id} style={{ display: "block" }} onMouseOver={() => setGroupIndex(index)}>
                                <MainContainer>
                                    <DateContainer>
                                        <Date>{convertDate(group[0].createdAt)}</Date>
                                    </DateContainer>
                                    <MessageList
                                        group={group}
                                        setReplyToId={setReplyToId}
                                        setReplyText={setReplyText}
                                        groupIndex={groupIndex}
                                    />
                                </MainContainer>
                                {index != groupByDayList.length - 1 &&
                                    <div style={{ height: 30, width: "100%" }} />
                                }
                            </div>
                        ))}
                    </InfiniteScroll>
                </ChatContainer>
                <ChatInput
                    style={{ position: "fixed" }}
                    replyToId={replyToId}
                    editMessage={rootstore.editMessageText}
                    setReplyToId={setReplyToId}
                    //setEditMessage={setEditMessageDetails}
                    setReplyText={setReplyText}
                    replyText={replyText}
                    roomIdProp={roomId}
                />
            </ModalContainer>
        );
    })
);