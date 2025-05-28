import React, { useEffect, useState } from "react";
import {
  MainWalletContainer,
  WalletPostsContainer,
  ItemBox,
  TopBox,
  ContentSection,
  BottomBox,
  TxtLarge,
  TxtSmall,
  BtnWrap,
  StatusBox,
  SubBoxTop,
  SubBoxBottom,
  BackdropOverlay,
  ContentImage,
  TxtLargeUname,
  NftEmpty,
  NftTitle,
  NftDescription,
  NftImage,
  Text,
} from "./WalletList.elements";
import Avatar from ".././Avatar/Avatar";
import Icon from ".././Icon/Icon";
import { inject, observer } from "mobx-react";
import Movr from "../../public/icons/moonriver_logo3.svg";
import Silhouette from "../../public/images/silhouette.jpg";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  ImageUrl,
  AvatarUrl,
  ImageTypes,
  PlayableTypes,
} from "../../stores/tools.js";
import Image from "next/image";
import { posts } from "../../public/data/HomeData.js";
import Gem from "../../public/icons/gem-pink.svg";
import Ethereum from "../../public/icons/ethereum.svg";
import { useSession } from "next-auth/client";
import PostModal, { BUTTON_TYPES } from "../PostModal/PostModal";
import NewNftModal from "../PostModal/NewNftModal";
import Button from "../Button/Button";
import { COLORS } from "../../styles/Styling.js";
import { getNFTListings } from "../../pages/api/neo4j";
import { useStore } from "../../stores/RootStore";
import InfiniteScroll from "react-infinite-scroll-component";
import AvatarDefault from "../../public/icons/avatar.svg";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { MintingContainer } from "../MintingMain/MintingMain.elements";

export default inject("store")(
  observer(function WalletList(props) {
    const rootstore = useStore();
    const router = useRouter();
    const [show, setShow] = useState(false); //PostModal
    const [choosenPost, setChoosenPost] = useState("");
    const [session, loading] = useSession();
    const [nfts, setNfts] = useState([]);
    const [avatar, setAvatar] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [totalTokenSupply, setTotalTokenSupply] = useState(0);
    const [loadList, setLoadList] = useState(true);
    const [walletAddr, setWalletAddr] = useState("");
    const [currentChainId, setCurrentChainId] = useState(null);
    const [preboughtTokens, setPreboughtTokens] = useState([]);

    async function OpenSideBarModal(nft) {
      if (nft.name) {
        let contractTokenId;
        try {
          contractTokenId = nft.ContractId.toNumber();
        } catch (err) {
          contractTokenId = nft.ContractId;
        }
        router.push({
          pathname: "/nft",
          query: {
            tokenId: contractTokenId.toString(),
            contractAddress: nft.contractAddress.toString(),
          },
        });
      } else console.log("Cannot open unminted nft");
    }

    // The function to set the avatar
    React.useEffect(() => {
      async function doEffect() {
        // console.log(`stub: in doEffect of Navbar.js typeof session is ${typeof session}`);
        if (session) {
          const user = await rootstore.getAuthUser();
          if (user) {
            setAvatar(user.avatar);
          }
        }
      }
      doEffect();
    }, [session, rootstore]);

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
        fullStr.substr(fullStr.length - backChars)
      );
    }

    React.useEffect(() => {
      async function doEffect() {
        if (window.ethereum && window.ethereum.selectedAddress) {
          setWalletAddr(window.ethereum.selectedAddress);
        }
        if (window.ethereum && window.ethereum.selectedAddress && walletAddr) {
          setWalletAddr(window.ethereum.selectedAddress);
          let walletAddress = window.ethereum.selectedAddress;
          //let metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
          //let chain = await metamaskProvider.getNetwork();
          //console.log(chain);
          let ownedNFTs = await rootstore.getWalletNFTs(walletAddress, 0, 6);
          let totalSupply = 0;
          if (ownedNFTs.length > 0) {
            totalSupply = ownedNFTs[0].totalSupply;
            //console.log(totalSupply);
          }
          if (totalSupply === 0 || ownedNFTs.length >= totalSupply) {
            setHasMore(false);
          } else {
            setHasMore(true);
            setCurrentOffset(ownedNFTs.length);
          }
          let balance = totalSupply;

          let numPreboughtLegends = 0; //await rootstore.getPreboughtLegends();
          if (numPreboughtLegends > 0) {
            let unmintedLegend = {
              name: "Unminted Legend of Ever After",
              image: Silhouette,
              walletAddress: window.ethereum.selectedAddress,
            };
            let unmintedTokenArray = new Array(numPreboughtLegends).fill(
              unmintedLegend
            );
            setPreboughtTokens(unmintedTokenArray);
          } else {
            setPreboughtTokens([]);
          }
          setTotalTokenSupply(balance);
          setNfts(nfts.concat(ownedNFTs));
          setLoadList(false);
          if (ownedNFTs.length >= balance) {
            setHasMore(false);
          }
        } else {
          if (!window.ethereum || !window.ethereum.selectedAddress) {
            setLoadList(false);
          }
          setHasMore(false);
          setTotalTokenSupply(0);
        }
      }
      doEffect();
    }, [walletAddr]);

    //The function to get more data
    async function fetchMoreData() {
      let offsetNumber = currentOffset;
      let nftBatch = [];
      let returnedNFTs = await rootstore.getWalletNFTs(
        walletAddr,
        offsetNumber,
        6
      );
      nftBatch = nfts.concat(returnedNFTs);
      setNfts(nftBatch);
      if (nftBatch.length >= totalTokenSupply) {
        setHasMore(false);
      }
      setCurrentOffset(nftBatch.length);
    }

    React.useEffect(async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.on("accountsChanged", async (accounts) => {
          const newAddress = accounts[0];
          setTotalTokenSupply(0);
          setNfts([]);
          setHasMore(true);
          setWalletAddr(newAddress);
        });
      }
    }, []);

    function renderUnmintedTokens() {
      return (
        <InfiniteScroll
          dataLength={preboughtTokens.length}
          loader={null}
          style={{ flexDirection: "column" }}
          hasMore={false}
          next={() => {}}
          scrollThreshold={0.2}
        >
          <WalletPostsContainer>
            {preboughtTokens.map((nft, index) => (
              <ItemBox key={nft.name} product={nft} id={"container"}>
                <TopBox className="Flex">
                  <StatusBox positionLeft={true} className="Flex">
                    <Icon
                      strokeWidth="2"
                      height="auto"
                      width="50px"
                      name={AvatarDefault}
                    />
                    <SubBoxTop positionLeft={true} className="Flex">
                      <TxtSmall>{"Minted by"}</TxtSmall>
                      <TxtLargeUname
                        className="truncate-collection-name"
                        positionLeft={true}
                      >
                        {truncate(nft.walletAddress)}
                      </TxtLargeUname>
                    </SubBoxTop>
                  </StatusBox>
                </TopBox>
                <div
                  className="flex"
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    display: "block",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Image src={nft.image} alt={"Unminted image"} />
                </div>
                <BottomBox>
                  <TxtLarge
                    className="truncate-collection-job-title"
                    positionLeft={true}
                  >
                    {nft.name}
                  </TxtLarge>
                </BottomBox>
              </ItemBox>
            ))}
          </WalletPostsContainer>
        </InfiniteScroll>
      );
    }

    return (
      <MainWalletContainer>
        {renderUnmintedTokens()}
        {nfts.length !== 0 ? (
          <InfiniteScroll
            dataLength={nfts.length}
            loader={
              hasMore ? (
                <div className="flex" style={{ alignSelf: "center" }}>
                  <ScaleLoader
                    color={COLORS.purple}
                    loading={true}
                    size={150}
                  />
                </div>
              ) : null
            }
            style={{ flexDirection: "column" }}
            hasMore={hasMore}
            next={fetchMoreData}
            scrollThreshold={0.2}
          >
            <WalletPostsContainer>
              {nfts.map((nft, index) => (
                <ItemBox
                  key={nft.name ? nft.name + index : index}
                  product={nft}
                  id={"container"}
                >
                  <TopBox className="Flex">
                    <StatusBox positionLeft={true} className="Flex">
                      {nft.minterInfo ? (
                        <Avatar
                          src={AvatarUrl(
                            nft.minterInfo.avatar
                              ? nft.minterInfo.avatar
                              : null,
                            "m"
                          )}
                          size={"medium"}
                          alt={"Avatar"}
                          frame={false}
                          edit={false}
                          userName={
                            nft.minterInfo.uname ? nft.minterInfo.uname : null
                          }
                        />
                      ) : (
                        <Icon
                          strokeWidth="2"
                          height="auto"
                          width="50px"
                          name={AvatarDefault}
                        />
                      )}
                      <SubBoxTop positionLeft={true} className="Flex">
                        <TxtSmall>{"Minted by"}</TxtSmall>
                        <TxtLargeUname
                          className="truncate-collection-name"
                          positionLeft={true}
                        >
                          {nft.minterInfo && nft.minterInfo.uname
                            ? nft.minterInfo.uname
                            : truncate(nft.minterInfo.walletAddress)}
                        </TxtLargeUname>
                      </SubBoxTop>
                    </StatusBox>
                  </TopBox>
                  <div
                    className="flex"
                    style={{
                      borderRadius: 10,
                      overflow: "hidden",
                      display: "block",
                      height: "100%",
                      width: "100%",
                    }}
                    onClick={() => {
                      OpenSideBarModal(nft);
                    }}
                  >
                    {nft.image ? (
                      <img
                        style={{ maxWidth: "100%", height: "100%" }}
                        layout="responsive"
                        src={
                          nft.image +
                          "?fit=clip&w=320&fm=webp$auto=format&dpr=2"
                        }
                        alt="NFT image"
                      />
                    ) : (
                      <Image src={Silhouette} alt={"Unminted image"} />
                    )}
                  </div>
                  <BottomBox className="Flex">
                    <TxtLarge
                      className="truncate-collection-job-title"
                      positionLeft={true}
                    >
                      {nft.name
                        ? nft.name + " #" + nft.ContractId
                        : "Unminted NextGem"}
                    </TxtLarge>

                    {nft.isListed ? (
                      <SubBoxBottom>
                        <div className="flex">
                          <Icon
                            //className={'MarginRightSmall'}
                            width={20}
                            height={25}
                            name={Movr}
                          />
                          <Text>
                            {nft.listingDetails
                              ? Number.parseFloat(
                                  ethers.utils.formatEther(
                                    BigInt(nft.listingDetails.salePrice)
                                  )
                                ).toFixed(3)
                              : null}
                          </Text>
                        </div>

                        <Button
                          text={
                            nft.listingDetails.auctionEnd > 0
                              ? "View Auction"
                              : "View Listing"
                          }
                          disabled={false}
                          isIcon={false}
                          color={COLORS.purple}
                          colorText={COLORS.white}
                          //className={'MarginLeftLarge'}
                          onClick={() => OpenSideBarModal(nft)}
                        />
                      </SubBoxBottom>
                    ) : (
                      <SubBoxBottom>
                        <div className="flex"></div>
                        <Button
                          text={"View NFT"}
                          disabled={false}
                          isIcon={false}
                          color={COLORS.purple}
                          colorText={COLORS.white}
                          //className={'MarginLeftLarge'}
                          onClick={() => OpenSideBarModal(nft)}
                        />
                      </SubBoxBottom>
                    )}
                  </BottomBox>
                </ItemBox>
              ))}
            </WalletPostsContainer>
          </InfiniteScroll>
        ) : loadList ? (
          <div
            className="flex"
            style={{ alignSelf: "center", flexDirection: "column" }}
          >
            <ScaleLoader color={COLORS.purple} loading={true} size={150} />
          </div>
        ) : (
          <NftEmpty>
            <NftTitle>{"NFT Wallet"}</NftTitle>
            <NftDescription>
              {"This is where your NFTs will show up"}
            </NftDescription>
            <NftImage>
              <Image
                width={200}
                height={200}
                layout="intrinsic"
                objectFit="cover"
                src={
                  "https://yuser-assets.imgix.net/nextgempurple.jpg?fit=clip&w=200&fm=webp$auto=format&dpr=2"
                }
                alt="background image"
              />
            </NftImage>
          </NftEmpty>
        )}
      </MainWalletContainer>
    );
  })
);
