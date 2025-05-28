import React, { useEffect, useState } from 'react';
import {
  Nav,
  NavInner,
  NavButton,
  BtnText,
  Divider,
  IconOuter,
} from "./NavMenuVertical.elements";
import Badge from "../Badge/Badge";
import Avatar from "../Avatar/Avatar.js";
import Icon from "../Icon/Icon";
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router'
import { useStore } from "../../stores/RootStore";
import { AvatarUrl } from '../../stores/tools.js';
import { useSession } from 'next-auth/client';
import { COLORS, SPACING } from '../../styles/Styling';

import Home from '../../public/icons/home.svg';

import ChatFill from '../../public/navicons/chatFill.svg';
import ChatOutline from '../../public/navicons/chatOutline.svg';
import MarketFill from '../../public/navicons/marketFill.svg';
import MarketOutline from '../../public/navicons/marketOutline.svg';
import NotificationsFill from '../../public/navicons/notificationsFill.svg';
import NotificationsOutline from '../../public/navicons/notificationsOutline.svg';
import ProfileFill from '../../public/navicons/profileFill.svg';
import ProfileOutline from '../../public/navicons/profileOutline.svg';
import SettingsFill from '../../public/navicons/settingsFill.svg';
import SettingsOutline from '../../public/navicons/settingsOutline.svg';
import UploadFill from '../../public/navicons/uploadFill.svg';
import UploadOutline from '../../public/navicons/uploadOutline.svg';
import WalletFill from '../../public/navicons/walletFill.svg';
import WalletOutline from '../../public/navicons/walletOutline.svg';
import AnalyticsFill from '../../public/navicons/analyticsFill.svg';
import AnalyticsOutline from '../../public/navicons/analyticsOutline.svg';
import SearchFill from '../../public/navicons/searchFill.svg';
import SearchOutline from '../../public/navicons/searchOutline.svg';
import YuserLogo from '../../public/icons/rebl-horizontal.svg';
import YuserLogoShort from '../../public/icons/rebl-vertical.svg';
import SignupFill from '../../public/navicons/signupFill.svg';
import SignupOutline from '../../public/navicons/signuptOutline.svg';


export default inject('store')(observer(
  function NavMenuVertical(props) {
    const rootstore = useStore();
    const [avatar, setAvatar] = useState("");
    //To enable routing in case of logout
    const router = useRouter();
    const [session, loading] = useSession();
    const [active, setActive] = useState(rootstore?.feedType);
    const [shortNav, setShortNav] = useState(true);
    const [userId, setUserId] = useState(null);
    const [numChats, setNumChat] = useState(0);
    const [logoIconShort, setLogoIconShort] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
      if (session) {
        setLoggedInUser(session.user);
      } else {
        console.log("no Session found");
      }
    }, [loggedInUser]);

    // Badge number
    useEffect(() => {
      async function doEffect() {
        if (router.route === '/') {
          //console.log(router,"router")
          // console.log(`stub: in doEffect of Navbar.js typeof session is ${typeof session}`);
          if (session) {
            // console.log(`about to call rootstore.getNotifications()`);
            if (session.user && session.user.avatar) {
              setUserId(session.user._id)
              setAvatar(session.user.avatar);

            }
            await rootstore._getNotifications();
            await rootstore.getChatroomlist(0);
            let unreadRooms = 0;
            if (rootstore.chatRoomList) {
              for (let i = 0; i < rootstore.chatRoomList.length; i++) {
                if (
                  !rootstore.chatRoomList[i].lastRead ||
                  rootstore.chatRoomList[i].timestamp >
                  rootstore.chatRoomList[i].lastRead
                ) {
                  unreadRooms++;
                }
              }
              setNumChat(unreadRooms)
              // console.log(unreadRooms,"from nav 1")
            }
            const user = await rootstore.getAuthUser()
            if (user) {
              setUserId(user._id)
              setAvatar(user.avatar)
            }
          }
        }
        else if (router.route === '/chat') {
          if (session) {
            // console.log(`about to call rootstore.getNotifications()`);
            if (session.user && session.user.avatar) {
              setUserId(session?.user?._id)
              setAvatar(session.user.avatar);
            }
            await rootstore._getNotifications();
            await rootstore.getChatroomlist(0);
            setNumChat(0)
            const user = await rootstore.getAuthUser()
            if (user) {
              setUserId(user._id)
              setAvatar(user.avatar)
            }
          }
        }
        else {
          if (session) {
            // console.log(`about to call rootstore.getNotifications()`);
            if (session.user && session.user.avatar) {
              setUserId(session?.user?._id)
              setAvatar(session.user.avatar);
            }
            await rootstore._getNotifications();
            await rootstore.getChatroomlist(0);
            let unreadRooms = 0;
            if (rootstore.chatRoomList) {
              for (let i = 0; i < rootstore.chatRoomList.length; i++) {
                if (
                  !rootstore.chatRoomList[i].lastRead ||
                  rootstore.chatRoomList[i].timestamp >
                  rootstore.chatRoomList[i].lastRead
                ) {
                  unreadRooms++;
                }
              }
              setNumChat(unreadRooms)
              //console.log(unreadRooms,"from nav 2")
            }
            const user = await rootstore.getAuthUser()
            if (user) {
              setUserId(user._id)
              setAvatar(user.avatar)
            }
          }
        }
      }
      doEffect();
      return function cleanup() {
        setUserId(0)
        setAvatar("")
      }
    }, [session, rootstore]);



    const handleFeedClick = (btnType) => {
      if (btnType == "logo") {
        router.push('/', null, { shallow: true })
        setActive("home")
      }
      else if (btnType == "home") {
        router.push('/', null, { shallow: true })
        setActive("home")
      }
      else if (btnType == "search") {
        router.push('/search', null, { shallow: true })
        setActive("search")
      }
      else if (btnType == "market") {
        router.push('/market', null, { shallow: true })
        setActive("market")
      }
      else if (btnType == "analytics") {
        router.push('/analytics', null, { shallow: true })
        setActive("analytics")
      }
      else if (btnType == 'profile') {
        if (!session) {
          router.push('/signin', null, { shallow: true })
        } else {
          router.push('/profile', null, { shallow: true })
          setActive("profile")
        }
      }
      else if (btnType == 'notifications') {
        if (!session) {
          router.push('/signin', null, { shallow: true })
        } else {
          router.push('/notifications', null, { shallow: true })
          setActive("notifications")
        }
      }
      else if (btnType == 'chat') {
        if (!session) {
          router.push('/signin', null, { shallow: true })
        } else {
          router.push('/chat', null, { shallow: true })
          setActive("chat")
        }
      }
      else if (btnType == 'wallets') {
        router.push('/wallets', null, { shallow: true })
        setActive("wallets")
      }
      else if (btnType == 'upload') {
        if (!session) {
          router.push('/signin', null, { shallow: true })
        } else {
          router.push('/fileUpload', null, { shallow: true })
          setActive("upload")
        }
      }
      else if (btnType == 'settings') {
        if (!session) {
          router.push('/signin', null, { shallow: true })
        } else {
          router.push('/settings', null, { shallow: true })
          setActive("settings")
        }
      }
      else if (btnType == 'signup') {
          router.push('/signin', null, { shallow: true }) 
      }
    }

    // check page 
    useEffect(() => {
      if (window.location.pathname == '/') {
        setActive("home")
        setShortNav(false)
      }
      else if (window.location.pathname == '/search') {
        setShortNav(false)
        setActive("search")
      }
      else if (window.location.pathname == "/market") {
        setActive("market")
        setShortNav(true)
      }
      else if (window.location.pathname == "/analytics") {
        setActive("analytics")
        setShortNav(false)
      }
      else if (window.location.pathname == "/profile") {
        setActive("profile")
        setShortNav(false)
      }
      else if (window.location.pathname == "/notifications") {
        setActive("notifications")
        setShortNav(false)
      }
      else if (window.location.pathname == "/chat") {
        setActive("chat")
        setShortNav(true)
      }
      else if (window.location.pathname == "/wallets") {
        setActive("wallets")
        setShortNav(false)
      }
      else if (window.location.pathname == "/fileUpload") {
        setActive("upload")
        setShortNav(false)
      }
      else if (window.location.pathname == "/settings") {
        setActive("settings")
        setShortNav(false)
      }
      else if (window.location.pathname.startsWith('/nft')) {
        setShortNav(false)
      }
      else if (window.location.pathname == '/nextgems') {
        setShortNav(false)
        setActive("")
      }
      else if (window.location.pathname == '/hashtag') {
        setShortNav(false)
        setActive("")
      }
      else if (window.location.pathname == '/collectionUpload') {
        setShortNav(false)
        setActive("")
      }
      else if (window.location.pathname == '/404') {
        setShortNav(false)
        setActive("")
      }
      else {
        setShortNav(false)
        setActive("")
      }
    }, [router, router?.pathname, window.location.pathname]);


    //replace REBL  logo icon
    const replaceIcon = () => {
      if (typeof window === 'undefined')
        console.warn(`window is undefined this is about to cause an issue`);

      if (window.innerWidth <= 1190) {
        setLogoIconShort(true)
      } else {
        setLogoIconShort(false)
      }
    };

    React.useEffect(() => {
      replaceIcon();
      window.addEventListener("resize", replaceIcon);
      return () => window.removeEventListener("resize", replaceIcon);
    }, [router, router?.pathname]);


    return (
      <Nav shortNav={shortNav}>
        <NavInner shortNav={shortNav}>
          <div onClick={() => handleFeedClick("logo")}
            click={active == "home"}
            style={{ height: 25, marginLeft: SPACING.large, marginBottom: SPACING.extraLarge, alignItems: 'center', cursor: "pointer" }}>
            {logoIconShort || shortNav ?
              <Icon
                height="30px"
                width="30px"
                name={YuserLogoShort}
                color={({ theme }) => theme.iconColor.color} />
              :
              <Icon
                height="25px"
                width="132.25px"
                name={YuserLogo}
                color={({ theme }) => theme.iconColor.color} />
            }
          </div>
          <NavButton
            onClick={() => handleFeedClick("home")}
            click={active === "home"}
          >
            <IconOuter>
              <Icon
                height="26px" width="26px"
                strokeWidth={"2"}
                strokeColor={active == "home" ? "transparent" : ({ theme }) => theme.iconColor.color}
                color={active == "home" ? COLORS.purple : "transparent"}
                name={Home}
              />
            </IconOuter>
            {shortNav ? null :
              <BtnText
                active={active == "home"} >
                {'Home'}
              </BtnText>
            }
          </NavButton>
          {session &&
            <NavButton
              onClick={() => handleFeedClick("search")}
              click={active === "search"}
            >
              <IconOuter>
                <Icon
                  height="26px" width="26px"
                  strokeWidth={active == "search" ? "0" : "4"}
                  strokeColor={({ theme }) => theme.iconColor.color}
                  color={active == "search" ? COLORS.purple : ({ theme }) => theme.iconColor.color}
                  name={SearchFill}
                />
              </IconOuter>
              {shortNav ? null :
                <BtnText
                  active={active == "search"}>
                  {'Search'}
                </BtnText>
              }
            </NavButton>
          }
          {session &&
            <NavButton
              onClick={() => handleFeedClick("market")}
              click={active === "market"}
            >
              <IconOuter>
                <Icon
                  height="26px" width="26px"
                  strokeWidth={active == "market" ? "0" : "2"}
                  strokeColor={({ theme }) => theme.iconColor.color}
                  color={active == "market" ? COLORS.purple : "transparent"}
                  name={active == "market" ? MarketFill : MarketOutline}
                />
              </IconOuter>
              {shortNav ? null :
                <BtnText
                  active={active == "market"} >
                  {'NFT Market'}
                </BtnText>
              }
            </NavButton>
          }
          {loggedInUser?.isMod &&
            <NavButton
              onClick={() => handleFeedClick("analytics")}
              click={active === "analytics"}
            >
              <IconOuter>
                <Icon
                  height="26px" width="26px"
                  strokeWidth={active == "analytics" ? "4" : "2"}
                  strokeColor={active == "analytics" ? COLORS.purple : ({ theme }) => theme.iconColor.color}
                  color={active == "analytics" ? COLORS.purple : "transparent"}
                  name={active == "analytics" ? AnalyticsFill : AnalyticsOutline}
                />
              </IconOuter>
              {shortNav ? null :
                <BtnText
                  active={active == "analytics"} >
                  {'Analytics'}
                </BtnText>
              }
            </NavButton>
          }
          {session &&
            <Divider />
          }
          {session &&
            <NavButton
              onClick={() => handleFeedClick("profile")}
              click={active === "profile"}
            >
              {session ?
                <>
                  <Avatar
                    navBar={true}
                    src={AvatarUrl(avatar, "s")}
                    size={'small'}
                    alt={'Avatar'}
                    frame={true}
                    edit={false}
                    userId={userId}
                  />
                  {shortNav ? null : (
                    <BtnText
                      active={active == "profile"}>
                      {"Profile"}
                    </BtnText>
                  )}
                </>
                :
                <>
                  <Icon
                    height="26px" width="26px"
                    strokeWidth={active == "profile" ? "0" : "2"}
                    strokeColor={({ theme }) => theme.iconColor.color}
                    color={active == "profile" ? COLORS.purple : "transparent"}
                    name={active == "profile" ? ProfileFill : ProfileOutline}
                  />
                  {shortNav ? null : (
                    <BtnText
                      active={active == "profile"}>
                      {"Profile"}
                    </BtnText>
                  )}
                </>
              }
            </NavButton>
          }
          {session &&
            <NavButton
              onClick={() => handleFeedClick("notifications")}
              click={active === "notifications"}
            >
              <IconOuter>
                <Icon
                  height="28.68px" width="26px"
                  strokeWidth={active == "notifications" ? "0" : "2"}
                  strokeColor={({ theme }) => theme.iconColor.color}
                  color={active == "notifications" ? COLORS.purple : "transparent"}
                  name={active == "notifications" ? NotificationsFill : NotificationsOutline}
                />
              </IconOuter>
              {shortNav ? null :
                <BtnText
                  active={active == "notifications"}>
                  {"Notifications"}
                </BtnText>
              }
              {session && rootstore.notificationProps.length > 0 &&
                <Badge position='web' value={rootstore.notifications.length} />
              }
            </NavButton>
          }
          {session &&
            <NavButton
              onClick={() => handleFeedClick("chat")}
              click={active === "chat"}
            >
              <IconOuter>
                <Icon
                  height="26px" width="26px"
                  strokeWidth={active == "chat" ? "0" : "2"}
                  strokeColor={({ theme }) => theme.iconColor.color}
                  color={active == "chat" ? COLORS.purple : "transparent"}
                  name={active == "chat" ? ChatFill : ChatOutline}
                />
              </IconOuter>
              {shortNav ? null :
                <BtnText
                  active={active == "chat"}>
                  {"Chat"}
                </BtnText>
              }
              {session && numChats > 0 &&
                <Badge position='web' value={numChats} />
              }
            </NavButton>
          }
          {session &&
            <Divider />
          }
          <NavButton
            onClick={() => handleFeedClick("wallets")}
            click={active === "wallets"}
          >
            <IconOuter>
              <Icon
                height="26px" width="26px"
                strokeWidth={active == "wallets" ? "0" : "2"}
                strokeColor={({ theme }) => theme.iconColor.color}
                color={active == "wallets" ? COLORS.purple : "transparent"}
                name={active == "wallets" ? WalletFill : WalletOutline} />
            </IconOuter>
            {shortNav ? null :
              <BtnText
                active={active == "wallets"}>
                {"Wallets"}
              </BtnText>
            }
          </NavButton>
          {session &&
            <NavButton
              onClick={() => handleFeedClick("upload")}
              click={active === "upload"}
            >
              <IconOuter>
                <Icon
                  height="26px" width="26px"
                  strokeWidth={active == "upload" ? "0" : "2"}
                  strokeColor={({ theme }) => theme.iconColor.color}
                  color={active == "upload" ? COLORS.purple : "transparent"}
                  name={active == "upload" ? UploadFill : UploadOutline}
                />
              </IconOuter>
              {shortNav ? null :
                <BtnText
                  active={active == "upload"} >
                  {"Upload"}
                </BtnText>
              }
            </NavButton>
          }
          {session &&
            <NavButton
              onClick={() => handleFeedClick("settings")}
              click={active === "settings"}
            >
              <IconOuter>
                <Icon
                  height="26px" width="26px"
                  strokeWidth={active == "settings" ? "0" : "2"}
                  strokeColor={({ theme }) => theme.iconColor.color}
                  color={active == "settings" ? COLORS.purple : "transparent"}
                  name={active == "settings" ? SettingsFill : SettingsOutline}
                />
              </IconOuter>
              {shortNav ? null :
                <BtnText
                  active={active == "settings"}>
                  {"Settings"}
                </BtnText>
              }
            </NavButton>
          }
          {!session &&
            <NavButton
              onClick={() => handleFeedClick("signup")}
              click={active === "signup"}
            >
              <IconOuter>
                <Icon
                  height="26px" width="26px"
                  strokeWidth={active == "signup" ? "0" : "2"}
                  strokeColor={({ theme }) => theme.iconColor.color}
                  color={active == "signup" ? COLORS.purple : "transparent"}
                  name={active == "signup" ? SignupFill : SignupOutline}
                />
              </IconOuter> 
              {shortNav ? null :
                <BtnText
                  active={active == "settings"}>
                  {"Login"}
                </BtnText>
              }
            </NavButton>
          }
        </NavInner>
      </Nav>
    )
  }
))