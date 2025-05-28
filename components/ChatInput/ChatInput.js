import React, { useState, useEffect, useRef } from "react";
import {
  TextInputContainer,
  MessageOptions,
  MessageIcons,
  SendButton,
  BtnClose,
  ReplyPreviewBox,
  ImageContainer,
  BtnDelete,
  MessageInputBox,
  FilePreview,
  Label,
  ContainerFileLayout,
  Input,
} from "./ChatInput.elements";
import Icon from "../Icon/Icon";
import Mention from "../../public/icons/mention.svg";
import Camera from "../../public/icons/camera.svg";
import Gif from "../../public/icons/gif.svg";
import Sticker from "../../public/icons/sticker.svg";
import Emoji from "../../public/icons/emojiChat.svg";
import { inject, observer } from "mobx-react";
import { action, runInAction, toJS } from "mobx";
import { COLORS, SPACING } from "../../styles/Styling.js";
import { useStore } from "../../stores/RootStore";
import Close from "../../public/icons/close.svg";
import GifModal from "../GifModal/GifModal";
import dynamic from "next/dynamic";
import { StickerModal } from "..";
import { session, useSession } from "next-auth/client";
import Reply from "../../public/icons/reply.svg";
import Image from "next/image";
import OverlayComponent from "../OverlayComponent/OverlayComponent";
import ImageModal from "../ImageModal/ImageModal";
import Dropzone from "react-dropzone-uploader";
import { nanoid } from "nanoid";
import client from "../../pages/api/client";
import Resizer from "react-image-file-resizer";
import MentionsComponent from "../MentionsComponent/MentionsComponent";
import Button from "../Button/Button";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default inject("store")(
  observer(function ChatInput(props) {
    const rootstore = useStore();
    const [messageDraft, setMessageDraft] = useState(``);
    const [mentionIdt, setMentionIdt] = useState("");
    const [keyword, setKeyword] = useState("");
    const [mentions, setMntions] = useState([]);
    const [mentionsModal, setMentionsModal] = useState(false);
    const [gifVisible, setGifVisible] = useState(false);
    const [stickerVisible, setStickerVisible] = useState(false);
    const [mentionsVisible, setMentionsVisible] = useState(false);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [giphyId, setGiphyId] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [imageHeight, setImageHeight] = useState(null);
    const [imageWidth, setImageWidth] = useState(null);
    const [imageType, setImageType] = useState(null);
    const [hasAttachedImage, setHasAttachedImage] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const textareaRef = useRef(null);
    const [mainContainerHeight, setMainContainerHeight] = useState(143); // height of TextInputContainer (min-height + top/bottom padding): 12+40+12=64
    const [overlayVisible, setOverlayVisible] = useState(false);
    //For uploads
    const [assetID, setAssetID] = useState(null);
    const [session, loading] = useSession();
    let trackingStarted = false;
    let previousChar = "";
    let reqTimer;
    const triggerLocation = "anywhere";
    const REPLY_BOX = 50;
    const IMAGE_CONTAINER = 70;
    const [fileAdded, setFileAdded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [textInputFocus, setTextInputFocus] = useState(false);
    const [emptyTextInput, setTextInput] = useState("");
    const [backgroundColor, setBackgroundColor] = useState(null);

    async function openSuggestionsPanel() {
      setMentionsModal(true);
      setOverlayVisible(true);
    }

    async function closeSuggestionsPanel() {
      setMentionsModal(false);
      setTextInputFocus(false);
      setOverlayVisible(false);
    }

    //The useeffect to clear the modals
    useEffect(() => {
      if (messageDraft.length === 0 || messageDraft === " ") {
        //console.log("inside clear")
        setOverlayVisible(false);
        setMntions([]);
        setMentionsModal(false);
      }
    }, [messageDraft]);

    const onSuggestionTap = (item) => {
      closeSuggestionsPanel();

      const comment = messageDraft.slice(0, -keyword.length);
      if (mentionIdt == "@") {
        onTextChange(comment + "@" + item.uname + " "); // pass changed text back
      } else {
        setMessageDraft(messageDraft + item.uname + " ");
      }
      setMntions([]);
      setMentionIdt(" ");
    };

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
      setMessageDraft(val);
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

    const handleKeypress = async (e) => {
      e = e || window.event;
      if (!rootstore.editMessageText) {
        if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault();
          //console.log("pressing enter")
          await sendMessage();
        }
      } else if (rootstore.editMessageText) {
        if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault();
          await sendUpdatedInput();
        }
      }
    };
    async function sendMessage(pid) {
      //alert("the function must store the image file received from the user computer into the external image bucket. Also need to set the height and width for the uploaded image.It seems by default it is 2600x2600px")
      const msg = messageDraft.trim();
      const replyToId = props.replyToId !== null ? props.replyToId : null;
      if (!hasAttachedImage) {
        if (fileAdded) {
          setMessageDraft("");
          await rootstore.sendMessage(
            msg,
            [assetID],
            props.roomIdProp ? props.roomIdProp : rootstore.roomId,
            350,
            500,
            imageType,
            replyToId
          );
          props.setReplyToId(null);
          props.setReplyText(null);
          unselectAttachedImage();
        } else {
          setMessageDraft("");
          if (msg === "") {
            alert(`You may not post an empty comment`);
            return;
          }
          //console.log(msg, "the message to be sent")
          // console.log(props.replyData);
          await rootstore.sendMessage(
            msg,
            null,
            props.roomIdProp ? props.roomIdProp : rootstore.roomId,
            0,
            0,
            "text",
            replyToId
          );

          props.setReplyToId(null);
          props.setReplyText(null);
          // let tempMessage ={
          //     createdAt: Date.now(),
          //     imageHeight: 0,
          //     imageType: "text",
          //     imageWidth: 0,
          //     images: [],
          //     reactions: null,
          //     replyingTo: null,
          //     roomId: rootstore.roomId,
          //     text: msg,
          //     user: session?.user,
          //     userId: session?.user?._id,
          //     _id: "temp"
          // }
          // runInAction(() => {
          //     rootstore.messages = [tempMessage].concat(rootstore.messages);         // sets the auth user variable
          //   })
        }
      } else if (hasAttachedImage) {
        setMessageDraft("");
        await rootstore.sendMessage(
          msg,
          [imageUri],
          props.roomIdProp ? props.roomIdProp : rootstore.roomId,
          Number(imageHeight),
          Number(imageWidth),
          imageType,
          replyToId
        );
        props.setReplyToId(null);
        props.setReplyText(null);
        unselectAttachedImage();
      }
      setTextInput("");
      setTextInputFocus(false);
      //    // props.setReplyData({ type: `cancelReply` }); // clear reply state

      //await Loader.LoadComments(pid);
      // dispatch({ type: ACTIONS.setComments, value: LocalPosts.getInstance().getComments })s

      //props.setReplyData({ type: `cancelReply` }); // clear reply state
    }

    //Call back that runs for picking emojis

    const onEmojiClick = (event, emojiObject) => {
      setMessageDraft(messageDraft + emojiObject.emoji);
      setOverlayVisible(false);
      setEmojiPickerVisible(false);
      setTextInputFocus(true);
    };

    const undoReply = () => {
      props.setReplyToId(null);
      props.setReplyText(null);
      setMainContainerHeight(mainContainerHeight - REPLY_BOX);
      if (props.page === "chat")
        props.setMarginBottom(mainContainerHeight - REPLY_BOX);
    };

    const undoEdit = () => {
      runInAction(() => {
        rootstore.editMessageText = null;
      });
      setMessageDraft("");
      setMainContainerHeight(mainContainerHeight - REPLY_BOX);
      if (props.page === "chat")
        props.setMarginBottom(mainContainerHeight - REPLY_BOX);
    };

    //The useEffect to populate the text for editing
    React.useEffect(() => {
      if (props.editMessage !== null) {
        setMessageDraft(props.editMessage.text);
      }
    }, [props.editMessage]);

    //The function to edit the message
    async function sendUpdatedInput() {
      const msg = messageDraft.trim();
      await rootstore
        .editMessage(props.editMessage._id, {
          text: msg,
        })
        .then((message) => {
          runInAction(() => {
            const updatedMessage = rootstore.messages.find(
              (m) => m._id == props.editMessage._id
            );
            updatedMessage.text = msg;
          });
        });
      setMessageDraft("");
      runInAction(() => {
        rootstore.editMessageText = null;
      });
    }

    //     runInAction(() => {
    //         const updatedMessage = this.messages.find(
    //             m => m._id == this.state.messageToBeModify._id,
    //         );
    //         updatedMessage.text = this.state.input;
    //     });
    //     this.setState({
    //         input: '',
    //     });
    // }).then(() => {
    //     // get rid of update indicators ... ie send btn changes text from 'update' back to 'send'
    //     this.cancelEditMessage();
    // });
    // //remove chosen message's background color
    // this.chatMessageRef[this.state.indexToBeModify].toggleChosenMessage(false);

    /* 
             dinamic heigth message text area calculation (Natalia)
        */
    useEffect(() => {
      if (!props.showOverlay) {
        setEmojiPickerVisible(false);
        setMentionsModal(false);
      }
    }, [props.showOverlay]);

    useEffect(() => {
      const MIN_TEXTAREA_HEIGHT = 40;
      textareaRef.current.style.height = 0;
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
      const tempHeight =
        parseInt(textareaRef.current.style.height.replace("px", "")) + 102; // <TextInputContainer> padding top + bottom = 24 + bottoms(30 +24) =102; !!! broke the height of TextInputContainer if set 64 in line 246 and remove 24 in this line
      setMainContainerHeight(tempHeight);
      if (props.page === "chat") props.setMarginBottom(tempHeight);
    }, [messageDraft]);

    useEffect(() => {
      if (props?.replyToId == undefined) {
        const chatInputContainerHeight = mainContainerHeight;
        setMainContainerHeight(chatInputContainerHeight);
        if (props.page === "chat")
          props.setMarginBottom(chatInputContainerHeight);
      } else if (props?.replyToId !== null) {
        const chatInputContainerHeight = mainContainerHeight + REPLY_BOX;
        setMainContainerHeight(chatInputContainerHeight);
        if (props.page === "chat")
          props.setMarginBottom(chatInputContainerHeight);
      }
    }, [props?.replyToId]);

    function toggleMessagefeatures(type) {
      if (type == "emoji") {
        setOverlayVisible(true);
        setBackgroundColor("rgba(0,0,0,0)");
        setEmojiPickerVisible(true);
        setGifVisible(false);
        setStickerVisible(false);
      } else if (type == "gif") {
        setOverlayVisible(true);
        setEmojiPickerVisible(false);
        setGifVisible(true);
        setStickerVisible(false);
      } else if (type == "sticker") {
        setOverlayVisible(true);
        setEmojiPickerVisible(false);
        setGifVisible(false);
        setStickerVisible(true);
      }
    }

    const unselectAttachedImage = () => {
      setImageUri(null);
      setMainContainerHeight(mainContainerHeight - IMAGE_CONTAINER);
      if (props.page === "chat")
        props.setMarginBottom(mainContainerHeight - IMAGE_CONTAINER);
      setHasAttachedImage(false);
      setImageUri(null);
      setImageHeight(null);
      setImageWidth(null);
      setImageType(null);
      //for dropzone
      if (fileAdded) {
        setFileAdded(null);
        setPreviewUrl(null);
        setAssetID(null);
        // handleFileSubmit()
      }
    };

    const closeOverlay = () => {
      setOverlayVisible(false);
      setBackgroundColor(null);
      setEmojiPickerVisible(false);
      setGifVisible(false);
      setStickerVisible(false);
      setHasAttachedImage(false);
      setMentionsModal(false);
    };

    useEffect(() => {
      if (giphyId != null) {
        setImageUri("https://media1.giphy.com/media/" + giphyId + "/giphy.gif");
        setHasAttachedImage(true);
      }
    }, [giphyId]);

    const closeImageModal = () => {
      setImageModalVisible(false);
    };

    function handleFile(event) {
      setImageUri(URL.createObjectURL(event.target.files[0]));
      setMainContainerHeight(mainContainerHeight + IMAGE_CONTAINER);
      if (props.page === "chat")
        props.setMarginBottom(mainContainerHeight + IMAGE_CONTAINER);
      setHasAttachedImage(true);
      setImageType("jpeg");
    }

    const resizeFile = (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          2600,
          2600,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      });

    const textInputFocused = props.replyDataIsReply
      ? true
      : textInputFocus
        ? true
        : false;
    ///------------------------------------------ start file dropzone customization
    // specify upload params and url for your files
    const getUploadParams = async ({ file, meta }) => {
      const image = await resizeFile(file);
      setPreviewUrl(image);

      const accessToken = await client.authentication.getAccessToken();
      const params = {
        text: "",
        assetID: assetID,
        assetType: meta.type,
      };
      setImageType(meta.type);
      const postMetaData = JSON.stringify(params);
      await client.reAuthenticate();
      const signedUrl = await client.service("get-signed-url").create({
        bucket: "yuser_chat",
        assetId: params.assetID,
        type: params.assetType,
        postMetaData,
      });
      let headers = {
        "content-type": params.assetType,
        Authorization: accessToken,
        apiVersion: "5",
      };
      const { url } = signedUrl;

      return {
        url: url,
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": params.assetType,
        },
        body: file,
      };
    };

    // called every time a file's `status` changes
    const handleChangeFileStatus = ({ meta, file, remove }, status) => {
      if (status === "headers_received") {
        console.log("uploaded");
        remove();
      } else if (status === "aborted") {
        console.log("upload failed");
      }
    };

    // receives array of files that are done uploading when submit button is clicked
    const handleFileSubmit = async (files, allFiles) => {
      allFiles.forEach((f) => f.remove());
    };

    //------------------
    // const msg = messageDraft.trim();
    // const replyToId = props.replyToId !== null ? props.replyToId : null
    // //console.log(files.map(f => f.meta,"metaaaaaa"))
    // setMessageDraft("");
    //     await rootstore.sendMessage(
    //         msg,
    //         [assetID],
    //         props.roomIdProp ? props.roomIdProp : rootstore.roomId,
    //         500,
    //         500,
    //         imageType,
    //         replyToId,
    //     );
    //     props.setReplyToId(null)
    //     props.setReplyText(null)
    //     unselectAttachedImage()
    //---------------------------

    const CustomFileLayout = ({ input, previews, dropzoneProps }) => {
      return (
        <ContainerFileLayout {...dropzoneProps}>
          {input}
          {/*} {fileAdded &&
                        <PreviewFileBox>
                            {previews}
                        </PreviewFileBox>
                    }*/}
        </ContainerFileLayout>
      );
    };

    const CustomFileInput = ({
      accept,
      onFiles,
      files,
      getFilesFromEvent,
      props,
    }) => {
      const hiddenAvatarInput = React.useRef(null);

      const handleClick = (e) => {
        hiddenAvatarInput.current.click();
      };

      const handleChange = async (e) => {
        setAssetID(nanoid());
        const target = e.target;
        const chosenFiles = getFilesFromEvent(e);
        onFiles(chosenFiles);
        setFileAdded(true);
        target.value = null;
      };

      return (
        <Label onClick={handleClick}>
          <Icon height="24px" width="auto" name={Camera} />
          <Input
            accept={accept}
            type="file"
            ref={hiddenAvatarInput}
            onChange={handleChange}
          />
        </Label>
      );
    };

    const CustomFilePreview = ({ meta }) => {
      //const { previewUrl } = meta != null ? meta : ""
      return <FilePreview src={previewUrl} />;
    };
    ///------------------------------------------ end file dropzone customization

    async function openMentionsModal() {
      setMessageDraft(messageDraft + " " + "@");
      await rootstore.getMutualFollowers(true);
      setMntions(rootstore.mutualFollowers);
      setMentionsModal(true);
    }

    return (
      <div
        style={{
          position: "relative",
          zIndex: 9,
          flexDirection: "column",
          flex: 1,
        }}
        className="Flex"
      >
        <div
          className="Flex"
          style={{
            position: "absolute",
            zIndex: 999,
            bottom: mainContainerHeight,
          }}
        >
          {gifVisible && (
            <GifModal
              closeOverlay={closeOverlay}
              setGiphyId={setGiphyId}
              setImageType={setImageType}
              setImageWidth={setImageWidth}
              setImageHeight={setImageHeight}
            />
          )}
          {stickerVisible && (
            <StickerModal
              closeOverlay={closeOverlay}
              setGiphyId={setGiphyId}
              setImageType={setImageType}
              setImageWidth={setImageWidth}
              setImageHeight={setImageHeight}
            />
          )}
          {emojiPickerVisible && (
            <div className="flex">
              <Picker
                onEmojiClick={onEmojiClick}
                pickerStyle={{ className: "aside.emoji-picker-react" }} // globalStyles: aside.emoji-picker-react
                disableSearchBar={true}
              />
            </div>
          )}
        </div>
        {props.replyToId !== null && (
          <ReplyPreviewBox className="Flex">
            <BtnClose onClick={undoReply}>
              <Icon
                //strokeColor={({ theme }) => theme.iconColor.color}
                strokeColor={"white"}
                strokeWidth="4"
                height="10px"
                width="10px"
                name={Close}
              />
            </BtnClose>
            <div className="flex" style={{ gap: SPACING.medium }}>
              <Icon
                strokeColor={({ theme }) => theme.iconColor.color}
                strokeWidth="3"
                height="auto"
                width="16px"
                name={Reply}
              />
              <div className="flex">{props.replyText}</div>
            </div>
          </ReplyPreviewBox>
        )}
        {props.editMessage !== null && (
          <ReplyPreviewBox className="Flex">
            <BtnClose onClick={undoEdit}>
              <Icon
                //strokeColor={({ theme }) => theme.iconColor.color}
                strokeColor={"white"}
                strokeWidth="4"
                height="10px"
                width="10px"
                name={Close}
              />
            </BtnClose>
            <div className="flex" style={{ gap: SPACING.medium }}>
              {/* <div className="flex">{"Cancel"}</div> */}
            </div>
          </ReplyPreviewBox>
        )}
        <TextInputContainer
          textInputFocused={textInputFocused}
          className="Flex"
        >
          {imageUri !== null || fileAdded ? (
            <div className="flex" style={{ marginBottom: SPACING.medium }}>
              <ImageContainer onClick={() => setImageModalVisible(true)}>
                {fileAdded ? (
                  <CustomFilePreview />
                ) : (
                  <Image
                    height="60px"
                    width="60px"
                    objectFit="cover"
                    src={imageUri}
                    alt="attached image"
                    className="imageSignup" // object-position: center top;
                  />
                )}
              </ImageContainer>
              <BtnDelete onClick={unselectAttachedImage}>
                <Icon
                  strokeColor="white"
                  strokeWidth="4"
                  height="10px"
                  width="10px"
                  name={Close}
                />
              </BtnDelete>
            </div>
          ) : null}
          {/* {props?.replyData?.isReply && (
                        <ReplyBox>
                            <BtnCancel
                                onClick={() =>
                                    props.setReplyData({
                                        type: "cancelReply",
                                    })
                                }
                            >
                                <Icon
                                    strokeColor="white"
                                    strokeWidth="4"
                                    height="10px"
                                    width="10px"
                                    name={Close}
                                />
                            </BtnCancel>
                            <TxtReply>{`@${props.replyData?.replyingTo?.uname}`}
                            </TxtReply>
                        </ReplyBox>
                    )} */}

          <MessageInputBox
            ref={textareaRef}
            type="text"
            placeholder="Write a message"
            value={messageDraft}
            onChange={(event) => onTextChange(event.target.value)}
            onClick={() => setTextInputFocus(true)}
            onKeyDown={() => handleKeypress()}
            textInputFocused={textInputFocused}
            className="Flex"
          />
          <MessageOptions className="Flex">
            <MessageIcons className="Flex">
              <Dropzone
                LayoutComponent={CustomFileLayout}
                InputComponent={CustomFileInput}
                PreviewComponent={(props) => <CustomFilePreview {...props} />}
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeFileStatus}
                onSubmit={handleFileSubmit}
                accept="image/*,audio/*,video/*"
                maxFiles={1}
                multiple={false}
                canCancel={true}
                autoUpload={true}
              />
                <Button
                  text={""}
                  onClick={openMentionsModal}
                  isIcon={true}
                  color={({ theme }) => theme.containerHover.color}
                  iconWidth={"24px"}
                  iconName={Mention}
                  justIcon={true}
                />
                <Button
                  text={""}
                  onClick={() => toggleMessagefeatures("emoji")}
                  isIcon={true}
                  color={({ theme }) => theme.containerHover.color}
                  iconWidth={"24px"}
                  iconName={Emoji}
                  justIcon={true}
                />
                <Button
                  text={""}
                  onClick={() => toggleMessagefeatures("gif")}
                  isIcon={true}
                  color={({ theme }) => theme.containerHover.color}
                  iconWidth={"38px"}
                  iconHeight={"22px"}
                  iconName={Gif}
                  justIcon={true}
                />
                <Button
                  text={""}
                  onClick={() => toggleMessagefeatures("sticker")}
                  isIcon={true}
                  color={({ theme }) => theme.containerHover.color}
                  iconWidth={"22px"}
                  iconHeight={"22px"}
                  iconName={Sticker}
                  justIcon={true}
                />
            </MessageIcons>
            {props.editMessage === null ? (
              <SendButton
                commentDraft={messageDraft}
                imageUri={imageUri}
                fileAdded={fileAdded}
                onClick={() => {
                  messageDraft != "" || imageUri !== null || fileAdded
                    ? sendMessage()
                    : null;
                }}
              >
                {"Send"}
              </SendButton>
            ) : (
              <SendButton
                commentDraft={messageDraft}
                onClick={() => {
                  messageDraft != "" || imageUri !== null || fileAdded
                    ? sendUpdatedInput()
                    : null;
                }}
              >
                {"Update"}
              </SendButton>
            )}
          </MessageOptions>
        </TextInputContainer>
        <OverlayComponent
          overlayVisible={overlayVisible}
          backgroundColor={backgroundColor}
          closeOverlay={closeOverlay}
        />
        {imageModalVisible && (
          <ImageModal
            closeImageModal={closeImageModal}
            uriImage={imageUri}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
          />
        )}
        {mentionsModal && mentions.length !== 0 && (
          <MentionsComponent
            mentions={mentions}
            onSuggestionTap={onSuggestionTap}
            mainContainerHeight={mainContainerHeight}
          />
        )}
      </div>
    );
  })
);
