import React, { Component, useState } from 'react'
import {
  LoginButton,
  MainContainer,
  ProfileContainer,
  GoogleButton,
  FacebookButton,
  AppleButton, // this just is NOT exported by login.elements
  UsernameField,
  UsernameLabel,
  LogInLabel,
  BtnClose
} from './Login.elements'
import client from '../../pages/api/client';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import AppleLogin from 'react-apple-login'
import Google from '../../public/icons/google.svg';
import Apple from '../../public/icons/apple.svg';
import Facebook from '../../public/icons/facebook.svg';
import Icon from '../../components/Icon/Icon'
import Close from '../../public/icons/close.svg';
import { COLORS } from '../../styles/Styling';
import Button from '../Button/Button';
import FieldInput from '../Form/Field';
import { inject, observer, PropTypes } from 'mobx-react';
import RootStore, { useStore } from '../../stores/RootStore';
import Link from 'next/link';
import { CookieStorage } from "cookie-storage";
import { useRouter } from 'next/router'
import { runInAction } from 'mobx';
import { vout } from '../../stores/tools';

const cookieStorage = new CookieStorage();
const CLIENT_ID = "384932105507-fcd24ed62ghdj4hgq8ppki7esl1qrqu4.apps.googleusercontent.com"

export default inject('store')(observer(
  function Login(props) {
    //Declaring the the state variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()

    // Calling the login function from the root store.
    const localLogin = async (event) => {
      event.preventDefault()
      try {
        await props.store.authStore.localAuthentication(username, password)
      } catch (error) {
        throw error;
      }
      runInAction(() => {
        props.store.showLoginModal = false;     // sets the auth user variable
      })
      router.push('/', null, { shallow: true })
    }

    const responseGoogle = async (response) => {
      const { user } = await client.authenticate({

        strategy: "google",
        generatedToken: response.tokenId,
        type: "web-app"
      });
      vout(() =>
        console.log(user, "google login user")
      );
    }
    const responseFacebook = async (response) => {

      const { user } = await client.authenticate({

        strategy: "facebook",
        generatedToken: response.accessToken,
        type: "web-app"
      });

      vout(() => console.log(user, "fb login user"));
    }
    const responseApple = async (response) => {
      const { user } = await client.authenticate({

        strategy: "apple",
        generatedToken: response.id_token,
      });

      vout(() =>
        console.log(user, "apple login user")
      );
    }
    // }
    return (
      <ProfileContainer>
        <LogInLabel>Log In</LogInLabel>
        <AppleLogin
          clientId="yuserapp.com"
          redirectURI="https://ba8789aaa733.ngrok.io"
          responseType={"code"}
          responseMode={"query"}
          callback={responseApple}
          usePopup={true}
          autoLoad={false}
          render={(renderProps) => (
            <Button
              text={"Continue with Apple"}
              onClick={renderProps.onClick}
              isIcon={true}
              iconName={Apple}
              width={"24px"}
              color={COLORS.black}
              colorText={COLORS.white}
              className={"MarginBottomMedium"}
            />
          )}
        />

        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          theme={"dark"}
          autoLoad={false}
          usePopup={true}
          prompt={"consent"}
          render={(renderProps) => (
            <>
              <Button
                text={"Continue with Google"}
                onClick={renderProps.onClick}
                isIcon={true}
                iconName={Google}
                width={"24px"}
                color={COLORS.red}
                colorText={COLORS.white}
                className={"MarginBottomMedium"}
              />
            </>
          )}
        />

        <FacebookLogin
          appId="1274040629436731"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          render={(renderProps) => (
            <Button
              text={"Continue with Facebook"}
              onClick={renderProps.onClick}
              isIcon={true}
              iconName={Facebook}
              width={"24px"}
              color={COLORS.blue}
              colorText={COLORS.white}
              className={"MarginBottomMedium"}
            />
          )}
        />
        <div style={{ alignSelf: "center", margin: 15, fontWeight: "bold" }}>
          OR
        </div>
        {/* For local authentication*/}
        <UsernameLabel>Username</UsernameLabel>
        <FieldInput
          type="text"
          placeholder="Enter your username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <UsernameLabel>Password</UsernameLabel>
        <FieldInput
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button text={"Login"} onClick={localLogin} color={COLORS.purple} colorText={COLORS.white}/>

        <div style={{ marginTop: 12, flexDirection: "column", fontSize: 16 }}>
          Don’t have an account? Yuser is invite only. Ask a friend for an invite
          or check out our discord for daily invite drops.
        </div>
      </ProfileContainer>
    );
  }))


