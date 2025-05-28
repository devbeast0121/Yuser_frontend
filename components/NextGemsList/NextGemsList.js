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
    ButtonMore,
    BtnText
} from './NextGemsList.elements';
import { ethers } from 'ethers';
import Avatar from '.././Avatar/Avatar';
import Icon from ".././Icon/Icon";
import { inject, observer } from 'mobx-react';
import { ImageUrl, AvatarUrl, ImageTypes, PlayableTypes } from '../../stores/tools.js';
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import { useSession } from 'next-auth/client';
import { useStore } from '../../stores/RootStore';
import NewNftModal from "../PostModal/NewNftModal";
import { useRouter } from 'next/router';
import Link from 'next/link'


export default inject('store')(observer(
    function NextGemsList(props) {
        const rootstore = useStore()
        const [show, setShow] = useState(false); //PostModal
        const [choosenPost, setChoosenPost] = useState('');
        const [overlayVisible, setOverlayVisible] = useState(false); //BackdropOverlay
        const [session, loading] = useSession();
        const [selectedNft, setSelectedNft] = useState({})
        const [userInfo, setUserInfo] = useState({})
        const router = useRouter()

        ///------------------ TODO: separate the search and getting AllNextGems, be careful with search, filter and sort

        const [isSearching, setIsSearching] = useState(false)
        const [offset, setOffset] = useState(0)
        const [displayNumber, setDisplayNumber] = useState(6)
        const [nfts, setNfts] = useState([]);
        const [hasMore, setHasMore] = useState(false)

        const filterOptions = ["Token Id", "Ending Soon", "Recently Listed", "Recently Sold", "Last Sale Price", "Current Price"]
        const sortOptions = ["High to Low", "Low to High"]
        const [totalLoopNumber, setTotalLoopNumber] = useState(0)
        const [searchTerms, setSearchTerms] = useState("");
        const [onlyListed, setOnlyListed] = useState(false);
        const [isFilterOpen, setIsFilterOpen] = useState(false);
        const [isSortOpen, setIsSortOpen] = useState(false);
        const [filterChoice, setFilterChoice] = useState("ContractId");
        const [sortDirection, setSortDirection] = useState("asc");
        const [totalResults, setTotalResults] = useState(0);
        const [selectedFilter, setSelectedFilter] = useState(null);
        const [sortSelection, setSortSelection] = useState(null);

        React.useEffect(() => {
            async function doEffect() {
                setNfts([]);
                setTotalResults(0);
                if (!isSearching) {
                    let newOffset = 0;
                    let retunedNfts = await rootstore.getAllNextGems(4, 0, onlyListed, filterChoice, sortDirection);
                    let totalSupply = 0;
                    if (retunedNfts.length !== 0) {
                        totalSupply = retunedNfts[0].totalSupply;
                        setTotalResults(totalSupply);
                    }
                    if (totalSupply > 0) {
                        setTotalLoopNumber(totalSupply)
                        setHasMore(true);
                    }
                    if (totalSupply === 0) {
                        setHasMore(false);
                    }
                    else if (retunedNfts.length >= totalSupply) {
                        setHasMore(false);
                    }
                    setOffset(retunedNfts.length);
                    setDisplayNumber(6 + retunedNfts.length);
                    setNfts(retunedNfts)
                    if (retunedNfts) {
                        //console.log(retunedNfts.length,"length of the nfts returned")
                    }
                }
                else {
                    let tokens = await rootstore.searchNftListings(searchTerms, 6, 0, filterChoice, sortDirection);
                    if (!tokens || tokens.length === 0) {
                        setHasMore(false);
                        setTotalLoopNumber(0);
                        setNfts([])
                        setOffset(0);
                        setDisplayNumber(6);
                    }
                    else {
                        let totalSupply = tokens[0].totalSupply;
                        setTotalResults(totalSupply);
                        if (tokens.length >= totalSupply || totalSupply === 0) {
                            setHasMore(false);
                            setTotalLoopNumber(totalSupply)
                        }
                        else {
                            setHasMore(true);
                            setTotalLoopNumber(totalSupply);
                        }

                        setOffset(tokens.length);
                        setDisplayNumber(6 + tokens.length);
                        setNfts(tokens);
                    }
                }
            }
            doEffect();
        }, [isSearching, onlyListed, searchTerms, filterChoice, sortDirection]);

        //-------------- end 
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



        return (
            <MainMarketContainer>
                {nfts ?
                    <MarketPostsContainer>
                        {nfts.map((product) => (
                            <ItemBox key={product.image} product={product} >
                                <TopBox>
                                    {true ?  // if an art job was collected by somebody.name
                                        <StatusBox positionLeft={true}>
                                            <Avatar
                                                //src={product.authorAvatar} //just for dummy data
                                                src={AvatarUrl(product?.ownerInfo?.avatar, "m")}
                                                size={'medium'}
                                                alt={'Avatar'}
                                                frame={false}
                                                edit={false}
                                                userName={product?.ownerInfo?.uname ? product.ownerInfo.uname : null}
                                            />
                                            <SubBoxTop positionLeft={true}>
                                                <TxtSmall>{'Owned by'}</TxtSmall>
                                                <TxtLarge
                                                    className="truncate-collection-name"
                                                    positionLeft={true}
                                                >
                                                    {product?.ownerInfo?.uname ? product.ownerInfo.uname : truncate(product.ownerInfo.walletAddress)}
                                                </TxtLarge>
                                            </SubBoxTop>
                                        </StatusBox>
                                        : <StatusBox positionLeft={true} />
                                    }
                                </TopBox>

                                <ImageNFT
                                    onClick={() => { OpenSideBarModal(product) }}
                                    src={product.image + '?fit=clip&w=320&fm=webp$auto=format&dpr=2'} alt="NFT image"
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
                <ButtonMore>
                    <Link href='/market' passHref>
                        <BtnText>{'Load more'}</BtnText>
                    </Link>
                </ButtonMore>
            </MainMarketContainer>
        )
    }
))