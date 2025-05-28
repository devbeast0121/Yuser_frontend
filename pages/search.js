import React from "react";
import { Avatar, ButtonFollow, SearchBarPage, TabComponentThree, SignupPromo, Footer } from "../components";
import { useStore } from "../stores/RootStore";
import { useRouter } from "next/router";
import {
  Container,
  MiddleFullContainerSearch,
  RightContainer,
  RightContainerInner,
  SideBarLeftBlock,
} from "../styles/globalStyles";
import { useSession } from "next-auth/client";
import { inject, observer } from "mobx-react";
import { useState } from "react";
import SearchGrid from "../components/SearchGrid/SearchGrid";
import { COLORS, SPACING } from "../styles/Styling";
import { AvatarUrl } from "../stores/tools";
import { ScaleLoader } from "react-spinners";
import styled from "styled-components";
import ImageBanner from "../public/images/nextGemsLaunchBanner.jpg";


export default inject("store")(
  observer(function Search(props) {
    const [openSearchModal, setOpenSearchModal] = useState(false);
    //Search
    const [postsList, setPostsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [topActive, setTopActive] = useState(true);
    const [usersActive, setUsersActive] = useState(false)
    const [postsActive, setPostsActive] = useState(false)
    const [topUsers, setTopUsers] = useState([]);
    const [loader, setLoader] = useState(false)

    const rootstore = useStore();

    const router = useRouter();
    const [session, loading] = useSession();


    React.useEffect(() => {
      async function doEffect() {
        if (router.route === "/search" && window.innerWidth > 700) {
          if (usersList.length > 0) {
            let usersTop = [...usersList];
            setTopUsers(usersTop.splice(0, 3));
          }
          if (usersList.length === 0) {
            setTopUsers([]);
          }
        }
      }
      doEffect();
    }, [usersList]);

    React.useEffect(() => {
      async function doEffect() {
        if (router.route === "/search" && window.innerWidth <= 700) {
          setUsersList(rootstore.mobSearchUsers);
          setPostsList(rootstore.mobSearchPosts);
          let usersTop = [...rootstore.mobSearchUsers];

          setTopUsers(usersTop.splice(0, 3));
        }
      }
      doEffect();
    }, [rootstore.mobSearchUsers, rootstore.mobSearchPosts]);

    const reactOnViewMore = (value) => {
      if (value == "sccounts") {
        setUsersActive(true)
      } else if (value == "posts") {
        setPostsActive(true)
      }
      setTopActive(false)
    }

    const handleTop = async () => {
      setTopActive(true)
      setUsersActive(false)
      setPostsActive(false)
    }

    const handleUsers = async () => {
      setTopActive(false)
      setUsersActive(true)
      setPostsActive(false)
    }

    const handlePosts = async () => {
      setTopActive(false)
      setUsersActive(false)
      setPostsActive(true)
    }

    return (
      <>
        {session ? (
          <Container>
            <MiddleFullContainerSearch >
              <SearchBarPage
                openSearchModal={openSearchModal}
                setOpenSearchModal={setOpenSearchModal}
                setUsersList={setUsersList}
                setPostsList={setPostsList}
                setLoader={setLoader}
              />
              <TabWrapper>
                <TabComponentThree
                  leftText={"TOP"}
                  rightText={"POSTS"}
                  middleText={"USERS"}
                  setLeftSide={handleTop}
                  setMiddleSide={handleUsers}
                  setRightSide={handlePosts}
                  leftSide={topActive}
                  middleSide={usersActive}
                  rightSide={postsActive}
                  margin={true}
                />
              </TabWrapper>
              {
                topActive && !loader &&
                (
                  <div style={{ marginLeft: SPACING.large, marginRight: SPACING.large, flexDirection: "column" }}>
                    {
                      topUsers.length > 0 &&
                      <HeaderBox >
                        <BoldText style={{ fontSize: 20 }}>Accounts</BoldText>
                        <div onClick={() => reactOnViewMore("accounts")}
                        >
                          <ButtonText>VIEW MORE</ButtonText>
                        </div>
                      </HeaderBox>
                    }

                    {
                      topUsers.length > 0 &&
                      topUsers.map((suggestion) => (
                        <UserSuggestionDiv
                          key={suggestion._id}

                        >
                          <Avatar
                            src={AvatarUrl(suggestion.avatar, "m")}
                            size={"medium"}
                            alt={"avatar"}
                            userId={suggestion.userId}
                          />
                          <NameBioDiv>
                            <BoldText className="MarginLeftMedium">
                              {suggestion.uname}
                            </BoldText>
                            <div className="MarginLeftMedium">
                              {suggestion.bio}
                            </div>
                          </NameBioDiv>
                          <ButtonFollow
                            userId={suggestion._id}
                            border={false}
                            colored={true}
                            size={'small'}
                          />
                        </UserSuggestionDiv>
                      ))
                    }
                    {
                      postsList.length > 0 &&
                      <PostsBox>
                        <HeaderBox >
                          <BoldText style={{ fontSize: 20 }}>Posts</BoldText>
                          <div onClick={() => reactOnViewMore("posts")}
                          >
                            <ButtonText>VIEW MORE</ButtonText>
                          </div>
                        </HeaderBox>
                        <SearchGrid
                          posts={postsList}
                        />
                        {/*use this component when the search functionality will be fixed on the server side {fix search query, onendreach()*/}
                        {/* <GridThreeCells ---> update profile.js, index.js [username]
                                  posts={postsList}
                                  postsGrid={false} ---> replace with location={profile/nft/search..}
                                  fetchMoreDataNft={fetchUserNFTs} ---> replace with fetchMoreData={fetchMoreDataPosts, fetchMoreDataNft..}
                                  hasMoreNft={hasMoreNft} ---> replace with hasMore={hasMorePosts/hasMoreNft...}
                              />
                          */}
                      </PostsBox>
                    }

                  </div>
                )

              }
              {
                usersActive && !loader &&
                (
                  <div style={{ marginLeft: SPACING.large, marginRight: SPACING.large, flexDirection: "column" }}>
                    {
                      topUsers.length > 0 &&
                      <BoldText style={{ marginTop: SPACING.large, marginBottom: SPACING.large, fontSize: 20 }}>Accounts</BoldText>
                    }
                    {
                      usersList.length > 0 &&
                      usersList.map((suggestion) => (
                        <UserSuggestionDiv
                          key={suggestion._id}
                        >
                          <Avatar
                            src={AvatarUrl(suggestion.avatar, "m")}
                            size={"medium"}
                            alt={"avatar"}
                            userId={suggestion.userId}
                          />
                          <NameBioDiv>
                            <BoldText className="MarginLeftMedium">
                              {suggestion.uname}
                            </BoldText>
                            <div className="MarginLeftMedium">
                              {suggestion.bio}
                            </div>
                          </NameBioDiv>
                          <ButtonFollow
                            userId={suggestion._id}
                            border={false}
                            colored={true}
                            size={'small'}
                          />
                        </UserSuggestionDiv>
                      ))
                    }

                  </div>
                )
              }
              {
                postsActive && !loader &&
                (
                  <>
                    {
                      postsList.length > 0 &&
                      <PostsBox style={{ marginLeft: SPACING.large, marginRight: SPACING.large, borderTopColor: "transparent" }}>
                        <BoldText style={{ fontSize: 20, marginBottom: SPACING.large }}>Posts</BoldText>
                        <SearchGrid
                          posts={postsList}
                        />
                        {/*use this component when the search functionality will be fixed on the server side {fix search query, onendreach()*/}
                        {/* <GridThreeCells ---> update profile.js, index.js [username]
                                posts={postsList}
                                postsGrid={false} ---> replace with location={profile/nft/search..}
                                fetchMoreDataNft={fetchUserNFTs} ---> replace with fetchMoreData={fetchMoreDataPosts, fetchMoreDataNft..}
                                hasMoreNft={hasMoreNft} ---> replace with hasMore={hasMorePosts/hasMoreNft...}
                            />
                        */}
                      </PostsBox>
                    }

                  </>
                )
              }
              {
                loader &&
                <div style={{ alignSelf: "center", marginTop: SPACING.extraLarge }}>
                  <ScaleLoader color={COLORS.purple} loading={true} size={150} />
                </div>
              }
              {
                !loader && postsList.length === 0 && usersList.length === 0 &&
                <BoldText style={{ alignSelf: "center", marginTop: SPACING.extraLarge }}>To search the network, type something in the search box above</BoldText>
              }
            </MiddleFullContainerSearch>
            <RightContainer>
              <RightContainerInner>
                <SignupPromo src={ImageBanner} />
                <SideBarLeftBlock>
                  <Footer />
                </SideBarLeftBlock>
              </RightContainerInner>
            </RightContainer>
          </Container>
        ) : null}
      </>
    );
  })
);

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
}
`;
const NameBioDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  flex:1;
  height: 80px;
`;
const UserSuggestionDiv = styled.div`
  display: flex;
  color:${({ theme }) => theme.textSecondary.color};
  height: 80px;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const BoldText = styled.text`
  font-weight:bold;
  font-size:${props => props.fontSize || 16}px;
  font-family:'LatoBlack';
`;
const PostsBox = styled.div`
  flex-direction: column; 
  margin-top: ${SPACING.large}px;
  border-top: 2px solid ${({ theme }) => theme.borderColor.color};
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  margin-top: ${SPACING.large}px;
  margin-bottom: ${SPACING.large}px;
  align-items: center;
`;

const ButtonText = styled.p`
  font-size: 16px;
  color: ${COLORS.whiteLight};
  font-family: "LatoBlack";
  cursor: pointer;
`;
