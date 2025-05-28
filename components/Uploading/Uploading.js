import React, { useState, useEffect } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { COLORS, SPACING } from "../../styles/Styling.js";
import ImgUpload from '../../public/icons/uploadImage.svg';
import Add from "../../public/icons/add.svg";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import PriceBox from "../PriceBox/PriceBox";
import musicImage from "../../public/images/musicImage.jpeg";
import Image from "next/image";
import { nanoid } from "nanoid";
import {
  MainBox,
  ButtonsMenuRow,
  ButtonsMenuColumn,
  SubMenu,
  DropzoneBox,
  DescriptionInputBox,
  Title,
  TxtMain,
  FormatBox,
  FormatSubBox,
  Label,
  Input,
  PreviewBox,
  ImgPreview,
  ProgressBarContainer,
  BtnCancelUpload,
  CustomPreviewBox,
  Container,
  LargeTitle,
  SubTitle,
  WelcomeText,
  SubBox,
  TitleInputBox,
  AddBox,
  PropertyList,
  ItemContainer,
  MainContainer,
  MentionHashContainer,
  Wrapper,
} from "./Uploading.elements";
import Close from "../../public/icons/close.svg";
import { useRouter } from "next/router";
import client from "../../pages/api/client.js";
import { session, useSession } from "next-auth/client";
//import Switch from "react-switch";
import Shopping from "../../public/icons/shopping-cart.svg";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { useStore } from "../../stores/RootStore.js";
import MentionsComponent from "../MentionsComponent/MentionsComponent.js";
import HashtagSuggestions from "../HashtagSuggestions/HashtagSuggestions.js";

export default function Uploading(props) {
  const router = useRouter();
  const [description, setDescription] = useState(``);
  const [fileAdded, setFileAdded] = useState(false);
  const [imageAdded, setImageAdded] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [activePost, setActivePost] = useState(false);
  const [session, loading] = useSession();
  const [assetID, setAssetID] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const dropzoneRef = React.createRef();
  const dropzoneRef1 = React.createRef();
  const [checkedNFT, setCheckedNFT] = useState(false);
  const [checkedContent, setCheckedContent] = useState(false);
  const [title, setTitle] = useState(``);
  const [secretVisible, setSecretVisible] = useState(false);
  const [secret, setSecret] = useState(``);
  const [propertyVisible, setPropertyVisible] = useState(false);
  const [propertyItems, setPropertyItems] = useState([{}, {}, {}, {}, {}]);
  const [priceVisible, setPriceVisible] = useState(false);
  const [NFTpartVisible, setNFTpartVisible] = useState(false);
  const [mobileSize, setMobileSize] = useState(false);
  const [postData, setPostData] = useState({});
  const [isUpload, setIsUpload] = useState(false);
  const [mentionIdt, setMentionIdt] = useState("");
  const [keyword, setKeyword] = useState("");
  const [mentions, setMntions] = useState([]);
  const [mentionsModal, setMentionsModal] = useState(false);
  const [textInputFocus, setTextInputFocus] = useState(false);
  const [emptyTextInput, setTextInput] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [hashTagModal, sethashTagModal] = useState(false);
  const [triggerIdentifier, setTriggerIdentifier] = useState("");
  const [step, setStep]= useState(1);
  const [thumbnail, setThumbnail] = useState("")
  const [disableRemove, setDisableRemove] = useState(false)
  const [audioImage, setAudioImage] = useState(null)
  const [mainContainerHeight, setMainContainerHeight] = useState(143); // height of TextInputContainer (min-height + top/bottom padding): 12+40+12=64
  let trackingStarted = false;
  let previousChar = "";
  let reqTimer;
  const triggerLocation = "anywhere";
  const rootstore = useStore();
  // show/hide the nav icon depending from the window size
  const showHideNavIcon = () => {
    if (typeof window === "undefined")
      console.warn(`window is undefined this is about to cause an issue`);

    if (window.innerWidth <= 410) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  };

  useEffect(() => {
    showHideNavIcon();
    window.addEventListener("resize", showHideNavIcon);
    return () => window.removeEventListener("resize", showHideNavIcon);
  }, []);

  React.useEffect(() => {
    async function doEffect() {
      if (session) {
        setAssetID(nanoid());
      }
    }
    doEffect();
  }, [session]);

  React.useEffect(() => {
    async function doEffect() {
     if(thumbnail){
      const newData = postData
      newData.audioImage=thumbnail
     setPostData(newData)
     }
      
     
    }
    doEffect();
  }, [thumbnail]);

  //specify upload params and url for your files

  const getUploadParams = async ({ file, meta }) => {
    console.log(file,meta,"hallo")
    const accessToken = await client.authentication.getAccessToken();
    const params = {
      text: "Hello new uploadparams",
      assetID: assetID,
      assetType: meta.type,
    };
    const postMetaData = JSON.stringify(params);
    await client.reAuthenticate();
    const signedUrl = await client.service("get-signed-url").create({
      bucket: "yuser_uploads",
      assetId: params.assetID,
      type: params.assetType,
      postMetaData,
      appType: "web-app",
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

  const handleChangeStatus = ({ meta, file }, status) => {
    if(file.size>250000000){
      props.showAppMessage(true, "error", "The file you’re attempting to upload is too big. Please cancel the current file and select a file smaller than 250mb.")
    }
    setIsUpload(true);
    setFileAdded(true);
    if (status === "ready") {
      meta.status = "headers_received";
    }
    if (status === "done") {
      setActivePost(true);
      if(meta.type === "audio/mp3" || meta.type === "audio/mpeg"){
        setStep(2);
      }
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = async (files, allFiles) => {
    files.forEach((file) => file.restart());
    const file = files[0].meta;
    file.mimetype = file.type;
    const data = {
      text: description,
      lat: null,
      long: null,
      assetId: assetID,
      placeName: "London",
      type: file.type,
      width: file.width ? parseInt(file.width, 10) : null,
      height: file.height ? parseInt(file.height, 10) : null,
      orientation: undefined,
      appType:"web-app",
      audioImage:audioImage,
      //playbackId: playbackId,
      //tags:data.tags
      file: file,
    };
    setPostData(data);
    // await client.reAuthenticate()
    // files.forEach((file) => file.restart());

    // const response = await client.service('upload-post').create({ data })
  };
  const handleContinue = async (files, allFiles) => {
    
    if (checkedNFT === false) {
      let updatedData={};
      updatedData=postData
       updatedData.text = description
      await client.reAuthenticate();
      setDescription("")
      const response = await client.service("upload-post").create(updatedData);
      router.push("/profile");
      // console.log(response,"response")
      // let pid= response.postId
      // if(pid){
      //   setTimeout(function(){
      //     console.log("loading")
      //     router.push(`/post/${pid}`);
      // }, 4000);
      // }
    }
  };

  const CustomLayout = ({
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }) => {
    const [dataC, setDataC] = useState(description);
    return (
      <DropzoneBox {...dropzoneProps}>
        {!fileAdded &&
          <>
            {input}
          </>
        }
        {fileAdded && (
          <PreviewBox>
            {previews}
            {files.length > 0 && submitButton}
          </PreviewBox>
        )}
      </DropzoneBox>
    );
  };
//-----------------------Thumbnail audio-------------------//

const getUploadParams1 = async ({ file, meta }) => {
  let newAId= assetID + "_thumb"
  setThumbnail(newAId)
  console.log(newAId,"new aid")
  const accessToken = await client.authentication.getAccessToken();
  const params = {
    text: "",
    assetID: newAId,
    assetType: meta.type,
  };
  const postMetaData = JSON.stringify(params);
  await client.reAuthenticate();
  const signedUrl = await client.service("get-signed-url").create({
    bucket: "yuser_uploads",
    assetId: params.assetID,
    type: params.assetType,
    postMetaData,
    appType: "web-app",
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

const handleChangeStatus1 = ({ meta, file }, status) => {
  if (status === "ready") {
    meta.status = "headers_received";
  }
  if (status === "done") {
  }
};
  const CustomLayout1 = ({
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }) => {
    const [dataC, setDataC] = useState(description);
    return (
      <DropzoneBox {...dropzoneProps}>
        {!imageAdded &&
          <>
          
            {input}
          </>
        }
        {imageAdded && (
          <>
          
          <PreviewBox>
            {previews}
            {files.length > 0 && submitButton}
          </PreviewBox>
          </>
        )}
      </DropzoneBox>
    );
  };

  const CustomInput1 = ({
    accept,
    onFiles,
    files,
    getFilesFromEvent,
    props,
  }) => {
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
      hiddenFileInput.current.click();
    };

    const handleChange = async (event) => {
      const target = event.target;
      const chosenFiles = await getFilesFromEvent(event);
      onFiles(chosenFiles);
      setImageAdded(true);
      target.value = null;
    };

    return (
      <Label onClick={handleClick}>
        {/*<Image height="100px" width="70px" layout="fixed" objectFit="contain" ImgUpload={ImgUpload} alt={"Icon"} />*/}
        <Icon  height="100px" width="70px" name={ImgUpload} />
        <Title>{"Drag and drop media, or Browse"}</Title>
        <TxtMain align={true}>
          {"1200x1200 or higher resolution recommended for visual media"}
        </TxtMain>
        <TxtMain>{"(Max 250MB)"}</TxtMain>
        <TxtMain solid={true}>
              {"High resolution images (png, jpg)"}
            </TxtMain>
        <Input
          accept={accept}
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Label>
    );
  };
  const CustomPreview1 = ({ meta, canCancel, fileWithMeta, submitButton }) => {
    const {
      percent = 0,
      size = 0,
      previewUrl,
      status,
      duration,
      validationError,
    } = meta;

    const { cancel, remove, restart, file } = fileWithMeta;
    let objUrl1 = URL.createObjectURL(file);
    const type = file.type;
    // const cancelUpload = () => {
    //   fileWithMeta.cancel();
    //   remove()
    //   setImageAdded(false)
    // };
    const cancelUpload = () => {
      fileWithMeta.cancel();
      router.reload();
    };
    return (
      <>
        {(type === "image/png" || type === "image/jpeg") && (
          <ImgPreview uriImage={previewUrl} />
        )}
        {(type === "audio/mp3" || type === "audio/mpeg") && (
          <div
            class="flexSectionBottom1"
            style={{
              overflow: "hidden",
              maxWidth: 320,
              maxHeight: 320,
              width: "100%",
              borderRadius: "50%",
            }}
          >
            <Image objectFit="cover" src={musicImage} />
          </div>
        )}
        {type === "video/mp4" && (
          <video width="300" controls height="200">
            <source src={objUrl1} type={type} />
            Your browser does not support HTML5 video.
          </video>
        )}

        {canCancel  && (
          <>
            <CustomPreviewBox>
              <ProgressBar
                max={100}
                value={status === "done" ? 100 : percent}
              />
              <BtnCancelUpload onClick={cancelUpload}>
                <Icon
                  strokeWidth="3"
                  height="auto"
                  width="15px"
                  name={Close}
                  strokeColor={COLORS.white}
                //strokeColor={({ theme }) => theme.iconColor.color}
                />
              </BtnCancelUpload>
            </CustomPreviewBox>
          </>
        )}
      </>
    );
  };
//-------------------------Thumbanil audio------------------------------//
  const CustomInput = ({
    accept,
    onFiles,
    files,
    getFilesFromEvent,
    props,
  }) => {
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
      hiddenFileInput.current.click();
    };

    const handleChange = async (event) => {
      const target = event.target;
      const chosenFiles = await getFilesFromEvent(event);
      onFiles(chosenFiles);
      setFileAdded(true);
      target.value = null;
    };

    return (
      <Label onClick={handleClick}>
        {/*<Image height="100px" width="70px" layout="fixed" objectFit="contain" ImgUpload={ImgUpload} alt={"Icon"} />*/}
        <Icon  height="100px" width="70px" name={ImgUpload} />
        <Title>{"Drag and drop media, or Browse"}</Title>
        <TxtMain align={true}>
          {"1200x1200 or higher resolution recommended for visual media"}
        </TxtMain>
        <TxtMain>{"Max 250MB"}</TxtMain>
        <FormatBox>
          <FormatSubBox>
            <TxtMain solid={true}>
              {"High resolution images (png, jpg)"}
            </TxtMain>
            <TxtMain solid={true}>{"Animated gifs (gif)"}</TxtMain>
          </FormatSubBox>
          <FormatSubBox>
            <TxtMain solid={true} right={true}>
              {"Video (mp4)"}
            </TxtMain>
            <TxtMain solid={true} right={true}>
              {"Audio (mp3, wave"}
            </TxtMain>
          </FormatSubBox>
        </FormatBox>
        <Input
          accept={accept}
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Label>
    );
  };

  const CustomPreview = ({ meta, canCancel, fileWithMeta, submitButton }) => {
    const {
      percent = 0,
      size = 0,
      previewUrl,
      status,
      duration,
      validationError,
    } = meta;

    const { cancel, remove, restart, file } = fileWithMeta;
    let objUrl1 = URL.createObjectURL(file);
    const type = file.type;
    const cancelUpload = () => {
       remove();
      setFileAdded(false)
   
    //console.log(status)
      //router.reload();
    };
    return (
      <>
        {(type === "image/png" || type === "image/jpeg"|| type === "image/gif") && (
          <ImgPreview uriImage={previewUrl} />
        )}
        {(type === "audio/mp3" || type === "audio/mpeg") && (
          <div
            class="flexSectionBottom1"
            style={{
              overflow: "hidden",
              maxWidth: 320,
              maxHeight: 320,
              width: "100%",
              borderRadius: "50%",
            }}
          >
            <Image objectFit="cover" src={musicImage} />
          </div>
        )}
        {type === "video/mp4" && (
          <video width="300" controls height="200">
            <source src={objUrl1} type={type} />
            Your browser does not support HTML5 video.
          </video>
        )}

        {canCancel && isUpload && (
          <>
            <CustomPreviewBox>
              <ProgressBar
                max={100}
                value={status === "done" ? 100 : percent}
              />
              { !disableRemove &&
                <BtnCancelUpload onClick={cancelUpload}>
                <Icon
                  strokeWidth="3"
                  height="auto"
                  width="15px"
                  name={Close}
                  strokeColor={COLORS.white}
                //strokeColor={({ theme }) => theme.iconColor.color}
                />
              </BtnCancelUpload>
              }
              
            </CustomPreviewBox>
          </>
        )}
      </>
    );
  };

  const ProgressBar = (props) => {
    const { value, max } = props;
    return (
      <ProgressBarContainer>
        <progress value={value} max={max} />
      </ProgressBarContainer>
    );
  };

  const CustomSubmitButton = (props) => {
    const { onSubmit, files, disabled } = props;
    // const _disabled =
    //   files.some((f) =>
    //     ["preparing", "getting_upload_params", "uploading","headers_received"].includes(
    //       f.meta.status
    //     )
    //   ) ||
    //   !files.some((f) => ["done"].includes(f.meta.status));
    //files.filter(f => ['headers_received'].includes(f.meta.status))}
    const handleCustomSubmit = () => {
      setDisableRemove(true)
      onSubmit(files);
      //setFormVisible(true);
      //setActivePost(true)
    };

    return (
      <div style={{ marginTop: SPACING.large }}>
        <Button
          text={"Start Upload"}
          onClick={handleCustomSubmit}
          color={COLORS.purple}
          colorText={COLORS.white}
          isIcon={false}
          width={"300px"}
          className={""}
          disabled={activePost && isUpload ? true : false}
        />
      </div>
    );
  };

  //-----------------------the "form" functions

  function toggleForm(value) {
    if (value) {
      setFormVisible(true);
      if (formVisible) {
        setPriceVisible(true);
      }
    } else {
      if (priceVisible) {
        setPriceVisible(false);
      } else if (formVisible) {
        setFormVisible(false);
      } else if (!priceVisible && !formVisible) {
        router.push({
          pathname: "/",
        });
      }
    }
  }

  const handleSwitchNFTChange = async (checkedNFT) => {
    setCheckedNFT(checkedNFT);
    setNFTpartVisible(!NFTpartVisible);
  };

  const handleSwitchContentChange = async (checkedContent) => {
    setCheckedContent(checkedContent);
    setSecretVisible(!secretVisible);
  };

  const onSecretChange = async (val) => {
    setSecret(val);
  };

  const onDescriptionChange = async (val) => {
    setDescription(val);
  };

  const onTitleChange = async (val) => {
    setTitle(val);
  };
  //For drag and drop
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };
  //------------------------------------------------------MENTIONS AND HASHTAGS-------------------------------------------------------------------//
  async function openMentionsModal() {
    if (!mentionsModal) {
      setHashtags([]);
      sethashTagModal(false);
      setDescription(description + " ");
      await rootstore.getMutualFollowers(true);
      setMntions(rootstore.mutualFollowers);
      setMentionsModal(true);
    } else {
      closeSuggestionsPanel();
    }
  }
  async function openSuggestionsPanel() {
    if (triggerIdentifier === "@") setMentionsModal(true);
    // setOverlayVisible(true)
  }

  async function closeSuggestionsPanel() {
    setMntions([]);
    setHashtags([]);
    sethashTagModal(false);
    setMentionsModal(false);
    setTextInputFocus(false);
    //setOverlayVisible(false)
    setTriggerIdentifier("");
  }

  //The useeffect to clear the modals
  useEffect(() => {
    if (description.length === 0 || description === " ") {
      //setOverlayVisible(false)
      setMntions([]);
      setMentionsModal(false);
    }
  }, [description]);
  useEffect(() => {
    if (mentions.length > 0) {
      setMentionsModal(true);
      sethashTagModal(false);
    } else if (hashtags.length > 0) {
      sethashTagModal(true);
      setMentionsModal(false);
    }
  }, [mentions, hashtags]);

  const onSuggestionTap = (item) => {
    stopTracking();

    const comment = description.slice(0, -keyword.length);
    if (triggerIdentifier == "@") {
      setDescription(comment + "@" + item.uname + " "); // pass changed text back
    } else if (triggerIdentifier == "#") {
      setDescription(comment + "#" + item + " "); // pass changed text back
    } else {
      if (item.uname) setDescription(description + "@" + item.uname + " ");
      else setDescription(description + "#" + item + " ");
    }
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
        } else if (keyword.charAt(0) == "#") {
          rootstore
            .getHashtagsSuggestions(keyword)
            .then((data) => {
              if (data) {
                setHashtags(data);
                setKeyword(keyword);
              } else {
                setHashtags([]);
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

  async function identifyKeyword(val, lastChar) {
    const boundary = "B";
    const pattern = new RegExp(
      `\\${boundary}${lastChar}[a-zA-Z0-9_-]+|\\${boundary}${lastChar}`,
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
    //openSuggestionsPanel(val);
  }
  async function stopTracking(val) {
    trackingStarted = false;
    closeSuggestionsPanel(val);
  }

  const onTextChange = async (val) => {
    setTextInput(val);
    let lastChar = val.substr(val.length - 1);
    const wordBoundry =
      triggerLocation === "anywhere" ? previousChar.trim().length === 0 : true;
    if (wordBoundry && (lastChar == "@" || lastChar == "#")) {
      setTriggerIdentifier(lastChar);
      startTracking();
      identifyKeyword(val, lastChar);
    } else if (trackingStarted && (lastChar === " " || val === "")) {
      stopTracking();
    }
    setDescription(val);
    previousChar = lastChar;
    identifyKeyword(val, triggerIdentifier);
  };

  const get5PopularHashtags = async () => {
    if (!hashTagModal) {
      setMntions([]);
      setMentionsModal(false);
      setDescription(description + " ");
      const tags = await rootstore.getHashtagsSuggestions("#");
      setHashtags(tags);
      sethashTagModal(true);
    } else {
      closeSuggestionsPanel();
    }
  };
  
  const closeModals = async () =>{
    if(hashTagModal || mentionsModal){
      closeSuggestionsPanel()
    }
  }

  const cancelCloseButton = !formVisible ? "Close" : "Cancel";
  const nextPublishButton =
    !formVisible || (formVisible && NFTpartVisible && !priceVisible)
      ? "Next"
      : "Publish Now";

  return (
    <MainContainer 
    onClick={() => { closeModals() }}>
      {
        step ===1 &&
        <MainBox>
        <ButtonsMenuColumn>
          <Button
            text={mobileSize ? "" : cancelCloseButton}
            onClick={() => toggleForm(false)}
            color={COLORS.blackMediumDark}
            isIcon={mobileSize ? true : false}
            width={"70%"}
            padding={true}
            className={"MarginRightLarge"}
            iconWidth={"20px"}
            strokeWidth={"2px"}
            iconName={Shopping}
          />
          <Button
            text={mobileSize ? "" : nextPublishButton}
            onClick={() => toggleForm(true)}
            color={COLORS.purple}
            isIcon={mobileSize ? true : false}
            width={"100%"}
            className={"FullWidth MarginRightLarge"}
            disabled={!formVisible ? true : false}
            padding={true}
            iconWidth={"20px"}
            strokeWidth={"2px"}
            iconName={Shopping}
          />
          <Button
            text={"Save as draft"}
            //onClick={draft}
            color={COLORS.blackMediumDark}
            isIcon={false}
            width={"100%"}
            padding={true}
          />
        </ButtonsMenuColumn>

        <LargeTitle>Start your post</LargeTitle>
        <WelcomeText>Post description</WelcomeText>
        <div style={{position: "relative"}}>
          <DescriptionInputBox
            type="text"
            placeholder="Write something witty..."
            value={description}
            //onChange={(event) => setDescription(event.target.value)}
            onChange={(event) => onTextChange(event.target.value)}
          />
          {mentionsModal && mentions.length !== 0 && (
              <MentionsComponent
                mentions={mentions}
                onSuggestionTap={onSuggestionTap}
                mainContainerHeight={mainContainerHeight}
                uploadingScreen={true}
              />
            )}
            {hashTagModal && hashtags.length !== 0 && (
              <HashtagSuggestions
                hashtags={hashtags}
                onSuggestionTap={onSuggestionTap}
                mainContainerHeight={mainContainerHeight}
                uploadingScreen={true}
              />
            )}
          </div>
        <MentionHashContainer>
          <Button
            text={"#Hashtags"}
            onClick={get5PopularHashtags}
            borderColor={({ theme }) => theme.borderColor.color}
            border={true}
            color={"transparent"}
            isIcon={false}
            width={"100%"}
            padding={true}
            colorText={({ theme }) => theme.textPrimary.color}
            className={"MarginRightMedium"}
          />
          <Button
            text={"@Friends"}
            onClick={openMentionsModal}
            borderColor={({ theme }) => theme.borderColor.color}
            border={true}
            color={"transparent"}
            isIcon={false}
            width={"100%"}
            padding={true}
            colorText={({ theme }) => theme.textPrimary.color}
          />
          
        </MentionHashContainer>

        {!formVisible ? (
          <Dropzone
            ref={dropzoneRef}
            LayoutComponent={CustomLayout}
            InputComponent={CustomInput}
            PreviewComponent={CustomPreview}
            SubmitButtonComponent={CustomSubmitButton}
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="image/png,image/jpeg,image/gif,audio/mp3,audio/mpeg,video/mp4"
            maxFiles={1}
            maxSizeBytes={250*1024*1024}
            multiple={false}
            canCancel={true}
            canRemove={true}
            autoUpload={false}
            getFilesFromEvent={getFilesFromEvent}
          />
        ) : (
          <>
            {!priceVisible ? (
              <Container>
                <LargeTitle>Complete your post</LargeTitle>
                <SubBox>
                  <WelcomeText>{"Mint as NFT?"}</WelcomeText>
                  {/* <Switch
									onChange={handleSwitchNFTChange}
									checked={checkedNFT}
									uncheckedIcon={false}
									checkedIcon={false}
									offColor={'#2f3d57'}   //Only accepts hex-colors , no props to set border
									onColor={'#618DC9'}
									offHandleColor={'#DC3BC3'}
									onHandleColor={'#DC3BC3'}
									width={60}
									height={30}
									handleDiameter={26}
								/> */}
                </SubBox>
                <TxtMain>
                  {
                    "Mint your media content as an NFT and sell it on the REBL NFT Marketplace.Minting your post as an NFT requires Metamask and will require tokens."
                  }
                </TxtMain>
                {NFTpartVisible && (
                  <>
                    <WelcomeText>{"Title"}</WelcomeText>
                    <TitleInputBox
                      type="text"
                      placeholder="Add title..."
                      value={title}
                      onChange={(event) => onTitleChange(event.target.value)}
                    />
                    <WelcomeText>{"NFT description"}</WelcomeText>
                    <DescriptionInputBox
                      type="text"
                      placeholder="Write something witty..."
                      value={description}
                      onChange={(event) =>
                        onDescriptionChange(event.target.value)
                      }
                    />
                    <SubBox between={true}>
                      <FormatSubBox>
                        <WelcomeText>{"Properties"}</WelcomeText>
                        <TxtMain>
                          {
                            "Properties are text traits that show up as rectangles."
                          }
                        </TxtMain>
                      </FormatSubBox>
                      <AddBox
                        onClick={() => setPropertyVisible(!propertyVisible)}
                      >
                        <Icon height="30px" width="auto" name={Add} />
                      </AddBox>
                    </SubBox>
                    {propertyVisible && (
                      <PropertyList>
                        {propertyItems.map((property, index) => (
                          <ItemContainer key={index}>
                            <WelcomeText property={true}>{"Hair"}</WelcomeText>
                            <TxtMain property={true}>{"20% have this"}</TxtMain>
                          </ItemContainer>
                        ))}
                      </PropertyList>
                    )}
                    <SubBox>
                      <FormatSubBox>
                        <WelcomeText>{"Levels"}</WelcomeText>
                        <TxtMain>
                          {
                            "Levels are numerical traits that show as progress bars."
                          }
                        </TxtMain>
                      </FormatSubBox>
                      <AddBox>
                        <Icon height="30px" width="auto" name={Add} />
                      </AddBox>
                    </SubBox>
                    <SubBox>
                      <FormatSubBox>
                        <WelcomeText>{"Stats"}</WelcomeText>
                        <TxtMain>
                          {
                            "Stats are numerical traits that show up as numbers."
                          }
                        </TxtMain>
                      </FormatSubBox>
                      <AddBox>
                        <Icon height="30px" width="auto" name={Add} />
                      </AddBox>
                    </SubBox>
                    <SubBox>
                      <FormatSubBox>
                        <WelcomeText>{"Unblockable content"}</WelcomeText>
                        <TxtMain>
                          {
                            "Include locable content that is only viewable to the owner."
                          }
                        </TxtMain>
                      </FormatSubBox>
                      <Switch
                        onChange={handleSwitchContentChange}
                        checked={checkedContent}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        offColor={"#2f3d57"} //Only accepts hex-colors
                        onColor={"#618DC9"}
                        offHandleColor={"#DC3BC3"}
                        onHandleColor={"#DC3BC3"}
                        width={60}
                        height={30}
                        handleDiameter={26}
                      />
                    </SubBox>
                    {secretVisible && (
                      <FormatSubBox>
                        <DescriptionInputBox
                          type="text"
                          placeholder="Add a secret description..."
                          value={secret}
                          onChange={(event) =>
                            onSecretChange(event.target.value)
                          }
                        />
                        <TxtMain>
                          {"A secret can contain any text or url"}
                        </TxtMain>
                      </FormatSubBox>
                    )}
                  </>
                )}
              </Container>
            ) : (
              <PriceBox uploadingPage={true} />
            )}
          </>
        )}
      </MainBox>
      }
      {/* -------------------------ONLY FOR AUDIO UPLOADS --------------------------------------------*/ }
      {
        step === 2 &&
        // <Dropzone
        //     ref={dropzoneRef1}
        //     LayoutComponent={CustomLayout1}
        //     InputComponent={CustomInput1}
        //     PreviewComponent={CustomPreview1}
        //     //SubmitButtonComponent={CustomSubmitButton}
        //     getUploadParams={getUploadParams1}
        //     onChangeStatus={handleChangeStatus1}
        //     //onSubmit={handleSubmit}
        //     accept="image/*"
        //     maxFiles={1}
        //     multiple={false}
        //     canCancel={true}
        //     autoUpload={true}
        //     getFilesFromEvent={getFilesFromEvent}
        //   />

        <MainBox>
          <LargeTitle>Create a Post</LargeTitle>
           <SubTitle>Add a thumbnail for the audio file</SubTitle>
        <Dropzone
        getUploadParams={getUploadParams1}
        onChangeStatus={handleChangeStatus1}
        PreviewComponent={CustomPreview1}
        LayoutComponent={CustomLayout1}
        InputComponent={CustomInput1}
        accept="image/*"
        canCancel={true}
        maxFiles={1}
      />
      </MainBox>

      }
      
      {/*<ButtonsMenuRow style={{ justifyContent: "center" }}>
       <SubMenu>
          <Button
            text={cancelCloseButton}
            onClick={() => toggleForm(false)}
            color={COLORS.blackMediumDark}
            colorText={COLORS.white}
            isIcon={false}
            width={"70%"}
            padding={true}
          />
          <Button
            text={"Save as draft"}
            //onClick={draft}
            color={COLORS.blackMediumDark}
            colorText={COLORS.white}
            isIcon={false}
            width={"100%"}
            padding={true}
            disabled={true}
          />
        </SubMenu> */}
      {/* <Button
					text={"create post"}
					onClick={handleContinue}
					color={COLORS.purple}
          colorText={COLORS.white}
					isIcon={false}
					width={"100%"}
					className={"FullWidth"}
					//disabled={!formVisible ? true : false}
				/>
        <Button
          text={"Post"}
          onClick={handleContinue}
          color={COLORS.purple}
          colorText={COLORS.white}
          isIcon={false}
          width={"100%"}
          className={"FullWidth"}
          disabled={!activePost ? true : false}
        />
      </ButtonsMenuRow> */}
      <Wrapper>
      <Button
            text={"Back"}
            onClick={() =>router.reload()}
            color={COLORS.blackMediumDark}
            isIcon={false}
            width={"70%"}
            padding={true}
            disabled={step ===2 ? false : true}
          />
          <div style={{height:SPACING.medium}}></div>
        <Button
          text={"Post"}
          onClick={handleContinue}
          color={COLORS.purple}
          isIcon={false}
          className={"FullWidth"}
          disabled={!activePost ? true : false}
        />
      </Wrapper>
    </MainContainer>
  );
}