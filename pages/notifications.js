import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import {
  Footer,
  SignupPromo,
  LoginBoxSidebar,
} from "../components";
import  NotificationInfiniteScroll  from "../components/NotificationMain/NotificationInfiniteScroll"
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import {
  Container,
  SideBarLeftBlock,
  MiddleContainer,
  RightContainer,
  RightContainerInner
} from "../styles/globalStyles";
import { useSession } from 'next-auth/client';
import Image from "../public/images/nextGemsLaunchBanner.jpg";

export default inject("store")(observer(
  function Notification(props) {
    const [messageVisible, setMessageVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [session, loading] = useSession();

    // to show the app message (inform/success/error)
    const showAppMessage = (value, message) => {
      setMessage(message)  // or inform/success/error
      setMessageVisible(value)
      if (value) {
        const timer = setTimeout(() => {
          setMessageVisible(value)
          setMessage('')
        }, 3000)
        return () => clearTimeout(timer)
      }
    }

    return (
      <Container>
        <MiddleContainer>
          <NotificationInfiniteScroll />
        </MiddleContainer>
        <RightContainer>
          <RightContainerInner>
            <SignupPromo
                image={Image}
            />
            {!session &&
              <LoginBoxSidebar
                title={'Login to post'}
                textOne={'Login to post to yuser'}
                textTwo={"Don't have an account? Check out our discord for invites"}
              />
            }
            <SideBarLeftBlock>
              <Footer />
            </SideBarLeftBlock>
          </RightContainerInner>
        </RightContainer>
        {
          messageVisible &&
          <MessageAppComponent
            type={message}
            showAppMessage={showAppMessage}
          />
        }
      </Container >
    )
  }
))