import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import {
    NavFeed,
    Footer,
    SignupPromo,
    LoginBoxSidebar,
    MarketList,
    ProfileInfoBox
} from "../components";
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import {
    Container,
    MiddleContainer,
    RightContainerInner,
    RightContainer,
    SideBarLeftBlock
} from "../styles/globalStyles";
import { useSession } from 'next-auth/client';

export default inject('store')(observer(
    function Collection(props) {
        const [messageVisible, setMessageVisible] = useState(false)
        const [message, setMessage] = useState('')
        const [messageType, setMessageType] = useState('')
        const [session, loading] = useSession();
        const [messageSingleVisible, setSingleMessageVisible] = useState(false)

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

        return (
            <Container>
                <MiddleContainer>
                    <ProfileInfoBox user={""} /> {/* an author of a collection */}
                    <MarketList /> {/* his collection */}
                </MiddleContainer>
                <RightContainer>
                    <RightContainerInner>
                        {!session ?
                            <>
                                <SignupPromo
                                    title={'shape the future'}
                                    text={'of social media'}
                                />
                                <LoginBoxSidebar
                                    title={'Login to post'}
                                    textOne={'Login to post to yuser'}
                                    textTwo={"Don't have an account? Check out our discord for invites"}
                                />
                            </>
                            : null
                        }
                        <SideBarLeftBlock>
                            <Footer />
                        </SideBarLeftBlock>
                    </RightContainerInner>
                </RightContainer>
                {/*} this position may be wrong, insert it in a middle container or by context; Natalia
                {messageVisible &&
                    <MessageAppComponent
                        showAppMessage={showAppMessage}
                        type={messageType}
                        textMessage={message}
                    />
                } */}
                {messageSingleVisible &&
                    <Message
                        setSingleMessageVisible={setSingleMessageVisible}
                    />
                }
            </Container>
        )
    }
))