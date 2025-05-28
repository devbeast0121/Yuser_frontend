import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react';
import { FEED_TYPES } from '../../../components/NavFeed/NavFeed'
//import props.store.localPosts from '../../stores/props.store.localPosts'
import { useSession } from 'next-auth/client';
import { PostTarget } from "../../../components";
import { Container, FullContainer } from "../../../styles/globalStyles";
import { getSinglePost } from '../../api/neo4j';
import superjson from 'superjson';
import { NextSeo } from 'next-seo';

export default inject('store')(observer(
    function PostView(props) {
        const [targetPost, setTargetPost] = useState(superjson.parse(props?.post));
        const [show, setShow] = useState(false)
        const [session, loading] = useSession();

        useEffect(async () => {
            async function doEffect() {
                if (targetPost) {
                    props.store.localPosts.setPosts_single = [targetPost];
                    props.store.setFeedType(FEED_TYPES.SINGLE);
                    props.store.setSelectedPost(targetPost);
                }

            }
            await doEffect().then(() => setShow(true))
        }, [targetPost]);
        
        useEffect(()=>{
            let viewStart = new Date().getTime();
            props.store.createViewRelationship({type:"opencomment",postId:targetPost.id});
            return ()=>{
                let duration = (new Date().getTime() - viewStart)/1000.0;
                props.store.createViewRelationship({type:"opencomment",postId:targetPost.id,duration});
            }
        },[])


        //------------ the app message (inform/success/error)

        const [messageVisible, setMessageVisible] = useState(false)
        const [message, setMessage] = useState('')
        const [messageType, setMessageType] = useState('')

        //showing the app message (inform/success/error)   Working example: settings.js,  Natalia
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


        if (!targetPost?.text || targetPost?.text === '') {

            var _description = `A media post from @${targetPost?.user?.uname} on Yuser`
        }
        else {
            var _description = targetPost?.text
        }

        async function handleSearch(event) {
            //TODO
        }


        return (
            <>
                <NextSeo
                    title={` ${targetPost?.user?.uname} | REBL`}
                    description={_description}
                    canonical="https://yuser.co"
                    openGraph={{
                        url: `https://yuser.co/post/${targetPost?._id}`,
                        title: ` ${targetPost?.user?.uname} | REBL`,
                        description: _description,
                        site_name: 'REBL',
                        images: [
                            {
                                url: `${targetPost?.thumbnail}`,
                                width: 1200,
                                alt: ` ${targetPost?.text}`,
                            },]
                    }}

                />
                <Container>
                    <FullContainer style={{ flexDirection: "column" }}>
                        {
                            show &&
                            <PostTarget
                                targetPostId={targetPost._id}
                            />
                        }

                    </FullContainer>
                    {/*} this position may be wrong, insert it in a middle container or by context Natalia
                {messageVisible &&
                    <MessageAppComponent
                        showAppMessage={showAppMessage}
                        type={messageType}
                        textMessage={message}
                    />
                } */}
                </Container>
            </>
        )
    }
))


export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await getSinglePost(id);
    const post = superjson.stringify(res.post)
    const user = superjson.stringify(res.user)

    if (res.status === 404) {

        return {
            redirect: {
                destination: '/404',
                permanent: false,
            }
        }
    } else {
        return {
            props: {
                post: post,
                user: user
            }
        }
    }
}