import styled from 'styled-components'
import {PureWhite} from "../../assets/colors";
import {Paper, Typography} from "@material-ui/core";

export const PageTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    margin-top: 50px;
    background: ${PureWhite};
    box-shadow: 0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A;
    padding: 0px 10px 0px 10px;
    border-radius: 4px;
    align-items: center;
`;

export const TabHeaderContainer = styled(Paper)`
    box-shadow: none;
`;

export const PageHeaderText = styled(Typography)`
    padding: 20px;
    color: #6E6E6E;
    font-weight: 400 !important;
    font-size: calc(1.5rem) !important;
    text-transform: none;
    line-height: 1.235 !important;
    letter-spacing: 0.00735em;
`;