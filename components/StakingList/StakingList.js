import React, { useState } from "react";
import {
    MainStakingContainer,
    StakingEmpty,
    TxtTitle,
    TxtDescription,
    ImageBox,
} from "./StakingList.elements";
import { inject, observer } from "mobx-react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Image from "next/image";
import { COLORS, SPACING } from "../../styles/Styling.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import StakeComponent from '.././StakeComponent/StakeComponent';
import { useSession } from 'next-auth/client';
import { useStore } from '../../stores/RootStore';
import client from '../../pages/api/client';


export default inject("store")(
    observer(function StakingList(props) {
        const rootstore = useStore();
        const [session, loading] = useSession();
        const [hasMoreStakes, setHasMoreStakes] = useState(true)
        const [stakes, setStakes] = useState([])
        const [poolIds, setPoolIds] = useState([]);
        const [loadList, setLoadList] = useState(true)


        async function getPools() {
            let skip = stakes.length
            let poolObj = await rootstore.getAllUserStakingPools(skip, poolIds);
            let { pools } = poolObj;
            let newPoolIds = pools.map((pool) => pool.poolId);
            setStakes([...stakes, ...pools]);
            setPoolIds([...poolIds, ...newPoolIds])
            if (pools.length < 10) {
                setHasMoreStakes(false);
            }
        }

        async function updatePool(updateObj) {
            for (let pool of stakes) {
                if (pool.poolId === updateObj.poolId) {
                    let stakeAmt = Number(updateObj.stakeAmt)
                    pool.userStake = pool.userStake + stakeAmt;
                }
            }
        }

        React.useEffect(() => {
            async function doEffect() {
                if (session) {
                    await client.reAuthenticate()
                    await getPools()
                }
            }
            doEffect();
        }, [session]);



        return (
            <MainStakingContainer>
                {true ? (
                    <InfiniteScroll
                        dataLength={stakes.length}
                        loader={
                            <div style={{ alignSelf: "center", marginTop: SPACING.extraLarge }}>
                                <ScaleLoader
                                    color={COLORS.purple}
                                    loading={true}
                                    size={150}
                                />
                            </div>
                        }
                        style={{ flexDirection: "column", width: "100%" }}
                        hasMore={hasMoreStakes}
                        next={getPools}
                        scrollThreshold={0.2}
                    >
                        {stakes.map((stake) => (
                            <StakeComponent
                                key={stake.poolId}
                                stake={stake}
                                updatePool={updatePool}
                            />
                        ))}
                    </InfiniteScroll>
                ) :
                    (loadList) ?
                        <div style={{ alignSelf: "center", flexDirection: "column", }}><ScaleLoader color={COLORS.purple} loading={true} size={150} /></div>
                        :
                        <StakingEmpty>
                            <TxtTitle>{'Staking Pools'}</TxtTitle>
                            <TxtDescription>{'This is where your Staking Pools will show up'}</TxtDescription>
                            <ImageBox>
                                <Image width={200} height={200} layout="intrinsic" objectFit="cover" src={'https://yuser-assets.imgix.net/nextgempurple.jpg?fit=clip&w=200&fm=webp$auto=format&dpr=2'} alt="background image" />
                            </ImageBox>
                        </StakingEmpty>
                }
            </MainStakingContainer>
        );
    })
);