import React from 'react';
import {
    FooterContainer,
    FooterMenu,
    MenuItem,
    Alink
} from './Footer.elements';

const Footer = () => {
    return (
        <>
            <FooterContainer>
                <FooterMenu>
                    <MenuItem><Alink href="https://rebl.gitbook.io/rebl" target="_blank" rel="noopener noreferrer">About</Alink></MenuItem>
                    <MenuItem><Alink href="https://rebl.gitbook.io/rebl//yuser/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms</Alink></MenuItem>
                    <MenuItem><Alink href="https://rebl.gitbook.io/rebl/yuser/community-guidelines" target="_blank" rel="noopener noreferrer">Guidelines</Alink></MenuItem>
                    <MenuItem><Alink href="https://rebl.gitbook.io/rebl/yuser/yuser-app-faq" target="_blank" rel="noopener noreferrer">FAQ</Alink></MenuItem>
                    <MenuItem><Alink href="mailto:info@yuser.co" target="_blank" rel="noopener noreferrer">Contact Us</Alink></MenuItem>
                    <MenuItem>
                        <Alink href="https://twitter.com/reblapp" target="_blank" rel="noopener noreferrer">
                            Twitter
                        </Alink>
                    </MenuItem>
                    <MenuItem>
                        <Alink href="https://discord.gg/uRRxnfAjhY" target="_blank" rel="noopener noreferrer">
                            Discord
                        </Alink>
                    </MenuItem>
                    <MenuItem><Alink >© 2022 Yuser Inc.</Alink></MenuItem>
                </FooterMenu>
            </FooterContainer>
        </>
    )
}

export default Footer
