import styled from 'styled-components';
import { Container, SideBarLeft, SideBarRight } from '../../styles/globalStyles';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled(Container)`
    ${Container}
`;

export const ProfileContainer = styled(SideBarLeft)`
    flex-direction: column;
`;

export const PostsContainer = styled(SideBarRight)`
    flex-direction: column;
`;

