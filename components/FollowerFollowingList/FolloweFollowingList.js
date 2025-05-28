import React, { useState } from "react";
import {
    ModalContainer,
    ChatContainer,
    BtnClose,
    Title,
} from "./FollowerFollowingList.elements";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useStore } from "../../stores/RootStore";
import { session, useSession } from "next-auth/client";
import { COLORS } from "../../styles/Styling.js";
import Close from "../../public/icons/close.svg";
import Icon from "../Icon/Icon";
import { ChatBox, Name } from "../SearchModalChat/SearchModalChat.elements";
import Avatar from "../Avatar/Avatar";
import { AvatarUrl } from "../../stores/tools";


//for grouping messages by days, a list of messages (one day) inside a list of days
export default inject("store")(
    observer(function FollowerFollowingList(props) {
        const rootstore = useStore();
        const [session, loading] = useSession();
        const [followers, setFollowers] = useState([]);
        const [following, setFollowing]= useState([]);
        const [followerSkip, setFollowerSkip]= useState(0)
        const [followingSkip, setFollowingSkip]= useState(0)
        const [followingHM, setFollowingHM]= useState(true)
        const [followerHM, setFollowerHM]= useState(true)
        const [followingTotal, setFollowingTotal] = useState(0)
        const [totalFollowers, setTotalFollowers]= useState(0)
        React.useEffect(() => {
            async function doEffect() {
                const newFollowers= await rootstore.getFollowers(props?.user?._id,followerSkip);
                setFollowers(newFollowers.data)
                setTotalFollowers(newFollowers.total)
                //console.log(newFollowers,"the followers")
                const newFollwing= await rootstore.getFollowing(props?.user?._id,followingSkip)
                setFollowing(newFollwing.data)
                //console.log(newFollwing,"the following")
                setFollowingTotal(newFollwing.total)
            }
            doEffect();
        }, []);


        async function fetchMoreFollowing (){
            
            let newSkip= followingSkip+20;
            if(newSkip<=followingTotal){
                setFollowingSkip(newSkip)
                 const {data}= await rootstore.getFollowing(props?.user?._id,newSkip)
                 setFollowing([...following, ...data])
            }
                else{
                    setFollowingHM(false)
                }
          
        }

        async function fetchMoreFollowers (){
            
            let newSkip= followerSkip+20;
            if(newSkip<=totalFollowers){
                setFollowerSkip(newSkip)
                 const {data}= await rootstore.getFollowers(props?.user?._id,newSkip)
                 setFollowers([...followers, ...data])
            }
                else{
                    setFollowerHM(false)
                }
          
        }

        const unamePress=(userName)=>{
            window.open('/' + userName,'_ blank')
          }
        
        

        return (
            <ModalContainer>
                <BtnClose onClick={props.onHideList}>
                    <Icon
                        strokeColor="white"
                        strokeWidth="4"
                        height="24px"
                        width="24px"
                        name={Close}
                    />
                </BtnClose>
                <Title style={{paddingTop:20}}>{props.listType}</Title>
                {props.listType==="FOLLOWING"  &&
                <ChatContainer id="scrollableDiv">
                    <InfiniteScroll
                        dataLength={following.length}
                        hasMore={followingHM}
                        loader={
                            <div style={{ alignSelf: "center" }}>
                                <ScaleLoader color={COLORS.purple} loading={true} size={150} />
                            </div>
                        }
                        scrollableTarget="scrollableDiv"
                        style={{
                            width: "100%",
                            flexDirection: "column",
                            overflowY: "hidden"
                        }}
                        next={fetchMoreFollowing}
                        scrollThreshold={0.5}
                       
                        //height={500}
                    >
                        {(following).map((suggestion, index) => (
                    <ChatBox key={index} >
                        <div>
                            <Avatar
                                src={AvatarUrl(suggestion.user.avatar, "s")}
                                size={'medium'}
                                alt={'Author Avatar'}
                                frame={false}
                                edit={false}
                            />
                            <Name onClick={()=>unamePress(suggestion.user.uname)} style={{cursor:"pointer"}}>{suggestion.user.uname !== "" ? suggestion.user.uname : "Anonymous"}</Name>
                        </div>
                    </ChatBox>
                ))}
                    </InfiniteScroll>
                </ChatContainer>
                            }
                            {props.listType==="FOLLOWERS"  &&
                <ChatContainer id="scrollableDiv">
                    <InfiniteScroll
                        dataLength={followers.length}
                        hasMore={followerHM}
                        loader={
                            <div style={{ alignSelf: "center" }}>
                                <ScaleLoader color={COLORS.purple} loading={true} size={150} />
                            </div>
                        }
                        scrollableTarget="scrollableDiv"
                        style={{
                            width: "100%",
                            flexDirection: "column",
                            overflowY: "hidden"
                        }}
                        next={fetchMoreFollowers}
                        scrollThreshold={0.5}
                       
                        //height={500}
                    >
                        {(followers).map((suggestion, index) => (
                    <ChatBox key={index} >
                        <div>
                            <Avatar
                                src={AvatarUrl(suggestion.user.avatar, "s")}
                                size={'medium'}
                                alt={'Author Avatar'}
                                frame={false}
                                edit={false}
                            />
                            <Name onClick={()=>unamePress(suggestion.user.uname)} style={{cursor:"pointer"}}>{suggestion.user.uname !== "" ? suggestion.user.uname : "Anonymous"}</Name>
                        </div>
                    </ChatBox>
                ))}
                    </InfiniteScroll>
                </ChatContainer>
                            }
            </ModalContainer>
        );
    })
);