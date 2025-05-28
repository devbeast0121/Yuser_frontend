import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const CommentsListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: ${SPACING.large}px;
    border-top: 1px solid ${({ theme }) => theme.borderColor.color};
    padding-top: 0;
`;

export const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${SPACING.large}px;
    background-color: ${props => props.comment._id == props.selectedComment?._id ? COLORS.blackDarkMedium : COLORS.blackDark};
    position: relative;
    border-bottom:2px solid ${({ theme }) => theme.borderColor.color};
`;

export const CommentBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: ${SPACING.medium}px;
    margin-right: ${SPACING.medium}px;
`

export const UserName = styled.p`
    font-family: 'LatoBlack'; 
    margin-bottom: ${SPACING.small}px;
`

export const UserComment = styled.div`
`

export const TxtReply = styled.p`
    font-size: ${FONT_SIZE.small}px;
    color: #FFF;
    margin-left:8px;
    margin-bottom:2px;
    color: ${({ theme }) => theme.textSecondary.color};
`

export const LoadMore = styled.div`
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius: 5px;
    margin-top: 12px;
    justify-content: center;
    align-items: center;
    padding: 6px 12px;
    width: 120px;
`;

export const ReplyButton = styled.div`
    flex-direction:'row';
    justify-content: flex-start;
    cursor: pointer;
    margin-top:12px;
    opacity:0.6;
`;
