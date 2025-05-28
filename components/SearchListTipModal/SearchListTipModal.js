import React, { useState } from 'react';
import {
    SearchListContainer,
    ResultContainer,
    Content,
    Backdrop
} from './SearchListTipModal.elements';
import Avatar from '.././Avatar/Avatar';
import Modal from 'react-overlays/Modal';
import { searchResults } from '../../public/data/HomeData.js';

const SearchListTipModal = (props) => {
    const [show, setShow] = useState(true);
    const renderBackdrop = (props) => <Backdrop {...props} />;

    return (
        <>
            {searchResults ?
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    renderBackdrop={renderBackdrop}
                >
                    <SearchListContainer>
                        {searchResults.map((result, index) => (
                            <ResultContainer key={index} result={result}>
                                <Avatar src={result.avatar} size={'medium'} alt={'Author Avatar'} frame={false} edit={false} userName={result.uname}/>
                                <Content>{result.content}</Content>
                            </ResultContainer>
                        ))}
                    </SearchListContainer>
                </Modal>
                : null}
        </>
    )
}

export default SearchListTipModal
