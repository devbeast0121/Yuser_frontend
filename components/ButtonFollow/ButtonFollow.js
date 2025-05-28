import React, { useEffect, useState } from 'react'
import {
    ButtonContainer,
    IconContainer,
    TextContainer,
} from './ButtonFollow.elements';
import Icon from ".././Icon/Icon";
import { motion } from "framer-motion";
import { duration } from '@material-ui/core';
import { useStore } from '../../stores/RootStore';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/client';
import check from '../../public/icons/check.svg';

const ButtonFollow = (props) => {

    const [btnText, setBtnText] = useState('Follow');
    const [followed, setFollowed] = useState(false);
    const rootstore = useStore();
    const router = useRouter();
    const [session, loading] = useSession();

    //console.log(props);
    //console.log(session);

    const onClickFollow = async () => {
        if (!session) {
            router.push('/signin', null, { shallow: true });
            return;
        }

        if (props.userId === session.user._id) {
            router.push({
                pathname: "/404",
                query: { type: "notice" }  //   "/404" path type "notice" -> "coming soon" page
            });
        } else {
            if (followed) // we currently follow -> should unfollow
                await rootstore.unfollowUser(props.userId);
            else
                await rootstore.followUser(props.userId);
            setFollowed(!followed)
        }
    }

    const variants = {
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
    }



    useEffect(() => {
        if (props.userId === session?.user?._id && props.modal) {
            setBtnText('');
        } else if (props.userId === session?.user?._id && router?.pathname !== '/profile') {
            setBtnText('');
        } else if (props.userId === session?.user?._id && router?.pathname === '/profile') {
            setBtnText('Edit Profile');
        } else { setBtnText('Follow'); }
    }, [router, router?.pathname,session]);

    useEffect(() => {

        async function doEffect() {
            //  if auth user is following this user set Followd to true
            //  console.log(`STUB: [ButtonFollow.js] wanted userId is ${props.userId}`);

            // if not logged in button should say follow, and should ask the user to login if they press it
            if (!session) {
                setFollowed(false);
                //      console.warn(`[ButtonFollow.js] user not logged in`);
                return () => {
                    // This is its cleanup.
                };
            }

            if (props?.userId)
                setFollowed(await rootstore.doIFollowUser(props.userId));
            // else
            // console.warn(`STUB: [ButtonFollow.js] no userId`);
        }
        doEffect();
    }, [followed, props?.userId, session]);

    return (
        <>
            <motion.div
                whileHover={{ opacity: 0.95 }}
                whileTap={{ opacity: 0.85, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                onClick={onClickFollow}
            >
                <ButtonContainer
                    btnText={btnText}
                    size={props.size}
                    colored={props.colored}
                    border={props.border}
                    followed={props.userId === session?.user?._id ? false : followed}
                >
                    {props.userId === session?.user?._id ?
                        < TextContainer followed={false}>
                            {btnText}
                        </TextContainer>
                        :
                        <>
                            <motion.div
                                onClick={onClickFollow}
                                variants={variants}
                                initial={followed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                exit={followed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                animate={followed ? 'visible' : 'hidden'}
                            >
                                <IconContainer followed={followed}>
                                    <Icon strokeWidth="2" height="24px" width="24px" name={check} />
                                </IconContainer>
                            </motion.div>
                            <motion.div
                                onClick={onClickFollow}
                                variants={variants}
                                initial={followed ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                                exit={followed ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                                animate={followed ? 'hidden' : 'visible'}
                                style={{ position: "absolute", zIndex: 9, }}
                            >
                                <TextContainer followed={followed} size={props.size}>
                                    {btnText}
                                </TextContainer>
                            </motion.div>
                        </>
                    }
                </ButtonContainer>
            </motion.div>
        </>
    )
}

export default ButtonFollow
