import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import client from "../api/client";
import LocalPosts from "../../stores/LocalPosts";
import { useSession, getSession } from "next-auth/client";
import Loader from "../api/posts";
import { PostsList } from "../../components";
import { MessageAppComponent } from "../../components/MessageAppComponent/MessageAppComponent";
import {
  ProfileInfoBox,
  SignupPromo,
  LoginBoxSidebar,
  Footer,
  GridThreeCells,
  TabComponentTwo
} from "../../components";
import BanConfirmation from '../../components/BanConfirmation/BanConfirmation'
import {
  Container,
  MiddleContainer,
  RightContainerInner,
  RightContainer,
  SideBarLeftBlock,
} from "../../styles/globalStyles";
import { NextSeo } from "next-seo";
import { AvatarUrl } from "../../stores/tools";
import { useStore } from "../../stores/RootStore";
import { useRouter } from "next/router";
import { FEED_TYPES } from "../../components/NavFeed/NavFeed";
import { vout } from "../../stores/tools";
import { runInAction } from "mobx";
import Image from "../../public/images/nextGemsLaunchBanner.jpg";
import { SERVER_URL } from "../../util/server_url";
import styled from 'styled-components';
import { COLORS, SPACING } from '../../styles/Styling'



export default inject("store")(
  observer(function ProfileView(props) {
    const rootstore = useStore();
    const router = useRouter();
    const [session, loading] = useSession();
    const [messageVisible, setMessageVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const [posts, setPosts] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [hasMoreNft, setHasMoreNft] = useState(true);

    //const postsListExist = posts?.length > 0  ? false : true;
    //const [postFeedActive, setPostFeedActive] = useState(postsListExist);
    //const [nftFeedActive, setNftFeedActive] = useState(postsListExist ? false: true);
    const [postFeedActive, setPostFeedActive] = useState(true)
    const [nftFeedActive, setNftFeedActive] = useState(false)

    //console.log(`This is the session: ${session.user._id}`)

    //console.log(`🕹️️  props.posts.length is ${props.posts.length}`)
    // console.log(session, "session details for testing  after signin")
    // React.useEffect(() => {

    //     const messages = true;

    //     // when on main feed only feeds we could show are HOT and ME
    //     // if (props.store.isInBrowser && ![FEED_TYPES.HOT, FEED_TYPES.ME].includes(props.store.feedType)) {
    //     //     messages && console.log(`Defaulting to hot`);
    //     //     props.store.setFeedType(FEED_TYPES.HOT);
    //     //     Loader.LoadMe(true);
    //     // }
    // }, [props.store.isInBrowser]);

    React.useEffect(() => {
      async function doEffect() {
        await Loader.LoadProfile(props?.user?.id, false, false, {
          current_length: LocalPosts.getInstance().posts_profile.length,
        });
        const postsFetched = LocalPosts.getInstance().posts_profile;
        setPosts(postsFetched);
      }
      doEffect();
      fetchUserNFTs();
    }, [props.user, posts]);

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

    //To close the login modal
    const closeModal = () => {
      runInAction(() => {
        rootstore.showLoginModal = false; // sets the auth user variable
      });
    };

    async function fetchUserNFTs() {
      if (props.user !== null) {
        let NFTbatch = await rootstore.getUserNFTsFromUserId(props.user.id, nfts.length, 6);
        setNfts([...nfts, ...NFTbatch]);
        if (NFTbatch.length === 0) {
          setHasMoreNft(false);
        }
        else {
          setHasMoreNft(true);
        }
      }
      else {
        setHasMoreNft(false);
      }
    }

    return (
      <>
        <NextSeo
          title={` ${props?.user?.uname} | REBL`}
          description={`The latest posts from @${props?.user?.uname} | ${props?.user?.bio}`}
          canonical="https://yuser.co"
          openGraph={{
            url: `https://yuser.co/${props?.user?.uname}`,
            title: ` ${props?.user?.uname} | REBL`,
            description: `The latest posts from @${props?.user?.uname} | ${props?.user?.bio}`,
            site_name: "REBL",
            images: [
              {
                url: `${AvatarUrl(props?.user?.avatar, "m")}`,
                width: 1200,
                alt: ` ${props?.user?.uname} | REBL`,
              },
            ],
          }}
        />

        <Container>
          <MiddleContainer>
            <ProfileInfoBox
              showAppMessage={showAppMessage} // inform/success/error
              user={props?.user} />
            <TabWrapper>
              <TabComponentTwo
                leftText={"POSTS"}
                rightText={"NFT's"}
                setLeftSide={setPostFeedActive}
                setRightSide={setNftFeedActive}
                leftSide={postFeedActive}
                rightSide={nftFeedActive}
                margin={true}
              />
            </TabWrapper>
            {postFeedActive &&
              <GridThreeCells
                posts={posts}
                postsGrid={true}
                profile={true}
                userId={props?.user?.id}
              />
            }
            {nftFeedActive &&
              <GridThreeCells
                posts={nfts}
                postsGrid={false}
                fetchMoreDataNft={fetchUserNFTs}
                hasMoreNft={hasMoreNft}
              />
            }
            {messageVisible &&
              <MessageAppComponent
                showAppMessage={showAppMessage}
                type={messageType}
                textMessage={message}
              />
            }
          </MiddleContainer>
        </Container>
      </>
    );
  })
);

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { username } = context.query;

  const res = await fetch(`${SERVER_URL}/user-by-username?targetUsername=${username}`, { method: 'GET' });
  const _user = await res.json()

  if (_user.code == "500") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  } else if (session?.user?._id === _user?.id) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: _user,
      session: session,
    },
  };
}

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
 // margin-top: ${SPACING.large}px;

  @media screen and (max-width: 700px){
    margin-top: 0px;
}
`;