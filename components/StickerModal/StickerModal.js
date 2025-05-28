import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  MainContainer,
  SearchBox,
  TextInputBox,
  IconWrapper
} from './StickerModal.elements'
import Search from "../../public/icons/search3.svg";
import Icon from "../Icon/Icon";
import { inject, observer } from "mobx-react";
import { useStore } from "../../stores/RootStore";
import { GiphyFetch } from "@giphy/js-fetch-api";
import "isomorphic-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScaleLoader } from "react-spinners";
import { COLORS, SPACING } from "../../styles/Styling";
const giphyFetch = new GiphyFetch("VUGXLoKdGGoq7Tu26kDeH5Xh5K3BzGYK");


export default inject("store")(
  observer(function StickerModal(props) {
    //   H O O K S
    const rootstore = useStore();
    const [gifData, setGifData] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [searchString, setSearchString] = useState("stickers")
    // React.useEffect(() => {
    //   async function doEffect() {
    //    // const fetchGifs =  await giphyFetch.trending({ offset:0, limit: 10 })
    //    const fetchGifs = (offset: number) =>
    //    await giphyFetch.trending({ offset, limit: 10 });
    //     console.log(fetchGifs,"data gif")
    //     setGifData(fetchGifs.data)
    //   }
    //   doEffect();
    // }, []);
    const fetchTrendingGifs = async () => {
      const { data } = await giphyFetch.search(searchString, { offset: currentOffset, limit: 9 })
      return data;
    }

    const fetchSearchedGifs = async (search) => {
      const { data } = await giphyFetch.search(search, { offset: currentOffset, limit: 9 })
      return data;
    }


    const fetchInitialGifs = async () => searchString.length !== 0 ? setGifData(await fetchSearchedGifs(searchString)) : setGifData(await fetchTrendingGifs())

    const loadMoreGifs = async () => searchString.length !== 0 ? setGifData([await fetchSearchedGifs(searchString)]) : setGifData(await fetchTrendingGifs())

    const loadMoreData = async () => {

      if (searchString.length === 0) {
        let newOffset = currentOffset + 9
        const { data } = await giphyFetch.trending({ offset: newOffset, limit: 9 })
        data.length === 0 && setHasMore(false)
        setGifData([...gifData, ...data])
        setCurrentOffset(newOffset)
      }
      else {
        let newOffset = currentOffset + 9
        const { data } = await giphyFetch.search(searchString, { offset: newOffset, limit: 9 })
        data.length === 0 && setHasMore(false)
        setGifData([...gifData, ...data])
        setCurrentOffset(newOffset)
      }
    }

    const debouncedSearch = debounce((searchValue) => {
      setSearchString(searchValue);
    }, 300);

    const handleChange = (e) => {
      debouncedSearch(e.target.value);
    }

    useEffect(() => {
      setCurrentOffset(0)
      setHasMore(true)
      fetchInitialGifs();
      if (searchString.length > 25)
        setSearchString(searchString.slice(0, 25))
    }, [searchString])

    const setGiphyDetails = item => {
      props.setGiphyId(item.id)
      props.setImageType("gif")
      props.setImageWidth(item.images.downsized.width)
      props.setImageHeight(item.images.downsized.height)
      props.closeOverlay()
    };

    return (
      <MainContainer >
        <SearchBox>
          <IconWrapper>
            <Icon
              height="auto"
              width="20px"
              name={Search}
              color={({ theme }) => theme.placeholder.color}
            />
          </IconWrapper>
          <TextInputBox
            type='text'
            placeholder='Search Sticker'
            onChange={handleChange}
          />
        </SearchBox>

        {/* {searchString.length > -1 && <Grid width={452} columns={3} gutter={6} fetchGifs={fetchGifs(searchString)} /> } */}
        <InfiniteScroll
          dataLength={gifData.length}
          hasMore={true}
          loader={

            <div style={{ gridColumnStart: "2", width: "100%", display: "flex", justifyContent: "center" }}>
              <ScaleLoader
                color={COLORS.yellow}
                loading={true}
                size={150}
              />
            </div>

          }
          scrollableTarget="scrollableDiv"
          style={{ width: "100%", display: "grid", marginTop: 20, gridTemplateColumns: "150px 150px 150px", gap: `${SPACING.small}px`, overflowX: "hidden" }}
          next={loadMoreData}
          scrollThreshold={0.8}
          height={385}   // no bottom padding if {409} 
          className={"TransparentScrollbar"}
        // pullDownToRefresh={true}
        // refreshFunction={pullToRefresh}
        // pullDownToRefreshThreshold={50}
        // pullDownToRefresh
        >
          {gifData.map((gif, index) =>
            <img
              src={gif.images.preview_gif.url}
              width={"150px"}
              onClick={() => setGiphyDetails(gif)}
              key={index} />
          )}
        </InfiniteScroll>
      </MainContainer>
    );
  })
);



