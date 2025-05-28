import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  MainMarketContainer,
  DropDownHeader,
  DropDownList,
  ListItem,
  EmptyBox,
  ResultsSortFilterContainer,
  DropDownWrapper,
  TxtResult,
  Make,
  SubBox
} from "./MarketMain.elements";
import Image from "next/image";
import { inject, observer } from "mobx-react";
import { useStore } from "../../stores/RootStore";
import SearchBarMarket from ".././SearchBarMarket/SearchBarMarket";
import MarketList from ".././MarketList/MarketList";
import InfiniteScroll from "react-infinite-scroll-component";
import ScaleLoader from "react-spinners/ScaleLoader";
import { COLORS } from "../../styles/Styling";
import { useRouter } from "next/router";
import BannerSwiper from ".././BannerSwiper/BannerSwiper";
import Icon from "../Icon/Icon";
import ArrowTriangle from "../../public/icons/arrowTriangle.svg";

const MarketMain = forwardRef((props, ref) => {
  const [isSearching, setIsSearching] = useState(false);
  const rootstore = useStore();
  const [offset, setOffset] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(6);
  const [nfts, setNfts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const filterOptions = [
    "Token Id",
    "Ending Soon",
    "Recently Listed",
    "Recently Sold",
    "Last Sale Price",
    "Current Price",
  ];
  const sortOptions = ["High to Low", "Low to High"];
  const [totalLoopNumber, setTotalLoopNumber] = useState(0);
  const [searchTerms, setSearchTerms] = useState("");
  const [onlyListed, setOnlyListed] = useState(false);
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [filterChoice, setFilterChoice] = useState("ContractId");
  const [sortDirection, setSortDirection] = useState("asc");
  const [totalResults, setTotalResults] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [sortSelection, setSortSelection] = useState(null);
  const [loadNumber, setLoadNumber] = useState(6);
  React.useEffect(() => {
    async function doEffect() {
      let loadNumTemp = 6;
      console.log(window.innerHeight, "window height");
      if (window.innerHeight > 500 && window.innerHeight < 1500) {
        setLoadNumber(9);
        loadNumTemp = 9;
      } else if (window.innerHeight >= 1500) {
        setLoadNumber(12);
        loadNumTemp = 12;
      }
      setNfts([]);
      setTotalResults(0);
      if (!isSearching) {
        let newOffset = 0;
        let retunedNfts = await rootstore.getAllNextGems(
          loadNumTemp,
          0,
          onlyListed,
          filterChoice,
          sortDirection
        );
        let totalSupply = 0;
        if (retunedNfts.length !== 0) {
          totalSupply = retunedNfts[0].totalSupply;
          setTotalResults(totalSupply);
        }
        if (totalSupply > 0) {
          setTotalLoopNumber(totalSupply);
          setHasMore(true);
        }
        if (totalSupply === 0) {
          setHasMore(false);
        } else if (retunedNfts.length >= totalSupply) {
          setHasMore(false);
        }
        setOffset(retunedNfts.length);
        setDisplayNumber(6 + retunedNfts.length);
        setNfts(retunedNfts);
        if (retunedNfts) {
          //console.log(retunedNfts.length,"length of the nfts returned")
        }
      } else {
        let tokens = await rootstore.searchNftListings(
          searchTerms,
          loadNumTemp,
          0,
          filterChoice,
          sortDirection
        );
        if (!tokens || tokens.length === 0) {
          setHasMore(false);
          setTotalLoopNumber(0);
          setNfts([]);
          setOffset(0);
          setDisplayNumber(6);
        } else {
          let totalSupply = tokens[0].totalSupply;
          setTotalResults(totalSupply);
          if (tokens.length >= totalSupply || totalSupply === 0) {
            setHasMore(false);
            setTotalLoopNumber(totalSupply);
          } else {
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

  async function fetchMore() {
    if (!isSearching) {
      let tokens = await rootstore.getAllNextGems(
        loadNumber,
        offset,
        onlyListed,
        filterChoice,
        sortDirection
      );
      let newDisplayNumber = displayNumber + tokens.length;
      let newOffset = offset + tokens.length;
      setOffset(offset + tokens.length);
      setDisplayNumber(displayNumber + tokens.length);
      setNfts(nfts.concat(tokens));
      if (newOffset >= totalLoopNumber) {
        setHasMore(false);
      }
    } else {
      let tokens = await rootstore.searchNftListings(
        searchTerms,
        loadNumber,
        offset,
        filterChoice,
        sortDirection
      );
      let newOffset = offset + tokens.length;
      let newDisplayNumber = displayNumber + tokens.length;
      setOffset(newOffset);
      setDisplayNumber(newDisplayNumber);
      setNfts(nfts.concat(tokens));
      if (newOffset >= totalLoopNumber) {
        setHasMore(false);
      }
    }
  }

  const handleFilter = (filterby) => {
    setIsFilterOpen(false);
    switch (filterby) {
      case "Token Id":
        setFilterChoice("ContractId");
        setSelectedFilter("Token Id");
        break;
      case "Ending Soon":
        setFilterChoice("auctionEnd");
        setSelectedFilter("Ending Soon");
        break;
      case "Recently Listed":
        setFilterChoice("listedAt");
        setSelectedFilter("Recently Listed");
        break;
      case "Recently Sold":
        setFilterChoice("soldAt");
        setSelectedFilter("Recently Sold");
        break;
      case "Last Sale Price":
        setFilterChoice("lastSale");
        setSelectedFilter("Last Sale Price");
        break;
      case "Current Price":
        setFilterChoice("currentPrice");
        setSelectedFilter("Current Price");
        break;
      default:
        setFilterChoice("ContractId");
        setSelectedFilter(null);
        break;
    }
  };

  const handleSort = (sortby) => {
    setIsSortOpen(false);
    switch (sortby) {
      case "High to Low":
        setSortDirection("desc");
        setSortSelection("High to Low");
        break;
      case "Low to High":
        setSortDirection("asc");
        setSortSelection("Low to High");
        break;
      default:
        setSortDirection("asc");
        setSortSelection(null);
        break;
    }
  };

  async function handleSearch(event) {
    let searchText = event.target.value;
    if (searchText.length >= 3) {
      setNfts([]);
      setHasMore(true);
      setIsSearching(true);
      setSearchTerms(searchText);
    } else {
      if (searchText.length === 0 && isSearching) {
        setIsSearching(false);
        setHasMore(true);
        setNfts([]);
        setSearchTerms("");
      }
      return;
    }
    return;
  }

  useImperativeHandle(ref, () => ({
    closeDropdown() {
      if (isFilterOpen) {
        setIsFilterOpen(false);
      } else if (isSortOpen) {
        setIsSortOpen(false);
      }
    },
  }));

  return (
    <>
      <MainMarketContainer>
        <ResultsSortFilterContainer>
          <SearchBarMarket handleChange={handleSearch} location={"market"} />
          <SubBox style={{maxWidth: 600, justifyContent: "flex-end"}}>
            {nfts.length > 0 ?
              <TxtResult>{totalResults + " results"}</TxtResult>
              : null}
            <DropDownWrapper>
              <DropDownHeader
                dropDownOpen={isFilterOpen}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {selectedFilter ? selectedFilter : "Filter By"}
                <Icon height="auto" width="16px" name={ArrowTriangle} />
              </DropDownHeader>
              {isFilterOpen && (
                <DropDownList>
                  {filterOptions.map((element, index) => (
                    <ListItem key={index} onClick={() => handleFilter(element)}>
                      {element}
                    </ListItem>
                  ))}
                </DropDownList>
              )}
            </DropDownWrapper>
            <DropDownWrapper>
              <DropDownHeader
                dropDownOpen={isSortOpen}
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                {sortSelection ? sortSelection : "Sort By"}
                <Icon height="auto" width="16px" name={ArrowTriangle} />
              </DropDownHeader>
              {isSortOpen && (
                <DropDownList>
                  {sortOptions.map((element, index) => (
                    <ListItem key={index} onClick={() => handleSort(element)}>
                      {element}
                    </ListItem>
                  ))}
                </DropDownList>
              )}
            </DropDownWrapper>
          </SubBox>
        </ResultsSortFilterContainer>
        {/*}
          <BannerSwiper />
                */}
        <InfiniteScroll
          dataLength={nfts ? nfts.length : 0}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div
              className="flex"
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ScaleLoader color={COLORS.purple} loading={true} size={150} />
            </div>
          }
          scrollThreshold={0.4}
          style={{ flexDirection: "column" }}
        >
          <MarketList nfts={nfts} />
        </InfiniteScroll>
      </MainMarketContainer>
    </>
  );
});

export default inject("store")(observer(MarketMain));
