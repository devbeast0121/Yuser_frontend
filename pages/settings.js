import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import {
  Footer,
  SettingsMain,
  SignupPromo,
  PromoBox
} from "../components";
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import {
  Container,
  SideBarLeftBlock,
  MiddleContainer,
  RightContainer,
  RightContainerInner,
} from "../styles/globalStyles";
import { getSession } from 'next-auth/client';
import Image from "../public/images/nextGemsLaunchBanner.jpg";

export default inject("store")(observer(
  function Settings(props) {
    const [messageVisible, setMessageVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')


    //showing the app message (inform/success/error)
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
          <SettingsMain
            session={props.session}
            showAppMessage={showAppMessage} // inform/success/error
          />
          {messageVisible &&
            <MessageAppComponent
              showAppMessage={showAppMessage}
              type={messageType}
              textMessage={message} 
            />
          }
        </MiddleContainer>
       {/*} <RightContainer>
          <RightContainerInner>
            <SignupPromo
              src={Image}
            />
            <SideBarLeftBlock>
              <Footer />
            </SideBarLeftBlock>
          </RightContainerInner>
        </RightContainer> */}
      </Container >
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