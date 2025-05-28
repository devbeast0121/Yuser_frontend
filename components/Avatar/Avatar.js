import React, { useState, useEffect } from 'react'
import {
    AvatarContainer,
    AvatarInner,
    AvatarImg,
    BtnAvatarEdit,
    DefaultAvatarContainer,
    CreatorIcon,
    NewChat
} from './Avatar.elements';
import Add from '../../public/icons/add.svg';
import Icon from ".././Icon/Icon";
import Link from 'next/link';
import AvatarDefault from '../../public/icons/profile.svg';
import { useStore } from '../../stores/RootStore';
import Check from '../../public/icons/check.svg'
import { COLORS } from '../../styles/Styling';


const Avatar = (props) => {
    const rootstore = useStore();
    const [ownsToken, setOwnsToken] = useState(false);
    const userName = props.userName == null ? "" : props.userName
    const userId = props.userId == null? "":props.userId
    const [creator, setCreator] = useState(false);
    const defaultAvatar = props.src == null ? true : props.src.toLowerCase().startsWith("https://yuser.imgix.net/null") ? true : false
    const defaultAvatarSize = props.size === "large" ? '90px' : props.size === "medium" ? '40px' : '25px';
    const defaultAvatarCircle = `https://yuser.imgix.net/defaultAvatarCircle.png?fit=clip&fm=webp$auto=format&dpr=2&w=50`;

    const checksize =  props.size === "large" ? '19px' : props.size === "medium" ? '9px' : '7px';

    useEffect(async () => {
        if (userName && userName !== "") {
            let ownsGem = await rootstore.ownsNextGem(userName)
            //console.log(userName,ownsGem);
            setOwnsToken(await rootstore.ownsNextGem(userName));
        }
    }, [])
    useEffect(async () => {
        if (userId && userId !== "") {
           let isCreator = await rootstore.userHasRole(userId,"isCreator");
           setCreator(isCreator);
        }
        //commenting because it is causing an error
        // else if(userName && userName !== ""){
        //     let returnedUser = await rootstore.getUserByUsername(userName);
        //     let isCreator = await rootstore.userHasRole(returnedUser.id,"isCreator");
        //     setCreator(isCreator);
        // }
        return function cleanup() {
            setCreator(false);
		}
    }, [props.userId])

    return (
        <>
            {props.navBar ?
                <AvatarContainer className={props.className} frame={props.src == null ? true : ownsToken} size={props.size} nft={ownsToken} onClick={props.onClickAvatar}>
                    <AvatarInner size={props.size}>
                        {defaultAvatar ?
                            <AvatarImg width={`${props.size}px`} height={`${props.size}px`} src={`https://yuser-assets.imgix.net/defaultAvatarCircle.png?fit=clip&w=${props.size}&fm=webp&auto=format&dpr=2`} alt={props.alt} size={props.size} />
                            :
                            <>
                                <AvatarImg width={`${props.size}px`} height={`${props.size}px`} src={props.src} alt={props.alt} size={props.size} />
                                {creator &&
                                <CreatorIcon size={props.size}>
                                    <Icon width={checksize} height={checksize} name={Check} />
                                </CreatorIcon>
                                }
                                {
                                   props.isUnread &&
                                    <NewChat ></NewChat>
                                }
                            </>
                        }
                    </AvatarInner>
                    {props.edit && true ?  //check login (now 'true') and do need edit
                        <BtnAvatarEdit>
                            <Icon width="12px" height="12px" name={Add} />
                        </BtnAvatarEdit>
                        : null}
                </AvatarContainer>
                :
                <Link href={'/' + userName} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                    <AvatarContainer className={props.className} frame={props.src == null ? true : ownsToken} size={props.size} nft={ownsToken}>
                        <AvatarInner size={props.size}>
                            {defaultAvatar ?
                                <AvatarImg width={`${props.size}px`} height={`${props.size}px`} src={`https://yuser-assets.imgix.net/defaultAvatarCircle.png?fit=clip&w=${props.size}&fm=webp&auto=format&dpr=2`} alt={props.alt} size={props.size} />
                                :
                                <>
                                    <AvatarImg width={`${props.size}px`} height={`${props.size}px`} src={props.src} alt={props.alt} size={props.size} />
                                    {creator &&
                                <CreatorIcon size={props.size}>
                                    <Icon width={checksize} height={checksize} name={Check} />
                                </CreatorIcon>
                                }
                                 {
                                   props.isUnread &&
                                    <NewChat  size={props.size} ></NewChat>
                                }
                                </>
                            }
                        </AvatarInner>
                        {props.edit && true ?  //check login (now 'true') and do need edit
                            <BtnAvatarEdit>
                                <Icon width="12px" height="12px" name={Add} />
                            </BtnAvatarEdit>
                            : null}
                    </AvatarContainer>
                    </a>
                </Link>
            }
        </>
    )
}

export default Avatar
