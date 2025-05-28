import React from 'react'
import { inject, observer } from 'mobx-react';
import {
    CardsContainer,
    ItemCard,
    BoxTop,
    BoxBottom,
    Title,
    Item,
    CardWrapper
} from './GemStoneDiamondComponent.elements';
import Icon from "../../components/Icon/Icon";
import GemPink from '../../public/icons/gem-pink-new.svg';
import GemTeal from '../../public/icons/diamond-new.svg';
import Stones from '../../public/icons/rocks-new.svg';
import Arrow from '../../public/icons/arrow-new.svg';

export default inject('store')(observer(
    function GemStoneDiamondComponent(props) {


        return (
            <CardsContainer>
                <CardWrapper arrow={Arrow}>
                    <ItemCard style={{ marginLeft: 0 }}>
                        <BoxTop>
                            <Icon
                                width="auto"
                                height="150px"
                                name={Stones}
                            />
                        </BoxTop>
                        <BoxBottom>
                            <Title>{"ROCKS"}</Title>
                            <Item>
                                {"Use your Rocks to gift content on REBL shared by others. Spend time on the app to get more"}
                            </Item>
                        </BoxBottom>
                    </ItemCard>
                </CardWrapper>
                <CardWrapper arrow={Arrow}>
                    <ItemCard >
                        <BoxTop >
                            <Icon
                                width="auto"
                                height="150px"
                                name={GemPink}
                            />
                        </BoxTop>
                        <BoxBottom>
                            <Title>{"GEMSTONES"}</Title>
                            <Item>
                                {"You receive Gemstones when others like your content.They are stored in your wallet"}
                            </Item>
                        </BoxBottom>
                    </ItemCard>
                </CardWrapper>
                <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ItemCard lastCard={true}>
                        <BoxTop >
                            <Icon
                                width="auto"
                                height="150px"
                                name={GemTeal}
                            />
                        </BoxTop>
                        <BoxBottom>
                            <Title>{"DIAMONDS"}</Title>
                            <Item style={{ flexDirection: "column" }}>
                                {"Stake your Gemstones to earn the Diamond$ token. Spend Diamond$ on stuff IRL or to boost your reach."}
                                <div style={{ height: 20 }} />
                                {"[crypto token]"}
                            </Item>
                        </BoxBottom>
                    </ItemCard>
                </div>
            </CardsContainer>
        )
    }
))