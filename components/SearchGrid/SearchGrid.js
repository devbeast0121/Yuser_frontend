import React, { useEffect, useState, useRef } from 'react'
import client from '../../pages/api/client';
import { DetermineSource, AvatarUrl } from '../../stores/tools';
import { SPACING } from '../../styles/Styling';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import {
    GridContainer,
    PostContainer,
    PostTopBar,
    PostImage,
    BoldText,
    UserSection,
    GemSection,
    PostImageContainer,
    BottomBox,
    BtnWrap,
    TxtLarge
} from "./SearchGrid.elements"
import gem from "../../public/icons/gem.svg"
import numeral from 'numeral';
import MuxVideo from '../MuxVideo/MuxVideo';
import Numeral from "react-numeral";
import GemWhite from "../../public/icons/gem-white.svg";
import Comments from "../../public/icons/comments.svg";
import { useStore } from "../../stores/RootStore";

const SearchGrid = (props) => {
    const rootstore = useStore();
    const [posts, setPosts] = useState([]);
    const [height, setHeight] = useState(250);
    const [width, setWidth] = useState(250);
    const imgContainerRef = useRef([]);

    useEffect(async () => {
        if (props.posts.length > 0) {
            setPosts(props.posts);
        }
    }, [])

    useEffect(() => {
        getDimensions();
        if (window) {
            window.addEventListener('resize', getDimensions);
        }
        return () => window?.removeEventListener('resize', getDimensions);
    }, [])



    const getDimensions = () => {
        let height = 250;
        let width = 250;
        let ref = imgContainerRef.current[0];
        if (ref) {
            height = ref.clientHeight;
            width = ref.clientWidth;
        }
        setWidth(width);
        setHeight(height);

        return { height, width }
    }

    const unamePress = (userName) => {
        window.open('/' + userName, '_ blank')
    }

    function GiftAmoundDisplay(post) {
        const g = (() => {
            if (!rootstore.local_gifting_state_has(post._id)) return post?.gems;
            // return rootstore.local_gifting_state_get(post_id) + (props?.post?.gems ?? 0)- (props?.post?.gifted ?? 0); // amount gifted this session + amount gifted by all users - amount gifted in previous sessions (last step removes duplcates)
            return calculateCurrentAmountGifted(
                rootstore.local_gifting_state_get(post._id)
            )(post?.gems)(post?.gifted);
        })();

        if (g === undefined || !(g > 0)) return <TxtLarge>{"Gift"}</TxtLarge>;

        if (g > 999)
            return (
                <TxtLarge style={{ fontSize: 12 }}>
                    <Numeral className="BoldFontExtraSmall" value={g} format={"0.0a"} />
                </TxtLarge>
            );
        return <TxtLarge style={{ fontSize: 12 }}>{g}</TxtLarge>;
    }

    const openPost = (post) => {
        console.log(post)
        window.open("/post/" + post?._id, "");
      };
  
   

    return (
        <GridContainer>
            {posts.map((post, index) => {
                return (
                    <PostContainer key={post._id}>
                        {post?.type.startsWith("image") ?
                            <PostImage src={DetermineSource(post?.asset, post?.type, null, { height, width }, false, true)} onClick={() => openPost(post)} ref={ref => imgContainerRef.current[index] = ref} /> :
                            (post?.thumbnail ?
                                <PostImage src={`https://image.mux.com/${post?.asset}/thumbnail.png?fit_mode=smartcrop&height=${height}&width=${width}`} onClick={() => openPost(post)} ref={ref => imgContainerRef.current[index] = ref} /> :
                                <PostImage src={`${post.thumbnail}?fit=crop&crop=focalpoint&w=${width}&h=${height}`} onClick={() => openPost(post)} ref={ref => imgContainerRef.current[index] = ref} />
                            )
                        }
                        <BottomBox>
                            <BtnWrap positionLeft={true}>
                                <Icon
                                    width="auto"
                                    height="24px"
                                    name={GemWhite}
                                    shadow={"true"}
                                />
                               {post.gems}
                            </BtnWrap>
                            <BtnWrap positionLeft={false}>
                                <Icon
                                    width="auto"
                                    height="24px"
                                    name={Comments}
                                    shadow={"true"}
                                />
                                <TxtLarge
                                    style={{ textAlign: "right", fontSize: 12 }}
                                >
                                    {post?.comments > 999 ? (
                                        <Numeral
                                            className="BoldFontExtraSmall"
                                            value={post.comments}
                                            format={"0.0a"}
                                        />
                                    ) : (
                                        post.comments
                                    )}
                                </TxtLarge>
                            </BtnWrap>
                        </BottomBox>
                    </PostContainer>
                )
            })}
        </GridContainer>
    )

}
export default SearchGrid