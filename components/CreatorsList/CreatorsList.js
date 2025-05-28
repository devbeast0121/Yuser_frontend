import React from 'react'
import {
    Stats,
    CreatorsListContainer,
    CreatorBox,
    TxtLarge,
    TxtTitle,
    Line,
} from './CreatorsList.elements';
import Avatar from '.././Avatar/Avatar';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { ImageUrl, AvatarUrl,  ImageTypes, PlayableTypes } from '../../stores/tools.js';


export default inject('store')(observer(
    function CreatorsList(props) {
        const router = useRouter()
        function openCollection(creator) {
            router.push({
                pathname: "/collection",
            });
        }
        let namesInList = [];
        var postList = []
        postList = props.posts.filter((post)=>{if(!namesInList.includes(post.authorName)){namesInList.push(post.authorName);return post}})
        return (
            <>
                <CreatorsListContainer>
                    <TxtTitle>{'Creators'}</TxtTitle>
                    {postList.map((creator, index) => (
                        <Stats key={index}>
                            <>{console.log(creator)}</>

                            <CreatorBox key={index} creator={creator} onClick={() => openCollection(creator)}>
                                <Avatar src={AvatarUrl(creator.authorAvatar, "s")} size={'medium'} alt={'Avatar'} frame={false} edit={false} userName={creator.authorName} />
                                <TxtLarge>{creator.authorName}</TxtLarge>
                            </CreatorBox>
                            <Line />
                        </Stats>
                    ))}
                </CreatorsListContainer>
            </>
        )
    }
))