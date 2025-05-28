import React from 'react'
import { NoticeComponent } from '../components'
import RootStore, { useStore } from "../stores/RootStore";
import NavFeed from '../components/NavFeed/NavFeed';
import SignupPromo from '../components/SignupPromo/SignupPromo';
import LoginBoxSidebar from '../components/LoginBox/LoginBoxSidebar';
import Footer from '../components/Footer/Footer';
import { useRouter } from "next/router"
import {
    Container,
    MiddleContainer,
    RightContainer,
    RightContainerInner,
    SideBarLeftBlock
} from "../styles/globalStyles";
import Gem from '../public/icons/gem.svg';
import ErrorImg from '../public/icons/error.svg';
import { useSession } from 'next-auth/client';
import { SignupDescription } from '../components/LoginMain/Login.elements';
//Data deletion instructions url for facebook
const DataDeletion = () => {
    const rootstore = useStore();

    const router = useRouter();
    const noticeType = router.query.type    // "/404" path type "notice" -> "coming soon" page

    const bigIcon = noticeType === "notice" ? Gem : ErrorImg
    const firstLine = noticeType === "notice" ? "Coming soon..." : "404"
    const secondLine = noticeType === "notice" ? "this feature is coming soon" : "We can't find what you're looking for."
    const [session, loading] = useSession();

    return (
        <>
            <Container>
                <MiddleContainer>
                    <div><b style={{ fontSize: 45, padding: 24 }}>Data Deletion Instructions URL</b></div>

                    <div style={{ flexDirection: "column", lineHeight: 1.5, paddingLeft: 24, paddingRight: 24 }}>
                        REBL is a new social platform built for you – the creator. On REBL, you can get noticed and monetize. You can buy with your likes and sell your content as NFTs.
                        REBL does not save any of your personal data to the server. Yet according to facebook it is mandatory according to Apps and Websites Platform rules, to
                        provide a Data Deletion Instructions URL.
                        <p>If you want to delete your activities through REBL from facebook, please follow the below instructions:</p>

                        <p>1. Go to Your Facebook Account’s Setting & Privacy. Click ” Settings “.</p>
                        <p>2. Go to Apps and Websites</p>
                        <p>3. Find REBL from the list and click on Remove</p>
                        <p>4. An alert box appears with all the deletion information</p>
                        <p>5. Select the check box <b>Delete posts, videos or events that REBL posted on your timeline</b> if you want to remove the content by REBL on Facebook </p>
                        <p>6. Select the check box <b>Allow Facebook to notify REBL that your login connection has been removed. They may offer you another way to log in</b> to acknowledge REBL about data deletion</p>
                        <p>7. Click on <b>Remove</b></p>
                        <p>8. Congratulations. You have successfully removed REBL from your Facebook account.</p>

                    </div>
                </MiddleContainer>
                <RightContainer>
                    <RightContainerInner>
                        {!session &&
                            <>
                                <SignupPromo
                                    title={'shape the future'}
                                    text={'of social media'}
                                />
                                <LoginBoxSidebar
                                    title={'Login to post'}
                                    textOne={'Login to post to REBL'}
                                    textTwo={"Don't have an account? Check out our discord for invites"}
                                />
                            </>
                        }
                    </RightContainerInner>
                    <SideBarLeftBlock>
                        <Footer />
                    </SideBarLeftBlock>
                </RightContainer>
            </Container>
        </>
    )
}

export default DataDeletion