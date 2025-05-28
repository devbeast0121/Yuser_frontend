import React, { useState } from 'react';
import {
    SectionBox,
    ChatContainer,
    MainContainer,
    ResultContainer,
    Name,
    Comment,
    DateContainer,
    Date,
    Image
} from './ChatList.elements';
import Avatar from '.././Avatar/Avatar';
import { inject, observer } from 'mobx-react';
import { posts } from '../../public/data/HomeData.js';
import { AvatarUrl } from '../../stores/tools';
import ChatModal from '../ChatModal/ChatModal';
import AvatarDefault from '../../public/icons/avatar.svg';
import InfiniteScroll from "react-infinite-scroll-component";

export default inject('store')(observer(
    function ChatList(props) {
      

        const [show, setShow] = useState(false); //chat modal
        const [chosenChat, setChosenChat]= useState("")
        const [selectedChat, setSelectedChat]= useState("")
        

        const convertDate =(timeStamp)=>{
            var s = new window.Date(timeStamp).toLocaleDateString("en-US")
            // expected output "8/30/2017"  
            return s
        }
        
        async function openChat(chat,i) {
            setChosenChat(chat._id);
            setSelectedChat(i);
            console.log(chat,"the selected chat")
            setShow(true);
        }
        return (
            <>

                <ChatContainer>
                    {props.posts.map((chat, index) => (
                        <MainContainer key={chat.roomId} chat={chat} onClick={() => {
                      openChat(chat,chat.roomId);
                    }}>
                            <DateContainer >
                                {/* <Date>{convertDate(chat.timestamp)}</Date> */}
                            </DateContainer>
                            <ResultContainer>
                            {chat.rname!==""?
                            <Avatar
                                        src={AvatarUrl(chat.profilePic, "s")}
                                        size={'medium'}
                                        alt={'Author Avatar'}
                                        frame={false}
                                        edit={false}
                                        />
                                        :
                                        <Avatar
                                        src={AvatarDefault}
                                        size={'medium'}
                                        alt={'Author Avatar'}
                                        frame={false}
                                        edit={false}
                                        />}
                                <SectionBox>
                                    <Name>{chat.rname!==""?chat.rname:"Chat Group"}</Name>
                                    <Comment>{chat.lastMessage}</Comment>
                                    {/* {chat.commentImage ?
                                        <Image src={chat.commentImage} alt="this is a image relating to the comment, the line above it says chat.commentImage" />
                                        : null} */}
                                </SectionBox>
                            </ResultContainer>
                        </MainContainer>
                    ))}
                    {/* {show && (
          <ChatModal
            show={show}
            setShow={setShow}
             chat={selectedChat}
             chosenChat={chosenChat}
            
          />
        )} */}
                </ChatContainer>

            </>
        )
    }
))
