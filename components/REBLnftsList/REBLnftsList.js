import React, { useEffect, useState } from "react";
import {
  MainWalletContainer,
  WalletPostsContainer,
  ItemBox,
  NftEmpty,
  NftTitle,
  NftDescription,
  NftImage,
  NFTModal,
  TopBox,
  TitleTxt,
  ImageModal,
  Description,
  BottomBox,
  ButtonWrapper,
  CopyButton,
  CopyBox,
  TxtAddress
} from "./REBLnftsList.elements";
import { inject, observer } from "mobx-react";
import Silhouette from "../../public/images/silhouette.jpg";
import ScaleLoader from "react-spinners/ScaleLoader";
import Image from "next/image";
import { COLORS, SPACING } from "../../styles/Styling.js";
import { useStore } from "../../stores/RootStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import OverlayComponent from "../OverlayComponent/OverlayComponent";
import Icon from "../Icon/Icon";
import { BtnClose } from "../LoginMain/Login.elements";
import Close from "../../public/icons/close.svg";
import Button from "../Button/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import abi from "../../config/abi/REBL.json";
import { useAccount } from "wagmi";
import axios from "axios";
import MetaMaskOnboarding from '@metamask/onboarding';

export default inject("store")(
  observer(function REBLnftsList(props) {
    const rootstore = useStore();
    const router = useRouter();
    const [NFTModalVisible, setNFTModalVisible] = useState(false); // nft modal
    const [hasMore, setHasMore] = useState(true);
    const [loadList, setLoadList] = useState(true);
    const [dammynfts, setDammynfts] = useState([]);
    const copyRef = React.useRef(null);
    const [addressNFT, setAddressNFT] = useState("blablabla132hgf321hjfg321jg23f1jg23hg32j1hg23gh23j1hg23j1g3j1");
    const [addressNFTCopied, setAddressNFTCopied] = useState(false);

    async function OpenSideBarModal(nft) {
      let contractTokenId;
      try {
        contractTokenId = nft.tokenId.toNumber();
      } catch (err) {
        contractTokenId = nft.tokenId;
      }
      setNFTModalVisible(true);
    }

    //Function to truncate a wallet address string
    function truncate(
      fullStr,
      strLen = 11,
      separator = "...",
      frontChars = 6,
      backChars = 5
    ) {
      // if (fullStr.length <= strLen) return fullStr; <----------- correct temporary commented for dammy data, Natalia
      fullStr = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; //<----------- wrong temporary dammy data, Natalia
      return (
        fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
      );
    }

    //The function to get more data
    async function fetchMoreData() {}

    const closeOverlay = () => {
      setNFTModalVisible(false);
    };

    function handleCopyAddres() {
      copyRef.current.onClick();
      setAddressNFTCopied(true);
    }

    
    let account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log("Connected", { address, connector, isReconnected });
        rootstore.connectedWallet = address;
      },
    });
    
    let SelectAddress = account.address;
    const contractAddress = "0x72D2d4D0D85342844C47146389dDeDbBb3270C7e";

    let REBLContract;

    if (typeof window.ethereum !== "undefined" && MetaMaskOnboarding.isMetaMaskInstalled()) {
      // Create the ethers provider using the Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Check if the user has connected their wallet to the dApp
      if (provider.getSigner()) {
        // Assuming you have the correct values for contractAddress and abi
        REBLContract = new ethers.Contract(
          contractAddress,
          abi,
          provider.getSigner()
        );

        if(SelectAddress === undefined) SelectAddress = window.ethereum.selectedAddress;

        // Now you can use the REBLContract for interacting with the smart contract
      } else {
        console.error("User has not connected their wallet to the dApp.");
      }
    } else {
      console.error("Ethereum provider (window.ethereum) not found.");
    }

    const fetchNFT = async () => {

      const balance = await REBLContract.balanceOf(SelectAddress);

      const amount = parseInt(balance, 10);

      for (let i = 0; i < amount; i++) {
        const tokenId = await REBLContract.tokenOfOwnerByIndex(
          SelectAddress,
          i
        );

        const Id = parseInt(tokenId, 10);

        const metadata = await REBLContract.tokenURI(Id);

        const result = await axios.get(metadata);

        const { image } = result.data;

        const httpImageUrl = image.replace("ipfs://", "https://ipfs.io/ipfs/");

        setDammynfts((prev) => [
          ...prev,
          {
            image: httpImageUrl,
            contractAddress: contractAddress,
            tokenId: Id,
          },
        ]);
      }

      console.log(account.address, amount, dammynfts);
    };

    useEffect(() => {
      fetchNFT();
      console.log(dammynfts);
    }, []);

    return (
      <MainWalletContainer>
        {dammynfts.length !== 0 ? (
          <InfiniteScroll
            dataLength={dammynfts.length}
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
            // next={fetchMoreData}  <--------- temporary commented for dammy data, Natalia
            scrollThreshold={0.2}
          >
            <WalletPostsContainer>
              {dammynfts.map((nft, index) => (
                <ItemBox
                  key={nft.tokenId ? nft.tokenId + index : index}
                  id={"container"}
                >
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
                  {NFTModalVisible ? (
                    <NFTModal>
                      <TopBox>
                        <TitleTxt>REBL #{nft.tokenId}</TitleTxt>
                      </TopBox>
                      <div
                        style={{
                          position: "absolute",
                          top: 30,
                          right: 40,
                          height: 35,
                          width: 35,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: COLORS.black20,
                          borderRadius: 5,
                        }}
                      >
                        <BtnClose onClick={() => setNFTModalVisible(false)}>
                          <Icon
                            strokeWidth="3"
                            height="auto"
                            width="24px"
                            name={Close}
                            strokeColor={({ theme }) => theme.iconColor.color}
                          />
                        </BtnClose>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: SPACING.extraLarge,
                          marginRight: SPACING.extraLarge,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 12,
                          }}
                        >
                          <ImageModal
                            src={
                              nft.image +
                              "?fit=clip&w=320&fm=webp$auto=format&dpr=2"
                            }
                            alt="NFT image"
                          />
                        </div>
                        <Description>
                          Download your REBL now!Share on socials to help grow
                          the community!
                        </Description>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: SPACING.large
                          }}
                        >
                          <TxtAddress>Address:</TxtAddress>
                          <CopyButton onClick={handleCopyAddres}>
                            <CopyToClipboard
                              ref={copyRef}
                              text={contractAddress}
                            >
                              <motion.div
                                style={{
                                  dispaly: "flex",
                                  flex: 1
                                }}
                                key="flexOne"
                                className="flexOne"
                                whileTap={{ scale: 0.96 }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <p className="truncate-nft-address">
                                    {contractAddress}
                                  </p>
                                </div>
                                <CopyBox >
                                  {addressNFTCopied ? "COPIED!" : "COPY"}
                                </CopyBox>
                              </motion.div>
                            </CopyToClipboard>
                          </CopyButton>
                        </div>
                      </div>
                      <BottomBox>
                        <ButtonWrapper>
                          <Button
                            text={"Download"}
                            // onClick={() => { props.onSettle(props.listingDetails.listingId) }}
                            color={COLORS.purple}
                            colorText={COLORS.white}
                            size={"medium"}
                            padding={true}
                            width={"200px"}
                          />
                        </ButtonWrapper>
                        <ButtonWrapper>
                          <Button
                            text={"Share on Twitter"}
                            // onClick={() => { props.onSettle(props.listingDetails.listingId) }}
                            color={COLORS.purple}
                            colorText={COLORS.white}
                            size={"medium"}
                            padding={true}
                            width={"200px"}
                          />
                        </ButtonWrapper>
                      </BottomBox>
                    </NFTModal>
                  ) : null}
                  <OverlayComponent
                    overlayVisible={NFTModalVisible}
                    closeOverlay={closeOverlay}
                  />
                </ItemBox>
              ))}
            </WalletPostsContainer>
          </InfiniteScroll>
        ) : (
          <NftEmpty>
            <NftTitle>{"REBL NFTs Wallet"}</NftTitle>
            <NftDescription>
              {"This is where your REBL NFTs will show up"}
            </NftDescription>
            <NftImage>
              <Image
                width={240}
                height={240}
                layout="intrinsic"
                objectFit="cover"
                src={
                  "https://yuser-assets.imgix.net/REBL_NFT_Default_Frame.png?fit=clip&w=200&fm=webp$auto=format&dpr=2"
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
