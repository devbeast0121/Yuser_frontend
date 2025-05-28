import React, { useEffect, useState } from "react";
import {
  ModalContainer,
  ShareContainer,
  IconTextContainer,
  MainContainer,
  TxtShare,
  IconBackgroundWrapper
} from "./SocialShare.elements";
import { inject, observer } from "mobx-react";
import { useStore } from "../../stores/RootStore";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share"; // doesn't have props to change the icon color, possible change only background color
import client from "../../pages/api/client";
import Icon from "../Icon/Icon";
import Copy from "../../public/icons/socialCopy.svg"
import { motion, AnimatePresence } from "framer-motion";

//for grouping messages by days, a list of messages (one day) inside a list of days
export default inject("store")(
  observer(function SocialShare(props) {
    const rootstore = useStore();
    const [url, setUrl] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    // React.useEffect(() => {
    //     console.log("inside use effect")
    //     async function doEffect() {
    //      await rootstore.getPostLink(props.post._id)
    //     }
    //     doEffect();
    //   }, [props.post]);
    //console.log(props.post,"hello")

    useEffect(async () => {

      // await rootstore.getPostLink(props.post._id)
      if (props.hashtagChallenge) {
        await client.service('deep-links').create({
          post: {
            hashtagChallengeId: props.hashtagChallengeId
          }
        }).then((link) => setUrl(link))
      } else {
        await client.service('deep-links').create({
          post: {
            postId: props.post._id
          }
        }).then((link) => setUrl(link))
      }
    }, []);

    const onCopyLinkReaction = () => {
      navigator.clipboard.writeText(url);
      setIsVisible(true);
      const timers = setTimeout(() => {
        props.setShareButtonVisible(false)
      }, 1200);
      return () => clearTimeout(timers);
      //
    }

    return (

      <ModalContainer position={props.position}>
        <ShareContainer position={props.position}>
          {/*--------------------------------------COPY-------------------------------------- */}
          <MainContainer position={props.position}>
            <div
              url={url !== "" ? url : null}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              hashtag={"#nextshare"}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                fontWeight: "bold",
                backgroundColor: "transparent",
                borderWidth: 0,
                cursor: "pointer",
              }}
              onClick={onCopyLinkReaction}
            >
              <IconTextContainer position={props.position} style={{ alignSelf: "center" }}>
                <IconBackgroundWrapper position={props.position}>
                  <Icon
                    strokeWidth="3"
                    height="auto"
                    width={props.position == "vertical" ? "18px" : "24px"}
                    name={Copy}
                    strokeColor="white"
                  />
                </IconBackgroundWrapper>
                {props.position == "vertical" &&
                  <TxtShare style={{ paddingLeft: 8 }}>{"Copy Link"}</TxtShare>
                }
              </IconTextContainer>
            </div>
          </MainContainer>

          {/*--------------------------------------TWITTER-------------------------------------- */}
          <MainContainer position={props.position}>
            <TwitterShareButton
              url={url !== "" ? url : null}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              hashtag={"#nextshare"}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                fontWeight: "bold",
              }}
            >
              <IconTextContainer position={props.position}>
                <IconBackgroundWrapper position={props.position}>
                  <TwitterIcon bgStyle={{ fill: "transparent" }} />
                </IconBackgroundWrapper>
                {props.position == "vertical" &&
                  <TxtShare>{"Share on Twitter"}</TxtShare>
                }
              </IconTextContainer>
            </TwitterShareButton>
          </MainContainer>
          {/*--------------------------------------TELEGRAM-------------------------------------- */}
          <MainContainer position={props.position}>
            <TelegramShareButton
              url={url !== "" ? url : null}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              //hashtag={"#Yuser"}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                fontWeight: "bold",
              }}
            >
              <IconTextContainer position={props.position}>
                <IconBackgroundWrapper position={props.position}>
                  <TelegramIcon bgStyle={{ fill: "transparent" }} />
                </IconBackgroundWrapper>
                {props.position == "vertical" &&
                  <TxtShare>{"Share on Telegram"}</TxtShare>
                }
              </IconTextContainer>
            </TelegramShareButton>
          </MainContainer>
          {/*--------------------------------------FACEBOOK-------------------------------------- */}
          <MainContainer position={props.position}>
            <FacebookShareButton
              url={url !== "" ? url : null}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              hashtag={"#Yuser"}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                fontWeight: "bold",
              }}
            >
              <IconTextContainer position={props.position}>
                <IconBackgroundWrapper position={props.position}>
                  <FacebookIcon bgStyle={{ fill: "transparent" }} />
                </IconBackgroundWrapper>
                {props.position == "vertical" &&
                  <TxtShare>{"Share on Facebook"}</TxtShare>
                }
              </IconTextContainer>
            </FacebookShareButton>
          </MainContainer>

          {/*--------------------------------------REDDIT-------------------------------------- */}
          <MainContainer position={props.position}>
            <RedditShareButton
              url={url !== "" ? url : null}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              // hashtag={"#nextshare"}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                fontWeight: "bold",
              }}
            >
              <IconTextContainer position={props.position}>
                <IconBackgroundWrapper position={props.position}>
                  <RedditIcon bgStyle={{ fill: "transparent" }} />
                </IconBackgroundWrapper>
                {props.position == "vertical" &&
                  <TxtShare>{"Share on Reddit"}</TxtShare>
                }
              </IconTextContainer>
            </RedditShareButton>
          </MainContainer>
          {/*--------------------------------------FACEBOOK MESSENGER-------------------------------------- */}
          <MainContainer position={props.position}>
            <FacebookMessengerShareButton
              url={url !== "" ? url : null}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              // hashtag={"#nextshare"}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                fontWeight: "bold",
              }}
            >
              <IconTextContainer position={props.position}>
                <IconBackgroundWrapper position={props.position}>
                  <FacebookMessengerIcon bgStyle={{ fill: "transparent" }} />
                </IconBackgroundWrapper>
                {props.position == "vertical" &&
                  <TxtShare>{"Share on Messenger"}</TxtShare>
                }
              </IconTextContainer>
            </FacebookMessengerShareButton>
          </MainContainer>
          {/*--------------------------------------WHATSAPP MESSENGER-------------------------------------- */}
          <MainContainer lastItem={true} position={props.position}>
            <WhatsappShareButton
              url={url !== "" ? url : null}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              // hashtag={"#nextshare"}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                fontWeight: "bold",
              }}
            >
              <IconTextContainer position={props.position}>
                <IconBackgroundWrapper position={props.position}>
                  <WhatsappIcon bgStyle={{ fill: "transparent" }} />
                </IconBackgroundWrapper>
                {props.position == "vertical" &&
                  <TxtShare>{"Share on Whatsapp"}</TxtShare>
                }
              </IconTextContainer>
            </WhatsappShareButton>
          </MainContainer>
        </ShareContainer>
        <LinkCopiedMessage isVisible={isVisible} />
      </ModalContainer>
    );
  })
);


function LinkCopiedMessage({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible === true ? (
        <motion.div
          key="messageTop"
          className="MessageTopnftshare"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
        >
          {"Linked Copied!"}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
