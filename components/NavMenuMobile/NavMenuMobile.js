import React, { useState, useEffect } from 'react'
import {
    NavbarMobileContainer,
    NavButton,
    NavBox,
    BtnText,
    Divider,
    MenuButton,
    SubMenu,
    Alink,
    SignUpModal,
    OverlayContainerSignUp,
    TitleOverlay,
    ImageBox,
    StoreDiv,
    StoreImage
} from './NavMenuMobile.elements';

import Icon from "../Icon/Icon";
import Badge from '../Badge/Badge';
import Avatar from '../Avatar/Avatar.js';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router'
import { useStore } from "../../stores/RootStore";
import { AvatarUrl } from '../../stores/tools.js';
import { useSession } from 'next-auth/client';
import Menu from '../../public/icons/menu.svg';
import { COLORS, SPACING } from '../../styles/Styling.js';

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
import YuserLogo from '../../public/icons/rebl-horizontal.svg';
import AnalyticsFill from '../../public/navicons/analyticsFill.svg';
import AnalyticsOutline from '../../public/navicons/analyticsOutline.svg';
import SearchFill from '../../public/navicons/searchFill.svg';
import SearchOutline from '../../public/navicons/searchOutline.svg';
import Triangle from '../../public/icons/playIcon.svg';
import Person from '../../public/icons/profile.svg';
import Login from '../../public/icons/login.svg';
import Faq from '../../public/icons/faq.svg';
import Protocol from '../../public/icons/code.svg';
import Earn from '../../public/icons/users-mm.svg';
import Home from '../../public/icons/home.svg';
import {
    ItemImage,
} from "../LandingImageComponent/LandingImageComponent.elements";

import Search from "../../public/icons/search3.svg";


export default inject('store')(observer(
    function NavMenuMobile(props) {
        const [menuVisible, setMenuVisible] = useState(false);

        const rootstore = useStore();
        const [avatar, setAvatar] = useState("");
        //To enable routing in case of logout
        const router = useRouter();
        const [session, loading] = useSession();
        const [active, setActive] = useState("home");
        const [userId, setUserId] = useState(null)
        const [numChats, setNumChat] = useState(0)
        const [subMenuvisible, setSubMenuVisible] = useState(false);
        const [openSignUpModal, setOpenSignUpModal] = useState(false);
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
                                    rootstore.chatRoomList[i].timestamp > rootstore.chatRoomList[i].lastRead
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
                                    rootstore.chatRoomList[i].timestamp > rootstore.chatRoomList[i].lastRead
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
        }, [session, rootstore, router.route]);


        const handleFeedClick = (btnType) => {
            if (btnType == "home") {
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
            else if (btnType == 'login') {
                if (!session) {
                    router.push('/signin', null, { shallow: true })
                    setActive("login")
                }
            }
            else if (btnType == 'faq') {
                if (!session) {
                    router.push('https://rebl.gitbook.io/rebl/yuser/yuser-app-faq', null, { shallow: true })
                    setActive("faq")
                }
            }
            else if (btnType == 'protocol') {
                if (!session) {
                    router.push('https://rebl.gitbook.io/rebl/', null, { shallow: true })
                    setActive("protocol")
                }
            }
            else if (btnType == 'earn') {
                if (!session) {
                    router.push('/404?type=notice', null, { shallow: true })
                    setActive("earn")
                }
            }
            else if (btnType == 'more') {
                if (subMenuvisible) {
                    setSubMenuVisible(false)
                } else {
                    setSubMenuVisible(true)
                }
            }
            else if (btnType == "logo") {
                router.push('/', null, { shallow: true })
                setActive("home")
            }
            if (btnType !== 'more') {
                setMenuVisible(false)
            }
        }

        // check page 
        useEffect(() => {
            if (window.location.pathname == "/") {
                setActive("home")
            }
            else if (window.location.pathname == "/search") {
                setActive("search")
            }
            else if (window.location.pathname == "/market") {
                setActive("market")
            }
            else if (window.location.pathname == "/analytics") {
                setActive("analytics")
            }
            else if (window.location.pathname == "/profile") {
                setActive("profile")
            }
            else if (window.location.pathname == "/notifications") {
                setActive("notifications")
            }
            else if (window.location.pathname == "/chat") {
                setActive("chat")
            }
            else if (window.location.pathname == "/wallets") {
                setActive("wallets")
            }
            else if (window.location.pathname == "/fileUpload") {
                setActive("upload")
            }
            else if (window.location.pathname == "/settings") {
                setActive("settings")
            }
            else if (window.location.pathname == "/settings" && subMenuvisible) {
                setActive("more")
            }
            else if (window.location.pathname.startsWith('/nft')) {
                //
            }
            else if (window.location.pathname == '/nextgems') {
                //
            }
            else if (window.location.pathname == '/earn') {
                setActive("earn")
            }
            else if (window.location.pathname == 'https://rebl.gitbook.io/rebl/') {
                setActive("protocol")
            }
            else if (window.location.pathname == 'https://rebl.gitbook.io/rebl/yuser/yuser-app-faq') {
                setActive("faq")
            }
            else if (window.location.pathname == '/login') {
                setActive("login")
            }
        }, [router, router?.pathname]);

        return (
            <NavbarMobileContainer postModalVisible={rootstore.postModalVisible}>
                <div onClick={() => handleFeedClick("logo")}
                    click={active == "home"} style={{ height: 30, marginLeft: SPACING.large, alignItems: 'center', cursor: "pointer" }}>
                    <Icon
                        height="34px"
                        width="140px"
                        name={YuserLogo}
                        color={({ theme }) => theme.iconColor.color} />
                </div>
                <MenuButton onClick={() => setMenuVisible(!menuVisible)}>
                    <Icon
                        width="30px"
                        height="auto"
                        name={Menu}
                        strokeColor={({ theme }) => theme.iconColor.color}
                        strokeWidth="3"
                    />
                </MenuButton>
                <NavBox
                    animate={menuVisible ? "visible" : "hidden"}
                >
                    {session ?
                        <>
                            <NavButton
                                onClick={() => handleFeedClick('home')}
                                click={active == "home"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    strokeWidth={"2"}
                                    strokeColor={active == "home" ? "transparent" : COLORS.purple}
                                    color={active == "home" ? COLORS.purple : "transparent"}
                                    name={Home}
                                />
                                <BtnText active={active == "home"} style={{ color: COLORS.purple }} >
                                    {'Home'}
                                </BtnText>
                            </NavButton>
                            <NavButton
                                onClick={() => handleFeedClick("search")}
                                click={active === "search"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    strokeWidth={active == "search" ? "0" : null}
                                    strokeColor={({ theme }) => theme.iconColor.color}
                                    color={active == "search" ? ({ theme }) => theme.iconColor.color : ({ theme }) => theme.iconColor.color}
                                    name={active == "search" ? SearchFill : SearchOutline}
                                />
                                <BtnText active={active == "search"} >
                                    {'Search'}
                                </BtnText>
                            </NavButton>
                            <NavButton
                                onClick={() => handleFeedClick("market")}
                                click={active === "market"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    strokeWidth={active == "market" ? "0" : null}
                                    strokeColor={({ theme }) => theme.iconColor.color}
                                    color={active == "market" ? ({ theme }) => theme.iconColor.color : "transparent"}
                                    name={active == "market" ? MarketFill : MarketOutline}
                                />
                                <BtnText active={active == "market"} >
                                    {'NFT Market'}
                                </BtnText>
                            </NavButton>
                            {loggedInUser?.isMod &&
                                <NavButton
                                    onClick={() => handleFeedClick("analytics")}
                                    click={active === "analytics"}
                                >
                                    <Icon
                                        height="26px" width="26px"
                                        strokeWidth={active == "analytics" ? "4" : "2"}
                                        strokeColor={({ theme }) => theme.iconColor.color}
                                        color={active == "analytics" ? ({ theme }) => theme.iconColor.color : ({ theme }) => theme.iconColor.color}
                                        name={active == "analytics" ? AnalyticsFill : AnalyticsOutline}
                                    />
                                    <BtnText active={active == "market"} >
                                        {'Analytics'}
                                    </BtnText>
                                </NavButton>
                            }
                            < Divider />
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
                                        />
                                        <BtnText active={active == "profile"}  >
                                            {"Profile"}
                                        </BtnText>
                                    </>
                                    :
                                    <>
                                        <Icon
                                            height="26px" width="26px"
                                            strokeWidth={active == "profile" ? "0" : null}
                                            strokeColor={({ theme }) => theme.iconColor.color}
                                            color={active == "profile" ? ({ theme }) => theme.iconColor.color : "transparent"}
                                            name={active == "profile" ? ProfileFill : ProfileOutline}
                                        />
                                        <BtnText active={active == "profile"}>
                                            {"Profile"}
                                        </BtnText>
                                    </>
                                }
                            </NavButton>
                            <NavButton
                                onClick={() => handleFeedClick("notifications")}
                                click={active === "notifications"}
                            >
                                <Icon
                                    height="28.68px" width="26px"
                                    strokeWidth={active == "notifications" ? "0" : null}
                                    strokeColor={({ theme }) => theme.iconColor.color}
                                    color={active == "notifications" ? ({ theme }) => theme.iconColor.color : "transparent"}
                                    name={active == "notifications" ? NotificationsFill : NotificationsOutline}
                                />
                                <BtnText active={active == "notifications"}>
                                    {"Notifications"}
                                </BtnText>
                                {session && rootstore.notificationProps.length > 0 &&
                                    <Badge value={rootstore.notifications.length} />
                                }
                            </NavButton>
                            <NavButton
                                onClick={() => handleFeedClick("chat")}
                                click={active === "chat"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    strokeWidth={active == "chat" ? "0" : null}
                                    strokeColor={({ theme }) => theme.iconColor.color}
                                    color={active == "chat" ? ({ theme }) => theme.iconColor.color : "transparent"}
                                    name={active == "chat" ? ChatFill : ChatOutline}
                                />
                                <BtnText active={active == "chat"}>
                                    {"Chat"}
                                </BtnText>
                                {session && numChats > 0 &&
                                    <Badge value={numChats} />
                                }
                            </NavButton>
                            <Divider />
                            <NavButton
                                onClick={() => handleFeedClick("wallets")}
                                click={active === "wallets"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    strokeWidth={active == "wallets" ? "0" : null}
                                    strokeColor={({ theme }) => theme.iconColor.color}
                                    color={active == "wallets" ? ({ theme }) => theme.iconColor.color : "transparent"}
                                    name={active == "wallets" ? WalletFill : WalletOutline}
                                />
                                <BtnText active={active == "wallets"}>
                                    {"Wallets"}
                                </BtnText>
                            </NavButton>
                            <NavButton
                                onClick={() => handleFeedClick("upload")}
                                click={active === "upload"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    strokeWidth={active == "upload" ? "0" : null}
                                    strokeColor={({ theme }) => theme.iconColor.color}
                                    color={active == "upload" ? ({ theme }) => theme.iconColor.color : "transparent"}
                                    name={active == "upload" ? UploadFill : UploadOutline}
                                />
                                <BtnText active={active == "upload"} >
                                    {"Upload"}
                                </BtnText>
                            </NavButton>
                            <NavButton
                                onClick={() => handleFeedClick("settings")}
                                click={active === "settings"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    strokeWidth={active == "settings" ? "0" : null}
                                    strokeColor={({ theme }) => theme.iconColor.color}
                                    color={active == "settings" ? ({ theme }) => theme.iconColor.color : "transparent"}
                                    name={active == "settings" ? SettingsFill : SettingsOutline}
                                />
                                <BtnText active={active == "settings"}>
                                    {"Settings"}
                                </BtnText>
                            </NavButton>
                            <Divider />
                            <NavButton
                                onClick={() => handleFeedClick("more")}
                                click={subMenuvisible}
                            >
                                <div style={{ transform: subMenuvisible ? "rotate(90deg)" : "rotate(0deg)" }}>
                                    <Icon
                                        height="20px" width="20px"
                                        strokeWidth={subMenuvisible ? "0" : "2"}
                                        strokeColor={subMenuvisible ? "transparent" : ({ theme }) => theme.iconColor.color}
                                        color={subMenuvisible ? ({ theme }) => theme.iconColor.color : "transparent"}
                                        fill={subMenuvisible ? ({ theme }) => theme.iconColor.color : "transparent"}
                                        name={Triangle}
                                    />
                                </div>
                                <BtnText style={{ fontFamily: subMenuvisible ? 'LatoBlack' : 'LatoRegular' }}>
                                    {"More"}
                                </BtnText>
                            </NavButton>
                        </>
                        :
                        <>
                            <NavButton
                                onClick={() => handleFeedClick('home')}
                                click={active == "home"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    strokeWidth={active == "home" ? "0" : "2"}
                                    strokeColor={COLORS.purple}
                                    color={active == "home" ? COLORS.purple : "transparent"}
                                    name={Home}
                                />
                                <BtnText active={active == "home"} style={{ color: COLORS.purple }} >
                                    {'Home'}
                                </BtnText>
                            </NavButton>
             
                            <NavButton
                                onClick={() => handleFeedClick("protocol")}
                                click={active === "protocol"}
                            >
                                <Icon
                                    height="23px" width="30px"
                                    fill={({ theme }) => theme.iconColor.color}
                                    name={Protocol}
                                />
                                <BtnText active={active == "protocol"} >
                                    {'Docs'}
                                </BtnText>
                            </NavButton>
                            < Divider />
                            <NavButton
                                onClick={() => handleFeedClick("faq")}
                                click={active === "faq"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    fill={({ theme }) => theme.iconColor.color}
                                    name={Faq}
                                />
                                <BtnText active={active == "faq"} >
                                    {'FAQ'}
                                </BtnText>
                            </NavButton>
                            <NavButton
                                onClick={() => handleFeedClick("login")}
                                click={active === "login"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    fill={({ theme }) => theme.iconColor.color}
                                    name={Login}
                                />
                                <BtnText active={active == "login"} >
                                    {'Login'}
                                </BtnText>
                            </NavButton>
                            <NavButton
                                onClick={() => { setOpenSignUpModal(true) }}
                                click={active === "signup"}
                            >
                                <Icon
                                    height="26px" width="26px"
                                    color={({ theme }) => theme.iconColor.color}
                                    name={Person}
                                />
                                <BtnText active={active == "signup"} >
                                    {'Sign up'}
                                </BtnText>
                            </NavButton>
                            <Divider />
                            <NavButton
                                onClick={() => handleFeedClick("more")}
                                click={subMenuvisible}
                            >
                                <div style={{ transform: subMenuvisible ? "rotate(90deg)" : "rotate(0deg)" }}>
                                    <Icon
                                        height="20px" width="20px"
                                        strokeWidth={subMenuvisible ? "0" : "2"}
                                        strokeColor={subMenuvisible ? "transparent" : ({ theme }) => theme.iconColor.color}
                                        color={subMenuvisible ? ({ theme }) => theme.iconColor.color : "transparent"}
                                        fill={subMenuvisible ? ({ theme }) => theme.iconColor.color : "transparent"}
                                        name={Triangle}
                                    />
                                </div>
                                <BtnText style={{ fontFamily: subMenuvisible ? 'LatoBlack' : 'LatoRegular' }}>
                                    {"More"}
                                </BtnText>
                            </NavButton>
                        </>
                    }
                    {subMenuvisible &&
                        <SubMenu >
                            <NavButton><Alink href="https://rebl.gitbook.io/rebl/" target="_blank" rel="noopener noreferrer">About</Alink></NavButton>
                            <NavButton><Alink href="https://rebl.gitbook.io/rebl/yuser/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms</Alink></NavButton>
                            <NavButton><Alink href="https://rebl.gitbook.io/rebl/yuser/community-guidelines" target="_blank" rel="noopener noreferrer">Guidelines</Alink></NavButton>
                            <NavButton><Alink href="https://twitter.com/reblapp" target="_blank" rel="noopener noreferrer">Twitter</Alink></NavButton>
                            <NavButton><Alink href="https://discord.gg/uRRxnfAjhY" target="_blank" rel="noopener noreferrer">Discord</Alink></NavButton>
                            <NavButton><Alink href="https://instagram.com/reblapp" target="_blank" rel="noopener noreferrer">Instagram</Alink></NavButton>
                        </SubMenu>
                    }
                    {openSignUpModal && (
                        <SignUpModal
                            onClick={() => { setOpenSignUpModal(false) }}
                        >
                            <OverlayContainerSignUp>
                                <div
                                    style={{
                                        flexDirection: "column",
                                        margin: SPACING.large,
                                        justifyContent: "space-evenly",
                                        alignItems: "center"
                                    }}
                                >
                                    <TitleOverlay fontSize={71}>SIGNUP</TitleOverlay>
                                    <TitleOverlay fontSize={49}>ON MOBILE</TitleOverlay>
                                    <ImageBox style={{ margin: SPACING.large }}>
                                        <ItemImage
                                            reverse={props.reverse}
                                            objectFit="cover"
                                            src={
                                                "https://yuser-assets.imgix.net/frame.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
                                            }
                                        />
                                    </ImageBox>
                                    <div style={{ fontSize: 20, textAlign: "center" }}>{"Scan QR code on your phone"}</div>
                                    <>
                                        <StoreDiv>
                                            <StoreImage src={"https://yuser-assets.imgix.net/appleStore.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"} alt="apple" style={{ marginRight: SPACING.small }} />
                                            <StoreImage src={"https://yuser-assets.imgix.net/googlePlayStore.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"} alt="apple" />
                                        </StoreDiv>
                                    </>
                                </div>
                            </OverlayContainerSignUp>
                        </SignUpModal>
                    )}
                </NavBox>
            </NavbarMobileContainer >
        )
    }

))