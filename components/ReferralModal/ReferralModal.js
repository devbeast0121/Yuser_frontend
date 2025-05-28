import React, { useEffect, useReducer, useRef } from "react";
import { inject, observer } from "mobx-react";
import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  HeaderText,
  ModalBody,
  BodyText,
  ModalFooter,
  FooterText,
  ModalButton,
  Divider,
  SearchBar,
  SearchBarContainer,
  Table,
  TableTitle,
  TableRow,
  TitleContainer,
  TitleTxt,
  TableDataContainer,
  SubBox,
  TableHeader,
} from "./ReferralModal.elements";
import Icon from "../Icon/Icon";
import Close from "../../public/icons/close.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { SPACING } from "../../styles/Styling";
import Loader from "react-spinners/ClipLoader";
import { COLORS } from "../../styles/Styling";
import Avatar from "../Avatar/Avatar";
import { AvatarUrl } from "../../stores/tools";
import numeral from "numeral";

/**
 * Close button in top right;
 *
 * Optional Search bar, should display if has searchFunc prop;
 *
 */
export default inject("store")(
  observer(function ReferralModal({ inviteCode, searchFunc, showModal }) {
    const searchRef = useRef(null);

    function reducer(state, action) {
      switch (action.type) {
        case "setInviteCode":
          return { ...state, inviteCode: action.payload };
        case "setUsersInvited":
          return { ...state, usersInvited: action.payload };
        case "setGemsEarned":
          return { ...state, gemsEarned: action.payload };
        case "setRocksEarned":
          return { ...state, rocksEarned: action.payload };
        case "setSearchResults":
          return {
            ...state,
            rocksEarned: action.payload.rocksEarned,
            gemsEarned: action.payload.gemsEarned,
            usersInvited: action.payload.usersInvited,
            inviteCodeOwner: action.payload.owner,
            totalUsersInvited: action.payload.totalUsersInvited,
          };
        case "setLoading":
          return { ...state, loading: action.payload };
        default:
          return { ...state };
      }
    }

    const initialState = {
      inviteCode: null,
      usersInvited: [],
      gemsEarned: 0,
      rocksEarned: 0,
      inviteCodeOwner: {},
      loading: true,
      totalUsersInvited: 0,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      if (inviteCode) {
        dispatch({ type: "setInviteCode", payload: inviteCode });
        searchRef.current = inviteCode;
        doSearch();
      } else {
        dispatch({ type: "setLoading", payload: false });
      }
    }, []);

    function handleClose(event) {
      event.stopPropagation();
      showModal && showModal(false);
    }
    function handleChangeText(event) {
      searchRef.current = event.target.value;
      if (!event.target.value || event.target.value.length === 0) {
        dispatch({ type: "setInviteCode", payload: "" });
        dispatch({
          type: "setSearchResults",
          payload: {
            rocksEarned: 0,
            gemsEarned: 0,
            usersInvited: [],
            owner: {},
            totalUsersInvited: 0,
          },
        });
      }
    }

    function doSearch() {
      const searchTerm = searchRef.current;
      if (!searchTerm || searchTerm.length === 0) {
        return;
      }
      if (searchFunc) {
        dispatch({ type: "setLoading", payload: true });
        searchFunc(searchTerm)
          .then((results) => {
            dispatch({ type: "setInviteCode", payload: searchTerm });
            dispatch({
              type: "setSearchResults",
              payload: {
                gemsEarned: results.earnedRewards.earnedGems,
                rocksEarned: results.earnedRewards.earnedRocks,
                usersInvited: results.usersInvited,
                owner: results.owner,
                totalUsersInvited: results.numUsersInvited,
              },
            });
          })
          .finally(() => {
            dispatch({ type: "setLoading", payload: false });
          });
      }
    }

    function renderInvitedUser(user) {
      return (
        <TableDataContainer style={{ overflow: "auto" }} className="Flex">
          <SubBox className="Flex">
            <Avatar
              src={AvatarUrl(user.avatar)}
              size={"small"}
              frame={true}
              userName={user.uname}
            />
            <BodyText>{user.uname}</BodyText>
          </SubBox>
          <SubBox style={{ flexDirection: "column" }} className="Flex">
            <BodyText>{`Earned Gems: ${numeral(user.earnedGems).format(
              "0,0"
            )}`}</BodyText>
            <BodyText>{`Earned Rocks: ${numeral(user.earnedRocks).format(
              "0,0"
            )}`}</BodyText>
          </SubBox>
          <SubBox style={{ justifyContent: "center" }} className="Flex">
            <BodyText>{String(user.isCreator)}</BodyText>
          </SubBox>
          <SubBox style={{ justifyContent: "center" }} className="Flex">
            <BodyText>{new Date(user.invitedAt).toLocaleDateString()}</BodyText>
          </SubBox>
        </TableDataContainer>
      );
    }

    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

    function renderBody() {
      if (state.loading) {
        return <Loader color={COLORS.purple} loading={true} size={150} />;
      } else if (
        isEmpty(state.inviteCodeOwner) &&
        isEmpty(state.usersInvited)
      ) {
        return (
          <BodyText
            style={{ alignSelf: "center" }}
          >{`Could not find data for Invite Code: ${state.inviteCode}`}</BodyText>
        );
      } else {
        return (
          <>
            {!isEmpty(state.inviteCodeOwner) && (
              <Table style={{ flexShrink: 0 }} className="Flex">
                <TitleContainer>
                  <TitleTxt>{"Owner"}</TitleTxt>
                </TitleContainer>
                <TableTitle className="Flex">
                  <TableRow className="Flex">
                    <BodyText>{"User"}</BodyText>
                  </TableRow>
                  <TableRow className="Flex">
                    <BodyText>{"Rewards"}</BodyText>
                  </TableRow>
                  <TableRow className="Flex">
                    <BodyText>{"# Users Invited"}</BodyText>
                  </TableRow>
                </TableTitle>
                <TableDataContainer className="Flex">
                  <SubBox className="Flex">
                    <Avatar
                      src={AvatarUrl(state.inviteCodeOwner.avatar)}
                      size={"small"}
                      frame={true}
                      userName={state.inviteCodeOwner.uname}
                    />
                    <BodyText>{state.inviteCodeOwner.uname}</BodyText>
                  </SubBox>
                  <SubBox style={{ flexDirection: "column" }} className="Flex">
                    <BodyText>{`Gems Earned: ${numeral(state.gemsEarned).format(
                      "0,0"
                    )}`}</BodyText>
                    <BodyText>{`Rocks Earned: ${numeral(
                      state.rocksEarned
                    ).format("0,0")}`}</BodyText>
                  </SubBox>
                  <SubBox style={{ justifyContent: "center" }} className="Flex">
                    <BodyText>{state.totalUsersInvited}</BodyText>
                  </SubBox>
                </TableDataContainer>
              </Table>
            )}
            {!isEmpty(state.usersInvited) && (
              <Table className="Flex">
                <TableHeader>
                  <TitleContainer>
                    <TitleTxt>{"Users Invited"}</TitleTxt>
                  </TitleContainer>
                  <TableTitle className="Flex">
                    <TableRow className="Flex">
                      <BodyText>{"User"}</BodyText>
                    </TableRow>
                    <TableRow className="Flex">
                      <BodyText>{"Rewards"}</BodyText>
                    </TableRow>
                    <TableRow className="Flex">
                      <BodyText>{"Is Creator"}</BodyText>
                    </TableRow>
                    <TableRow className="Flex">
                      <BodyText>{"Invited At"}</BodyText>
                    </TableRow>
                  </TableTitle>
                </TableHeader>
                <InfiniteScroll
                  dataLength={state.usersInvited.length}
                  hasMore={false}
                  endMessage={
                    <BodyText>{"End of invited users list"}</BodyText>
                  }
                  style={{
                    flexDirection: "column",
                    marginBottom: SPACING.small,
                    zIndex: 5,
                    width: "100%",
                  }}
                >
                  {state.usersInvited.map((user) => renderInvitedUser(user))}
                </InfiniteScroll>
              </Table>
            )}
          </>
        );
      }
    }

    return (
      <ModalBackground onClick={handleClose} className="Flex">
        <ModalContainer onClick={(e) => e.stopPropagation()} className="Flex">
          <ModalHeader className="Flex">
            <HeaderText>{"Invite Code: " + state.inviteCode}</HeaderText>
            <ModalButton
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={handleClose}
            >
              <Icon
                strokeWidth="3"
                name={Close}
                height={"3vh"}
                width={"auto"}
                strokeColor={({ theme }) => theme.iconColor.color}
              />
            </ModalButton>
            <SearchBarContainer>
              <SearchBar
                placeholder={"Enter an Invite Code"}
                defaultValue={state.inviteCode}
                onChange={handleChangeText}
                maxLength={10}
                style={{ flex: 4 }}
              />
              <ModalButton
                style={{
                  padding: SPACING.small,
                  flex: 1,
                  height: "4vh",
                  textAlign: "center",
                }}
                onClick={doSearch}
              >
                Search
              </ModalButton>
            </SearchBarContainer>
          </ModalHeader>
          <div className="flex" ider />
          <ModalBody className="Flex">{renderBody()}</ModalBody>
        </ModalContainer>
      </ModalBackground>
    );
  })
);
