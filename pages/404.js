import React from 'react'
import { NoticeComponent } from '../components'
import RootStore, { useStore } from "../stores/RootStore";
import SignupPromo from '../components/SignupPromo/SignupPromo';
import LoginBoxSidebar from '../components/LoginBox/LoginBoxSidebar';
import Footer from '../components/Footer/Footer';
import { useRouter } from "next/router"
import {
    Container,
    MiddleContainer,
    RightContainerInner,
    RightContainer,
    SideBarLeftBlock
} from "../styles/globalStyles";
import Gem from '../public/icons/gem.svg';
import ErrorImg from '../public/icons/error.svg';
import { useSession } from 'next-auth/client';
import Image from "../public/images/nextGemsLaunchBanner.jpg";

const Notice = () => {
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
                    <NoticeComponent
                        icon={bigIcon}
                        firstLine={firstLine}
                        secondLine={secondLine}
                    />
                </MiddleContainer>
                <RightContainer>
                    <RightContainerInner>
                        <SignupPromo
                            src={Image}
                        />
                        {!session &&
                            <>
                                <LoginBoxSidebar
                                    title={'Login to post'}
                                    textOne={'Login to post to yuser'}
                                    textTwo={"Don't have an account? Check out our discord for invites"}
                                />
                            </>
                        }
                        <SideBarLeftBlock>
                            <Footer />
                        </SideBarLeftBlock>
                    </RightContainerInner>
                </RightContainer>
            </Container>
        </>
    )
}

export default Notice