import React from 'react'
import {
    HashtagChallengeContainer,
    ContainerInner,
    HashtagTitle,
    HashtagText,
    SectionTop,
    SectionBottom,
    IconWrapper,
    ButtonWrapper,
    HashtagInfo,
    Background,
    HashtagTextTwo,
} from './HashtagChallenge.elements';
import Image from 'next/image';
import Button from '../Button/Button';
import Icon from ".././Icon/Icon";
import imageSrc from '../../public/images/signup/signup_bg.jpg';
import Ethereum from '../../public/icons/ethereum.svg';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import { useSession } from 'next-auth/client';
import client from '../../pages/api/client'
import Countdown from 'react-countdown';

const HashtagChallenge = () => {
    const [session, loading] = useSession();
    const [hashtagChallenge, setHashtagChallenge] = React.useState(null);



    React.useEffect(async () => {
        if (session) {
            const challenge = await client.service("get-hashtag-challenges").find({
                query: {
                    endDate: {
                        $gt: Date.now()
                    },
                    startDate: {
                        $lte: Date.now()
                    }
                }
            });
            if(challenge.data.length>0){
                //console.log(challenge.data)
                setHashtagChallenge(challenge?.data?.[0]);
            }
        }
    }, [session]);


    // console.log(Date(hashtagChallenge?.startDate));

    // function prettyDate(time) {
    //     var date = new Date(parseInt(time));
    //     return date.toLocaleTimeString('en-CA', {
    //         hour: '2-digit',
    //         minute: '2-digit'
    //     });
    // }
    // const date = prettyDate(hashtagChallenge?.startDate);
    // console.log(date)

    // ---------------------------------HASHTAG STRUCTURE---------------------------------

    // background: "https://yuser-assets.imgix.net/Hashtag_30Aug.png?fit=crop&crop=faces,middle,center&auto=compress&w=360&h=600&dpr=2&fm=jpg"
    // category: "hashtag"
    // description: "When moon?🤔Right now! Join Yuser in going #ToTheMoon in our first themed contest! Share your original art with #ToTheMoon in the caption for a chance to win!"
    // endDate: 1631042555000
    // entries: (3) [{…}, {…}, {…}]
    // hashtag: "#ToTheMoon"
    // image: "eth_icon"
    // rewards: {text: "$200 worth of ETH"}
    // startDate: 1630437755000
    // task: "Win $200 USD in ETH!"
    // winText: "Congratulations! You won $200 USD in ETH!"
    // _id: "61001fe39bea98763d78ed29"

    const dateConverter=(unixTime)=>{
        var d = new Date(unixTime)
        var c = new Date()
        var diff= (d-c)/36e5
        return Math.round(diff)
    }

    return (
        <>{
            hashtagChallenge !==null &&
            <HashtagChallengeContainer>
                <ContainerInner>
                    <Background>
                        <Image layout="fill" objectFit="cover" src={hashtagChallenge.background} alt="background image" />
                    </Background>
                    <HashtagInfo>
                        <SectionTop>
                            <HashtagTitle>{hashtagChallenge?.hashtag}</HashtagTitle>
                            <HashtagText>{hashtagChallenge?.description}</HashtagText>
                        </SectionTop>
                        <SectionBottom>
                            <IconWrapper>
                                <Icon width="auto" height="120px" name={Ethereum} className="MarginBottomMedium" />
                            </IconWrapper>
                            <HashtagText>{hashtagChallenge?.task}</HashtagText>
                            
                           
                            <Countdown date={hashtagChallenge.endDate} renderer={props => <HashtagTitle>{`${props.days}:${props.hours}:${props.minutes}:${props.seconds}`}{"  hrs"}</HashtagTitle>} ></Countdown>
                            
                            <HashtagTextTwo>{'until contest ends'}</HashtagTextTwo>
                        </SectionBottom>
                    </HashtagInfo>
                </ContainerInner>
                {/* <ButtonWrapper>
                    <Button
                        text={'More Contest'}
                        //onClick={renderProps.onClick}
                        isIcon={false}
                        color={COLORS.purple}
                        colorText={COLORS.white}
                        className={'MarginBottomMedium'}
                    />
                </ButtonWrapper> */}
            </HashtagChallengeContainer>
        }
            
        </>
    )
}

export default HashtagChallenge
