import React, { useState, useEffect } from 'react';
import {
    MarketPostsContainer,
    ItemBox,
    BottomBox,
    ImageNFT,
    BtnWrap,
    TxtLarge
} from './PostsListGrid.elements';
import Icon from ".././Icon/Icon";
import Gem from '../../public/icons/gem.svg';
import GemWhite from '../../public/icons/gem-white.svg';
import Comments from '../../public/icons/comments.svg';
import { inject, observer } from 'mobx-react';
import { useSession } from 'next-auth/client';
import { useStore } from '../../stores/RootStore';
import { useRouter } from 'next/router';


export default inject('store')(observer(
    function PostsListGrid(props) {
        const rootstore = useStore()
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



        useEffect(() => {

        }, []);


        //const commentGem = props.comment.gifted === 0 && props.comment.totalgems === 0 ? GemWhite : Gem

        async function OpenSideBarModal(product) {
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

        return (
            <MarketPostsContainer>
                {nfts.map((product) => (
                    <ItemBox key={product.image} product={product} >
                        <ImageNFT
                           // onClick={() => { OpenSideBarModal(product) }}
                            src={product.image + '?fit=clip&w=320&fm=webp$auto=format&dpr=2'} alt="NFT image"
                        />
                        <BottomBox>
                            <BtnWrap positionLeft={true}>
                                <Icon width="auto" height="24px" name={GemWhite} />
                                <TxtLarge style={{ textAlign: "left" }}>{"95.5k"}</TxtLarge>
                            </BtnWrap>
                            <BtnWrap positionLeft={false}>
                                <Icon width="auto" height="24px" name={Comments} />
                                <TxtLarge style={{ textAlign: "right" }} >{"45"}</TxtLarge>
                            </BtnWrap>
                        </BottomBox>
                    </ItemBox>
                ))}
            </MarketPostsContainer>
        )
    }
))