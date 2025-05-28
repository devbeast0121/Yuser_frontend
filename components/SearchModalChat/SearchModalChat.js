import React, { useState } from "react";
import {
    ModalContainer,
    ChatContainer,
    MainContainer,
    DateContainer,
    Date,
    BtnClose,
    ChatBox,
    Name
} from "./SearchModalChat.elements";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useStore } from "../../stores/RootStore";
import { action, runInAction } from "mobx";
import ChatInput from "../ChatInput/ChatInput";
import moment from 'moment';
import MessageList from '../MessageList/MessageList';
import { session, useSession } from "next-auth/client";
import { COLORS, SPACING } from "../../styles/Styling.js";
import Close from "../../public/icons/close.svg";
import Icon from "../Icon/Icon";
import client from "../../pages/api/client";
import { Avatar } from "..";
import { AvatarUrl } from "../../stores/tools";
import Button from '../Button/Button';


//for grouping messages by days, a list of messages (one day) inside a list of days
export default inject("store")(
    observer(function SearchModalChat(props) {
        const rootstore = useStore();
        // const [session, loading] = useSession();
        // const [offset, setOffset] = useState(25);
        // const [hasMore, setHasMore] = useState(true);
        // const [replyToId, setReplyToId] = useState(null);
        // const [editMessageDetails, setEditMessageDetails] = useState(null);
        // const [replyText, setReplyText] = useState(null)
        // const [groupByDayList, setGroupByDayList] = useState([])
        // const [groupIndex, setGroupIndex] = useState(0);
        // const [roomId, setRoomId] = useState("");

        // React.useEffect(() => {
        //     async function doEffect() {
        //         const newRoomId = await client.service('start-private-chat').create({
        //             userId: props?.user?._id,
        //         });
        //         setRoomId(newRoomId)
        //         console.log(newRoomId, "from the usee effect")
        //     }
        //     doEffect();
        // }, []);

        const onHide = () => {
            props.setSearchText("")
            props.setSuggestions([])
            props.setOpenSearchModal(false)
        }

        async function createChat(userId) {
            await rootstore.joinPrivateChat(userId)
            onHide()
        }


        return (
            <ModalContainer>
                {/* <BtnClose onClick={onHide}>
                    <Icon
                        strokeColor="white"
                        strokeWidth="4"
                        height="24px"
                        width="24px"
                        name={Close}
                    />
                </BtnClose> */}
                {props.suggestions.map((suggestion, index) => (
                    <ChatBox key={index} >
                        <Avatar
                            src={AvatarUrl(suggestion.avatar, "s")}
                            size={'medium'}
                            alt={'Author Avatar'}
                            frame={false}
                            edit={false}
                        />
                        <Name>{suggestion.uname !== "" ? suggestion.uname : "Anonymous"}</Name>
                        <div style={{marginLeft:'auto'}}>
                        <Button
                            text={'Chat'}
                            onClick={() => createChat(suggestion._id)}
                            isIcon={false}
                            color={COLORS.purple}
                            colorText={COLORS.white}
                            //className={'FullWidth'}
                        />
                        </div>
                    </ChatBox>
                ))}
            </ModalContainer>
        );
    })
);