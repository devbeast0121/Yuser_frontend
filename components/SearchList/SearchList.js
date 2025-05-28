import React from 'react';
import {
    SearchListContainer,
    ResultContainer,
    Content
} from './SearchList.elements';
import Avatar from '.././Avatar/Avatar'

const SearchList = (props) => {
    return (
        <>
           {props.searchResults ?
                <SearchListContainer>
                    {props.searchResults.map((result, index) => (
                        <ResultContainer key={index} result={result}>
                            <Avatar src={result.avatar} size={'medium'} alt={'Author Avatar'} frame={false} edit={false}userName={result.uname} />
                            <Content>{result.content}</Content>
                        </ResultContainer>
                    ))}
                </SearchListContainer>
                : null}
        </>
    )
}

export default SearchList
