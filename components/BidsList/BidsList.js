import React from 'react';
import {
    BidsListContainer,
    BidContainer,
    BidBox,
    UserName,
    BidTime,
    BidPrice,
    EthereumPrice,
    DollarPrice,
    //----------
    TabBox
} from './BidsList.elements';
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import HappyFace from "../../public/icons/happy-baby.svg";
import TagCut from "../../public/icons/tag-cut.svg";
import Icon from "../Icon/Icon";


const BidsList = (props) => {
   
    return (
        <>
            {bids ?
                <BidsListContainer>
                    {bids.map((bid) => (
                        <BidContainer key={bid.id} bid={bid}>
                            <TabBox style={{ flexDirection: "row" }}>
                                <Icon
                                    className="MarginRightSmall"
                                    height="auto"
                                    width="20px"
                                    name={bid.eventType=='list'? TagCut : HappyFace}
                                />
                                <UserName>{bid.eventType}</UserName>
                            </TabBox>
                            <TabBox>
                                <UserName>{bid.from}</UserName>
                            </TabBox>
                            <TabBox>
                                <UserName>{bid.to}</UserName>
                            </TabBox>
                            <TabBox style={{ flexDirection: "row" }}>
                                <Icon
                                    className="MarginRightSmall"
                                    height="auto"
                                    width="20px"
                                    name={Moonriver}
                                />
                                <EthereumPrice>{bid.bid}</EthereumPrice>
                            </TabBox>
                            <TabBox>
                                <UserName>{bid.bidTime}</UserName>
                            </TabBox>
                        </BidContainer>
                    ))}
                </BidsListContainer>
                : null}
        </>
    )
}

export default BidsList
const bids = [
    {
        id: 12333,
        from: 'gfdg2635',
        to: 'sigma6',
        bidTime: '10 days ago',
        bid: '1.234',
        eventType: 'list',
    },
    {
        id: 12344,
        from: 'Alfredo',
        to: 'sigma6',
        bidTime: '5 days ago',
        bid: '1.153',
        eventType: 'minted',
    },
    {
        id: 12355,
        from: 'Alfredo',
        to: 'aang',
        bidTime: '3 days ago',
        bid: '1.099',
        eventType: 'minted',
    }
]