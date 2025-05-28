import React, { useEffect, useState, useRef } from 'react'
import client from '../../pages/api/client';
import { DetermineSource, AvatarUrl } from '../../stores/tools';
import { SPACING } from '../../styles/Styling';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import {
    GridContainer, PostContainer, PostTopBar,PostImage, BoldText, UserSection, GemSection, PostImageContainer
} from "./HomepagePostGrid.elements"
import gem from "../../public/icons/gem.svg"
import numeral from 'numeral';
import MuxVideo from '../MuxVideo/MuxVideo';


const HomepagePostGrid = ( props )=>{

    const[posts,setPosts] = useState([]);
    const [height,setHeight] = useState(250);
    const [width,setWidth] = useState(250);
    const imgContainerRef = useRef([]);
    useEffect(async ()=>{
        const clientTimestamp = new Date().getTime();
        let allPosts = await client.service("trendfeed-exposable").find(({query:{clientTimestamp,limit:6}}));
        let newPosts = allPosts.data?.splice(0,6);
        setPosts(newPosts);
    },[])

    useEffect(()=>{
        getDimensions();
        if(window){
            window.addEventListener('resize',getDimensions);
        }
        return () => window?.removeEventListener('resize',getDimensions);
    },[])



    const getDimensions = () =>{
        let height = 250;
        let width = 250;
        let ref = imgContainerRef.current[0];
        if(ref){
            height = ref.clientHeight;
            width = ref.clientWidth;
        }
        setWidth(width);
        setHeight(height);
    
        return {height,width}
    }

    const unamePress=(userName)=>{
        window.open('/' + userName,'_ blank')
      }

    const renderTopBar = (post) =>{
        return(
            <PostTopBar>
                <UserSection>
                    <Avatar
                        src={AvatarUrl(post?.user?.avatar, "m")}
                        size={'medium'}
                        alt={'Avatar'}
                        frame={true}
                        edit={false}
                        userName={post?.user?.uname}
                    />
                    <BoldText style={{marginLeft:SPACING.small, cursor:"pointer"}} onClick={()=>unamePress(post?.user?.uname)} >{post?.user?.uname}</BoldText>
                </UserSection>
                <GemSection>
                    <Icon
                        width="auto"
                        height="25px"
                        name={gem}
                    />
                    <BoldText style={{marginLeft:SPACING.small}}>{numeral(post.gems).format(0,0)}</BoldText>
                </GemSection>
            </PostTopBar>
        )
    }

    return(
        <GridContainer>
            {posts.map((post,index)=>{
                return(
                    <PostContainer key={post._id}>
                        {renderTopBar(post)}
                        {post?.type.startsWith("image") ? 
                            <PostImage src={DetermineSource(post?.asset,post?.type,null,{height,width},false,true)} onClick={()=>props?.onPressPost(post)} ref={ ref => imgContainerRef.current[index] = ref}/> :
                            ( post?.thumbnail ? 
                                <PostImage src={`https://image.mux.com/${post?.asset}/thumbnail.png?fit_mode=smartcrop&height=${height}&width=${width}`} onClick={()=>props?.onPressPost(post)} ref={ ref => imgContainerRef.current[index] = ref}/> :
                                <PostImage src={`${post.thumbnail}?fit=crop&crop=focalpoint&w=${width}&h=${height}`} onClick={()=>props?.onPressPost(post)} ref={ ref => imgContainerRef.current[index] = ref}/>
                            )
                        }
                    </PostContainer>
                )
            })}
        </GridContainer>
    )

}
export default HomepagePostGrid