import React, { useState, useRef, createRef, useCallback, useImperativeHandle } from 'react'
import { inject, observer } from 'mobx-react';
import {
    ChatMain,
    DaysList,
    ParticipantsList
} from "../components";
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import {
    Container,
    MiddleFullContainer,
    ChatListContainer,
    MessageContainer,
    RightNarrowContainer,
    RightNarrowContainerInner,
    SmallWindowSize,
    MiddleFullContainerChat
} from "../styles/globalStyles";
import {
    ContainerChat
} from '../components/ChatMain/ChatMain.elements';

import { getSession, useSession } from 'next-auth/client';
import { useStore } from '../stores/RootStore';

export default inject('store')(observer(
    function Chat(props) {
        const [messageVisible, setMessageVisible] = useState(false)
        const [message, setMessage] = useState('')
        const [messageType, setMessageType] = useState('')
        const [session, loading] = useSession();
        const [chatList, setChatList] = useState([]);
        const rootstore = useStore();
        const [smallWindowSize, setSmallWindowSize] = useState(false);
        const chatMainRef = useRef(null);
        const [loader, setLoader] = useState(true)


        //The initial useEffect for loading the chatroom list
        React.useEffect(() => {
            async function doEffect() {
                if (session) {
                    const roomList = await rootstore.getChatroomlist()

                    setChatList(rootstore.chatRoomList)

                    const roomId = rootstore.roomId
                    if (roomId === null) {
                        await rootstore.loadInitialMessageList()
                    }
                    setLoader(false)
                }
            }
            doEffect();
        }, []);


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

        // show/hide a participents list depending from the window size
        const updateWindowSize = () => {

            if (typeof window === 'undefined')
                console.warn(`window is undefined this is about to cause an issue`);

            if (window.innerWidth <= 700) {
                setSmallWindowSize(true)
            } else {
                setSmallWindowSize(false)
            }
        };

        React.useEffect(() => {
            // console.log(`🪟 NavBar.js typeof window is ${typeof window}`);
            updateWindowSize();
            window.addEventListener("resize", updateWindowSize);
            return () => window.removeEventListener("resize", updateWindowSize);
        }, []);

        React.useEffect(() => {
            setChatList(rootstore.chatRoomList)
        }, [rootstore.chatRoomList]);

        return (
            <ContainerChat onClick={() => chatMainRef.current.closeAll()}>
                <MiddleFullContainerChat>
                    {smallWindowSize &&
                        <SmallWindowSize className={"customInfinityScrollbar"}>
                            <ChatMain
                                smallWindow={true}
                                posts={chatList}
                                ref={chatMainRef} />
                        </SmallWindowSize>
                    }
                    <ChatListContainer>
                        <ChatMain
                            posts={chatList}
                            ref={chatMainRef} />
                    </ChatListContainer>
                    <MessageContainer>
                        <DaysList
                            messages={rootstore.messages} />
                    </MessageContainer>
                </MiddleFullContainerChat>

                {/*<RightNarrowContainer>
                    <RightNarrowContainerInner>
                        <ParticipantsList />
                    </RightNarrowContainerInner>
                </RightNarrowContainer>*/}
                {/*} this position may be wrong, insert it in a middle container or by context Natalia
                {messageVisible &&
                    <MessageAppComponent
                        showAppMessage={showAppMessage}
                        type={messageType}
                        textMessage={message}
                    />
                } */}
            </ContainerChat>
        )
    }
))


export async function getServerSideProps(context) {
    const session = await getSession(context)

    // if (session === null)
    // console.warn(`⚠️ ⚠️ ⚠️ ⚠️ /pages/profile.js :: getServerSideProps() -> session is null meaning no session exists ⚠️ ⚠️ ⚠️ ⚠️`);
    // const posts = LocalPosts.getInstance().posts_profile;

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session: session,
            // posts: posts,
        }
    }
}