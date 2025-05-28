import React, { useState, useRef, useEffect } from "react";
import {
  MainContainer,
  TextInputContainer,
  ReplyBox,
  BtnCancel,
  TxtReply,
  MessageInputBox,
  GifButton,
  PickerWrapper,
  SendButton
} from "./TextArea.elements";
import Icon from "../Icon/Icon";
import { inject, observer } from "mobx-react";
import { runInAction } from "mobx";
import { useStore } from "../../stores/RootStore";
import Loader from "../../pages/api/posts";
import Close from "../../public/icons/close.svg";
import MentionsComponent from "../MentionsComponent/MentionsComponent";
import Emoji from '../../public/icons/emojiChat.svg';
import dynamic from 'next/dynamic';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default inject("store")(
  observer(function TextArea(props) {
    const rootstore = useStore();
    const [commentDraft, setCommentDraft] = useState(``);
    const [mentionIdt, setMentionIdt] = useState("");
    const [keyword, setKeyword] = useState("");
    const [mentions, setMntions] = useState([]);
    const [mentionsModal, setMentionsModal] = useState(false);
    let trackingStarted = false;
    let previousChar = "";
    let reqTimer;
    const triggerLocation = "anywhere";
    const [emptyTextInput, setTextInput] = useState("");
    const [textInputFocus, setTextInputFocus] = useState(false);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
    const [mainContainerHeight, setMainContainerHeight] = useState(64); // height of TextInputContainer (min-height + top/bottom padding): 12+40+12=64
    const textareaRef = useRef(null);
    const REPLY_BOX = 26;

    async function openSuggestionsPanel(val) {
      setMentionsModal(true);
      props.setShowOverlay(true)
      props.setTextareaOverlayVisible(true)
    }
    async function closeSuggestionsPanel(val) {
      setTextInputFocus(false);
      setMentionsModal(false);
      props.setShowOverlay(false)
      props.setTextareaOverlayVisible(false)
    }

    useEffect(() => {

      if (commentDraft.length === 0 || commentDraft===" " ||commentDraft==="") {
          //console.log("inside clear")
          //setOverlayVisible(false)
          setMntions([]);
          setMentionsModal(false)

      }
  }, [commentDraft]);

    const onSuggestionTap =(item) =>{
      closeSuggestionsPanel();
      const comment = commentDraft.slice(0, -keyword.length);
      if (mentionIdt == "@") {
        onTextChange(comment + "@" + item.uname + " "); // pass changed text back
      }
      setMntions([]);
      setMentionIdt(" ");
    }

    async function onMentionTextInputTyped(keyword) {
      if (keyword.length > 3) {
        if (reqTimer) {
          clearTimeout(reqTimer);
        }
        reqTimer = setTimeout(() => {
          if (keyword.charAt(0) == "@") {
            rootstore
              .getUserSuggestions(keyword.substr(1))
              .then((data) => {
                if (data) {
                  setMntions(data);
                  setKeyword(keyword);
                } else {
                  setMntions([]);
                  setKeyword(keyword);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }, 200);
      }
    }

    async function identifyKeyword(val) {
      const boundary = "B";
      const pattern = new RegExp(
        `\\${boundary}${"@"}[a-zA-Z0-9_-]+|\\${boundary}${"@"}`,
        `gi`
      );

      const keywordArray = val.match(pattern);

      if (keywordArray && !!keywordArray.length) {
        const lastKeyword = keywordArray[keywordArray.length - 1];

        onMentionTextInputTyped(lastKeyword);
      }
    }
    async function startTracking(val) {
      trackingStarted = true;
      openSuggestionsPanel(val);
    }
    async function stopTracking(val) {
      trackingStarted = false;
      closeSuggestionsPanel(val);
    }

    const onTextChange = async (val) => {
      setTextInput(val);
      let lastChar = val.substr(val.length - 1);
      const wordBoundry =
        triggerLocation === "anywhere"
          ? previousChar.trim().length === 0
          : true;
      if (wordBoundry && (lastChar == "@" || lastChar == "#")) {
        setMentionIdt(lastChar);
        startTracking();
      } else if (trackingStarted && (lastChar === " " || val === "")) {
        stopTracking();
      }
      setCommentDraft(val);
      previousChar = lastChar;
      identifyKeyword(val);
    };

    /*
            ConcatMsgWithReplyeeUsername()
            Concatinate @__some_username__ with the originam message when new menssage is a reply
            William Doyle
            Aug 2nd 2021
        */
    function ConcatMsgWithReplyeeUsername(_replyData, _msg) {
      if (_replyData.isReply === false) return _msg;
      return `@${_replyData.replyingTo.uname} ${_msg}`;
    }

    /*
                  sendComment()
                  William Doyle
                  July 19th 2021
              */

    async function sendComment(pid) {
      const msg = commentDraft.trim();
      setCommentDraft("");
      setTextInput("");
      setTextInputFocus(false);
      // console.log(props.replyData);
      if (props.replyDataIsReply) {
        await addReplyToComment(pid, msg);
      } else {
        await addCommentToPost(pid, msg);
      }
    }

    async function addReplyToComment(pid, msg) {
      await rootstore
        .addComment(
          pid,
          ConcatMsgWithReplyeeUsername(props.replyData, msg),
          props.replyDataIsReply ? props.parentCommentId : undefined
        )
        .then(async (c) => {
          let found = false;
          let tempNewComments = rootstore.commentsList;
          for (var i = 0; i < rootstore.commentsList.length; i++) {
            if (!found && tempNewComments[i]._id === props.parentCommentId) {
              found = true;
              if (tempNewComments[i].replies) {
                tempNewComments[i].replies.push(c);
                //tempNewComments[i].replies = [c, ...tempNewComments[i].replies];
              } else {
                tempNewComments[i].replies = [];
                tempNewComments[i].replies.push(c);
              }
            }
          }

          runInAction(() => {
            rootstore.commentsList = tempNewComments;
          });
        })
        .catch((error) => {
          console.log(error);
        });
      props.setReplyData({ type: `cancelReply` }); // clear reply state

      await Loader.LoadComments(pid);
      // dispatch({ type: ACTIONS.setComments, value: LocalPosts.getInstance().getComments })s

      props.setReplyData({ type: `cancelReply` }); // clear reply state
    }

    async function addCommentToPost(pid, msg) {
      await rootstore
        .addComment(
          pid,
          ConcatMsgWithReplyeeUsername(props.replyData, msg),
          props.replyDataIsReply ? props.parentCommentId : undefined
        )
        .then(async (c) => {
          const tempNewComments = [c, ...rootstore.commentsList];

          runInAction(() => {
            rootstore.commentsList = tempNewComments;
          });
        })
        .catch((error) => {
          console.log(error);
        });
      props.setReplyData({ type: `cancelReply` }); // clear reply state

      await Loader.LoadComments(pid);
      // dispatch({ type: ACTIONS.setComments, value: LocalPosts.getInstance().getComments })s

      props.setReplyData({ type: `cancelReply` }); // clear reply state
    }

    function toggleMessagefeatures(type) {
      setEmojiPickerVisible(true)
      props.setShowOverlay(true)
      props.setTextareaOverlayVisible(true)
    }

    const onEmojiClick = (event, emojiObject) => {
      setCommentDraft(commentDraft + emojiObject.emoji)
      props.setShowOverlay(false)
      props.setTextareaOverlayVisible(false)
    };

    useEffect(() => {
      if (!props.showOverlay) {
        setEmojiPickerVisible(false);
        setMentionsModal(false);
      }
    }, [props.showOverlay]);
    useEffect(() => {
     if(props.replyData.isReply ===true){
      document.getElementById("textareaid").focus();
      //setTextInputFocus(true)
     }
     else{
      document.getElementById("textareaid").blur();
      //setTextInputFocus(false)
     }
    }, [props.replyData]);

    useEffect(() => {
      const MIN_TEXTAREA_HEIGHT = 40;
      textareaRef.current.style.height = 0;
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
      const tempHeight = parseInt((textareaRef.current.style.height).replace('px', '')) + 24 // <TextInputContainer> padding top + bottom = 24; !!! broke the height of TextInputContainer if set 64 in line 246 and remove 24 in this line
      setMainContainerHeight(tempHeight)
    }, [commentDraft]);


    useEffect(() => {
      if (props?.replyToId == undefined) {
        const chatInputContainerHeight = mainContainerHeight
        setMainContainerHeight(chatInputContainerHeight)
      } else if (props?.replyToId !== null) {
        const chatInputContainerHeight = mainContainerHeight + REPLY_BOX
        setMainContainerHeight(chatInputContainerHeight)
      }
    }, [props?.replyToId]);

    const handleKeypress = async e => {
      e = e || window.event
          if (e.keyCode === 13 && !e.shiftKey) {
              e.preventDefault()
              //console.log("pressing enter")
              await sendComment(rootstore.localPosts.getById(props.targetId)._id)
          }
      
  };

    const disabled = emptyTextInput.length < 2 ? true : false;
    const textInputFocused = props.replyDataIsReply
      ? true
      : textInputFocus
        ? true
        : false;
    return (

      <MainContainer >
        {emojiPickerVisible &&
          <PickerWrapper mainContainerHeight={mainContainerHeight}>
            <Picker
              onEmojiClick={onEmojiClick}
              pickerStyle={{ className: "aside.emoji-picker-react" }} // globalStyles: aside.emoji-picker-react
              disableSearchBar={true}
            />
          </PickerWrapper>
        }
        {props?.replyData?.isReply && (
          <ReplyBox>
            <BtnCancel
              onClick={() =>
                props.setReplyData({
                  type: "cancelReply",
                })
              }
            >
              <Icon
                className="MarginRightSmall"
                strokeColor={({ theme }) => theme.iconColor.color}
                strokeWidth="3"
                height="auto"
                width="18px"
                name={Close}
              />
            </BtnCancel>
            <TxtReply>{`@${props.replyData?.replyingTo?.uname}`}</TxtReply>
          </ReplyBox>
        )}
        <TextInputContainer textInputFocused={textInputFocused}>
          <MessageInputBox
            ref={textareaRef}
            id={"textareaid"}
            type="text"
            placeholder="Add a comment"
            value={commentDraft}
            onChange={(event) => onTextChange(event.target.value)}
            onClick={() => setTextInputFocus(true)}
            onKeyDown={() => handleKeypress()}
            textInputFocused={textInputFocused}
          />
          <GifButton
            onClick={() => toggleMessagefeatures("emoji")}
          >
            <Icon
              height="24px"
              width="auto"
              name={Emoji}
            />
          </GifButton>
          <SendButton
            commentDraft={commentDraft}
            onClick={() => {commentDraft != "" ? sendComment(rootstore.localPosts.getById(props.targetId)._id) : null}}
            style={{ textAlign: "center"}}
            >
            {"Send"}
          </SendButton>
        </TextInputContainer>
        {mentionsModal && mentions.length !== 0 && (
          <MentionsComponent
            mentions={mentions}
            onSuggestionTap={onSuggestionTap}
            mainContainerHeight={mainContainerHeight}
          />
        )}
      </MainContainer>
    );
  })
);