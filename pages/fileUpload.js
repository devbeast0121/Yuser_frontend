import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import {
    NavFeed,
    Footer,
    SignupPromo,
    LoginBoxSidebar,
    Uploading
} from "../components";
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import {
    Container,
    SideBarLeft,
    SideBarLeftInner,
    SideBarRight,
    SideBarLeftBlock
} from "../styles/globalStyles";
import { getSession, useSession } from 'next-auth/client';



export default inject('store')(observer(
    function FileUpload(props) {
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
                <Uploading 
                showAppMessage={showAppMessage}
                />
               
                {messageVisible &&
                    <MessageAppComponent
                        showAppMessage={showAppMessage}
                        type={messageType}
                        textMessage={message}
                    />
                } 
                {/* {messageSingleVisible &&
                    <Message
                        setSingleMessageVisible={setSingleMessageVisible}
                    />
                } */}
            </Container>
        )
    }
))

export async function getServerSideProps(context) {
    const session = await getSession(context)
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
        }
    }
}

