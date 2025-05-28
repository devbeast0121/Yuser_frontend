import React, { useState } from "react";
import {
  NotificationsContainer,
  ResultContainer,
  Content,
  ContentBox,
  ActionBox,
  Post,
  UserName,
  Title
} from "./Notification.elements";
import Avatar from ".././Avatar/Avatar";
import Button from ".././Button/Button";
import { motion } from "framer-motion";
import { inject, observer } from "mobx-react";
import { useStore } from "../../stores/RootStore";
import reactStringReplace from "react-string-replace";
import { COLORS, SPACING } from "../../styles/Styling";
import TimeAgo from "react-timeago";
import { useRouter } from "next/router";
import PostModal, { BUTTON_TYPES } from "../PostModal/PostModal";
import LocalPosts from "../../stores/LocalPosts";
import Loader from "../../pages/api/posts";
import { vout } from "../../stores/tools";
import client from "../../pages/api/client";
import { AvatarUrl } from '../../stores/tools.js';


export default inject("store")(
  observer(function NotificationMain(props) {
    const rootstore = useStore();
    const [click, setClick] = useState(false);
    const router = useRouter();
    const [show, setShow] = useState(false); //PostModal
    const [choosenPost, setChoosenPost] = useState("");
    // const openProfile =(post) =>{
    //     router.push({
    //         pathname: '/[pid]',
    //         query: { pid: post.user.uname},
    //       })
    // }
    async function openProfile(notification) {
      router.push({
        pathname: "/[uname]",
        query: { uname: notification.user.uname },
      });
    }
    async function openToken(notification)
    {
      let ContractId = notification?.mainAction?.ContractId ? notification?.mainAction?.ContractId : null;
      let contractAddress = notification?.mainAction?.contractAddress ? notification?.mainAction?.contractAddress : null;
      if(ContractId && contractAddress)
      {
        router.push({
          pathname:"/nft",
          query:{tokenId:ContractId,contractAddress:contractAddress}
        })
      }
    }

    async function openPost(notification) {
      if (notification.mainAction.action == "userlist") {
        openProfile(notification)
      }else if(notification.mainAction.action === "tokenNoti"){
        openToken(notification);
      }
       else {

        const activity = await props.store.getSpecifiedPost(
          notification.mainAction.postId
        );

        //if(!props.store.hasPost(activity._id))
        // LocalPosts.push_to_posts_notif(activity);
        //  props.store.localPosts.push_to_posts_notif(activity);
        // await props.store.loadComments(activity);

        // 1. Load single into local posts
        await Loader.LoadNotif(notification.mainAction.postId);
        // 2. load comments
        await Loader.LoadComments(LocalPosts.getInstance().getPosts_notif[0]._id);

        setChoosenPost(activity);
        setShow(true);
      }
    }


    React.useEffect(() => {
      async function doEffect() {
        let user = null
        try {
          ({ user } = await client.reAuthenticate());
        } catch (err) {
          console.log(err);
        }
        if (user)
          await props.store._getNotificationsPage();
        vout(() =>
          console.log(props.store.notificationPropsPage, "the notifications")
        );
      }
      doEffect();
    }, [props.store]);
    return (
      <>
        <>
          {props.store.notificationPropsPage.length !== 0 && (
            <NotificationsContainer>
              <Title>{"Notifications"}</Title>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                style={{ flexDirection: "column", width: "100%" }}
              >
                {props.store.notificationPropsPage.map((notification) => (
                  <ResultContainer
                    key={notification.id}
                    notification={notification}
                  >
                    <ContentBox>
                      {notification && notification.user ?
                      <Avatar
                        src={AvatarUrl(notification?.image, "m")}
                        size={"medium"}
                        alt={"image"}
                        frame={false}
                        edit={false}
                        className="MarginRightMedium"
                        userName={notification?.user?.uname}
                        onClickAvatar={() => {
                          openProfile(notification);
                        }}
                      />
                      :
                      <Avatar
                        size={"medium"}
                        alt={"image"}
                        frame={false}
                        edit={false}
                        className="MarginRightMedium"
                        userName={null}
                        onClickAvatar={()=>{
                          null
                        }}
                      />
                      }
                      <Content
                        onClick={() => { openPost(notification) }}
                      >
                        {reactStringReplace(
                          notification.text,
                          /\\s(.*?)\\s/g,
                          (match, i) => (
                            <UserName>{match}</UserName>
                          )
                        )}{" "}
                        <TimeAgo
                          style={{
                            marginTop: 4,
                            display: "block",
                            color: COLORS.whiteLightMedium,
                            fontSize: 16,
                          }}
                          date={notification?.timestamp}
                        />
                      </Content>
                    </ContentBox>
                    {notification.secondaryAction ? (
                      <ActionBox>
                        {notification.secondaryAction.action == "follow" ? (
                          <Button
                            isIcon={false}
                            size={"200px"}
                            text={"Follow"}
                            color={COLORS.purple}
                            colorText={COLORS.white}
                          />
                        ) : (
                          <Post
                            src={notification?.secondaryAction?.postImage}
                            post={notification?.secondaryAction?.postId}
                            className="MarginLeftMedium"
                            onClick={() => {
                              openPost(notification);
                            }}
                          />
                        )}
                      </ActionBox>
                    ) : notification.mainAction ? (
                      <ActionBox>
                        {notification.mainAction.action === "tokenNoti" ?(
                          <Post
                            src = {notification?.image}
                            className="MarginLeftMedium"
                            onClick={() => {
                              openPost(notification);
                            }}
                          />
                        ):null}
                        </ActionBox>
                    )
                    :null}
                  </ResultContainer>
                ))}
              </motion.div>
            </NotificationsContainer>
          )}
        </>
        {show && (
          <PostModal
            show={show}
            setShow={setShow}
            btnType={BUTTON_TYPES.COMMENTS}
            post={choosenPost}
          />
        )}
      </>
    );
  })
);
