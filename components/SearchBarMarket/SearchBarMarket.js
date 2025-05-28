import React from 'react'
import {
    MainContainer,
    SearchBarContainer,
    TextInput,
    LogoImg
} from './SearchBarMarket.elements';
import Search from '../../public/icons/search3.svg';
import SearchListTipModal from '.././SearchListTipModal/SearchListTipModal';
import Icon from ".././Icon/Icon";
import Link from 'next/link';
import yuserBeta from '../../public/icons/yuserBeta.svg';

const SearchBarMarket = (props) => {
    return (
        <MainContainer location={props.location}>
            <SearchBarContainer location={props.location}>
                <Icon
                    height="auto"
                    width="24px"
                    name={Search}
                    color={({ theme }) => theme.placeholder.color}
                />
                <TextInput type='text' placeholder={props.location === "market" ? 'Search chat ...' : 'Search ...'}
                    onChange={props.handleChange}
                />
                {/*
                <SearchListTipModal />*/}
            </SearchBarContainer>
        </MainContainer>
    )
}

export default SearchBarMarket
