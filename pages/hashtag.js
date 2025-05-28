import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import {
    HashtagMain,
    NavFeed,
    Footer,
    SignupPromo,
    LoginBoxSidebar,
} from "../components";
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import {
    Container,
    MiddleContainer,
    RightContainerInner,
    RightContainer,
    SideBarLeftBlock
} from "../styles/globalStyles";
import { getSession, useSession } from 'next-auth/client';


export default inject('store')(observer(
    function Hashtag(props) {
        const [messageVisible, setMessageVisible] = useState(false)
        const [message, setMessage] = useState('')
        const [messageType, setMessageType] = useState('')
        const [session, loading] = useSession();


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
                    {/* <HashtagMain /> */}
                </MiddleContainer>
                <RightContainer>
                    <RightContainerInner>
                        {!session &&
                            <>
                                {/*<SignupPromo
                                        title={'shape the future'}
                                        text={'of social media'}
                                    />*/}
                                <LoginBoxSidebar
                                    title={'Login to post'}
                                    textOne={'Login to post to yuser'}
                                    textTwo={"Don't have an account? Check out our discord for invites"}
                                />
                            </>
                        }
                        <SideBarLeftBlock>
                            <Footer />
                        </SideBarLeftBlock>
                    </RightContainerInner>
                </RightContainer>
                {/*} this position may be wrong, insert it in a middle container or by context Natalia
                {messageVisible &&
                    <MessageAppComponent
                        showAppMessage={showAppMessage}
                        type={messageType}
                        textMessage={message}
                    />
                } */}
            </Container>
        )
    }
))
export async function getServerSideProps(context) {
    const session = await getSession(context)
  
    // if (session === null)
    //     console.warn(`⚠️ ⚠️ ⚠️ ⚠️ /pages/profile.js :: getServerSideProps() -> session is null meaning no session exists ⚠️ ⚠️ ⚠️ ⚠️`);
  
  
  
  
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
      }
    }
  }