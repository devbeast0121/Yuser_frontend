import React, { useState } from "react";
import { signIn, providers } from "next-auth/client";
import { FieldInput } from "./../components";
import SocialButton from "../components/Button/SocialButton";
import Button from "../components/Button/Button";
import { COLORS, SPACING, FONT_SIZE } from "./../styles/Styling";
import Google from "./../public/icons/google.svg";
import Apple from "./../public/icons/apple.svg";
import Facebook from "./../public/icons/facebook.svg";
import { getSession } from "next-auth/client";
import { MessageAppComponent } from "../components/MessageAppComponent/MessageAppComponent";
import { useRouter } from "next/router";
import { ErrorMessageSignIn } from "../components/ErrorMessageSignIn/ErrorMessageSignIn";
import styled from 'styled-components';
import Image from 'next/image';
import ImageOne from './../public/images/signupOne.jpg';
import ImageTwo from './../public/images/signupTwo.jpg';
import yuserBeta from './../public/icons/yuserBeta.svg';
import Link from 'next/link';
import Icon from "../components/Icon/Icon";
import YuserLogo from './../public/icons/rebl-horizontal.svg';
import GemPink from './../public/icons/gem-pink.svg';

export default function Signin({ providers }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState('')
  const [error, setError] = useState(useRouter().query)
  const [loginNamePasswordVisible, setLoginNamePasswordVisible] = useState(false)

  const images = [{ ImageOne }, { ImageTwo }];

  function getImageTag() {
    var randomIndex = Math.floor(Math.random() * images.length);
    if (randomIndex == 0) {
      return ImageOne;
    } else if (randomIndex == 1) {
      return ImageTwo;
    }
  }

  //showing the app message (inform/success/error)
  const showAppMessage = (isVisible, type, message) => {
    if (isVisible) {
      setMessageVisible(isVisible)
      setMessageType(type)
      setMessage(message)
      const timer = setTimeout(() => {
        setMessageVisible(false)
        setMessageType('')
        setMessage('')
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setMessageVisible(isVisible)
      setMessageType('')
      setMessage('')
    }
  }

  const reRoute = () => {
    // console.log("Login successful")
    router.push({
      pathname: "/",
    });
  }
  const validateSignInCredentials = (error) => {
    console.log("inside validate sign in", error)
    // console.log(error,"the error")
    console.log(error, "error")
    if (error.error === "Invalid login") {
      showAppMessage(true, "error", error.error)
    }
    else {
      reRoute()
    }

  }

  // useEffect(() => {
  //   console.log(`❤️ In signin.js`);
  //   console.log(`providers (from props) is ${providers ?? `'not found'`}`);
  //   console.log(
  //     `providers keys are ${Object.keys(
  //       providers ?? {
  //         doyle_fake_obj_key_meaning_no_providers_object:
  //           "providers is not an object",
  //       }
  //     )}`
  //   );

  //   if (providers) console.log(JSON.stringify(providers));
  //   else console.error("STUB: providers was nullish");
  // }, [providers]);


  const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    default: "Unable to Sign In",
  };
  const SignInError = ({ error }) => {
    console.log(error.error, "error")
    const errorMessage = error && (errors[error] ?? errors.default);
    return (
      <ErrorMessageSignIn errorMessage={errorMessage} showErrorMessage={showErrorMessage} />
    )
  };
  const showErrorMessage = () => {
    setError(!error)
  }

  return (
    <MainSignuplContainer className="Flex">
      <SignupBox className="Flex">
        <SignupMain  className="Flex">
          <div style={{ cursor: "pointer", marginBottom: 12 }}>
            <Link href='/' passHref>
              <div  className="Flex">
                <div className="Flex" style={{ height: 30, marginTop: 8, cursor: "pointer" }}>
                    <Icon
                        height="34px"
                        width="140px"
                        name={YuserLogo}
                        color={({ theme }) => theme.iconColor.color} />
                </div>
              </div>
            </Link>
          </div>
          <Description className="Flex">
            <TxtTitle>
              {"Join the revolution in art and technology"}
            </TxtTitle>
            <TxtContent>
              {"Discover art, music, and people that are changing the world of online content. Defi everyone else."}
            </TxtContent>
            <TxtTitleLogin>
              {"Log in"}
            </TxtTitleLogin>
            <TxtContentLogin style={{ maxWidth: 400, }}>
              <p style={{ color: COLORS.white }}>
                {"Want to become a REBL? Get someone to invite you or "}
                <Link href="https://discord.gg/AqGEvfvWtA">
                  <a style={{ textDecoration: 'none', color: COLORS.red, }}>check out our discord.</a>
                </Link>
              </p>
            </TxtContentLogin>
          </Description>
          {/* Error message */}
          {error.error && <SignInError error={error} />}
          {/* Login options */}
          <div className="Flex" style={{ maxWidth: 450, flexDirection: "column", }}>
            {Object.values(providers).map((provider) => (
              <div className="Flex" key={provider.name} style={{ flexDirection: "column", }}>
                {provider.id === "credentials" ? (
                  <>
                    {loginNamePasswordVisible &&
                      <>
                        <LoginButtonLabel>Username</LoginButtonLabel>
                        <FieldInput
                          type="text"
                          placeholder="Enter your username"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="MarginBottomMedium"
                          border={true}
                          borderColor={COLORS.purple}
                          color={'red'}
                        />
                        <LoginButtonLabel>Password</LoginButtonLabel>
                        <FieldInput
                          type="password"
                          placeholder="Enter your password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="MarginBottomMedium"
                        />
                        <Button
                          text={"Login"}
                          colorText={COLORS.white}
                          onClick={() =>
                            signIn("credentials", {
                              username: username,
                              password: password,
                              redirect: false,
                            }).then((error) => validateSignInCredentials(error))
                          }
                          color={COLORS.purple}
                          size={"medium"}
                          className={"MarginTopMedium MarginBottomMedium"}
                        />
                      </>
                    }
                  </>
                ) : null}
                {!loginNamePasswordVisible &&
                  <>
                    {provider.id === "facebook" ? (
                      <SocialButton
                        text={"Login with Facebook"}
                        onClick={() => signIn("facebook")}
                        isIcon={true}
                        iconName={Facebook}
                        color={COLORS.blue}
                        iconWidth={"24px"}
                        className={"MarginBottomMedium"}
                        size={"large"}
                        marginBottom={12}
                      />
                    ) : null
                    }
                    {provider.id === "google" ? (
                      <SocialButton
                        text={"Login with Google"}
                        onClick={() => signIn("google", { redirect: false })}
                        isIcon={true}
                        iconName={Google}
                        iconWidth={"24px"}
                        color={COLORS.red}
                        className={"MarginBottomMedium"}
                        size={"large"}
                        marginBottom={12}
                      />
                    ) : null}
                    {provider.id === "apple" ? (
                      <SocialButton
                        text={"Login with Apple"}
                        onClick={() => signIn("apple")}
                        isIcon={true}
                        iconName={Apple}
                        iconWidth={"24px"}
                        color={COLORS.black}
                        className={"MarginBottomMedium"}
                        size={"large"}
                        marginBottom={12}
                      />
                    ) : null}
                  </>
                }
              </div>
            ))}
            {!loginNamePasswordVisible ?
              <TxtLoginOption onClick={() => setLoginNamePasswordVisible(!loginNamePasswordVisible)} style={{ color: COLORS.whiteLight }}>
                <p>
                  {"Or login with "}
                  <a style={{ textDecoration: 'none', color: COLORS.red, cursor: "pointer" }}>username and password</a>
                </p>
              </TxtLoginOption>
              :
              <TxtLoginOption onClick={() => setLoginNamePasswordVisible(!loginNamePasswordVisible)} style={{ color: COLORS.whiteLight }}>
                <p>
                  {"Or login with "}
                  <a style={{ textDecoration: 'none', color: COLORS.red, cursor: "pointer" }}>socials</a>
                </p>
              </TxtLoginOption>
            }
          </div>
        </SignupMain>
      </SignupBox>

      <ImageBox>
        <Image
          layout="fill"
          objectFit={"cover"}
          width="1920px"
          height="2560px"
          priority={true}
          src={"https://yuser-assets.imgix.net/landing_intro_art_out.png?w=450&auto=format&q=65&dpr=2"} alt="a background image for the signup promo page"
          className="imageSignup"  // object-position: center top;
        />
      </ImageBox>
      {messageVisible &&
        <MessageAppComponent
          showAppMessage={showAppMessage}
          type={messageType}
          textMessage={message}
        />
      }
    </MainSignuplContainer >
  );
}
export async function getServerSideProps(context) {
  console.log(
    `inside getServerSideProps.. typeof context is ${typeof context}`
  );

  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { providers: await providers() } };
}

const MainSignuplContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: ${({ theme }) => theme.container.color};
  overflow: hidden;

  @media screen and (max-width: 700px) {
    height: 100vh;
    flex-direction: column-reverse;
    overflow: hidden;
    min-width: 326px;
  }
`;
const SignupBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: 700px) {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.containerSecondary.color};
  }
`;
const ImageBox = styled.div`
display: flex;
    height: 100vh;
    position: relative;
    overflow: hidden;
    //border: 5px solid blue;
    object-position: left top;
    flex:1;

    @media screen and (max-width: 1036px){
      min-width: 445px;
    }
    @media screen and (max-width: 700px){
      /*display: flex;
      object-position: left top;*/
      min-width: unset;
      width:100%;
      z-index: 1;
    } 
`;

const SignupMain = styled.div`
  display: flex;
  max-width: 645px;
  min-width: 300px;
  padding-left: 50px;
  padding-right: 50px;
  flex-direction: column;

  @media screen and (max-width: 1036px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const LogoImg = styled.img`
  height: 40px;
  margin-bottom: 24px;
  margin-left: 0px;
  margin-right: auto;
  padding-left: 0px;
  margin-top: 24px;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    margin-top: 24px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const TxtTitle = styled.div`
  display: flex;
  font-size: 34px;
  font-family: "LatoBlack";
  line-height: 1.1;
  width: 80%;
  margin-bottom: ${SPACING.medium}px;
  color: ${({ theme }) => theme.textPrimary.color};

  @media screen and (max-width: 1036px) {
    margin-top: 0px;
    font-size: 28px;
  }

  @media screen and (max-width: 700px) {
    margin-top: 0px;
    font-size: 24px;
  }
`;

const TxtContent = styled.div`
  display: flex;
  font-size: ${FONT_SIZE.large}px;
  line-height: 1.3;
  width: 90%;
  margin-bottom: ${SPACING.large}px;
  color: ${({ theme }) => theme.textPrimary.color};

  @media screen and (max-width: 1036px) {
    margin-bottom: ${SPACING.medium}px;
    font-size: ${FONT_SIZE.medium}px;
  }

  @media screen and (max-width: 700px) {
    margin-bottom: ${SPACING.medium}px;
    font-size: ${FONT_SIZE.medium}px;
  }
`;

const TxtTitleLogin = styled.div`
  display: flex;
  font-size: 24px;
  font-family: "LatoBlack";
  margin-bottom: ${SPACING.medium}px;
  width: 80%;
  margin-top: 30px;
  color: ${({ theme }) => theme.textPrimary.color};

  @media screen and (max-width: 700px) {
    margin-top: 24px;
  }
`;

const TxtContentLogin = styled.div`
  display: flex;
  font-size: 28px;
  line-height: 1.3;
  width: 90%;
  margin-bottom: ${SPACING.extraLarge}px;

  @media screen and (max-width: 700px) {
    margin-bottom: ${SPACING.medium}px;
  }
`;

const LoginButtonLabel = styled.label`
  background: transparent;
  font-family: "LatoBlack";
  align-self: flex-start;
  color: white;
  font-size: 15px;
`;

const TxtLoginOption = styled.div`
display: flex;
    flex-direction: row,  
    font-size: ${FONT_SIZE.medium}px;
    text-align: center;
    justify-content: center;
    letter-spacing: 2px;
    margin-bottom: 24px;
 }

    @media screen and (max-width: 480px){
      flex-direction: column;
    } 
`;