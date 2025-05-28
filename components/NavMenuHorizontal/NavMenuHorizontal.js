import React, { useEffect, useState } from "react";
import {
  MainContainer,
  Menu,
  ButtonLink,
  BtnText,
  Alink,
  Wrapper,
  OverlayContainerSignUp,
  TitleOverlay,
  ImageBox,
  ItemImage,
  StoreDiv,
  StoreImage,
  OverlayContainer,
} from "./NavMenuHorizontal.elements";
import Icon from "../Icon/Icon";
import Link from "next/link";
import YuserLogo from '../../public/icons/rebl-horizontal.svg';
import GemPurple from "../../public/icons/gem-purple.svg";
import GemPink from "../../public/icons/gem-pink.svg";
import { useSession, getSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { COLORS, SPACING } from "../../styles/Styling";
import { inject, observer } from "mobx-react";
import { BtnClose } from "../LoginMain/Login.elements";
import Close from "../../public/icons/close.svg";
import { useStore } from "../../stores/RootStore";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { polygonMumbai, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import client from "../../pages/api/client";
import { CookieStorage } from "cookie-storage";


const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: "w34o65jlIQMNoRR8chCUTL6FgDiVX16p" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Yuser-Rebl",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default inject("store")(
  observer(function NavMenuHorizontal(props) {

    const cookieStorage = new CookieStorage();
    const rootstore = useStore();

    const account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log("Connected", { address, connector, isReconnected });
        rootstore.connectedWallet = address;
      },
    });

    const router = useRouter();
    const [session, loading] = useSession();
    const placeholder =
      props.location === "market" ? "Search NextGems ..." : "Search ...";
    const href = session ? "/home" : "/";
    const [active, setActive] = useState("");
    const [buttonTitle, setButtonTitle] = useState("");
    const [logoGem, setLogoGem] = useState("");
    const [openSignUpModal, setOpenSignUpModal] = useState(false);
    const [openVideoOverlay, setOpenVideoOverlay] = useState(false);
    const [typeVideo, setTypeVideo] = useState("");

    const Video = () => {
      //const srcLong = "https://youtu.be/WEZgvyrG5Uc"; long
      //const srcShort = "https://youtu.be/utOK7sV18Cw"; short
      return (
        <>
          {typeVideo == "longVideo" ? (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/WEZgvyrG5Uc"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/utOK7sV18Cw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </>
      );
    };

    const updateMobileLayout = () => {
      if (typeof window === "undefined")
        console.warn(`window is undefined this is about to cause an issue`);

      if (
        (window.innerWidth <= 770 && window.location.pathname == "/protocol") ||
        (window.innerWidth <= 770 && window.location.pathname == "/")
      ) {
        setButtonTitle("Learn");
      } else {
        setButtonTitle("How it works");
      }
    };

    useEffect(() => {
      updateMobileLayout();
      window.addEventListener("resize", updateMobileLayout);
      return () => window.removeEventListener("resize", updateMobileLayout);
    }, [router, router?.pathname]);

    // check page
    React.useEffect(() => {
      if (window.location.pathname == "/earn") {
        setActive("earn");
        setLogoGem(GemPink);
      } else if (window.location.pathname === "/faq") {
        setActive("faq");
        setLogoGem(GemPink);
      } else if (window.location.pathname == "/protocol") {
        setActive("protocol");
        setLogoGem(GemPurple);
      } else if (window.location.pathname == "/login") {
        setActive("login");
        setLogoGem(GemPink);
      } else if (window.location.pathname == "/") {
        setActive("");
        setLogoGem(GemPink);
      } else if (window.location.pathname == "/wallets") {
        setActive("My NFTs");
        setLogoGem(GemPink);
      }
    }, [router, router?.pathname]);

    function openVideo(value, type) {
      setOpenVideoOverlay(value);
      setTypeVideo(type);
    }

    const logOut = () => {
      client.logout();
      localStorage.removeItem("feathers-jwt"); //To remove the stored jwt token
      cookieStorage.clear();
      signOut({ callbackUrl: "/" });
    };


    return (
      <>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <div className="main-menu-container">
              <MainContainer page={props.page} className="Flex main-menu-content-box">
                <>
                  <Link href={href} passHref>
                    <div className="flex">
                      <div
                        className="flex"
                        style={{ height: 30, cursor: "pointer" }}
                      >
                        <Icon
                          height="34px"
                          width="140px"
                          name={YuserLogo}
                          color={COLORS.white}
                        />
                      </div>
                    </div>
                  </Link>
                </>
                <>

                  {account.address &&
                    <div className="menu-connect-button">
                      <ConnectButton />
                    </div>
                  }

                  <Menu>

                    <Link href={"https://rebl.gitbook.io/rebl/"} passHref>
                      <Alink active={active == "docs" ? true : false}>
                        {"Docs"}
                      </Alink>
                    </Link>

                    <Link
                      href={
                        "https://rebl.gitbook.io/rebl/yuser/yuser-app-faq"
                      }
                      passHref
                    >
                      <Alink active={active == "faq" ? true : false}>{"FAQ"}</Alink>
                    </Link>
                    <Link href={"/wallets"} passHref>
                      <Alink active={active == "wallets" ? true : false}>
                        {"My NFTs"}
                      </Alink>
                    </Link>
                    {/*<Link href={"/market"} passHref>
                        <Alink active={active == "market" ? true : false}>
                          {"Market"}
                        </Alink>
                      </Link>}*/}
                    {!session ?
                      <Link href={"/signin"} passHref>
                        <Alink active={active == "login" ? true : false}>
                          {"Login"}
                        </Alink>
                      </Link>
                    : null}
                  </Menu>
                  {!session ?
                    <ButtonLink
                      left={false}
                      onClick={() => {
                        setOpenSignUpModal(true);
                      }}
                    >
                      <BtnText>{"Sign up"}</BtnText>
                    </ButtonLink>
                    : null}
                    {session ?
                    <ButtonLink
                      left={false}
                      onClick={logOut}
                    >
                      <BtnText>{"Logout"}</BtnText>
                    </ButtonLink>
                    : null}
                </>
              </MainContainer>
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
        {openSignUpModal && (
          <>
            <div
              className="flex"
              style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 999999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  background: COLORS.black50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setOpenSignUpModal(false);
                }}
              ></div>
              <OverlayContainerSignUp>
                <div
                  className="flex"
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <TitleOverlay fontSize={71}>SIGNUP</TitleOverlay>
                  <TitleOverlay fontSize={49}>ON MOBILE</TitleOverlay>
                  <ImageBox style={{ margin: SPACING.large }}>
                    <ItemImage
                      // reverse={prGradientWrapper.reverse}
                      objectFit="cover"
                      src={
                        "https://yuser-assets.imgix.net/frame.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
                      }
                    />
                  </ImageBox>
                  <div
                    className="flex"
                    style={{ fontSize: 20, textAlign: "center" }}
                  >
                    {"Scan QR code on your phone"}
                  </div>
                  <>
                    <StoreDiv>
                      <Link href={"https://yuser.app.link/RxOTkW0kMS"} passHref>
                        <StoreImage
                          src={
                            "https://yuser-assets.imgix.net/appleStore.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
                          }
                          alt="apple"
                          style={{ marginRight: SPACING.small }}
                        />
                      </Link>
                      <Link href={"https://yuser.app.link/RxOTkW0kMS"} passHref>
                        <StoreImage
                          src={
                            "https://yuser-assets.imgix.net/googlePlayStore.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
                          }
                          alt="apple"
                        />
                      </Link>
                    </StoreDiv>
                  </>
                </div>
              </OverlayContainerSignUp>
            </div>
          </>
        )}
        {/* for how it works button video button*/}
        {openVideoOverlay && (
          <>
            <div
              className="flex"
              style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                background: COLORS.black50,
                zIndex: 999999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OverlayContainer>
                <div
                  className="flex"
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    height: 50,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                    borderRadius: 5,
                  }}
                >
                  <BtnClose
                    onClick={() => {
                      setOpenVideoOverlay(false);
                    }}
                  >
                    <Icon
                      strokeWidth="3"
                      height="auto"
                      width="24px"
                      name={Close}
                      strokeColor="white"
                    />
                  </BtnClose>
                </div>
                <div className="flex" style={{ width: "98vw", height: "98vh" }}>
                  <Video typeVideo={typeVideo} />
                </div>
              </OverlayContainer>
            </div>
          </>
        )}
      </>
    );
  })
);

export async function getServerSidePrGradientWrapper(context) {
  const session = await getSession(context);
  const wallets = ["Just to test the hydrate function"];

  return {
    prGradientWrapper: {
      session: session,
      initialState: {
        wallets: wallets,
      },
    },
  };
}
