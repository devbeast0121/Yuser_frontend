import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  ModalContainer,
  Post,
  NFTUserContainer,
  PostBox,
  UserName,
  BuyContainer,
  BidContainer,
  TxtCurrentBid,
  BidBox,
  TxtBid,
  TitleHistory,
  PostBodyInner,
  NFTOwnerNameBox,
  PropertyList,
  PropertyListContainer,
  ItemContainer,
  TitleContainer,
  ButtonWrapper100,
  UnlockedBox,
  ImageNFT,
  NFTOfferUser,
  TxtOffer,
  Table,
  TableTitle,
  TableRow,
  Label,
} from "../components/NftComponent/NftComponent.elements";
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from "file-saver";
//import LoginBox from "../LoginBox/LoginBox";
//import PostSideBar from "../PostSideBar/PostSideBar";
import Moonriver from "../public/icons/moonriver_logo3.svg";
import Shopping from "../public/icons/shopping-cart.svg";
import Avatar from "../components/Avatar/Avatar";
import Icon from "../components/Icon/Icon";
import { AvatarUrl } from "../stores/tools";
import { useStore } from "../stores/RootStore";
import { inject, observer } from "mobx-react";
import { useSession } from "next-auth/client";
//import DevInfo from "../DevInfo";
import AutolinkerComponent from "../components/AutolinkerComponent/AutolinkerComponent";
import Button from "../components/Button/Button";
import { COLORS, SPACING } from "../styles/Styling";
import ListForSale from "../components/ListForSale/ListForSale";
import client from "./api/client";
import MetaMaskOnboarding from "@metamask/onboarding";
import BuyNow from "../components/BuyNow/BuyNow";
import MakeOffer from "../components/MakeOffer/MakeOffer";
import AcceptBid from "../components/AcceptBid/AcceptBid";
import TxFailedOverlay from "../components/TxOverlays/TxFailedOverlay";
import TxPendingOverlay from "../components/TxOverlays/TxPendingOverlay";
import TxSuccessOverlay from "../components/TxOverlays/TxSuccessOverlay";
import TxConfirmOverlay from "../components/TxOverlays/TxConfirmOverlay";
import TxCancelledOverlay from "../components/TxOverlays/TxCancelledOverlay";
import MetamaskOverlay from "../components/TxOverlays/MetamaskOverlay";
import OnboardingButton from "../components/MetamaskOnboarding/MetamaskOnboarding";
import OfferConfirmation from "../components/MarketConfirmationOverlays/OfferConfirmation";
import ListingConfirmation from "../components/MarketConfirmationOverlays/ListingConfirmation";
import WrapMOVR from "../components/WrapMOVR/WrapMOVR";
import { useRouter } from "next/router";
import { parseCookies } from "../stores/lib/parseCookies";
import Cookie from "js-cookie";
import { action, runInAction } from "mobx";
export const BUTTON_TYPES = Object.freeze({
  COMMENTS: "comments",
  SHARE: "share",
  BUY: "buy",
  GIFT: "gift",
  GIFT_AMOUNT: "gift_amount",
  INVALID: "INVALID BUTTON TYPE",
  SAVE: "save_item",
});
import { ErrorMessageSignIn } from "../components/ErrorMessageSignIn/ErrorMessageSignIn";
import { ethers } from "ethers";
import styled from "styled-components";
import Tag from "../public/icons/tag-cut.svg";
import Happy from "../public/icons/happy-baby.svg";
import NextGemsList from "../components/NextGemsList/NextGemsList";
import SocialButton from "../components/Button/SocialButton";
import ButtonBorderedIconLeft from "../components/Button/ButtonBorderedIconLeft";
import {
  BorderedButtonContainer,
  BorderedSocialIconBox,
  TextSocialIcon,
  TextBorderedIcon,
} from "../components/Button/Button.elements";
import ImagePNG from "./../public/icons/imagePNG.svg";
import ImageSVG from "./../public/icons/imageSVG.svg";
import GemPink from "./../public/icons/gem-pink.svg";
import FooterHorizontal from "../components/FooterHorizontal/FooterHorizontal";

const variantVerical = Object.freeze({
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -150 },
});
const NftPage = inject("store")(
  observer(({ cookieValues = {}, ...props }) => {
    //   H O O K S
    const rootstore = useStore();
    const [session, loading] = useSession();
    const [properties, setProperties] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [comingSoon, setComingSoon] = useState(false);
    var objectArray = [];
    const [fullPropertyLenght, setFullPropertyLenght] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [unlockedFeatured, setUnlockedFeatured] = useState(false);
    const [avatarHash, setAvatarHash] = useState("");
    const [tokenId, setTokenId] = useState(null);
    const [tokenContractAddress, setTokenContractAddress] = useState(null);
    const [nft, setNft] = useState(null);
    const [listingDetails, setListingDetails] = useState(null);
    const [listingOffers, setListingOffers] = useState(null);
    const [isListed, setIsListed] = useState(false);
    const [listingOverlayVisible, setListingOverlayVisible] = useState(false);
    const [buyNowOverlayVisible, setBuyNowOverlayVisible] = useState(false);
    const [makeOfferOverlayVisible, setMakeOfferOverlayVisible] =
      useState(false);
    const [settleOverlayVisible, setSettleOverlayVisible] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [currentChainId, setCurrentChainId] = useState(null);
    const [confirmationDetails, setConfirmationDetails] = useState(null);
    const [confirmListDetails, setConfirmListDetails] = useState(null);
    const [ownerInfo, setOwnerInfo] = useState(null);
    const [tokenHistory, setTokenHistory] = useState(null);
    const [socialMediaPosts, setSocialMediaPosts] = useState(null);
    const [wmovrBalance, setWmovrBalance] = useState(-1);
    const [disableButtonOnPage, setDisableButtonOnPage] = useState(true);
    const [removeListingId, setRemoveListingID] = useState(null);
    const [offerBuyDetails, setOfferBuyDetails] = useState(null);
    const [queryChainData, setQueryChainData] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [movrBalance, setMovrBalance] = useState(-1);
    const [lastTxDetails, setLastTxDetails] = useState(null);
    const [mobileLayoutVisible, setMobileLayoutVisible] = useState(false);
    const [tabListingActive, setTabListingActive] = useState(true);
    const [tabFeaturesActive, setTabFeaturesActive] = useState(false);
    const router = useRouter();
    const ACTIONS = Object.freeze({
      setComments: "SET COMMENTS",
      setIsVisible: "SET VISABILITY",
      setShowGiftBar: "SET SHOW GIFT BAR",
      setType: "SET BUTTON TYPE",
      setKeyword: "SET KEYWORD",
    });

    const updateMobileLayout = () => {
      if (typeof window === "undefined")
        console.warn(`window is undefined this is about to cause an issue`);

      if (window.innerWidth <= 991) {
        setMobileLayoutVisible(true);
      } else {
        setMobileLayoutVisible(false);
      }
    };

    useEffect(() => {
      updateMobileLayout();
      window.addEventListener("resize", updateMobileLayout);
      return () => window.removeEventListener("resize", updateMobileLayout);
    }, []);

    //The useeffect to store the persisted cookie to the rootstore variable
    useEffect(() => {
      let dictArrayTemp = cookieValues.dictionaryArrayCookie;
      runInAction(() => {
        rootstore.dictionaryArray =
          dictArrayTemp.length !== 0 ? JSON.parse(dictArrayTemp) : [];
      });
      if (dictArrayTemp.length === 0) {
        Cookie.set(
          "dictionaryArray",
          JSON.stringify(rootstore.dictionaryArray)
        );
      }
      if (rootstore.dictionaryArray.length === 0) {
        setDisableButtonOnPage(false);
      }
    }, []);

    // React.useEffect(() => {
    //   async function doEffect() {
    //     if (props.nft) {

    //       var pathArray = props.nft.image.split('/');
    //       var arrayLength = pathArray.length
    //       var tokenHash = pathArray[arrayLength - 1]
    //       console.log(tokenHash,"THE TOKEN HASH")
    //       setAvatarHash(tokenHash)
    //       setProperties(Object.entries(props.nft.attributes))

    //     }
    //   }
    //   doEffect();
    // }, []);

    React.useEffect(async () => {
      let auth = await rootstore.getAuthUser();
      setAuthUser(auth);
    }, []);

    //UseEffect to disable the button on an update to the dictionary array
    React.useEffect(() => {
      if (
        tokenId &&
        tokenContractAddress &&
        rootstore.dictionaryArray.length !== 0
      ) {
        const checkForTokenInContractAdd = (obj) => {
          return (
            obj.tokenId === tokenId &&
            obj.contractAddress === tokenContractAddress
          );
        };
        if (rootstore.dictionaryArray.some(checkForTokenInContractAdd)) {
          setDisableButtonOnPage(true);
        }
      } else if (rootstore.dictionaryArray.length === 0) {
        setDisableButtonOnPage(false);
      }
    }, [rootstore.dictionaryArray]);

    //UseEffect to update the disable function depending on the value of the array(based on tokenId)
    React.useEffect(() => {
      if (
        tokenId &&
        tokenContractAddress &&
        rootstore.dictionaryArray.length !== 0
      ) {
        const checkForTokenInContractAdd = (obj) => {
          return (
            obj.tokenId === tokenId &&
            obj.contractAddress === tokenContractAddress
          );
        };
        if (rootstore.dictionaryArray.some(checkForTokenInContractAdd)) {
          const cookieObj = rootstore.dictionaryArray.find((item) => {
            return (
              item.tokenId === tokenId &&
              item.contractAddress === tokenContractAddress
            );
          });
          let disable = disableButtonOnPage;
          switch (cookieObj.eventDetails.event) {
            case "LIST":
              disable = checkListCookieEvent(cookieObj);
              if (disable === false) {
                removeObjFromCookie(tokenId, tokenContractAddress);
              }
              setDisableButtonOnPage(disable);
              break;
            case "BUY":
              disable = checkBuyCookieEvent(cookieObj);
              if (disable === false) {
                removeObjFromCookie(tokenId, tokenContractAddress);
              }
              setDisableButtonOnPage(disable);
              break;
            case "BID":
              disable = checkBidCookieEvent(cookieObj);
              if (disable === false) {
                removeObjFromCookie(tokenId, tokenContractAddress);
              }
              setDisableButtonOnPage(disable);
              break;
            case "SETTLE":
              disable = checkSettleCookieEvent(cookieObj);
              if (disable === false) {
                removeObjFromCookie(tokenId, tokenContractAddress);
              }
              setDisableButtonOnPage(disable);
              break;
            default:
              break;
          }
        } else {
          setDisableButtonOnPage(false);
        }
      } else if (rootstore.dictionaryArray.length === 0) {
        setDisableButtonOnPage(false);
      }
    }, [initialLoading]);

    function removeObjFromCookie(cookieTokenId, cookieContractAddress) {
      if (cookieTokenId === null || cookieContractAddress === null) {
        return;
      }
      runInAction(() => {
        rootstore.dictionaryArray.splice(
          rootstore.dictionaryArray.findIndex((item) => {
            return (
              item.tokenId === cookieTokenId &&
              item.contractAddress === cookieContractAddress
            );
          }),
          1
        ); // sets the auth user variable
      });
      Cookie.set("dictionaryArray", JSON.stringify(rootstore.dictionaryArray));
    }

    function checkBidCookieEvent(cookie) {
      if (nft && (listingDetails || !isListed)) {
        if (!isListed && !listingDetails) {
          return false;
        }
        if (listingDetails) {
          if (
            listingDetails.listingId.toString() !==
            cookie.eventDetails.listingNumber.toString()
          ) {
            return false;
          }
          if (
            Number.parseFloat(listingDetails.salePrice) >
            Number.parseFloat(cookie.eventDetails.txBidAmount)
          ) {
            return false;
          }
          if (
            Number.parseFloat(listingDetails.salePrice) ===
            Number.parseFloat(cookie.eventDetails.txBidAmount) &&
            cookie.eventDetails.walletAddress === listingDetails.highestBidder
          ) {
            return false;
          }
        }
      }
      if (Date.now() <= cookie.eventDetails.expiresAt) {
        return false;
      }
      return true;
    }

    function checkBuyCookieEvent(cookie) {
      if (nft && (listingDetails || !isListed)) {
        if (!isListed && !listingDetails) {
          return false;
        }
        if (listingDetails) {
          if (
            listingDetails.listingId.toString() ===
            cookie.eventDetails.listingNumber.toString()
          ) {
            return false;
          }
        }
      }
      if (Date.now() <= cookie.eventDetails.expiresAt) {
        return false;
      }
      return true;
    }

    function checkListCookieEvent(cookie) {
      if (nft && isListed) {
        return false;
      } else if (nft && !isListed) {
        if (listingDetails) {
          if (
            cookie.eventDetails.currentOwner.toLowerCase() !==
            listingDetails.seller.toLowerCase()
          ) {
            return false;
          }
        } else if (!listingDetails) {
          if (
            cookie.eventDetails.currentOwner.toLowerCase() !==
            ownerInfo.walletAddress.toLowerCase()
          ) {
            return false;
          }
        }
      }
      if (Date.now() <= cookie.eventDetails.expiresAt) {
        return false;
      }
      return true;
    }

    function checkSettleCookieEvent(cookie) {
      if (nft) {
        if (!isListed && !listingDetails) {
          return false;
        }
        if (listingDetails) {
          if (
            cookie.eventDetails.listingNumber.toString() !==
            listingDetails.listingId.toString()
          ) {
            return false;
          }
        }
        if (Date.now() <= cookie.eventDetails.expiresAt) {
          return false;
        }
      }
      return true;
    }
    //------------------------------------------------------EVENT LISTENERS AND THE ASSOCIATED USEEFFECTS--------------------------------------
    //EVENT LISTENER FOR LISTING A TOKEN

    useEffect(() => {
      client.service("nft-listing").on(
        "created",
        action((data) => {
          if (
            data.tokenId === parseInt(tokenId) &&
            data.nftToken === tokenContractAddress
          ) {
            updateDetails();
            //console .log("removing from cookie and root")
            removeObjFromCookie(tokenId, tokenContractAddress);
            setDisableButtonOnPage(false);
          }
        })
      );
    });
    //EVENT LISTENER FOR CANCEL AUCTION OR SETTLE AUCTION
    useEffect(() => {
      client.service("nft-listing").on(
        "removed",
        action((data) => {
          //The fix for states being null within the event listner
          setRemoveListingID(data);
        })
      );
    });
    //The useeffect that works when event listener for removing a listing is triggered
    useEffect(() => {
      if (removeListingId !== null) {
        if (
          listingDetails !== null &&
          listingDetails.listingId.toString() === removeListingId.id.toString()
        ) {
          removeObjFromCookie(tokenId, tokenContractAddress);
          setDisableButtonOnPage(false);
          updateDetails();
          //Make sure is lisitng and setlisting details are false and nukl resp to refresh the page contents
          setIsListed(false);
          setListingDetails(null);
        }
      }
    }, [removeListingId]);

    //EVENT LISTENER FOR BUY OR MAKE BID
    useEffect(() => {
      client.service("nft-offer").on(
        "created",
        action((data) => {
          //The fix for states being null within the event listner
          setOfferBuyDetails(data);
          //console.log(data);
        })
      );
    });

    useEffect(async () => {
      if (offerBuyDetails !== null && !offerBuyDetails.skipHooks) {
        //console.log("got offer");
        if (
          listingDetails &&
          offerBuyDetails &&
          listingDetails.listingId.toString() ===
          offerBuyDetails.itemNumber.toString() &&
          Number(offerBuyDetails.tokenId) === Number(tokenId) &&
          router.isReady
        ) {
          //console.log("get bc data");
          setQueryChainData(!queryChainData);
        }
        if (
          listingDetails &&
          listingDetails.auctionEnd.toString() === "0" &&
          Number(offerBuyDetails.tokenId) === Number(tokenId) &&
          offerBuyDetails.itemNumber.toString() ===
          listingDetails.listingId.toString()
        ) {
          removeObjFromCookie(tokenId, tokenContractAddress);
          setDisableButtonOnPage(false);

          updateDetails();
        } else if (
          listingDetails &&
          lastTxDetails &&
          listingDetails.auctionEnd.toString() !== "0" &&
          Number(offerBuyDetails.tokenId) === Number(tokenId) &&
          offerBuyDetails.itemNumber.toString() ===
          listingDetails.listingId.toString()
        ) {
          let parsedBid = ethers.utils.formatEther(offerBuyDetails.bidAmount);
          if (
            parseFloat(parsedBid).toFixed(3) ===
            Number.parseFloat(lastTxDetails.bidPrice).toFixed(3) &&
            lastTxDetails.walletAddress.toLowerCase() ===
            offerBuyDetails.bidder.toLowerCase()
          ) {
            removeObjFromCookie(tokenId, tokenContractAddress);
            setDisableButtonOnPage(false);
            updateDetails();
            setLastTxDetails(null);
          }
        }
      }
    }, [offerBuyDetails]);

    //The function to refresh all the data after the event listeners
    async function updateDetails() {
      setRemoveListingID(null);
      //if (session) {
      if (!router.isReady) {
        return;
      }
      let listing = 0;
      if (router.query.tokenId) {
        setTokenId(router.query.tokenId);
      } else {
        router.push({
          pathname: "/404",
          query: { type: "error" }, //   "/404" path type "notice" -> "coming soon" page
        });
        return;
      }
      if (router.query.contractAddress) {
        setTokenContractAddress(router.query.contractAddress);
      } else {
        router.push({
          pathname: "/404",
          query: { type: "error" }, //   "/404" path type "notice" -> "coming soon" page
        });
        return;
      }
      let nftDetails = null;
      try {
        nftDetails = await rootstore.getNFTDetails(
          router.query.tokenId,
          router.query.contractAddress
        );
      } catch (err) {
        router.push({
          pathname: "/404",
          query: { type: "error" }, //   "/404" path type "notice" -> "coming soon" page
        });
        return;
      }
      if (!nftDetails) {
        router.push({
          pathname: "/404",
          query: { type: "error" }, //   "/404" path type "notice" -> "coming soon" page
        });
        return;
      }
      setNft(nftDetails);
      let tempListing = null;
      if (
        nftDetails &&
        nftDetails.ownerWallet.toLowerCase() ===
        rootstore.marketplaceContractAddr.toLowerCase()
      ) {
        setIsListed(true);
        tempListing = await rootstore.getListingDetails(
          router.query.tokenId,
          router.query.contractAddress
        );
        //console.log(tempListing,"tempListing details UPDATE")
        setListingDetails(tempListing);
        if (tempListing) {
          let offers = await rootstore.getListingOffers(tempListing.listingId);
          setListingOffers(offers);
        }
      }
      if (tempListing) {
        let ownerDetails = await rootstore.getUserInfoFromWallet(
          tempListing.seller
        );
        setOwnerInfo(ownerDetails);
      } else if (nftDetails) {
        let ownerDetails = await rootstore.getUserInfoFromWallet(
          nftDetails.ownerWallet
        );
        setOwnerInfo(ownerDetails);
      }
      var pathArray = nftDetails.metadata.image.split("/");
      var arrayLength = pathArray.length;
      var tokenHash = pathArray[arrayLength - 1];
      tokenHash = tokenHash.replace(".svg", "");
      tokenHash = tokenHash.replace(".png", "");
      setAvatarHash(tokenHash);
      setProperties(Object.entries(nftDetails.metadata.attributes));
      if (
        !currentChainId &&
        typeof window !== "undefined" &&
        window.ethereum &&
        MetaMaskOnboarding.isMetaMaskInstalled()
      ) {
        setCurrentChainId(
          await window.ethereum.request({ method: "eth_chainId" })
        );
      }
    }

    //UseEffect to populate the data when the page loads
    React.useEffect(() => {
      async function doEffect() {
        //if (session) {
        setInitialLoading(true);
        if (!router.isReady) {
          return;
        }
        let listing = 0;
        if (router.query.tokenId) {
          setTokenId(router.query.tokenId);
        } else {
          router.push({
            pathname: "/404",
            query: { type: "error" }, //   "/404" path type "notice" -> "coming soon" page
          });
          return;
        }
        if (router.query.contractAddress) {
          setTokenContractAddress(router.query.contractAddress);
        } else {
          router.push({
            pathname: "/404",
            query: { type: "error" }, //   "/404" path type "notice" -> "coming soon" page
          });
          return;
        }
        let nftDetails = null;
        try {
          nftDetails = await rootstore.getNFTDetails(
            router.query.tokenId,
            router.query.contractAddress
          );
        } catch (err) {
          router.push({
            pathname: "/404",
            query: { type: "error" }, //   "/404" path type "notice" -> "coming soon" page
          });
          return;
        }
        if (!nftDetails) {
          router.push({
            pathname: "/404",
            query: { type: "error" }, //   "/404" path type "notice" -> "coming soon" page
          });
          return;
        }
        setNft(nftDetails);
        let tempListing = null;
        if (
          nftDetails &&
          nftDetails.ownerWallet.toLowerCase() ===
          rootstore.marketplaceContractAddr.toLowerCase()
        ) {
          setIsListed(true);
          tempListing = await rootstore.getListingDetails(
            router.query.tokenId,
            router.query.contractAddress
          );
          setListingDetails(tempListing);
          if (tempListing) {
            let offers = await rootstore.getListingOffers(
              tempListing.listingId
            );
            if (offers === []) offers = null;
            setListingOffers(offers);
          }
        }
        if (tempListing) {
          let ownerDetails = await rootstore.getUserInfoFromWallet(
            tempListing.seller
          );
          setOwnerInfo(ownerDetails);
        } else if (nftDetails) {
          let ownerDetails = await rootstore.getUserInfoFromWallet(
            nftDetails.ownerWallet
          );
          setOwnerInfo(ownerDetails);
        }
        var pathArray = nftDetails.metadata.image.split("/");
        var arrayLength = pathArray.length;
        var tokenHash = pathArray[arrayLength - 1];
        tokenHash = tokenHash.replace(".svg", "");
        tokenHash = tokenHash.replace(".png", "");
        setAvatarHash(tokenHash);
        setProperties(Object.entries(nftDetails.metadata.attributes));
        if (
          !currentChainId &&
          typeof window !== "undefined" &&
          window.ethereum &&
          MetaMaskOnboarding.isMetaMaskInstalled()
        ) {
          setCurrentChainId(
            await window.ethereum.request({ method: "eth_chainId" })
          );
        }
        if (!tempListing) {
          setInitialLoading(false);
        }
      }
      doEffect();
    }, [router.query, router.isReady]);

    React.useEffect(async () => {
      if (nft) {
        let history = await rootstore.getTokenHistory(
          nft.ContractId,
          nft.contractAddress,
          0,
          0
        );
        setTokenHistory(history);
      }
    }, [nft]);

    React.useEffect(async () => {
      if (currentAddress) {
        let wmovr = await rootstore.GetWMOVRBalance(currentAddress);
        setWmovrBalance(wmovr);
        let movrBalance = await rootstore.getMovrBalance(currentAddress);
        setMovrBalance(movrBalance);
      } else {
        setWmovrBalance(0);
        setMovrBalance(0);
      }
    }, [currentAddress, wmovrBalance]);

    React.useEffect(async () => {
      if (listingDetails) {
        let blockchainDetails = await rootstore.queryBlockchainListingDetails(
          Number(listingDetails.listingId)
        );
        let modified = false;
        let modifiedListingDetails = listingDetails;
        if (!blockchainDetails) {
          return;
        }
        if (blockchainDetails) {
          if (blockchainDetails.seller !== listingDetails.seller) {
            setIsListed(false);
            setListingDetails(null);
          }
          if (blockchainDetails.highestBid !== listingDetails.highestBid) {
            modified = true;
            modifiedListingDetails.highestBid = blockchainDetails.highestBid;
          }
          if (blockchainDetails.auctionEnd !== listingDetails.auctionEnd) {
            modified = true;
            modifiedListingDetails.auctionEnd = blockchainDetails.auctionEnd;
          }
          if (
            blockchainDetails.highestBidder !== listingDetails.highestBidder
          ) {
            modified = true;
            modifiedListingDetails.highestBidder =
              blockchainDetails.highestBidder;
          }
          if (blockchainDetails.minPrice !== listingDetails.minPrice) {
            modified = true;
            modifiedListingDetails.minPrice = blockchainDetails.minPrice;
          }
          if (blockchainDetails.salePrice !== listingDetails.salePrice) {
            modified = true;
            modifiedListingDetails.salePrice = blockchainDetails.salePrice;
          }
        } else if (blockchainDetails === {}) {
          setIsListed(false);
          setListingDetails(null);
        }

        if (modified) {
          // console.log("QUERY CHAIN DATA");
          //console.log(modifiedListingDetails);
          setListingDetails(modifiedListingDetails);
        }
        setInitialLoading(false);
      }
    }, [listingDetails, queryChainData]);

    useEffect(() => {
      if (
        typeof window !== "undefined" &&
        window.ethereum &&
        MetaMaskOnboarding.isMetaMaskInstalled()
      ) {
        if (!currentAddress) {
          setCurrentAddress(window.ethereum.selectedAddress);
          setWmovrBalance(0);
        }
        window.ethereum.on("accountsChanged", (accounts) => {
          setCurrentAddress(accounts[0]);
          setListingOverlayVisible(false);
          setBuyNowOverlayVisible(false);
          setMakeOfferOverlayVisible(false);
          setSettleOverlayVisible(false);
          setWmovrBalance(0);
          rootstore.purchaseConfirmationVisible = false;
          rootstore.listingConfirmationVisible = false;
          rootstore.wrapMovrOverlayVisible = false;
        });
        window.ethereum.on("chainChanged", (chainId) => {
          setCurrentChainId(chainId);
          setWmovrBalance(0);
          router.reload();
        });
      }
    }, [nft]);

    const closeAll = () => {
      props.setShow(false);
    };

    async function handleSearch(event) {
      //todo
    }

    const showFullProperty = () => {
      setFullPropertyLenght(!fullPropertyLenght);
    };

    const PropertyListInner = () => {
      let attributes = [];
      attributes = fullPropertyLenght ? properties : properties.slice(0, 2);

      return (
        <>
          {attributes.map((data, id) => {
            return (
              <ItemContainer key={id}>
                <PropertyLabel>{data[0].replaceAll("_", " ")}</PropertyLabel>
                <PropertyDescription
                  NFT={true}
                  centered={true}
                  style={{ opacity: 0.5 }}
                >
                  {Number.parseFloat((data[1] / 10000) * 100).toFixed(3)}
                  {"% have this property"}
                </PropertyDescription>
              </ItemContainer>
            );
          })}
        </>
      );
    };

    const downloadImage = () => {
      if (authUser && ownerInfo && authUser.uname === ownerInfo.uname) {
        saveAs(nft.metadata.image, "image.png"); // Put your image url here.
        setUnlockedFeatured(false);
      } else {
        console.log("User does not own NFT");
      }
    };
    const downloadAditionalContent = () => {
      let filename = nft.metadata.name || "secret";
      saveAs(nft.metadata.downloadLink, filename);
    };

    const toggleTab = () => {
      setTabListingActive(!tabListingActive);
      setTabFeaturesActive(!tabFeaturesActive);
    };

    const copyToClickboardFunction = () => {
      navigator.clipboard.writeText(nft.metadata.image);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
      setUnlockedFeatured(false);
    };
    const comingSoonFunction = () => {
      setComingSoon(true);
      setTimeout(() => setComingSoon(false), 3000);
      setUnlockedFeatured(false);
    };

    const showUnlockedFeatures = () => {
      if (ownerInfo && currentAddress) {
        setUnlockedFeatured(true);
      } else {
        rootstore.errMessage = "Error: Could";
      }
    };

    const loadLogin = () => {
      router.push("/signin", null, { shallow: true });
    };

    async function claim() {
      if (session) {
        try {
          await client
            .service("set-nft-profpic")
            .create({
              contractAddress: nft.contractAddress,
              hash: avatarHash,
            })
            .then(async (data) => {
              if (data?.avatarFile) {
                let profObj = {
                  avatar: data.avatarFile,
                };
                await client
                  .service("change-profile")
                  .create(profObj)
                  .then(() => window.location.reload());
              }
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        loadLogin();
      }
      //console.log("Success! Please logout and login back to see your Avatar")
    }

    /* ******************************************************* */
    //Functions to handle listing, bidding, purchasing, and settling
    async function canBid() {
      if (!currentChainId || currentChainId !== rootstore.CHAIN_ID) {
        rootstore.metamaskOverlayVisible = true;
      } else {
        openPurchaseOverlay();
      }
    }

    function openPurchaseOverlay() {
      if (listingDetails) {
        if (listingDetails.auctionEnd === 0) {
          setBuyNowOverlayVisible(true);
        } else {
          let endTime = new Date(listingDetails.auctionEnd * 1000);
          if (Date.now() < endTime.getTime()) {
            setMakeOfferOverlayVisible(true);
          } else {
            rootstore.errMessage = "Error: This listing has expired";
          }
        }
      }
    }

    async function confirmBid(listingId, bidPrice) {
      if (Number.parseFloat(bidPrice) > Number.parseFloat(wmovrBalance)) {
        rootstore.errMessage =
          "Error: WMOVR balance too low to complete transaction";
        return;
      }
      setBuyNowOverlayVisible(false);
      setMakeOfferOverlayVisible(false);
      if (validateDateAndPrice(bidPrice)) {
        let confirmObj = {};
        confirmObj.listingId = listingId;
        confirmObj.bid = bidPrice;
        confirmObj.listingDetails = listingDetails;
        confirmObj.tokenId = tokenId;
        confirmObj.contractAddress = tokenContractAddress;
        confirmObj.image = nft.metadata.image;
        confirmObj.name = nft.metadata.name;
        setConfirmationDetails(confirmObj);
        rootstore.purchaseConfirmationVisible = true;
      } else {
        rootstore.errMessage = "Invalid offer";
      }
    }

    async function makeBid(listingId, bidPrice) {
      rootstore.purchaseConfirmationVisible = false;
      //adding the current tokenID to the array to disable the make offer and buuy button
      var d = new Date();
      let dictionaryObj = {};
      dictionaryObj.tokenId = tokenId;
      dictionaryObj.contractAddress = tokenContractAddress;
      dictionaryObj.eventDetails = {
        event: listingDetails?.auctionEnd.toString() === "0" ? "BUY" : "BID",
        walletAddress: currentAddress,
        listingNumber: listingDetails ? listingId : null,
        txBidAmount: bidPrice,
        currentOwner: listingDetails
          ? listingDetails.seller
          : ownerInfo.walletAddress,
        expiresAt: d.setDate(d.getDate() + 1),
      };
      let txDetails = {
        listingId: listingId,
        bidPrice: bidPrice,
        tokenId: tokenId,
        walletAddress: window.ethereum.selectedAddress,
      };
      await rootstore.bidOnListedItem(listingId, bidPrice, dictionaryObj);
      if (rootstore.txSuccessOverlayVisible) {
        //console.log("set tx details");
        setLastTxDetails(txDetails);
      }
    }

    async function canList() {
      if (currentChainId !== rootstore.CHAIN_ID) {
        rootstore.metamaskOverlayVisible = true;
      } else {
        setListingOverlayVisible(true);
      }
    }

    async function onList(priceValue, dateValue) {
      setListingOverlayVisible(false);
      if (validateDateAndPrice(priceValue, dateValue)) {
        let confirmObj = {};
        confirmObj.date = dateValue;
        confirmObj.price = priceValue;
        confirmObj.token = tokenId;
        confirmObj.tokenContractAddress = tokenContractAddress;
        confirmObj.image = nft.metadata.image;
        confirmObj.name = nft.metadata.name;
        setConfirmListDetails(confirmObj);
        rootstore.listingConfirmationVisible = true;
      }
    }

    async function makeListing(price, date, token, tokenContractAddress) {
      rootstore.listingConfirmationVisible = false;
      var d = new Date();

      let dictionaryObj = {};
      dictionaryObj.tokenId = tokenId;
      dictionaryObj.contractAddress = tokenContractAddress;
      dictionaryObj.eventDetails = {
        event: "LIST",
        walletAddress: currentAddress,
        listingNumber: listingDetails ? listingId : null,
        txBidAmount: listingDetails ? listingDetails.salePrice : 0.0,
        currentOwner: listingDetails
          ? listingDetails.seller
          : ownerInfo.walletAddress,
        expiresAt: d.setDate(d.getDate() + 1),
      };
      await rootstore.listItem(
        date,
        price,
        token,
        tokenContractAddress,
        dictionaryObj
      );
    }

    async function canSettle() {
      if (currentChainId !== rootstore.CHAIN_ID) {
        rootstore.metamaskOverlayVisible = true;
      } else {
        setSettleOverlayVisible(true);
      }
    }

    async function onSettle(listingId) {
      setSettleOverlayVisible(false);
      var d = new Date();

      let dictionaryObj = {};
      dictionaryObj.tokenId = tokenId;
      dictionaryObj.contractAddress = tokenContractAddress;
      dictionaryObj.eventDetails = {
        event: "SETTLE",
        walletAddress: currentAddress,
        listingNumber: listingDetails ? listingId : null,
        txBidAmount: listingDetails ? listingDetails.salePrice : 0.0,
        currentOwner: listingDetails
          ? listingDetails.seller
          : ownerInfo.walletAddress,
        expiresAt: d.setDate(d.getDate() + 1),
      };
      //console.log(dictionaryObj,"dict")
      await rootstore.settleListing(listingId, dictionaryObj);
    }

    async function onWrapMovr(amountToWrap) {
      if (validateDateAndPrice(amountToWrap)) {
        await rootstore.wrapMovr(amountToWrap);
        setWmovrBalance(0);
      }
    }

    /*
      priceValue: String representation of the price rounded to 3 decimal places
      dateValue: Date object in milliseconds
    */
    function validateDateAndPrice(priceValue, dateValue = 0) {
      const currentDate = new Date();
      const auctionDate = new Date(dateValue);
      let minDate = new Date();
      let maxDate = new Date();
      maxDate.setDate(currentDate.getDate() + 28);
      if (priceValue === "0.000") {
        rootstore.errMessage = "Invalid price";
        return false;
      }
      if (dateValue !== 0 && (auctionDate < minDate || auctionDate > maxDate)) {
        rootstore.errMessage = "Invalid date";
        return false;
      }
      return true;
    }

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

    /* ******************************************************* */
    function showErrorMessage(value) {
      rootstore.errMessage = null;
    }

    function renderHistory(entry) {
      let event, to, from, price, time;
      if (entry.toInfo) {
        if (
          entry.toInfo.walletAddress.toLowerCase() ===
          rootstore.marketplaceContractAddr.toLowerCase() &&
          entry.toInfo.uname === null
        )
          entry.toInfo.uname = "Yuser Marketplace";
        entry.toInfo.walletAddress = truncate(entry.toInfo.walletAddress);
      }
      if (entry.fromInfo)
        if (
          entry.fromInfo.walletAddress.toLowerCase() ===
          rootstore.marketplaceContractAddr.toLowerCase() &&
          entry.fromInfo.uname === null
        )
          entry.fromInfo.uname = "Yuser Marketplace";
      entry.fromInfo.walletAddress = truncate(entry.fromInfo.walletAddress);

      event = entry.Event;
      to = entry.toInfo
        ? entry.toInfo.uname
          ? entry.toInfo.uname
          : entry.toInfo.walletAddress
        : null;
      from = entry.fromInfo
        ? entry.fromInfo.uname
          ? entry.fromInfo.uname
          : entry.fromInfo.walletAddress
        : null;
      price = entry.price ? entry.price : null;
      time = new Date(entry.createdAt).toDateString();
      let keyTime = entry.createdAt.toString();
      switch (entry.Event) {
        case "Minted":
          return (
            <NFTUserContainer key={keyTime}>
              <TableRow>
                <CellName style={{ fontFamily: "LatoRegular" }}>
                  {event}
                </CellName>
              </TableRow>
              <TableRow>
                <CellName>{from}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{to}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{"0"}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{time}</CellName>
              </TableRow>
            </NFTUserContainer>
          );
          break;
        case "Transfer":
          return (
            <NFTUserContainer key={keyTime}>
              <TableRow>
                <CellName style={{ fontFamily: "LatoRegular" }}>
                  {event}
                </CellName>
              </TableRow>
              <TableRow>
                <CellName>{from}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{to}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{"0"}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{time}</CellName>
              </TableRow>
            </NFTUserContainer>
          );
          break;
        case "Listed":
          return (
            <NFTUserContainer key={keyTime}>
              <TableRow>
                <CellName style={{ fontFamily: "LatoRegular" }}>
                  {event}
                </CellName>
              </TableRow>
              <TableRow>
                <CellName>{from}</CellName>
              </TableRow>
              <TableRow style={{ flex: 3 }}>
                <UserName>{"REBL Marketplace"}</UserName>
              </TableRow>
              <TableRow>
                <CellName>{price}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{time}</CellName>
              </TableRow>
            </NFTUserContainer>
          );
          break;
        case "Sold":
          return (
            <NFTUserContainer key={keyTime}>
              <TableRow>
                <CellName style={{ fontFamily: "LatoRegular" }}>
                  {event}
                </CellName>
              </TableRow>
              <TableRow>
                <CellName>{from}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{to}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{price}</CellName>
              </TableRow>
              <TableRow>
                <CellName>{time}</CellName>
              </TableRow>
            </NFTUserContainer>
          );
          break;
        default:
          break;
      }
    }
    return (
      <>
        {nft && (
          <ModalContainer>
            <MainContainer>
              <Post>
                {!mobileLayoutVisible && (
                  <ImageNFT
                    width="645px"
                    height="645px"
                    src={
                      nft.metadata.image + "?fit=clip&w=675&auto=format&dpr=2"
                    }
                    alt="NFT image"
                  />
                )}
                {!mobileLayoutVisible && (
                  <ContentDescription>
                    <AutolinkerComponent
                      text={
                        nft.metadata.description
                          ? nft.metadata.description
                          : "Congratulations for minting this NFT"
                      }
                    />
                  </ContentDescription>
                )}
                {listingOffers && (
                  <Table mobileLayoutVisible={mobileLayoutVisible}>
                    <TitleContainer>
                      <TitleHistory>{"Offers"}</TitleHistory>
                    </TitleContainer>
                    <TableTitle>
                      <TableRow>
                        <UserName
                          style={{
                            color: ({ theme }) =>
                              theme.containerSecondary.color,
                            marginRight: SPACING.medium,
                          }}
                        >
                          {"From"}
                        </UserName>
                      </TableRow>
                      <TableRow>
                        <UserName
                          style={{
                            color: ({ theme }) =>
                              theme.containerSecondary.color,
                          }}
                        >
                          {"Price"}
                        </UserName>
                      </TableRow>
                      <TableRow>
                        <UserName
                          style={{
                            color: ({ theme }) =>
                              theme.containerSecondary.color,
                          }}
                        >
                          {"Expires"}
                        </UserName>
                      </TableRow>
                    </TableTitle>
                    {listingOffers &&
                      listingOffers.map((offer) => {
                        return (
                          <NFTUserContainer>
                            <NFTOfferUser>
                              <Avatar
                                src={AvatarUrl(offer.bidderAvatar, "s")}
                                size={"small"}
                                alt={"avatar"}
                                frame={true}
                                userName={offer.bidder}
                              //onClick={closeAll}
                              />
                              <UserName
                                style={{
                                  paddingLeft: 12,
                                  fontFamily: "LatoBlack",
                                }}
                              >
                                {offer.bidder
                                  ? offer.bidder
                                  : truncate(offer.bidderWallet)}
                              </UserName>
                            </NFTOfferUser>
                            <BidBox>
                              {listingDetails &&
                                listingDetails.saleToken ===
                                rootstore.wDevAddr && (
                                  <Icon
                                    className="MarginRightMedium"
                                    height="auto"
                                    width="18px"
                                    name={Moonriver}
                                  />
                                )}
                              <TxtOffer>{`${Number.parseFloat(
                                offer.bidAmount
                              ).toFixed(3)}`}</TxtOffer>
                            </BidBox>
                            <BidBox />
                          </NFTUserContainer>
                        );
                      })}
                  </Table>
                )}
                <Table mobileLayoutVisible={mobileLayoutVisible}>
                  {tokenHistory && (
                    <>
                      <TitleContainer>
                        <TitleHistory>{"History"}</TitleHistory>
                      </TitleContainer>
                      <TableTitle>
                        <TableRow>
                          <UserName
                            style={{
                              color: ({ theme }) =>
                                theme.containerSecondary.color,
                            }}
                          >
                            {"Event"}
                          </UserName>
                        </TableRow>
                        <TableRow>
                          <UserName
                            style={{
                              color: ({ theme }) =>
                                theme.containerSecondary.color,
                            }}
                          >
                            {"From"}
                          </UserName>
                        </TableRow>
                        <TableRow>
                          <UserName
                            style={{
                              color: ({ theme }) =>
                                theme.containerSecondary.color,
                            }}
                          >
                            {"To"}
                          </UserName>
                        </TableRow>
                        <TableRow>
                          <UserName
                            style={{
                              color: ({ theme }) =>
                                theme.containerSecondary.color,
                            }}
                          >
                            {"Price"}
                          </UserName>
                        </TableRow>
                        <TableRow>
                          <UserName
                            style={{
                              color: ({ theme }) =>
                                theme.containerSecondary.color,
                            }}
                          >
                            {"Date"}
                          </UserName>
                        </TableRow>
                      </TableTitle>
                    </>
                  )}
                  {tokenHistory &&
                    tokenHistory.map((entry) => {
                      return renderHistory(entry);
                    })}
                </Table>
              </Post>
              <PostBodyInner>
                {mobileLayoutVisible && (
                  <ImageNFT
                    width="645px"
                    height="645px"
                    src={
                      nft.metadata.image + "?fit=clip&w=675&auto=format&dpr=2"
                    }
                    alt="NFT image"
                    mobileLayoutVisible={mobileLayoutVisible}
                  />
                )}
                <BuyContainer>
                  <NextGem>{"NextGem"}</NextGem>
                  <TextName>
                    {nft.metadata.name}
                    {" #"}
                    {Number(tokenId)}
                  </TextName>
                  <NFTUser>
                    <Avatar
                      src={AvatarUrl(
                        ownerInfo
                          ? ownerInfo.avatar
                          : nft.userInfo
                            ? nft.userInfo.avatar
                            : null,
                        "m"
                      )}
                      size={"medium"}
                      alt={"avatar"}
                      frame={true}
                      userName={
                        ownerInfo
                          ? ownerInfo.uname
                            ? ownerInfo.uname
                            : ownerInfo.walletAddress
                          : null
                      }
                      onClick={closeAll}
                    />
                    <PostBox>
                      <NFTOwnerNameBox>
                        <Label NFT={true}>
                          {ownerInfo ? "Owned by" : "Created by"}
                        </Label>
                        <UserName
                          style={{ fontFamily: "LatoBlack" }}
                          className="truncate-collection-name"
                        >
                          {ownerInfo
                            ? ownerInfo.uname
                              ? ownerInfo.uname
                              : ownerInfo.walletAddress
                            : nft.userInfo.uname}
                        </UserName>
                      </NFTOwnerNameBox>
                    </PostBox>
                  </NFTUser>
                  {ownerInfo?.uname === authUser?.uname && (
                    <ListingFeaturesTab className="Flex">
                      <ButtonTab
                        onClick={toggleTab}
                        tabActive={tabListingActive}
                        className="Flex"
                      >
                        <TextTab tabActive={tabListingActive}>
                          {"Listing"}
                        </TextTab>
                      </ButtonTab>
                      <ButtonTab
                        onClick={toggleTab}
                        tabActive={tabFeaturesActive}
                        className="Flex"
                      >
                        <TextTab tabActive={tabFeaturesActive}>
                          {"Features"}
                        </TextTab>
                      </ButtonTab>
                    </ListingFeaturesTab>
                  )}
                  {tabListingActive && (
                    <>
                      {(isListed ||
                        (!isListed && !currentAddress) ||
                        (!isListed && currentChainId !== rootstore.CHAIN_ID) ||
                        (!isListed &&
                          currentAddress &&
                          nft.ownerWallet &&
                          currentAddress.toLowerCase() ===
                          nft.ownerWallet.toLowerCase())) && (
                          <>
                            <BidContainer>
                              {isListed && (
                                <>
                                  {listingDetails && listingDetails.auctionEnd ? (
                                    <>
                                      <TxtBid>
                                        {new Date() <
                                          new Date(listingDetails.auctionEnd * 1000)
                                          ? "Bidding ends"
                                          : "Bidding ended"}
                                      </TxtBid>
                                      <TxtCurrentBid>
                                        {new Date(
                                          listingDetails.auctionEnd * 1000
                                        ).toDateString() +
                                          " " +
                                          new Date(
                                            listingDetails.auctionEnd * 1000
                                          ).toLocaleTimeString()}
                                      </TxtCurrentBid>
                                    </>
                                  ) : null}
                                  <TxtCurrentBid style={{ opacity: "50%" }}>
                                    {"Current Price"}
                                  </TxtCurrentBid>
                                  <BidBox main={true}>
                                    <Icon
                                      className="MarginRightSmall"
                                      height="35px"
                                      width="35px"
                                      name={Moonriver}
                                    />
                                    {listingDetails ? (
                                      <TxtBid>{`${Number.parseFloat(
                                        listingDetails?.salePrice
                                      ).toFixed(3)} ${listingDetails?.saleToken ===
                                        rootstore.wDevAddr
                                        ? "WMOVR"
                                        : null
                                        }`}</TxtBid>
                                    ) : (
                                      <TxtBid>{`0.5 WMOVR`}</TxtBid>
                                    )}
                                  </BidBox>
                                </>
                              )}
                              {wmovrBalance !== -1 && !initialLoading && (
                                <>
                                  {!currentAddress ||
                                    !currentChainId ||
                                    currentChainId != rootstore.CHAIN_ID ? (
                                    <OnboardingButton />
                                  ) : !isListed &&
                                    currentAddress &&
                                    currentChainId &&
                                    nft.ownerWallet &&
                                    currentAddress.toLowerCase() ===
                                    nft.ownerWallet.toLowerCase() ? (
                                    <BidBox main={true}>
                                      <Button
                                        onClick={canList}
                                        isIcon={true}
                                        color={COLORS.purple}
                                        colorText={COLORS.white}
                                        iconWidth={"20px"}
                                        strokeWidth={"2px"}
                                        iconName={Shopping}
                                        text={"LIST"}
                                        size={"medium"}
                                        width={"100%"}
                                        className={"FullWidth"}
                                        disabled={
                                          disableButtonOnPage ? true : false
                                        }
                                      />
                                    </BidBox>
                                  ) : currentAddress &&
                                    currentChainId &&
                                    listingDetails &&
                                    currentAddress.toLowerCase() !==
                                    listingDetails.seller.toLowerCase() &&
                                    currentAddress.toLowerCase() !==
                                    listingDetails.highestBidder.toLowerCase() &&
                                    (listingDetails.auctionEnd === 0 ||
                                      new Date() <
                                      new Date(
                                        listingDetails.auctionEnd * 1000
                                      )) ? (
                                    <Button
                                      onClick={canBid}
                                      isIcon={true}
                                      color={COLORS.purple}
                                      colorText={COLORS.white}
                                      strokeWidth="3"
                                      strokeColor={COLORS.white}
                                      iconWidth={"24px"}
                                      iconName={Shopping}
                                      text={
                                        listingDetails.auctionEnd.toString() ===
                                          "0"
                                          ? "LIST NFT"
                                          : "MAKE BID"
                                      }
                                      width={"100%"}
                                      size={"medium"}
                                      className={"FullWidth"}
                                      disabled={
                                        disableButtonOnPage ? true : false
                                      }
                                    />
                                  ) : currentAddress &&
                                    currentChainId &&
                                    listingDetails &&
                                    new Date() >
                                    new Date(
                                      listingDetails.auctionEnd * 1000
                                    ) &&
                                    (currentAddress.toLowerCase() ===
                                      listingDetails.seller.toLowerCase() ||
                                      currentAddress.toLowerCase() ===
                                      listingDetails.highestBidder.toLowerCase()) ? (
                                    <Button
                                      onClick={() => {
                                        rootstore.transactionHash = "";
                                        canSettle();
                                      }}
                                      isIcon={true}
                                      color={COLORS.purple}
                                      colorText={COLORS.white}
                                      iconWidth={"24px"}
                                      iconName={Shopping}
                                      text={
                                        listingDetails.salePrice.toString() ===
                                          ethers.utils
                                            .formatEther(listingDetails.minPrice)
                                            .toString()
                                          ? "CANCEL AUCTION"
                                          : "SETTLE AUCTION"
                                      }
                                      width={"100%"}
                                      size={"medium"}
                                      className={"FullWidth"}
                                      disabled={
                                        disableButtonOnPage ? true : false
                                      }
                                    />
                                  ) : null}
                                </>
                              )}
                            </BidContainer>
                          </>
                        )}
                      {mobileLayoutVisible && (
                        <ContentDescription
                          mobileLayoutVisible={mobileLayoutVisible}
                        >
                          <TextName>
                            {nft.metadata.name}
                            {" #"}
                            {Number(tokenId)}
                          </TextName>
                          <AutolinkerComponent
                            text={
                              nft.metadata.description
                                ? nft.metadata.description
                                : "Congratulations for minting this NFT"
                            }
                          />
                        </ContentDescription>
                      )}
                      {properties.length !== 0 && (
                        <>
                          <TxtProperties>
                            {"Properties"}
                          </TxtProperties>
                          <PropertyListContainer>
                            <PropertyList>
                              <PropertyListInner />
                            </PropertyList>
                            <div style={{width: "100%", marginTop: SPACING.large }}>
                              <Button
                                text={fullPropertyLenght
                                  ? "Less properties"
                                  : "More properties"}
                                onClick={showFullProperty}
                                isIcon={false}
                                width={"100%"}
                                color={({ theme }) => theme.containerSecondary.color}
                                border={true}
                                borderColor={({ theme }) => theme.borderColor.color}
                                padding={true}
                                colorText={({ theme }) => theme.textPrimary.color}
                              />
                            </div>
                          </PropertyListContainer>
                        </>
                      )}
                    </>
                  )}
                  {ownerInfo?.uname === authUser?.uname &&
                    tabFeaturesActive && (
                      <FeaturesContainer>
                        {(nft.contractAddress ===
                          rootstore.ngContractAddrMoonriver ||
                          nft.contractAddress ===
                          rootstore.NextGensContractAddr) && (
                            <>
                              <ContainerTop className="Flex">
                                <div
                                  className="flex"
                                  style={{ flex: 1, flexDirection: "column" }}
                                >
                                  <TxtFeatures tabTitle={true}>
                                    {"Official NextGems Avatar"}
                                  </TxtFeatures>
                                  <TxtFeatures tabTitle={false}>
                                    {
                                      "Show off your NextGems as your profile picture"
                                    }
                                  </TxtFeatures>
                                </div>
                                <ButtonWrapper100>
                                  <BorderedButtonContainer
                                    onClick={claim}
                                    color={COLORS.purple}
                                    width={"100%"}
                                    className={"FullWidth"}
                                    size={"medium"}
                                  >
                                    <BorderedSocialIconBox size={"medium"}>
                                      <Avatar
                                        src={
                                          nft.metadata.image +
                                          "?fit=clip&w60&auto=format"
                                        }
                                        size={"medium"}
                                        alt={"nft image"}
                                        frame={true}
                                        nft={true}
                                      />
                                    </BorderedSocialIconBox>
                                    <TextSocialIcon>
                                      <TextBorderedIcon>
                                        {"MAKE AVATAR"}
                                      </TextBorderedIcon>
                                    </TextSocialIcon>
                                  </BorderedButtonContainer>
                                </ButtonWrapper100>
                              </ContainerTop>
                              <ContainerGrid column={false}>
                                <BtnContainer left={true} className="Flex">
                                  <UnlockedBox>
                                    <TxtFeatures tabTitle={true}>
                                      {"Image File"}
                                    </TxtFeatures>
                                    <TxtFeatures style={{ width: "95%" }}>
                                      {
                                        "Download the PNG image file of your NextGem"
                                      }
                                    </TxtFeatures>
                                  </UnlockedBox>
                                  <ButtonWrapper100>
                                    <ButtonBorderedIconLeft
                                      text={"DOWNLOAD"}
                                      onClick={downloadImage}
                                      isIcon={true}
                                      iconName={ImagePNG}
                                      color={COLORS.purple}
                                      iconWidth={"24px"}
                                      size={"medium"}
                                      width={"100%"}
                                      className={"FullWidth"}
                                    />
                                  </ButtonWrapper100>
                                </BtnContainer>
                                <BtnContainer className="Flex">
                                  <UnlockedBox>
                                    <TxtFeatures tabTitle={true}>
                                      {"Drawing File"}
                                    </TxtFeatures>
                                    <TxtFeatures>
                                      {
                                        "Download the SVG drawing file of your NextGem"
                                      }
                                    </TxtFeatures>
                                  </UnlockedBox>
                                  <ButtonWrapper100>
                                    <ButtonBorderedIconLeft
                                      text={"DOWNLOAD"}
                                      onClick={downloadImage}
                                      isIcon={true}
                                      iconName={ImageSVG}
                                      color={COLORS.purple}
                                      iconWidth={"24px"}
                                      size={"medium"}
                                      width={"100%"}
                                      className={"FullWidth"}
                                      disabled={true}
                                    />
                                  </ButtonWrapper100>
                                </BtnContainer>

                                <BtnContainer left={true} className="Flex">
                                  <Icon
                                    width="50px"
                                    height="auto"
                                    name={GemPink}
                                  />
                                  <UnlockedBox
                                    style={{ marginTop: SPACING.medium }}
                                  >
                                    <TxtFeatures tabTitle={true}>
                                      {"Gem Rewards"}
                                    </TxtFeatures>
                                    {nft.contractAddress ===
                                      rootstore.NextGemsContractAddr && (
                                        <TxtFeatures>
                                          {
                                            "You are receiving 500 stones and 1000 rocks per day."
                                          }
                                        </TxtFeatures>
                                      )}
                                    {nft.contractAddress ===
                                      rootstore.NextGensContractAddr && (
                                        <TxtFeatures>
                                          {
                                            "You are receiving 250 stones and 500 rocks per day."
                                          }
                                        </TxtFeatures>
                                      )}
                                  </UnlockedBox>
                                </BtnContainer>
                                <BtnContainer className="Flex">
                                  <UnlockedBox>
                                    <TxtFeatures tabTitle={true}>
                                      {"Ad boost"}
                                    </TxtFeatures>
                                    <TxtFeatures>
                                      {"Your content reaches"}
                                    </TxtFeatures>
                                  </UnlockedBox>
                                  <ButtonWrapper100>
                                    <Button
                                      //onClick={session ? null : loadLogin}
                                      color={COLORS.whiteLightMedium}
                                      colorText={COLORS.white}
                                      text={"COMING SOON"}
                                      size={"medium"}
                                      width={"100%"}
                                      className={"FullWidth"}
                                      disabled={true}
                                    />
                                  </ButtonWrapper100>
                                </BtnContainer>
                              </ContainerGrid>
                            </>
                          )}
                        {nft.metadata.downloadLink && (
                          <BtnContainer className="Flex">
                            <UnlockedBox>
                              <TxtFeatures tabTitle={true}>
                                {"Downloadable Content"}
                              </TxtFeatures>
                              <TxtFeatures>
                                {
                                  "Download additional hidden content by pressing the link below"
                                }
                              </TxtFeatures>
                            </UnlockedBox>
                            <ButtonWrapper100>
                              <Button
                                onClick={downloadAditionalContent}
                                color={COLORS.whiteLightMedium}
                                colorText={COLORS.white}
                                text={"DOWNLOAD"}
                                size={"medium"}
                                width={"100%"}
                                className={"FullWidth"}
                              />
                            </ButtonWrapper100>
                          </BtnContainer>
                        )}
                      </FeaturesContainer>
                    )}
                  {socialMediaPosts && (
                    <Table mobileLayoutVisible={mobileLayoutVisible}>
                      {listingOffers && (
                        <>
                          <TitleContainer>
                            <TitleHistory>{"Posts"}</TitleHistory>
                          </TitleContainer>
                          <TableTitle>
                            <TableRow>
                              <UserName
                                style={{
                                  color: ({ theme }) =>
                                    theme.containerSecondary.color,
                                  marginRight: SPACING.medium,
                                }}
                              >
                                {"From"}
                              </UserName>
                            </TableRow>
                            <TableRow>
                              <UserName
                                style={{
                                  color: ({ theme }) =>
                                    theme.containerSecondary.color,
                                }}
                              >
                                {"Description"}
                              </UserName>
                            </TableRow>
                            <TableRow>
                              <UserName
                                style={{
                                  color: ({ theme }) =>
                                    theme.containerSecondary.color,
                                }}
                              >
                                {"Date"}
                              </UserName>
                            </TableRow>
                          </TableTitle>
                        </>
                      )}
                      {listingOffers &&
                        listingOffers.map((offer) => {
                          return (
                            <NFTUserContainer>
                              <NFTOfferUser>
                                <Avatar
                                  src={AvatarUrl(offer.bidderAvatar, "s")}
                                  size={"small"}
                                  alt={"avatar"}
                                  frame={true}
                                  userName={offer.bidder}
                                //onClick={closeAll}
                                />
                              </NFTOfferUser>
                              <BidBox>
                                {listingDetails &&
                                  listingDetails.saleToken ===
                                  rootstore.wDevAddr && (
                                    <div className="flex">
                                      <UserName
                                        style={{
                                          paddingLeft: 12,
                                          fontFamily: "LatoBlack",
                                        }}
                                      >
                                        {offer.bidder
                                          ? offer.bidder
                                          : truncate(offer.bidderWallet)}
                                      </UserName>
                                      <ContentDescription>
                                        {"hdfsj hfkshf skdhf lksdf"}
                                      </ContentDescription>
                                    </div>
                                  )}
                                <TxtOffer>{`${Number.parseFloat(
                                  offer.bidAmount
                                ).toFixed(3)}`}</TxtOffer>
                              </BidBox>
                              <BidBox />
                            </NFTUserContainer>
                          );
                        })}
                    </Table>
                  )}
                </BuyContainer>
              </PostBodyInner>
              {listingOverlayVisible && (
                <ListForSale
                  onList={onList}
                  close={() => setListingOverlayVisible(false)}
                  image={nft.metadata.image}
                />
              )}
              {buyNowOverlayVisible && isListed && listingDetails && (
                <BuyNow
                  listingDetails={listingDetails}
                  token={nft}
                  tokenId={tokenId}
                  buyNow={confirmBid}
                  wrapMovr={() => {
                    rootstore.wrapMovrOverlayVisible = true;
                  }}
                  image={nft.metadata.image}
                  balance={wmovrBalance}
                  close={() => {
                    setBuyNowOverlayVisible(false);
                  }}
                />
              )}
              {makeOfferOverlayVisible && isListed && listingDetails && (
                <MakeOffer
                  listingDetails={listingDetails}
                  tokenId={tokenId}
                  makeOffer={confirmBid}
                  wrapMovr={() => (rootstore.wrapMovrOverlayVisible = true)}
                  image={nft.metadata.image}
                  balance={wmovrBalance}
                  close={() => {
                    setMakeOfferOverlayVisible(false);
                  }}
                />
              )}
              {settleOverlayVisible && isListed && listingDetails && (
                <AcceptBid
                  listingDetails={listingDetails}
                  token={nft}
                  tokenId={tokenId}
                  onSettle={onSettle}
                  image={nft.metadata.image}
                  close={() => {
                    setSettleOverlayVisible(false);
                  }}
                />
              )}
              {rootstore.purchaseConfirmationVisible && confirmationDetails && (
                <OfferConfirmation
                  close={() => {
                    rootstore.purchaseConfirmationVisible = false;
                    setConfirmationDetails(null);
                  }}
                  details={confirmationDetails}
                  onConfirm={makeBid}
                />
              )}
              {rootstore.listingConfirmationVisible && confirmListDetails && (
                <ListingConfirmation
                  close={() => {
                    rootstore.listingConfirmationVisible = false;
                    setConfirmListDetails(null);
                  }}
                  details={confirmListDetails}
                  onConfirm={makeListing}
                />
              )}

              {rootstore.wrapMovrOverlayVisible && (
                <WrapMOVR
                  close={() => {
                    rootstore.wrapMovrOverlayVisible = false;
                  }}
                  onWrap={onWrapMovr}
                  validatePrice={validateDateAndPrice}
                  movrBalance={movrBalance}
                />
              )}
              {rootstore.txCancelledOverlayVisible && (
                <TxCancelledOverlay
                  closeOverlay={() =>
                    (rootstore.txCancelledOverlayVisible = false)
                  }
                />
              )}
              {rootstore.txPendingOverlayVisible && <TxPendingOverlay />}
              {rootstore.txConfirmOverlayVisible && <TxConfirmOverlay />}
              {rootstore.txFailedOverlayVisible && (
                <TxFailedOverlay
                  closeOverlay={() => {
                    rootstore.txFailedOverlayVisible = false;
                    rootstore.transactionHash = null;
                    rootstore.failedTxMessage = "Your transaction failed.";
                  }}
                />
              )}
              {rootstore.txSuccessOverlayVisible && (
                <TxSuccessOverlay
                  closeOverlay={() =>
                    (rootstore.txSuccessOverlayVisible = false)
                  }
                  buttonText={"Continue"}
                  successButtonOnClick={() => {
                    rootstore.txSuccessOverlayVisible = false;
                  }}
                />
              )}
              {rootstore.metamaskOverlayVisible && <MetamaskOverlay />}
              {rootstore.errMessage &&
                !(buyNowOverlayVisible || makeOfferOverlayVisible) && (
                  <ErrorMessageSignIn
                    errorMessage={rootstore.errMessage}
                    showErrorMessage={showErrorMessage}
                  />
                )}
            </MainContainer>
            <TextName
              style={{ marginLeft: SPACING.large, marginTop: SPACING.large }}
            >
              {"More Nextgems"}
            </TextName>
            <NextGemsList />
            <FooterHorizontal />
          </ModalContainer >
        )}
      </>
    );
  })
);

function LinkCopiedMessage({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible === true ? (
        <motion.div
          key="messageTop"
          className="MessageTopnftshare"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
        >
          {"Linked Copied!"}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
function ComingSoonMessage({ comingSoon }) {
  return (
    <AnimatePresence>
      {comingSoon === true ? (
        <motion.div
          key="messageTop"
          className="MessageTopnftshare"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
        >
          {"More Features Coming Soon!"}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

NftPage.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    cookieValues: {
      disableBidButtonCookie: cookies.disableBidButton
        ? cookies.disableBidButton
        : false,
      dictionaryArrayCookie: cookies.dictionaryArray
        ? cookies.dictionaryArray
        : [],
    },
  };
};
export default NftPage;

const MainContainer = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: 60% 40%;

  @media screen and (max-width: 991px) {
    grid-template-columns: 100%;
    min-width: 320px;
  }
`;
const ContentDescription = styled.div`
    flex-direction: column;
    padding: ${SPACING.large}px;
    border-radius: ${props => props.mobileLayoutVisible ? null : "0 0 10px 10px"};
    border-width: ${props => props.mobileLayoutVisible ? null : 1}px;
    border-style: ${props => props.mobileLayoutVisible ? null : "solid"};
    border-color: ${({ theme }) => theme.borderColor.color};

  @media screen and (max-width: 991px) {
    padding-top: 0;
    padding-bottom: ${SPACING.medium}px;
  }
`;

const TextName = styled.p`
  font-size: 27px;
  padding-bottom: 12px;
  font-family: "Rubik", "LatoBlack", sans-serif;

  @media screen and (max-width: 991px) {
    font-size: 22px;
  }
`;

const NFTUser = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${SPACING.medium}px;
`;
const ListingFeaturesTab = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.borderColor.color};
  //margin-bottom: ${SPACING.medium}px;
  margin-top: ${SPACING.small}px;
  overflow: hidden;
`;

const ButtonTab = styled.div`
  display: flex;
  flex: 1;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.tabActive ? ({ theme }) => theme.containerSecondary.color : "transparent"};
  cursor: pointer;
`;

const TextTab = styled.p`
  font-family: ${(props) => (props.tabActive ? "LatoBlack" : "LatoRegular")};
`;

const ContainerGrid = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 1300px) and (min-width: 991px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (max-width: 520px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const FeaturesContainer = styled.div`
    flex-direction: column;
    background-color: ${({ theme }) => theme.containerSecondary.color};
    border-radius:10px;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.borderColor.color};
    margin-top: ${SPACING.medium}px;
`;

const TxtFeatures = styled.p`
  font-family: ${(props) => (props.tabTitle ? "LatoBlack" : "LatoRegular")};
  text-align: center;
  padding-bottom: ${(props) => (props.tabTitle ? 7 : 3)}px;
`;

const ContainerTop = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${SPACING.large}px;

  @media screen and (max-width: 1300px) {
    border-bottom-width: 0px;
    border-bottom-color: transparent;
    border-bottom-style: none;
  }
`;

const BtnContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right-width:  ${props => props.left ? 2 : 0}px;
    border-right-color: ${props => props.left ? ({ theme }) => theme.borderColor.color : "transparent"};
    border-right-style:  ${props => props.left ? "solid" : "none"};
    padding: ${SPACING.large}px;
    border-top-width: 2px;
    border-top-color: ${({ theme }) => theme.borderColor.color};
    border-top-style: solid;

  @media screen and (max-width: 1300px) and (min-width: 991px) {
    border-right-width: 0px;
    border-right-color: transparent;
    border-right-style: none;
  }
`;


const Alink = styled.a`
    text-decoration: none;
    opacity:0.7;

    :link {
        color:  ${({ theme }) => theme.textPrimary.color}
    }
    :visited {
        color: ${({ theme }) => theme.textPrimary.color}
    }
    :hover {
        opacity: 0.4;
        color: ${({ theme }) => theme.textPrimary.color}
    }
    :active {
        opacity: 0.4;
        color: ${({ theme }) => theme.textPrimary.color}
    }
`;

const NavBox = styled.div`
    height: 50px;
    width: 100%;
    background-color: ${({ theme }) => theme.greyButton.color};
    justify-content: flex-start;
    align-items: center;

    @media screen and (max-width: 1290px){
      width:calc(100vw - 82px);
    }
    
    @media screen and (max-width: 750px){
        overflow: hidden;
    }
`
const NavButton = styled.div`
    display: flex;
    cursor: pointer;
`

const Divider = styled.div`
    height: 20px;
    width: 2px;
    border-radius: 1px;
    align-self: center;
    background-color: ${COLORS.greyMedium};
`
const ButtonTitle = styled.p`
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    font-family: ${props => props.active ? "LatoBlack" : "LatoRegular"};
    font-size:16px;   
`;

const CellName = styled.p`
  font-size: 16px;
  font-family: "LatoBlack";
`;

const PropertyLabel = styled.p`
  font-size: 16px;
  font-family: "LatoBlack";
  margin-bottom: 6px;
`;

const PropertyDescription = styled.p`
  font-size: 16px;
`;

const NextGem = styled.p`
  font-size: 27px;
  padding-bottom: 12px;
  font-family: "LatoRegular", sans-serif;
  color: ${COLORS.purple};

  @media screen and (max-width: 991px) {
    font-size: 22px;
}
`;
const TxtProperties = styled.p`
  font-family: "LatoBlack";
  text-align: left;
  margin-top: ${SPACING.medium}px;
  margin-bottom: ${SPACING.medium}px;
`;