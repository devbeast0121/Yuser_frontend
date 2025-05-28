import React, { useState, useEffect } from 'react';
import {
    MainMarketContainer,
    MarketPostsContainer,
    ItemBox,
    TopBox,
    BottomBox,
    TxtLarge,
    TxtSmall,
    BtnWrap,
    StatusBox,
    SubBoxTop,
    SubBoxBottom,
    BackdropOverlay,
    ImageNFT,
    TxtMedium
} from './MarketList.elements';
import { ethers } from 'ethers';
import Avatar from '.././Avatar/Avatar';
import Icon from ".././Icon/Icon";
import { inject, observer } from 'mobx-react';
import { ImageUrl, AvatarUrl, ImageTypes, PlayableTypes } from '../../stores/tools.js';
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import { useSession } from 'next-auth/client';
import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling.js';
import { useStore } from "../../stores/RootStore";
import NewNftModal from "../PostModal/NewNftModal";
import { useRouter } from 'next/router';


export default inject('store')(observer(
    function MarketList(props) {
        const rootStore = useStore();
        const [show, setShow] = useState(false); //PostModal
        const [choosenPost, setChoosenPost] = useState('');
        const [overlayVisible, setOverlayVisible] = useState(false); //BackdropOverlay
        const [session, loading] = useSession();
        const [selectedNft, setSelectedNft] = useState({})
        const [userInfo, setUserInfo] = useState({})
        const router = useRouter()

        /*
           OpenSideBarModal()
           William Doyle
           July 21st 2021
       */
        // function OpenSideBarModal(targPost, postPressing) {
        //     targPost._id = targPost.id;
        //     rootStore.localPosts.setPosts_single = [targPost];
        //     //rootStore.localPosts.push_posts_single = targPost;
        //     console.log("test",rootStore.localPosts.getPosts_single);
        //     if (ImageTypes.includes(targPost.type)) {
        //         setShow(true);
        //         setChoosenPost(targPost);
        //         return;
        //     }

        //     if (PlayableTypes.includes(targPost.type) && !postPressing) {
        //         setShow(true);
        //         setChoosenPost(targPost);
        //     }
        // }


        useEffect(() => {

        }, []);

        async function OpenSideBarModal(product) {
            // setChoosenPost(product[0].tokenid)
            // setSelectedNft(product[0])
            // setUserInfo(product[1])
            // setShow(true)

            var tokenIdProp = product.ContractId
            let tokenContractAddress = product.contractAddress;
            router.push({
                pathname: "/nft",
                query: {
                    tokenId: tokenIdProp,
                    contractAddress: tokenContractAddress
                }
            })
            //window.open('/nft' + '?tokenId=' + tokenIdProp + "&contractAddress=" + tokenContractAddress, "");

        }
        //onClick={() => { OpenSideBarModal(product)}}   //nft modal


        //Function to truncate a wallet address string
        function truncate(
            fullStr,
            strLen = 11,
            separator = "...",
            frontChars = 6,
            backChars = 5
        ) {
            // if (fullStr.length <= strLen) return fullStr;
            return (
                fullStr.substr(0, frontChars) +
                separator +
                fullStr.substr(fullStr.length - backChars));
        }

        var nfts = props.nfts;
        const unamePress=(userName)=>{
            if(userName){
                window.open('/' + userName,'_ blank')
            }
          }
        return (
            <MainMarketContainer>
                {nfts ?
                    <MarketPostsContainer>
                        {nfts.map((product) => (
                            <ItemBox key={product.image} product={product} >
                                <TopBox>
                                    {true && (product?.ownerInfo?.uname != product?.minterInfo?.uname) ?  // if an art job was collected by somebody.name and they are the same as the minter 
                                        <>
                                            <StatusBox positionLeft={true}>
                                                <Avatar
                                                    //src={product.authorAvatar} //just for dummy data
                                                    src={AvatarUrl(product?.ownerInfo?.avatar, "m")}
                                                    size={'small'}
                                                    alt={'Avatar'}
                                                    frame={true}
                                                    edit={false}
                                                    userName={product?.ownerInfo?.uname ? product.ownerInfo.uname : null}
                                                />
                                                <SubBoxTop positionLeft={true}>
                                                    <TxtSmall>{'Collected by'}</TxtSmall>
                                                    <TxtMedium
                                                        className="truncate-collection-name"
                                                        positionLeft={true}
                                                        onClick={()=>unamePress(product?.ownerInfo?.uname,)} style={{cursor:"pointer"}}

                                                    >
                                                        {product?.ownerInfo?.uname ? product.ownerInfo.uname : truncate(product.ownerInfo.walletAddress)}
                                                    </TxtMedium>
                                                </SubBoxTop>
                                            </StatusBox>
                                            <StatusBox positionLeft={false}>
                                                <SubBoxTop positionLeft={false}>
                                                    <TxtSmall>{'Minted by'}</TxtSmall>
                                                    <TxtMedium
                                                        className="truncate-collection-name"
                                                        positionLeft={false}
                                                        onClick={()=>unamePress(product?.minterInfo?.uname)} style={{cursor:"pointer"}}
                                                    >
                                                        {product?.minterInfo?.uname ? product.minterInfo.uname : truncate(product.minterInfo.walletAddress)}
                                                    </TxtMedium>
                                                </SubBoxTop>
                                                <Avatar
                                                    //src={product.authorAvatar} //just for dummy data
                                                    src={AvatarUrl(product?.minterInfo?.avatar, "m")}
                                                    size={'small'}
                                                    alt={'Avatar'}
                                                    frame={true}
                                                    edit={false}
                                                    userName={product?.minterInfo?.uname ? product.minterInfo.uname : null}
                                                />
                                            </StatusBox>
                                        </>
                                    :
                                        <StatusBox positionLeft={true}>
                                            <Avatar
                                                //src={product.authorAvatar} //just for dummy data
                                                src={AvatarUrl(product?.minterInfo?.avatar, "m")}
                                                size={'small'}
                                                alt={'Avatar'}
                                                frame={true}
                                                edit={false}
                                                userName={product?.minterInfo?.uname ? product.minterInfo.uname : null}
                                            />
                                            <SubBoxTop positionLeft={true}>
                                                <TxtSmall>{'Minted by'}</TxtSmall>
                                                <TxtMedium
                                                    className="truncate-collection-name"
                                                    positionLeft={true}
                                                    onClick={()=>unamePress(product?.minterInfo?.uname)} style={{cursor:"pointer"}}
                                                >
                                                    {product?.minterInfo?.uname ? product.minterInfo.uname : truncate(product.minterInfo.walletAddress)}
                                                </TxtMedium>
                                            </SubBoxTop>
                                        </StatusBox>
                                    }
                                </TopBox>

                                <ImageNFT
                                   // width="250px"
                                    //height="250px"
                                    onClick={() => { OpenSideBarModal(product)}}
                                    src={product.image + '?fit=clip&w=250&auto=format&dpr=2'} alt="NFT image"
                                />
                                <BottomBox>
                                    <TxtLarge
                                        className="truncate-collection-job-title"
                                        positionLeft={true}
                                    >
                                        {
                                            product.name + " #" + product.ContractId
                                        }
                                    </TxtLarge>
                                    <SubBoxBottom >
                                        {product.isListed ?
                                            <BtnWrap>
                                                <Icon height="auto" width="22px" name={Moonriver} />
                                                <TxtLarge style={{ paddingLeft: 7 }}>{Number.parseFloat(ethers.utils.formatEther(BigInt(product.listingDetails.salePrice))).toFixed(3)}</TxtLarge>
                                            </BtnWrap> :
                                            <BtnWrap>
                                            </BtnWrap>
                                        }
                                       {product.listingDetails ? (BigInt(product.listingDetails.auctionEnd) > 0 ?
                                        <Button
                                            text={"Bid"} 
                                            onClick={() => { OpenSideBarModal(product) }}
                                            isIcon={false}
                                            color={COLORS.purple}
                                            colorText={COLORS.white}
                                        />
                                        :
                                        <Button
                                            text={"Buy now"}
                                            onClick={() => { OpenSideBarModal(product) }}
                                            isIcon={false}
                                            color={COLORS.blue}
                                            colorText={COLORS.white}
                                            shadow={true}
                                        />
                                        ): null }  
                                    </SubBoxBottom>
                                </BottomBox>
                            </ItemBox>
                        ))}
                    </MarketPostsContainer>
                    : null
                }

                {
                    show &&

                    <NewNftModal
                        show={show}
                        setShow={setShow}
                        nft={selectedNft}
                        choosenPost={choosenPost}
                        userInfo={userInfo}
                    />
                }
                {/* {
                    overlayVisible && session ?
                        < BackdropOverlay onClick={closeOverlay} />
                        : null
                } */}
            </MainMarketContainer>
        )
    }
))