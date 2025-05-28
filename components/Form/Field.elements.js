import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const FieldContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: ${SPACING.small}px;
    position: relative;
`;

export const IconContainer = styled.div`
    margin-right: auto;
`;

export const InputContainer = styled.input.attrs(props => ({
    type: props.type,
}))`
background-color: ${({ theme }) =>theme.containerSecondary.color};
border: 1px solid ${({ theme }) =>theme.borderColor.color};
    display: flex;
    height: 50px;
    width: 100%;
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: ${SPACING.medium}px;
    caret-color: ${COLORS.black50};//${({ theme }) => theme.placeholder.color};
    //color:  ${({ theme }) => theme.textSecondary.color};
    &::placeholder {
        color: ${COLORS.black50};//${({ theme }) => theme.placeholder.color};
    }
`;

export const InputContainerIcon = styled.input`
    background-color: transparent;
    border: 0;
    padding: 12px 0;
`;

export const CheckboxContainer = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.borderColor.color};
    margin-top: 7px;
    margin-right: ${SPACING.small}px;
    padding-left: 2px;
    padding-top: 2px;
`;