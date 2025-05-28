import React, { useState, useEffect, useRef } from "react";
import {
  MainContainer,
  GridPostsContainer,
  ItemBox,
  ButtonWrapper,
  ImageNFT,
  BottomBox,
  BtnWrap,
  TxtLarge,
  TopBox,
  StatusBox,
  SubBoxTop,
  TxtSmall,
  TxtLargeUname,
  BottomBoxNft,
  SubBoxBottom,
  Text,
  TxtLargeNFT,
  ItemBoxNfT,
  Backdrop
} from "./GridThreeCells.elements";
import Icon from "../Icon/Icon";
import { inject, observer } from "mobx-react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { COLORS } from "../../styles/Styling.js";
import { useStore } from "../../stores/RootStore";
import InfiniteScroll from "react-infinite-scroll-component";
import GemWhite from "../../public/icons/gem-white.svg";
import Comments from "../../public/icons/comments.svg";
import Numeral from "react-numeral";
import Avatar from ".././Avatar/Avatar";
import { AvatarUrl } from "../../stores/tools.js";
import AvatarDefault from "../../public/icons/avatar.svg";
import Movr from "../../public/icons/moonriver_logo3.svg";
import { ethers } from "ethers";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import { FEED_TYPES } from "../NavFeed/NavFeed";
import { useSession } from "next-auth/client";
import Loader from "../../pages/api/posts";
import LocalPosts from "../../stores/LocalPosts";
import { prunePosts } from "../../stores/tools.js";
import { toJS } from "mobx";
import Modal from "react-overlays/Modal";
import { SplashScreen } from "../SplashScreen/SplashScreen";
import calculateCurrentAmountGifted from "../../functions/calculateCurrentGiftAmount";
import PostMedia from "../PostMedia/PostMedia";
import PostModal from "../PostModal/PostModal";

export default inject("store")(
  observer(function GridThreeCells(props) {
    const rootstore = useStore();
    const router = useRouter();
    const [authUser, setAuthUser] = useState({});
    const [session, loading] = useSession();
    const [hasMoreProf, setHasMoreProf] = useState(true);
    const [showPleaseLoginModal, setShowPleaseLoginModal] = useState(false);
    const renderBackdrop = (props) => <Backdrop {...props} />;
    const [showPostModal, setShowPostModal] = useState(false);
    const [choosenPost, setChoosenPost] = useState(null);
    const [contentSizes, setContentSizes] = useState([]);

    const [_, _pull] = useState(false);

    const gridContRefs = useRef([]);

    useEffect(() => {
      let newSizesList = [];
      for (let ref of gridContRefs?.current) {
        let height = ref !== null ? ref.clientHeight : 20;
        let width = ref !== null ? ref.clientWidth : 20;
        newSizesList.push({ height, width });
      }
      setContentSizes([...newSizesList]);
    }, [gridContRefs.current.length, props.posts.length])

    //The useEffect to set Avatar to the latest
    useEffect(() => {
      Loader.LoadHot();

      if (props.single) {
        props.store.setFeedType(FEED_TYPES.SINGLE);
      } else if (props.profile) {
        props.store.setFeedType(FEED_TYPES.PROFILE);
        LocalPosts.getInstance().setPosts_profile = props?.posts;
        return;
      }
    }, []);

    useEffect(() => {
      (() => {
        if (props.store.feedposts.length !== 0) return;
        if (props.profile) return setHasMoreProf(false);
      })();

      /*
                         _onEndReached()
                         Get the next batch of posts
                         William Doyle
                         July 25th 2021
                     */
      async function _onEndReached() {
        if (!session) return setShowPleaseLoginModal(true);
        else if (props.store.feedType === FEED_TYPES.PROFILE) {
          if (props.profile) {
            // Changed by Vandana to fix a scroll error Sept 16 props?.posts[0]?.userId to props.userId
            // this might be a crappy thing to do, but I'm going to use the posts we have to get the user id. Then I'm going to use that user id to get the next batch of posts -wdd aug 17th 2021
            await Loader.LoadProfile(props.userId, false, false, {
              current_length: LocalPosts.getInstance().posts_profile.length,
            });
          } else if (props?.targUser)
            await Loader.LoadProfile(props?.targUser?.id, false, false, {
              current_length: LocalPosts.getInstance().posts_profile.length,
            });
          // else
          // console.warn(`STUB: PostsList.js _onEndReached() not sure how you managed this but it seems your trying to look at a profile feed but that feed doesn't belong to you and it also doesn't belong to anyone else. So you're trying to look at a feed outside the set of all feeds, that should be imposable, but alas, we are here`);
        } else
          throw new Error(
            `[PostsList.js::_onEndReached()] Unknown feedType ${props.store.feedType
            } feedType should be one of ${Object.values(
              FEED_TYPES
            ).toString()} from FEED_TYPES`
          );
      }

      let mayGetMore = true;
      function onScroll() {
        if (
          mayGetMore &&
          window.innerHeight + window.scrollY > document.body.offsetHeight - 10
        ) {
          //console.log("fetching more.........")
          _onEndReached();
        }
      }
      async function doEffect() {
        if (props.forceUsePropsPosts !== true)
          window.addEventListener("scroll", onScroll);
        const tauthUser = await rootstore.getAuthUser();
        setAuthUser(tauthUser);
      }
      doEffect();
      return function cleanup() {
        mayGetMore = false;
        window.removeEventListener("scroll", onScroll);
      };
    }, [props.store.feedType, props?.forceUsePropsPosts, props?.profile, props.store, props?.targUser, rootstore]);

    async function fetchMorePosts() {
      if (!session) {
        // SHOW "HEY DUMMY! LOG IN!"
        setShowPleaseLoginModal(true);
        // DO NOT LOAD MORE POSTS
        return;
      } else if (props.store.feedType === FEED_TYPES.PROFILE) {
        if (props.profile) {
          // Changed by Vandana to fix a scroll error Sept 16 props?.posts[0]?.userId to props.userId
          // this might be a crappy thing to do, but I'm going to use the posts we have to get the user id. Then I'm going to use that user id to get the next batch of posts -wdd aug 17th 2021
          const morePosts = await Loader.LoadProfile(
            props.userId,
            false,
            false,
            {
              current_length: LocalPosts.getInstance().posts_profile.length,
            }
          );
          if (morePosts === false) {
            setHasMoreProf(false);
          }
        } else if (props?.targUser)
          await Loader.LoadProfile(props?.targUser?.id, false, false, {
            current_length: LocalPosts.getInstance().posts_profile.length,
          });
        // else
        // console.warn(`STUB: PostsList.js _onEndReached() not sure how you managed this but it seems your trying to look at a profile feed but that feed doesn't belong to you and it also doesn't belong to anyone else. So you're trying to look at a feed outside the set of all feeds, that should be imposable, but alas, we are here`);
      } else
        throw new Error(
          `[PostsList.js::_onEndReached()] Unknown feedType ${props.store.feedType
          } feedType should be one of ${Object.values(
            FEED_TYPES
          ).toString()} from FEED_TYPES`
        );
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
        /* you can also use 'auto' behaviour
                       in place of 'smooth' */
      });
    };

    function GiftAmoundDisplay(post) {
      const g = (() => {
        if (!rootstore.local_gifting_state_has(post._id)) return post?.gems;
        // return rootstore.local_gifting_state_get(post_id) + (props?.post?.gems ?? 0)- (props?.post?.gifted ?? 0); // amount gifted this session + amount gifted by all users - amount gifted in previous sessions (last step removes duplcates)
        return calculateCurrentAmountGifted(
          rootstore.local_gifting_state_get(post._id)
        )(post?.gems)(post?.gifted);
      })();

      if (g === undefined || !(g > 0)) return <TxtLarge>{"Gift"}</TxtLarge>;

      if (g > 999)
        return (
          <TxtLarge style={{ fontSize: 12 }}>
            <Numeral className="BoldFontExtraSmall" value={g} format={"0.0a"} />
          </TxtLarge>
        );
      return <TxtLarge style={{ fontSize: 12 }}>{g}</TxtLarge>;
    }

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

    const OpenSideBarModal = (type, item) => {
      if (type == "nft") {
        if (item.name) {
          let contractTokenId;
          try {
            contractTokenId = item.ContractId.toNumber();
          } catch (err) {
            contractTokenId = item.ContractId;
          }
          let path = `/nft?tokenId=${contractTokenId}&contractAddress=${item.contractAddress}`;
          router.push(path);

          //This is the new NFT page that will be released with collections
          // router.push({
          //     pathname: "/nft/contractAddress/[contractAddress]/tokenId/[tokenId]",
          //     query: {
          //         contractAddress: item.contractAddress,
          //         tokenId: contractTokenId
          //     }
          // })
        } else console.log("Cannot open unminted nft");
      } else {
        if (!rootstore.localPosts.hasPost(item?._id)) {
          rootstore.localPosts.posts_single = [item];
        }
        rootstore.selectedPost = item;
        setShowPostModal(true);
        setChoosenPost(item);
      }
    };

    return (
      <MainContainer>
        {props.posts.length !== 0 && (
          <InfiniteScroll
            dataLength={props.posts.length}
            loader={
              <div style={{ alignSelf: "center" }}>
                <ScaleLoader color={COLORS.purple} loading={true} size={150} />
              </div>
            }
            style={{ flexDirection: "column", width: "100%" }}
            hasMore={props.postsGrid ? hasMoreProf : props.hasMoreNft}
            next={props.postsGrid ? fetchMorePosts : props.fetchMoreDataNft}
            scrollThreshold={0.2}
          >
            {props.postsGrid ? (
              <GridPostsContainer>
                {prunePosts(toJS(props.store.feedposts)).map((post, index) => {
                  return (
                    <div key={post._id}
                      ref={ref => gridContRefs.current[index] = ref}
                    >
                      <ItemBox
                        post={post}
                        id={"container"}
                        onClick={() => OpenSideBarModal("post", post)}
                      >
                        {contentSizes[index] && <PostMedia
                          singleMode={false}
                          post={post}
                          grid={true}
                          height={contentSizes[index]?.height}
                          width={contentSizes[index]?.width}
                        />
                        }
                        <BottomBox>
                          <BtnWrap positionLeft={true}>
                            <Icon
                              width="auto"
                              height="24px"
                              name={GemWhite}
                              shadow={"true"}
                            />
                            {GiftAmoundDisplay(post)}
                          </BtnWrap>
                          <BtnWrap positionLeft={false}>
                            <Icon
                              width="auto"
                              height="24px"
                              name={Comments}
                              shadow={"true"}
                            />
                            <TxtLarge
                              style={{ textAlign: "right", fontSize: 12 }}
                            >
                              {post?.comments > 999 ? (
                                <Numeral
                                  className="BoldFontExtraSmall"
                                  value={post.comments}
                                  format={"0.0a"}
                                />
                              ) : (
                                post.comments
                              )}
                            </TxtLarge>
                          </BtnWrap>
                        </BottomBox>
                      </ItemBox>
                    </div>
                  )
                })}
              </GridPostsContainer>
            ) : (
              <GridPostsContainer>
                {props.posts.map((post, index) => (
                  <ItemBoxNfT
                    key={post.name ? post.name + index : index}
                    product={post}
                    id={"container"}
                  >
                    <TopBox>
                      <StatusBox positionLeft={true}>
                        {post.minterInfo ? (
                          <Avatar
                            src={AvatarUrl(
                              post.minterInfo.avatar
                                ? post.minterInfo.avatar
                                : null,
                              "m"
                            )}
                            size={"medium"}
                            alt={"Avatar"}
                            frame={false}
                            edit={false}
                            userName={
                              post.minterInfo.uname
                                ? post.minterInfo.uname
                                : null
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
                        <SubBoxTop positionLeft={true}>
                          <TxtSmall>{"Minted by"}</TxtSmall>
                          <TxtLargeUname
                            className="truncate-collection-name"
                            positionLeft={true}
                          >
                            {post.minterInfo && post.minterInfo.uname
                              ? post.minterInfo.uname
                              : truncate(post.minterInfo.walletAddress)}
                          </TxtLargeUname>
                        </SubBoxTop>
                      </StatusBox>
                    </TopBox>
                    <div
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        display: "block",
                        height: "100%",
                        width: "100%",
                      }}
                      onClick={() => {
                        OpenSideBarModal("nft", post);
                      }}
                    >
                      <ImageNFT
                        src={
                          post.image +
                          "?fit=clip&w=320&fm=webp$auto=format&dpr=2"
                        }
                        alt="NFT image"
                      />
                    </div>
                    <BottomBoxNft>
                      <TxtLargeNFT
                        className="truncate-collection-job-title"
                        positionLeft={true}
                      >
                        {post.name
                          ? post.name + " #" + post.ContractId
                          : "Unminted NextGem"}
                      </TxtLargeNFT>

                      {post.isListed ? (
                        <SubBoxBottom>
                          <div>
                            <Icon
                              //className={'MarginRightSmall'}
                              width={20}
                              height={25}
                              name={Movr}
                            />
                            <Text>
                              {post.listingDetails
                                ? Number.parseFloat(
                                  ethers.utils.formatEther(
                                    BigInt(post.listingDetails.salePrice)
                                  )
                                ).toFixed(3)
                                : null}
                            </Text>
                          </div>

                          <Button
                            text={
                              post.listingDetails.auctionEnd > 0
                                ? "Auction"
                                : "Listing"
                            }
                            disabled={false}
                            isIcon={false}
                            color={COLORS.purple}
                            colorText={COLORS.white}
                            //className={'MarginLeftLarge'}
                            onClick={() => OpenSideBarModal("nft", post)}
                          />
                        </SubBoxBottom>
                      ) : (
                        <SubBoxBottom>
                          <div></div>
                          <Button
                            text={"View NFT"}
                            disabled={false}
                            isIcon={false}
                            color={COLORS.purple}
                            colorText={COLORS.white}
                            //className={'MarginLeftLarge'}
                            onClick={() => OpenSideBarModal("nft", post)}
                          />
                        </SubBoxBottom>
                      )}
                    </BottomBoxNft>
                  </ItemBoxNfT>
                ))}
              </GridPostsContainer>
            )}
          </InfiniteScroll>
        )}
        {showPostModal && (
          <PostModal
            show={showPostModal}
            setShow={setShowPostModal}
            targetPostId={choosenPost._id}
            postComments={choosenPost._id.comments}
            owner={"WrappedPost"}
          />
        )}
        {showPleaseLoginModal && (
          <Modal
            show={showPleaseLoginModal}
            onClick={() => setShowPleaseLoginModal(false)}
            renderBackdrop={renderBackdrop}
          >
            <SplashScreen />
          </Modal>
        )}
        <ButtonWrapper>
          <Button
            text={"Scroll to Top"}
            onClick={scrollToTop}
            isIcon={false}
            width={"120px"}
            color={"transparent"}
            border={true}
            borderColor={COLORS.purple}
            padding={true}
            colorText={({ theme }) => theme.textPrimary.color}
          />
        </ButtonWrapper>
      </MainContainer>
    );
  })
);