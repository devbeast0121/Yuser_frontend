import React, { useState, useEffect } from "react";
import {
  SignupPromo,
  PostsList,
  Footer,
  TabComponentThree,
  TabComponentTwo,
  BannerLanding
} from "../components";
import {
  Container,
  RightContainerInner,
  SideBarLeftBlock,
  RightContainer,
  MiddleContainer,
} from "../styles/globalStyles";
import Image from "../public/images/nextGemsLaunchBanner.jpg";
import { inject, observer } from "mobx-react";
import { useStore } from "../stores/RootStore";
import { vout } from "../stores/tools";
import client from "./api/client";
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import Loader from "./api/posts";
import { getSession, useSession } from "next-auth/client";
import LocalPosts from "../stores/LocalPosts";
import { CookieStorage } from 'cookie-storage';
import NewLandingComponent from "../components/NewLandingComponent/NewLandingComponent";
import styled from 'styled-components';

//just for testig

// const USER_IDS = {
//   cyclops: "5b6c9ae8e5aa585c996f0bd3",
//   wolverine: '5b87f9134f7cd52938eec31b',
//   zaza: "5b6dfaff7810b303df2a5e5f",
//   silver: "5ccc789a46478400183e6784",
//   Kent: "5b6d9bb7eb00507a44e944b1",
//   Eli: "5b69d09fe4a2d7748242b419",
//   dwadd: "60be3550c3e55f001b7b0179",
// };

export default inject("store")(
  observer(function Home(props) {
    const rootstore = useStore();
    const cookieStorage = new CookieStorage();
    const [session, loading] = useSession();
    const FEED_TYPES = {
      ME: "Following",
      HOT: "Hot",
      ALL: "Everything"
    };
    const hotPosts = [];
    const mePosts = [];
    const allPosts = [];
    const [messageVisible, setMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const [hotFeedActive, setHotFeedActive] = useState(rootstore?.feedType == "Hot" ? FEED_TYPES.HOT : false);
    const [meFeedActive, setMeFeedActive] = useState(rootstore?.feedType == "Following" ? FEED_TYPES.ME : false);
    const [allFeedActive, setAllFeedActive] = useState(false)

    useEffect(() => {
      async function doEffect() {
        if (session) {
          if (session.user && session.user.avatar) {
            const feedType = cookieStorage.getItem('FEEDTYPE'); //setting every feedtype
            if (feedType) {
              setFeed(feedType, "vertical nav menu set feed use effect me")
              setHotFeedActive(feedType)
            }
            else {
              setFeed(FEED_TYPES.HOT, "vertical nav menu set feed use effect me")
              setHotFeedActive(FEED_TYPES.HOT)
            }
          }
        }
      }
      doEffect();
      return function cleanup() {
        // 
      }
    }, [session, rootstore,]);



    function setFeed(feedType) {
      if (session) {
        if (![FEED_TYPES.HOT, FEED_TYPES.ME].includes(feedType))
          throw new Error(`Improper feed type ${feedType}, if dev see NavFeed.js`);

        rootstore.setFeedType(feedType); // TELL MOBX WHAT THE FEED TYPE IS
      }
    }


    React.useEffect(() => {
      const messages = true;
      // when on main feed only feeds we could show are HOT and ME
      if (
        props.store.isInBrowser &&
        ![FEED_TYPES.HOT, FEED_TYPES.ME].includes(props.store.feedType)
      ) {
        messages && console.log(`Defaulting to hot`);
        props.store.setFeedType(FEED_TYPES.HOT);
        Loader.LoadMe(true);
      }
    }, [props.store.isInBrowser]);

    React.useEffect(() => {
      async function doEffect() {
        if (!session) {
          await Loader.LoadHot(false, false);
        }
        else {
          await Loader.LoadHot(true, true);
        }
      }
      doEffect();
    }, []);


    const handleHotFeed = async () => {
      setHotFeedActive(true)
      setMeFeedActive(false)
      setAllFeedActive(false)

      await Loader.LoadHot(false, true);
      hotPosts.push(...LocalPosts.getInstance().posts_hot);
      console.log("-------------- hotPosts: " + hotPosts)
    }

    const handleMeFeed = async () => {
      setHotFeedActive(false)
      setMeFeedActive(true)
      setAllFeedActive(false)

      await Loader.LoadMe(true);
      mePosts.push(...LocalPosts.getInstance().posts_me);
      console.log("-------------- mePosts: " + mePosts)

    }

    const handleAllFeed = async () => {
      setHotFeedActive(false)
      setMeFeedActive(false)
      setAllFeedActive(true)

      let newPosts = await props.store.getAllPosts(0);
      allPosts.push(...newPosts)
      console.log("-------------- allPosts: " + allPosts)
    }


    React.useEffect(() => {
      async function doEffect() {
        if (session) {
          await client.authentication.setAccessToken(session.accessToken);
          const { user } = await client.reAuthenticate();
          vout(() => console.log(user, "details"));
          await rootstore._getNotifications();
        }
      }
      doEffect();
    }, [session, props.store, rootstore]);


    //showing the app message (inform/success/error)   Working example: settings.js,  Natalia
    const showAppMessage = (isVisible, type, message) => {
      if (isVisible) {
        setMessageVisible(isVisible);
        setMessageType(type);
        setMessage(message);
        const timer = setTimeout(() => {
          setMessageVisible(false);
          setMessageType("");
          setMessage("");
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setMessageVisible(isVisible);
        setMessageType("");
        setMessage("");
      }
    };

    return (
      <>
        {
          session ? (
            <Container>
              <MiddleContainer style={{ maxWidth: 720 }}>
                <TabWrapper>
                  {session.user.isMod ?
                    <TabComponentThree
                      leftText={"HOT"}
                      middleText={"FOLLOWING"}
                      rightText={"EVERYTHING"}
                      setLeftSide={handleHotFeed}
                      setMiddleSide={handleMeFeed}
                      setRightSide={handleAllFeed}
                      leftSide={hotFeedActive}
                      middleSide={meFeedActive}
                      rightSide={allFeedActive}
                      margin={true}
                    />
                    :
                    <TabComponentTwo
                      leftText={"HOT"}
                      rightText={"FOLLOWING"}
                      setLeftSide={handleHotFeed}
                      setRightSide={handleMeFeed}
                      leftSide={hotFeedActive}
                      rightSide={meFeedActive}
                      margin={true}
                    />
                  }
                </TabWrapper>
                {hotFeedActive &&
                  <PostsList
                    showAppMessage={showAppMessage}
                    posts={hotPosts}
                  />
                }
                {meFeedActive &&
                  <PostsList
                    showAppMessage={showAppMessage}
                    posts={mePosts}
                  />
                }
                {allFeedActive &&
                  <PostsList
                    showAppMessage={showAppMessage}
                    posts={allPosts}
                  />
                }
                {messageVisible &&
                  <MessageAppComponent
                    showAppMessage={showAppMessage}
                    //        posts={rootstore.feedType === FEED_TYPES.ME ? rootstore._userPosts : props.store.localPosts.posts_hot}
                    posts={posts} // props.posts will be injected by getServerSideProps --wdd aug 18th 2021
                  />
                }
              </MiddleContainer>
              <RightContainer>
                <RightContainerInner>
                  <BannerLanding/>
                  <SignupPromo
                    src={Image}
                  />
                  <SideBarLeftBlock>
                    <Footer />
                  </SideBarLeftBlock>
                </RightContainerInner>
              </RightContainer>
            </Container>
          )
            : null
        }
        {
          !session ? (
            <NewLandingComponent />
          )
            : null
        }
      </>
    );
  })
);

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // if (!session)
  //   console.warn(`⚠️ /pages/index.js :: getServerSideProps() -> session is null meaning no session exists ⚠️ ⚠️ ⚠️`);

  // else {
  //   console.log();
  //   console.log(Object.keys(session));
  //   console.log(session.accessToken);
  //   console.log();
  // }
  //  if (session) {
  // await client.authentication.setAccessToken(session.accessToken);
  // await client.reAuthenticate();
  //}
  // const posts = []
  // // if (session) {
  // await Loader.LoadHot(false, false);
  // posts.push(...LocalPosts.getInstance().posts_hot);
  // console.log(`stub A posts length ${posts.length}`);
  // }

  return {
    props: {
      session: session,
      // // initialState: {
      // //   posts: posts
      // },
    },
  };
}

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 700px){
    margin-top: 0px;
}
`;