import React, { useState, useEffect, useRef } from "react";
import {
  FeaturedPhotoBox,
  ProfileBox,
  ProfileTopMenu,
  NameBioBox,
  UserName,
  StatsInfo,
  Stats,
  StatsValue,
  Title,
  LinearGradient,
  TruncateBox,
  FeaturedImage,
  FeaturedImageDiv,
  BtnWrapper,
  AvatarWrapper
} from "./ProfileInfoBox.elements";
import Avatar from ".././Avatar/Avatar";
import { ImageUrl, AvatarUrl } from "../../stores/tools.js";
import ButtonFollow from ".././ButtonFollow/ButtonFollow";
import { inject, observer } from "mobx-react";
import { useSession } from "next-auth/client";
import { useStore } from "../../stores/RootStore";
import gemBadge from "../../public/icons/gemBadge.svg";
import Share from "../../public/icons/Share2D.svg";
import Icon from ".././Icon/Icon";
import { COLORS, SPACING } from "../../styles/Styling";
import Chat from "../../public/icons/chat.svg";
import { ChatModal } from "..";
import Modal from "react-overlays/Modal";
import styled from "styled-components";
import MenuComponent from "../OptionsMenu/MenuComponent";
import FolloweFollowingList from "../FollowerFollowingList/FolloweFollowingList";
import OptionsMenuIcon from '../../public/icons/menu.svg';
import client from "../../pages/api/client";
import { AnimatePresence, motion } from "framer-motion";
import useOnClickOutside from '../../Hooks/useOnClickOutside';

export default inject("store")(
  observer(function ProfileInfoBox(props) {
    const [textFullVisible, setTextFullVisible] = useState(false);
    const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);
    const [modifiableUser, setModifiableUser] = useState(null);
    const [session, loading] = useSession();
    const rootstore = useStore();
    const [ownsNextGem, setOwnsNextGem] = useState(false);
    const [openChatModal, setOpenChatModal] = useState(false);
    const [openFFList, setOpenFFList] = useState(false);
    const [listType, setListType] = useState("")
    const [appMessageIsVisible, setAppMessageIsVisible] = useState(false)
    const renderBackdrop = (props) => <Backdrop {...props} />;
    const optionsSubMenuRef = useRef(null);

    const [loggedInUser, setLoggedInUser] = useState(null);
    if (!props?.user?._id && props?.user?.id) {
      props.user._id = props.user.id;
    }

    /*  avatar: "rilplPS3nKfcecJnoSy3A"
        bio: "Hey now, what’s up, yo yo 😝😏🥰🙃😗😏😏😏😛😝😗😗😗😗😗 what"
        createdAt: 1533664419317
        experience: 5222
        featuredPhoto: "Sy9VZO3DX"
        firstName: "Tom"
        gems: 48510
        id: "5b69dca3e4a2d7748242b41d"
        inviteCode: "Q553R9W5LE"
        lastLogin: 1631478655094
        lastLoginStr: "1602777644019"
        lastName: "Cermak"
        lastRefill: 1631474112411
        level: 4
        numFollowers: 68
        numFollowing: 48
        phoneNum: "15198600159"
        postsCount: 122
        stones: 49720
        uname: "tomss"
        unamerevised: "tomss"
  */

    const toggleFullText = () => {
      setTextFullVisible(!textFullVisible);
    };

    useEffect(async () => {
      if (props && props.user) {
        setOwnsNextGem(await rootstore.ownsNextGem(props?.user?.uname));
      }
    }, []);
    useEffect(() => {
      if (props && props.user) {
        setModifiableUser(props.user);
      }
    }, [props, props.user]);

    async function openPrivateChatWindow(user) {
      let userId = user?._id ? user._id : user.id;
      await rootstore.joinPrivateChat(userId);
      setOpenChatModal(true);
    }

    function updateUserObject(role, value) {
      let tempUserObject = modifiableUser;
      tempUserObject[role] = value;
      setOptionsMenuVisible(false);
      setModifiableUser(tempUserObject);
    }

    async function openFollowingFollowerList(listName) {
      console.log("clicked follower following")
      setListType(listName)
      setOpenFFList(true)
    }


    //Adds a role to a user
    //role: A string containing the role name, e.g. the creator role would be isCreator
    async function grantRole(role) {
      let userId = props?.user?._id;
      if (!userId || !role) {
        props.showAppMessage(true, "error", `An error was encountered when trying to grant user role`)
        rootstore.errMessage = "An error was encountered when trying to grant user role";
        return;
      }

      try {
        await rootstore.grantUserRole(userId, role);
        if (props.updateUser) {
          props.updateUser(role, true);
        }
        updateUserObject(role, true)
        props.showAppMessage(true, "success", `Successfully added role: ${role} to user: ${props.user.uname}`)
        rootstore.successMessage = `Successfully added role: ${role} to user: ${props.user.uname}`;
      } catch (err) {
        props.showAppMessage(true, "error", "There was an error when granting role to the user.")
        rootstore.errMessage = "There was an error when granting role to the user."
        return;
      }
    }


    //Removes a role from a user
    //role: A string containing the role name, e.g. the creator role would be isCreator
    async function revokeRole(role) {
      let userId = props?.user?._id;
      if (!userId || !role) {
        props.showAppMessage(true, "error", `An error was encountered when trying to remove role from user`)
        rootstore.errMessage = "An error was encountered when trying to remove role from user";
        return;
      }


      try {
        await rootstore.removeRoleFromUser(userId, role);
        if (props.updateUser) {
          props.updateUser(role, false);
        }
        updateUserObject(role, false)
        props.showAppMessage(true, "success", `Successfully removed role: ${role} from user: ${props.user.uname}`)
        rootstore.successMessage = `Successfully removed role: ${role} from user: ${props.user.uname}`;
      } catch (err) {
        props.showAppMessage(true, "error", `There was an error when removing role from the user`)
        rootstore.errMessage = "There was an error when removing role from the user";
      }
    }

    //Bans the selected user
    async function banUser() {
      rootstore.showBanOverlay = true;
      props.menuVisible && props.menuVisible(false);
      props.showAppMessage(true, "inform", `The user is banned.`)
      return
    }

    async function hideUser(hideUser) {
      let userId = props?.user?._id;
      if (!userId) {
        props.showAppMessage(true, "error", `No userId found`)
        rootstore.errMessage = "No userId found";
        props.menuVisible && props.menuVisible(false);
        return;
      }
      try {
        await rootstore.hideContent(userId, "user", hideUser);
        props.menuVisible && props.menuVisible(false);
        props.showAppMessage(true, "success", `User: ${props.user.uname} has been ${hideUser ? "hidden" : "unhidden"}`)
        rootstore.successMessage = `User: ${props.user.uname} has been ${hideUser ? "hidden" : "unhidden"}`
        if (props.updateUser) {
          props.updateUser("isHidden", hideUser);
        }

      } catch (err) {
        props.menuVisible && props.menuVisible(false);
      }
    }

    useEffect(() => {
      if (session) {
        setLoggedInUser(session.user);
      }
      else {
        console.log("no Session found");
      }
    }, [loggedInUser])


    const shareProfile = async () => {
      const deepLink = await client.service('deep-links').create({
        user: {
          username: props?.user?.uname
        }
      })

      setAppMessageIsVisible(true)
      // console.log(deepLink)
      navigator.clipboard.writeText(deepLink)
      setTimeout(() => setAppMessageIsVisible(false), 3000);
    }

    const toggleSubMenu = async () => {
      setOptionsMenuVisible(!optionsMenuVisible)
      if (optionsMenuVisible) {
        useOnClickOutside(optionsSubMenuRef, closeSubMenu)
      }
    }

    const closeSubMenu = async () => {
      setOptionsMenuVisible(false)
    }

    return (
      <>
        <FeaturedPhotoBox>
          {props?.user?.featuredPhoto ?
            <>
              <FeaturedImage
                src={ImageUrl(props.user.featuredPhoto)} />
              {/*<LinearGradient />*/}
            </>
            :
            <FeaturedImageDiv />
          }
        </FeaturedPhotoBox>
        <ProfileBox>
          <ProfileTopMenu>
            <AvatarWrapper>
              <Avatar
                src={AvatarUrl(props?.user?.avatar, "l")}
                size={"large"}
                alt={"Avatar"}
                frame={true}
                edit={false}
                userName={props?.user?.uname}
                nft={ownsNextGem}
              />
            </AvatarWrapper>
            <div style={{ marginTop: SPACING.medium }}>
              <ButtonFollow
                userId={props?.user?._id || props?.user?.id}
                border={false}
                colored={true}
              />
            </div>
            {props?.user && session?.user?._id !== props?.user?._id ? (
              <BtnWrapper onClick={() => openPrivateChatWindow(props?.user)} >
                <Icon
                  height="24px"
                  width="auto"
                  name={Chat}
                  strokeColor={props?.user?.featuredPhoto ? COLORS.white : ({ theme }) => theme.iconColor.color}
                  strokeWidth="2"
                />
              </BtnWrapper>)
              :
              (<BtnWrapper onClick={() => shareProfile()} >
                <Icon
                  height="24px"
                  width="auto"
                  name={Share}
                  color={({ theme }) => theme.iconColor.color}
                />
              </BtnWrapper>
              )}
            {props?.user && session?.user?._id !== props?.user?._id &&
              <>
                <BtnWrapper
                  onClick={toggleSubMenu}
                  authProfile={props?.user?.uname === session?.user?.uname ? true : false}
                >
                  <Icon
                    width="auto"
                    height="24px"
                    name={OptionsMenuIcon}
                    strokeColor={({ theme }) => theme.iconColor.color}
                    strokeWidth="3"
                  />
                </BtnWrapper>

                {optionsMenuVisible &&
                  <MenuComponent
                    ref={optionsSubMenuRef}
                    setOptionsMenuVisible={setOptionsMenuVisible}
                    optionsMenuVisible={optionsMenuVisible}
                    user={modifiableUser}
                    updateUser={updateUserObject}
                    key={modifiableUser}
                    profilePage={true}
                    grantRole={grantRole}
                    revokeRole={revokeRole}
                    banUser={banUser}
                    hideUser={hideUser}
                    shareProfile={shareProfile}
                    session={session}
                  />
                }
              </>
            }
          </ProfileTopMenu>
          <NameBioBox>
            <UserName featuredPhoto={props?.user?.featuredPhoto}>{props?.user?.uname}</UserName>
            <TruncateBox
              className={
                textFullVisible
                  ? "truncate-bio-full"
                  : "truncate-bio-3-lines"
              }
              onClick={toggleFullText}
            >
              {props?.user?.bio}
            </TruncateBox>
          </NameBioBox>
          <StatsInfo>
            <Stats>
              <StatsValue
                featuredPhoto={props?.user?.featuredPhoto}
                style={{ cursor: "pointer" }}
                onClick={() => { openFollowingFollowerList("FOLLOWING") }}
              >{props?.user?.numFollowing}</StatsValue>
              <Title featuredPhoto={props?.user?.featuredPhoto}>{"FOLLOWING"}</Title>
            </Stats>
            <Stats>
              <StatsValue
                featuredPhoto={props?.user?.featuredPhoto}
              >{props?.user?.postsCount}</StatsValue>
              <Title featuredPhoto={props?.user?.featuredPhoto}>{"POSTS"}</Title>
            </Stats>
            <Stats>
              <StatsValue
                featuredPhoto={props?.user?.featuredPhoto}
                onClick={() => { openFollowingFollowerList("FOLLOWERS") }}
                style={{ cursor: "pointer" }}
              >{props?.user?.numFollowers}</StatsValue>
              <Title featuredPhoto={props?.user?.featuredPhoto}>{"FOLLOWERS"}</Title>
            </Stats>
            {true && //ownsNextGem && (
              <Stats>
                <Icon width="auto" height="50px" name={gemBadge} />
              </Stats>
            }
          </StatsInfo>
        </ProfileBox>
        {openChatModal && (
          <Modal
            show={openChatModal}
            className="modal"
            renderBackdrop={renderBackdrop}
            style={{ alignItems: "flex-end" }}
          >
            <ChatModal
              onHide={() => setOpenChatModal(false)}
              user={props?.user}
            />
          </Modal>
        )}
        {openFFList && (
          <Modal
            show={openFFList}
            className="modal"
            renderBackdrop={renderBackdrop}
            style={{ alignItems: "center", marginLeft: screen.width / 3 }}
          >
            <FolloweFollowingList
              onHideList={() => setOpenFFList(false)}
              user={props?.user}
              listType={listType}
            />
          </Modal>
        )}
        <LinkCopiedMessage appMessageIsVisible={appMessageIsVisible} />
      </>
    );
  })
);
function LinkCopiedMessage({ appMessageIsVisible }) {
  return (
    <AnimatePresence>
      {appMessageIsVisible === true ? (
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

const Backdrop = styled.div`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5; 
`;