import React, { useState, useReducer } from 'react';
import {
    MainContainer,
    TextInputContainer,
    TextInputBox,
    IconBox,
    UserSuggestionsModal,
    EachUserSuggestion,
    UserNameText,
    ReplyBox,
    BtnCancel,
    TxtReply
} from './TextInput.elements';
import Icon from "../Icon/Icon";
import Emoji from '../../public/icons/emoji3.svg';
import Mention from '../../public/icons/mention.svg';
import Button from '../Button/Button';
import Avatar from "../Avatar/Avatar";
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import { AvatarUrl } from "../../stores/tools";
import { COLORS } from '../../styles/Styling.js';
import { useStore } from "../../stores/RootStore";
import Loader from "../../pages/api/posts";
import Close from "../../public/icons/close.svg";

export default inject('store')(observer(
    function TextInput(props) {
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



        async function openSuggestionsPanel(val) {

            setMentionsModal(true);
        }
        async function closeSuggestionsPanel(val) {

            setMentionsModal(false);
        }



        async function onSuggestionTap(item) {
            closeSuggestionsPanel();

            const comment = commentDraft.slice(0, -keyword.length);
            if (mentionIdt == "@") {
                onTextChange(comment + "@" + item.uname + ""); // pass changed text back
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
            if (msg === "") {
                alert(`You may not post an empty comment`);
                return;
            }
            // console.log(props.replyData);
            await rootstore.addComment(
                pid,
                ConcatMsgWithReplyeeUsername(props.replyData, msg),
                props.replyDataIsReply
                    ? props.parentCommentId
                    : undefined
            );
            props.setReplyData({ type: `cancelReply` }); // clear reply state

            await Loader.LoadComments(pid);
            // dispatch({ type: ACTIONS.setComments, value: LocalPosts.getInstance().getComments })s

            props.setReplyData({ type: `cancelReply` }); // clear reply state
        }

        return (
            <>
                <MainContainer>
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
                                    strokeWidth="4"
                                    height="auto"
                                    width="18px"
                                    name={Close} />
                            </BtnCancel>
                            <TxtReply>{`@${props.replyData?.replyingTo?.uname}`}
                            </TxtReply>
                        </ReplyBox>
                    )}
                    <TextInputContainer replyDataIsReply={props.replyDataIsReply}>
                        <TextInputBox
                            type='text'
                            placeholder='Add a comment'
                            value={commentDraft}
                            onChange={(event) =>
                                onTextChange(event.target.value)
                            }
                        />
                        <Button
                            style={{ zIndex: 9999 }}
                            color={COLORS.blue}
                            colorText={COLORS.white}
                            className={'MarginRightLarge'}
                            text={'Send'}
                            onClick={() =>
                                sendComment(
                                    rootstore.localPosts.getById(props.targetId)
                                        ._id
                                )
                            }
                        />
                        {/*} <IconBox>
                            <Icon height="auto" width="24px" name={Mention} className="MarginRightLarge" />
                            <Icon height="auto" width="24px" name={Emoji} className="MarginRightLarge" />
                        </IconBox> */}
                    </TextInputContainer>
                    {mentionsModal && mentions.length !== 0 && (
                        <UserSuggestionsModal>

                            {toJS(mentions).map((suggestion) => (
                                <EachUserSuggestion
                                    key={suggestion._id}
                                    onClick={() => {
                                        onSuggestionTap(suggestion);
                                    }}
                                    className="MarginLeftMedium"
                                >
                                    <Avatar
                                        src={AvatarUrl(suggestion.avatar, 's')}
                                        size={"small"}
                                        alt={"avatar"}
                                    />
                                    <UserNameText className="MarginLeftMedium" onClick={() => {
                                        onSuggestionTap(suggestion);
                                    }}>{suggestion.uname}</UserNameText>
                                </EachUserSuggestion>
                            ))}
                        </UserSuggestionsModal>
                    )}
                </MainContainer>
            </>
        )
    }
))