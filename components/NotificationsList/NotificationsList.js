import React, { useState } from "react";
import {
  NotificationsContainer,
  ResultContainer,
  Content,
  ContentBox,
  ActionBox,
  Post,
} from "./NotificationsList.elements";
import Avatar from ".././Avatar/Avatar";
import Button from ".././Button/Button";
//import CheckCurve from "../../public/icons/check-curve.svg";
import { motion } from "framer-motion";
import { notificationsList } from "../../public/data/HomeData.js";
import { inject, observer } from "mobx-react";
import { useStore } from "../../stores/RootStore";
import { observable, toJS } from "mobx";
import reactStringReplace from "react-string-replace";
import { COLORS, SPACING } from "../../styles/Styling";
import TimeAgo from "react-timeago";
import { useRouter } from "next/router";
import PostModal, { BUTTON_TYPES } from "../PostModal/PostModal";
import ButtonFollow from '../ButtonFollow/ButtonFollow';
import Loader from "../../pages/api/posts";
import LocalPosts from "../../stores/LocalPosts";
import { vout } from "../../stores/tools";
import { AvatarUrl } from '../../stores/tools.js';

export default inject("store")(
  observer(function NotificationsList(props) {
    const rootstore = useStore();
    const [click, setClick] = useState(false);
    const router = useRouter();
    const [show, setShow] = useState(false); //PostModal
    const [choosenPost, setChoosenPost] = useState("");
    const [commentID, setCommentID] = useState("");

    React.useEffect(() => {

      async function doEffect() {
        await props.store._getNotifications();
        //    console.log();

        vout(() =>
          console.log(props.store.notificationProps)
        );
      }
      doEffect();
    }, [props.store]);

    const handleClick = () => {
      setClick(!click);

      if (props.showNotifications) {
        props.toggleNotifications(false);
      }
    };
    const loadMore = () => {
      router.push("/notifications", null, { shallow: true });
      props.toggleNotifications(false)
    };

    //To open a profile
    async function openProfile(notification) {
      router.push({
        pathname: "/[uname]",
        query: { uname: notification.user.uname },
      });
      props.toggleNotifications(false)
    }

    //To open the post modal of the post
    async function openPost(notification) {
      if (notification.mainAction.action == "userlist") {
        openProfile(notification)
      } else {
        //        const activity = await props.store.getSpecifiedPost(
        //         notification.mainAction.postId
        //      );
        //if(!props.store.hasPost(activity._id))

        //props.store.localPosts.push_to_posts_notif(activity);
        // LocalPosts.push_to_posts_notif(activity);
        //await props.store.loadComments(activity);


        // 1. Load single into local posts
        await Loader.LoadNotif(notification.mainAction.postId);

        const thePost = LocalPosts.getInstance().getPosts_notif[0];
        // 2. load comments
        // await props.store.loadComments(thePost);
        await Loader.LoadComments(thePost._id);

        setCommentID(notification.mainAction.commentId);
        // setChoosenPost(activity);
        setChoosenPost(thePost);;
        setShow(true);
      }
    }

    vout(() =>
      console.log(props.store.notificationProps, "------- notification.secondaryAction")
    );
    return (
      <>
        {props.store.notificationProps.length !== 0 && (
          <NotificationsContainer
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              style={{ flexDirection: "column" }}
            >
              {props.store.notificationProps.map((notification) => (
                <ResultContainer
                  key={notification.id}
                  notification={notification}
                >
                  <ContentBox>
                    <Avatar
                      navBar={true}
                      src={AvatarUrl(notification.image, "s")}
                      size={"small"}
                      alt={"image"}
                      frame={false}
                      edit={false}
                      className="MarginRightMedium"
                      //userName={notification.user.uname}
                      onClickAvatar={() => {
                        openProfile(notification);
                      }}
                    />
                    <Content
                      onClick={() => { openPost(notification) }}
                    >
                      {reactStringReplace(
                        notification.text,
                        /\\s(.*?)\\s/g,
                        (match, i) => (
                          <Content style={{ fontWeight: "bold" }}>
                            {match}
                          </Content>
                        )
                      )}{" "}
                      <TimeAgo
                        style={{
                          paddingLeft: 5,
                          color: COLORS.white,
                          fontSize: 13,
                        }}
                        date={notification.timestamp}
                      />
                    </Content>
                  </ContentBox>
                  {notification.secondaryAction ? (
                    <ActionBox className="MarginLeftMedium">
                      {notification.mainAction.action == "userlist" ? (
                        <ButtonFollow
                          userId={notification.user?._id||notification.user?.id}
                          border={false}
                          colored={true}
                          size={'small'}
                        />
                      ) : (
                        <Post
                          src={notification.secondaryAction.postImage}
                          post={notification.secondaryAction.postId}
                          onClick={() => {
                            openPost(notification);
                          }}
                        />
                      )}
                    </ActionBox>
                  ) : null}
                </ResultContainer>
              ))}
            </motion.div>
            <div
              style={{
                marginLeft: SPACING.large,
                marginRight: SPACING.large,
                marginBottom: SPACING.large,
              }}
            >
              <Button
                text={"Load More"}
                onClick={loadMore}
                color={COLORS.purple}
                colorText={COLORS.white}
                width={"100%"}
                className={"FullWidth"}
              />
            </div>
            {show && (
              <PostModal
                show={show}
                setShow={setShow}
                targetPostId={choosenPost?._id}
                // comments={comments}
                // btnType={"comments"}
                btnType={BUTTON_TYPES.COMMENTS}
                // position={props.position}
                commentId={commentID}
              />
            )}
          </NotificationsContainer>
        )}
      </>
    );
  })
);
