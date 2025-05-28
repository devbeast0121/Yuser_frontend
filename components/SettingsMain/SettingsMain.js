import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Title,
  MainContainer,
  SettingBox,
  SubBox,
  Text,
  WelcomeText,
  TitleInputBox,
  DescriptionInputBox,
  FormatSubBox,
  TxtMain,
  ContainerAvatarLayout,
  Label,
  Input,
  Container,
  FormatBox,
  ImgPreview,
  PreviewContainer,
  UsernameWrapper,
  BioWrapper,
} from "./SettingsMain.elements";
import Button from "../Button/Button";
import Switch from "react-switch";
import { signOut, useSession } from "next-auth/client";
import Logout from "../../public/icons/logout.svg";
import client from "../../pages/api/client";
import { ThemeContext } from "../../pages/_app";
import { SPACING, COLORS } from "../../styles/Styling.js";
import Image from "next/image";
import ImgUpload from "../../public/images/uploadImage.png";
import { useStore } from "../../stores/RootStore";
import { inject, observer } from "mobx-react";
import CropperImageComponent from "../CropperImageComponent/CropperImageComponent";
import { CookieStorage } from "cookie-storage";
import { useTheme } from "styled-components";

export default inject("store")(
  observer(function SettingsMain(props) {
    const cookieStorage = new CookieStorage();
    const [session, loading] = useSession();
    const rootstore = useStore();
    const [username, setUsername] = useState("");
    const [originalUsername, setOriginalUsername] = useState("");
    const [bio, setBio] = useState("");
    const [originalBio, setOriginalBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const [featuredPhoto, setFeaturedPhoto] = useState("");
    //const [unlockableContent, setUnlockableContent] = useState(false);
    const hiddenAvatarInput = useRef(null);
    const hiddenFileInput = useRef(null);
    const [previewImage, setPreviewImage] = useState("");
    const [previewImageSelected, setPreviewImageSelected] = useState(false);
    const [previewType, setPreviewType] = useState("");
    const theme = useTheme();
    const [switchTheme, setSwitchTheme] = useState(
      theme.name === "dark" ? true : false
    );

    const handleSwitchTheme = async (switchTheme) => {
      setSwitchTheme(switchTheme);
      if (theme.name === "dark" && window !== undefined) {
        await client.reAuthenticate();
        await client
          .service("user-theme")
          .update(null, { userId: props.session.user._id, theme: "light" });
        window.location.reload();
      } else if (theme.name === "light" && window !== undefined) {
        await client.reAuthenticate();
        await client
          .service("user-theme")
          .update(null, { userId: props.session.user._id, theme: "dark" });
        window.location.reload();
      }
    };
    const [imageType, setImageType] = useState(null);

    /* const handleSwitchUnlockableContent = (unlockableContent) => {
             setUnlockableContent(unlockableContent);
         } */

    const logOut = () => {
      client.logout();
      localStorage.removeItem("feathers-jwt"); //To remove the stored jwt token
      cookieStorage.clear();
      signOut({ callbackUrl: "/" });
    };

    useEffect(() => {
      async function doEffect() {
        if (session) {
          const user = await rootstore.getAuthUser();
          setUsername(user.uname);
          setOriginalUsername(user.uname);
          setBio(user.bio);
          setOriginalBio(user.bio);
          setAvatar(user.avatar);
          setFeaturedPhoto(user.featuredPhoto);
        }
      }
      doEffect();
    }, [session, rootstore]);

    async function updateBio() {
      try {
        //add any changes to the query
        let editProfileObject = {};
        if (bio == originalBio || bio == "") {
          props.showAppMessage(
            true,
            "inform",
            "Change your bio before saving."
          );
        } else {
          editProfileObject.bio = bio;
          props.showAppMessage(
            true,
            "success",
            "Your changes have been saved."
          );
          setOriginalBio(bio);
        }
        await rootstore.editProfile(editProfileObject, true);
      } catch (error) {
        console.log(error);
        props.showAppMessage(true, "error", error.message);
      }
    }

    async function updateUsername() {
      //add any changes to the query
      let editProfileObject = {};
      if (username == originalUsername || username == "") {
        props.showAppMessage(true, "inform", "Change your name before saving.");
      } else {
        editProfileObject.username = username;
        await rootstore
          .editProfile(editProfileObject, true)
          .then(() => {
            props.showAppMessage(
              true,
              "success",
              "Your changes have been saved."
            );
            setOriginalUsername(username);
          })
          .catch((error) => {
            console.log(error);
            props.showAppMessage(true, "error", error.message);
          });
      }
    }

    const handleClickImage = (type) => {
      hiddenAvatarInput.current.click();
      setPreviewType(type);
    };

    const handleChangeImage = async (e) => {
      if (e.target.files[0]) {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        setPreviewImageSelected(true);
      }
    };

    // called every time a file's `status` changes
    const handleChangeAvatarStatus = (fileWithMeta, status) => {
      const { meta, file } = fileWithMeta;
      //console.log(status, meta, file)
      if (status === "ready") {
        meta.status = "headers_received";
        fileWithMeta.restart();
      } else if (status === "done") {
        let url = `https://yuser.imgix.net/${avatarID}`;
        setAvatar(url);
        setUploadingAvatar(false);
      }
    };

    const CustomAvatarLayout = ({ input, dropzoneProps }) => {
      return (
        <ContainerAvatarLayout {...dropzoneProps}>
          {input}
        </ContainerAvatarLayout>
      );
    };

    const CustomAvatarInput = ({
      accept,
      onFiles,
      files,
      getFilesFromEvent,
      props,
    }) => {
      const hiddenAvatarInput = React.useRef(null);

      const handleClickAvatar = (e) => {
        hiddenAvatarInput.current.click();
      };

      const handleChangeAvatar = async (e) => {
        if (e.target.files[0]) {
          setPreviewImage(URL.createObjectURL(e.target.files[0]));
          setPreviewImageSelected(true);
          setPreviewType("avatar");
          const target = e.target;
          const chosenFiles = getFilesFromEvent(e);
          onFiles(chosenFiles);
          target.value = null;
        }
      };

      return (
        <Label
          style={{ paddingTop: 0 }}
          onClick={handleClickAvatar}
          className="Flex"
        >
          <Image
            height="70px"
            width="56px"
            layout="fixed"
            objectFit="contain"
            src={ImgUpload}
            alt={"Icon"}
          />
          <TxtMain
            style={{
              textAlign: "center",
              paddingLeft: SPACING.large,
              paddingRight: SPACING.large,
              fontSize: 15,
              paddingTop: SPACING.small,
            }}
          >
            {"Drag and drop media, or Browse"}
          </TxtMain>
          <Input
            accept={accept}
            type="file"
            ref={hiddenAvatarInput}
            onChange={handleChangeAvatar}
            style={{ display: "none" }}
          />
          {avatar !== "" ? (
            <PreviewContainer avatar={true}>
              <ImgPreview
                avatar={true}
                src={avatarImage}
                alt="Content image/video/audio"
              />
            </PreviewContainer>
          ) : null}
        </Label>
      );
    };

    ///------------------------------------------ end  avatar photo dropzone customization

    ///------------------------------------------ start featured photo dropzone customization

    //specify upload params and url for your files

    const getUploadFeaturedParams = async ({ file, meta }) => {
      setUploadingBanner(true);
      const accessToken = await client.authentication.getAccessToken();
      const params = {
        text: "Collection Banner",
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

    /*const handleChangeFeaturedStatus = (fileWithMeta, status) => {
      let { meta, file } = fileWithMeta;
      //console.log(status, meta, file)
      if (status === "ready") {
        meta.status = "headers_received";
        fileWithMeta.restart();
      }
      if (status === "done") {
        let url = `https://yuser.imgix.net/${assetID}`;
        setBanner(url);
        setUploadingBanner(false);
      }
    };

    const CustomFeaturedLayout = ({ input, dropzoneProps }) => {
      return <DropzoneBox {...dropzoneProps}>{input}</DropzoneBox>;
    };

    const CustomFeaturedInput = ({
      accept,
      onFiles,
      files,
      getFilesFromEvent,
      props,
    }) => {
      const hiddenFileInput = React.useRef(null);

      const handleClick = (e) => {
        hiddenFileInput.current.click();
      };

      const handleChange = async (e) => {
        if (e.target.files[0]) {
          setPreviewImage(URL.createObjectURL(e.target.files[0]));
          setPreviewImageSelected(true);
          setPreviewType("featured");
          const target = e.target;
          const chosenFiles = getFilesFromEvent(e);
          onFiles(chosenFiles);
          target.value = null;
        }
      };
      return (
        <Label onClick={handleClick} className="Flex">
          <Image
            height="100px"
            width="80px"
            layout="fixed"
            objectFit="contain"
            src={ImgUpload}
            alt={"uploading"}
          />
          <Title>{"Drag and drop media, or Browse"}</Title>
          <TxtMain align={true}>
            {"1200x1200 or higher resolution recommended for visual media"}
          </TxtMain>
          <TxtMain>{"Max 250MB"}</TxtMain>
          <FormatBox className="Flex">
            <TxtMain style={{ marginLeft: 70 }} solid={true}>
              {"High resolution images (png, jpg)"}
            </TxtMain>
            <TxtMain style={{ marginRight: 150 }} solid={true}>
              {"Animated gifs (gif)"}
            </TxtMain>
          </FormatBox>
          <Input
            accept={accept}
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
          {featuredPhoto !== "" ? (
            <PreviewContainer>
              <ImgPreview
                src={featuredPhotoImage}
                alt="Content image/video/audio"
                className="Flex"
              />
            </PreviewContainer>
          ) : null}
        </Label>
      );
    }; */

    //-----------------
    const iconColor = ({ theme }) => theme.iconColor.color;
    const avatarImage =
      avatar !== null && avatar.startsWith("blob")
        ? avatar
        : `https://yuser.imgix.net/${avatar}`;
    const featuredPhotoImage = !featuredPhoto
      ? ""
      : featuredPhoto.startsWith("blob")
      ? featuredPhoto
      : `https://yuser.imgix.net/${featuredPhoto}`;

    return (
      <MainContainer className="Flex">
        <Title>{"Settings"}</Title>
        <WelcomeText>{"Update username"}</WelcomeText>
        <UsernameWrapper className="Flex">
          <TitleInputBox
            type="text"
            //placeholder={username}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="Flex"
          />
          <Button
            text={"Save"}
            onClick={() => updateUsername()}
            isIcon={false}
            width={"80px"}
            color={"transparent"}
            border={true}
            borderColor={COLORS.purple}
            padding={true}
            colorText={({ theme }) => theme.textPrimary.color}
          />
        </UsernameWrapper>
        <TxtMain>{"Tap save to accept your username change"}</TxtMain>
        <WelcomeText style={{ marginTop: SPACING.medium }}>
          {bio !== "" ? "Update bio" : "Bio"}
        </WelcomeText>
        <BioWrapper className="Flex">
          <DescriptionInputBox
            type="text"
            placeholder={bio !== "" ? "" : "Add a bio"}
            value={bio !== "" ? bio : ""}
            onChange={(e) => setBio(e.target.value)}
            className="Flex"
          />
          <div style={{marginBottom: SPACING.medium}}>
            <Button
              text={"Save"}
              onClick={() => updateBio()}
              isIcon={false}
              width={"80px"}
              color={"transparent"}
              border={true}
              borderColor={COLORS.purple}
              padding={true}
              colorText={({ theme }) => theme.textPrimary.color}
              className={"MarginBottomMedium"}
            />
          </div>
        </BioWrapper>
        <TxtMain>{"Tap save to accept your username change"}</TxtMain>
        <SubBox
          between={true}
          style={{ marginTop: SPACING.medium }}
          className="Flex"
        >
          <FormatSubBox style={{ alignSelf: "flex-start" }} className="Flex">
            <WelcomeText>{"Avatar"}</WelcomeText>
            <TxtMain>{"Upload the avatar"}</TxtMain>
          </FormatSubBox>
          <ContainerAvatarLayout>
            <Label
              style={{ paddingTop: 0 }}
              onClick={() => handleClickImage("avatar")}
              className="Flex"
            >
              <Image
                height="70px"
                width="56px"
                layout="fixed"
                objectFit="contain"
                src={ImgUpload}
                alt={"Icon"}
              />
              <TxtMain
                style={{
                  textAlign: "center",
                  paddingLeft: SPACING.large,
                  paddingRight: SPACING.large,
                  fontSize: 15,
                  paddingTop: SPACING.small,
                }}
              >
                {"Drag and drop media, or Browse"}
              </TxtMain>
              <Input
                type="file"
                ref={hiddenAvatarInput}
                onChange={handleChangeImage}
                style={{ display: "none" }}
                accept={"image/png, image/jpeg"}
              />
              {avatar !== "" ? (
                <PreviewContainer avatar={true}>
                  <ImgPreview
                    avatar={true}
                    src={avatarImage}
                    alt="Content image/video/audio"
                    className="Flex"
                  />
                </PreviewContainer>
              ) : null}
            </Label>
          </ContainerAvatarLayout>
        </SubBox>
        <WelcomeText>{"Featured photo"}</WelcomeText>
        <TxtMain>{"Upload the featured photo"}</TxtMain>
        <Container className="Flex">
          <Label onClick={() => handleClickImage("featured")} className="Flex">
            <Image
              height="100px"
              width="80px"
              layout="fixed"
              objectFit="contain"
              src={ImgUpload}
              alt={"uploading"}
            />
            <Title>{"Drag and drop media, or Browse"}</Title>
            <TxtMain align={true}>
              {"1200x1200 or higher resolution recommended for visual media"}
            </TxtMain>
            <TxtMain>{"Max 250MB"}</TxtMain>
            <FormatBox className="Flex">
              <TxtMain style={{ marginLeft: 70 }} solid={true}>
                {"High resolution images (png, jpg)"}
              </TxtMain>
              <TxtMain style={{ marginRight: 150 }} solid={true}>
                {"Animated gifs (gif)"}
              </TxtMain>
            </FormatBox>
            <Input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChangeImage}
              style={{ display: "none" }}
              accept={"image/png, image/jpeg"}
            />
            {featuredPhoto ? (
              <PreviewContainer>
                <ImgPreview
                  src={featuredPhotoImage}
                  alt="Content image/video/audio"
                  className="Flex"
                />
              </PreviewContainer>
            ) : null}
          </Label>
        </Container>

        {/*}
            <SettingBox row={true} className="Flex">
                <div className="flex" style={{flexdirection: "column"}}>
                    <Text title={true}>{"Unlocable content"}</Text>
                    <Text>{"Include locable content that is only viewable to the owner"}</Text>
                </div>
                <Switch
                    onChange={handleSwitchUnlockableContent}
                    checked={unlockableContent}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    offColor={'#2f3d57'}   //Only accepts hex-colors , no props to set border
                    onColor={'#618DC9'}
                    offHandleColor={'#DC3BC3'}
                    onHandleColor={'#DC3BC3'}
                    width={60}
                    height={30}
                    handleDiameter={26}
                />
            </SettingBox>
    */}
                <SettingBox row={true}>
                    <SubBox>
                        <Text titlePosition={true}>{theme.name[0].toUpperCase() + theme.name.substring(1) + " theme"}</Text>
                    </SubBox>
                    <Switch
                        onChange={handleSwitchTheme}
                        checked={switchTheme}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        offColor={"#d6d4d4"}   //Only accepts hex-colors , no props to set border
                        onColor={'#252e42'}
                        offHandleColor={'#DC3BC3'}
                        onHandleColor={'#DC3BC3'}
                        width={60}
                        height={30}
                        handleDiameter={26}
                    />
                </SettingBox>
                <SettingBox row={true}>
                    <FormatSubBox>
                        <Text titlePosition={true}>{"Logout"}</Text>
                        <Text>{"Logout of REBL by tapping on the logout button."}</Text>
                    </FormatSubBox>
                    <Button
                        text={"Logout"}
                        onClick={logOut}
                        isIcon={true}
                        iconName={Logout}
                        width={120}
                        color={"transparent"}
                        border={true}
                        borderColor={COLORS.purple}
                        padding={true}
                        size={"medium"}
                        strokeWidth={"2"}
                        strokeColor={iconColor}
                        colorText={({ theme }) => theme.textPrimary.color}
                    />
                </SettingBox>
                {previewImageSelected &&
                    <CropperImageComponent
                        previewImage={previewImage}
                        setPreviewImage={setPreviewImage}
                        setPreviewImageSelected={setPreviewImageSelected}
                        previewType={previewType}
                        setAvatar={setAvatar}
                        setFeaturedPhoto={setFeaturedPhoto}
                    />
                }
            </MainContainer>
        )
    })
);
