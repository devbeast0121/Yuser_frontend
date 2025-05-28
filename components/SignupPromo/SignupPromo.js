import React, { useEffect,useState,useRef } from 'react';
import {
    SignupBoxContainer,
    InviteCodeContainer,
    InviteHeader,
    IconWrapper,
    SectionBox,
    CopyButton,
    HeaderBodyText,
    HeaderTitleText,
    SignupModalOverlay,
    TitleOverlay,
    SignupModalContainer,
    ImageBox,
    ItemImage,
    StoreDiv,
    StoreImage,
    FooterText
} from './SignupPromo.elements';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { session, useSession } from 'next-auth/client';
import Icon from '../Icon/Icon';
import Gem from "../../public/icons/gem-pink.svg";
import CopyToClipboard from 'react-copy-to-clipboard';
import client from '../../pages/api/client';
import { COLORS } from "../../styles/Styling";




const SignupPromo = (props) => {
    const router = useRouter()
    const [inviteCode,setInviteCode] = useState("");
    const [inviteCodeCopied,setInviteCodeCopied] = useState(false);
    const [signupModalVisible, setSignupModalVisible] = useState(false);
    const [session, loading] = useSession();
    const copyRef = useRef(null);


    
    useEffect(async ()=>{
        try{
            if(!session?.user){
                return;
            }
            let { invitesRemaining, inviteCode } = await client.service('generate-invite-code').create({});
            setInviteCode(inviteCode);
        }
        catch(err){
        }
    },[session])

    function handleCopy(){
        setInviteCodeCopied(true);
        setTimeout(()=>{
            setInviteCodeCopied(false)
        },3000);
    }

    function handleClick(){
        copyRef.current.onClick();
    }

    function toggleSignupModal(toggle){
        setSignupModalVisible(toggle);
    }


    return (
        <>
        {inviteCode ? 
            <InviteCodeContainer>
                <InviteHeader>
                    <IconWrapper>
                        <Icon width="auto" height={"50px"} name={Gem} />
                    </IconWrapper>
                    <SectionBox>
                        <HeaderTitleText>{"Invite & get rewarded"}</HeaderTitleText>
                        <HeaderBodyText>{"Invite others to REBL with your invite code and get more Gems"}</HeaderBodyText>
                    </SectionBox>
                </InviteHeader>
                <CopyButton onClick={handleClick}>
                    <CopyToClipboard text={inviteCode} onCopy={handleCopy} ref={copyRef}>
                        <div style={{flexDirection:"column",alignItems:"center"}}>
                            <p style={{ fontFamily: "LatoBlack", color: COLORS.white }}>
                                {!inviteCodeCopied ? inviteCode : "Invite code copied!"}
                            </p>
                        </div>
                    </CopyToClipboard>
                </CopyButton>
                <FooterText>{"Tap to copy your invite code"}</FooterText>
            </InviteCodeContainer>
            : ( !session ?
            <SignupBoxContainer onClick={()=>toggleSignupModal(true)}>
                <Image width="300px" height="337px" layout="intrinsic" objectFit="contain" src={"https://yuser-assets.imgix.net/SignupBanner.png"} alt="a background image for the signup promo" />
            </SignupBoxContainer>
            :null )
            
        }
        {signupModalVisible && 
            <SignupModalOverlay onClick={()=>toggleSignupModal(false)}>
                <SignupModalContainer>
                    <TitleOverlay fontSize={71}>SIGNUP</TitleOverlay>
                    <TitleOverlay fontSize={49}>ON MOBILE</TitleOverlay>
                    <ImageBox>
                        <ItemImage
                          reverse={props.reverse}
                          objectFit="cover"
                          src={
                            "https://yuser-assets.imgix.net/frame.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
                          }
                        />
                    </ImageBox>
                    <>
                        <StoreDiv>
                            <StoreImage src={"https://yuser-assets.imgix.net/appleStore.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"} alt="apple" />
                            <StoreImage src={"https://yuser-assets.imgix.net/googlePlayStore.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"} alt="google" />
                        </StoreDiv>
                    </>
                </SignupModalContainer>
            </SignupModalOverlay>
        }
        </>
    )
}

export default SignupPromo
