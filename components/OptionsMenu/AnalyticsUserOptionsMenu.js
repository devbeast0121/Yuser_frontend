import React, { useState, useEffect, useRef } from "react";
import {
  MenuContainer,
  NavOptionsMenu,
  NavOptionsLinks,
  ProfileMenuContainer,
  TxtMenu,
  Divider,
  MenuText,
  ProfileDropDown,
} from "./OptionsMenu.elements";
import Link from "next/link";
import Icon from ".././Icon/Icon";
import { useStore } from "../../stores/RootStore";
import { motion } from "framer-motion";
import { setOptions, useSession } from "next-auth/client";
import Button from "../Button/Button";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";
import DownArrow from "../../public/icons/arrowDown.svg";

export default function AnalyticsUserOptionsMenu(props) {
  const rootstore = useStore();
  const [session, loading] = useSession();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);

  let menuRef = useRef(null);

  if (!props?.user?._id && props?.user?.id) {
    props.user._id = props.user.id;
  }
  //Adds a role to a user
  //role: A string containing the role name, e.g. the creator role would be isCreator
  async function grantRole(role) {
    let userId = props?.user?._id;
    if (!userId || !role) {
      setOptionsMenuVisible(false);
      rootstore.errMessage =
        "An error was encountered when trying to grant user role";
      return;
    }
    try {
      await rootstore.grantUserRole(userId, role);
      if (props.updateUser) {
        props.updateUser(role, true);
      }
      rootstore.successMessage = `Successfully added role: ${role} to user: ${props.user.uname}`;
    } catch (err) {
      console.error(err);
      rootstore.errMessage =
        "There was an error when granting role to the user.";
      return;
    }
    setOptionsMenuVisible(false);
  }
  //Removes a role from a user
  //role: A string containing the role name, e.g. the creator role would be isCreator
  async function revokeRole(role) {
    let userId = props?.user?._id;
    if (!userId || !role) {
      setOptionsMenuVisible(false);
      rootstore.errMessage =
        "An error was encountered when trying to remove role from user";
      return;
    }

    try {
      await rootstore.removeRoleFromUser(userId, role);
      if (props.updateUser) {
        props.updateUser(role, false);
      }
      rootstore.successMessage = `Successfully removed role: ${role} from user: ${props.user.uname}`;
    } catch (err) {
      rootstore.errMessage =
        "There was an error when removing role from the user";
    }
    setOptionsMenuVisible(false);
  }

  //Bans the selected user
  async function banUser() {
    rootstore.showBanOverlay = true;
    setOptionsMenuVisible(false);
    return;
  }

  async function hideUser(hideUser) {
    let userId = props?.user?._id;
    if (!userId) {
      rootstore.errMessage = "No userId found";
      setOptionsMenuVisible(false);
      return;
    }
    try {
      await rootstore.hideContent(userId, "user", hideUser);
      rootstore.successMessage = `User: ${props.user.uname} has been ${
        hideUser ? "hidden" : "unhidden"
      }`;
      if (props.updateUser) {
        props.updateUser("isHidden", hideUser);
      }
    } catch (err) {
      props.menuVisible && props.menuVisible(false);
    }
    setOptionsMenuVisible(false);
  }

  useEffect(() => {
    if (session) {
      setLoggedInUser(session.user);
    } else {
      console.log("no Session found");
    }
  }, [loggedInUser]);

  async function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOptionsMenuVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      {optionsMenuVisible ? (
        <ProfileMenuContainer ref={menuRef} className="Flex">
          <motion.div
            initial={{ opacity: 0, height: "0px" }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
          >
            <NavOptionsMenu style={{ borderRadius: "10px" }} className="Flex">
              {!props?.user?.isCreator && loggedInUser?.isMod && (
                <NavOptionsLinks
                  onClick={() => {
                    grantRole("isCreator");
                  }}
                  className="Flex"
                >
                  <Button
                    text={"Grant User Creator Role"}
                    colorText={({ theme }) => theme.textPrimary.color}
                    color={({ theme }) => theme.containerSecondary.color}
                  />
                </NavOptionsLinks>
              )}
              {props?.user?.isCreator && loggedInUser?.isMod && (
                <NavOptionsLinks
                  onClick={() => {
                    revokeRole("isCreator");
                  }}
                  className="Flex"
                >
                  <Button
                    text={"Remove User's Creator Role"}
                    colorText={({ theme }) => theme.textPrimary.color}
                    color={({ theme }) => theme.containerSecondary.color}
                  />
                </NavOptionsLinks>
              )}
              {!props?.user?.isAmbassador && loggedInUser?.isMod && (
                <>
                  <div className="flex" ider />
                  <NavOptionsLinks
                    onClick={() => {
                      grantRole("isAmbassador");
                    }}
                    className="Flex"
                  >
                    <Button
                      text={"Grant User Ambassador Role"}
                      colorText={({ theme }) => theme.textPrimary.color}
                      color={({ theme }) => theme.containerSecondary.color}
                    />
                  </NavOptionsLinks>
                </>
              )}
              {props?.user?.isAmbassador && loggedInUser?.isMod && (
                <>
                  <div className="flex" ider />
                  <NavOptionsLinks
                    onClick={() => {
                      revokeRole("isAmbassador");
                    }}
                    className="Flex"
                  >
                    <Button
                      text={"Remove User's Ambassador Role"}
                      colorText={({ theme }) => theme.textPrimary.color}
                      color={({ theme }) => theme.containerSecondary.color}
                    />
                  </NavOptionsLinks>
                </>
              )}
              {false &&
                loggedInUser &&
                loggedInUser?.isMod &&
                !(props?.user?._id === loggedInUser?._id) && (
                  <>
                    <div className="flex" ider />
                    <NavOptionsLinks onClick={banUser} className="Flex">
                      <Button
                        text={"Ban User"}
                        colorText={({ theme }) => theme.textPrimary.color}
                        color={({ theme }) => theme.containerSecondary.color}
                      />
                    </NavOptionsLinks>
                  </>
                )}
              {loggedInUser &&
                loggedInUser?.isMod &&
                !(props?.user?._id === loggedInUser?._id) && (
                  <>
                    <div className="flex" ider />
                    <NavOptionsLinks
                      className="Flex"
                      onClick={() => {
                        props?.user?.isHidden
                          ? hideUser(false)
                          : hideUser(true);
                      }}
                    >
                      <Button
                        text={`${
                          !props?.user?.isHidden ? "Hide" : "Unhide"
                        } User`}
                        colorText={({ theme }) => theme.textPrimary.color}
                        color={({ theme }) => theme.containerSecondary.color}
                      />
                    </NavOptionsLinks>
                  </>
                )}
            </NavOptionsMenu>
          </motion.div>
        </ProfileMenuContainer>
      ) : (
        <ProfileDropDown
          onClick={() => {
            setOptionsMenuVisible(!optionsMenuVisible);
          }}
          className="Flex"
        >
          <MenuText>{"Options"}</MenuText>
          <Icon
            strokeWidth="2"
            width="20px"
            height="20px"
            name={DownArrow}
            transform={optionsMenuVisible ? "rotate(180deg)" : null}
          />
        </ProfileDropDown>
      )}
    </>
  );
}
