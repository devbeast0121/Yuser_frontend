import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { useStore } from "../stores/RootStore";
import { FEED_TYPES } from "../components/NavFeed/NavFeed";
import { useRouter } from "next/router";
import client from "./api/client";
import Loader from "./api/posts";
import { getSession, useSession } from "next-auth/client";
import LocalPosts from "../stores/LocalPosts";
import { vout } from "../stores/tools";
import ProtocolComponent from "../components/ProtocolComponent/ProtocolComponent";

export default inject("store")(
  observer(function Protocol(props) {
    const rootstore = useStore();
    const router = useRouter();
    const [session, loading] = useSession();
    const [messageVisible, setMessageVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    //console.log(`This is the session: ${session.user._id}`)

    //console.log(`🕹️️  props.posts.length is ${props.posts.length}`)
    // console.log(session, "session details for testing  after signin")

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
        <ProtocolComponent />
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
