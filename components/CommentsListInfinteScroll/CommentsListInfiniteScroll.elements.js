import styled from "styled-components";
import { COLORS, SPACING } from "../../styles/Styling";

//const selected = ({ props }) => props.commentId  == props.selectedCommentId ? true : false

export const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${SPACING.large}px;
    position: relative;
    border-bottom:2px solid ${({ theme }) => theme.borderColor.color};
    background-color: ${props=> props.hover && props.selectedCommentId?  props.theme.container.color : "transparent"};
`;

export const ReplyContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${SPACING.large}px;
    background-color: ${props => props.theme.name == "light"  ? COLORS.whiteMedium : COLORS.blackDark};
    position: relative;
    border-bottom:1px solid ${({ theme }) => theme.borderColor.color};
   
`;

export const CommentsListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0;
`;