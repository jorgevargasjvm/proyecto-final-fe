import styled from "styled-components";

const DotBase = styled.div`
    width: 8;
    height: 8;
    background-color: theme.palette.text.hint;
    border-radius: 50%;
    transition: theme.transitions.create("background-color");
`;

export const SmallDot = styled(DotBase)`
    width: 5;
    height: 5;
    color: ${({color}) => color ? color : "#536DFE"};
`;

export const LargeDot = styled(DotBase)`
    width: 11;
    height: 11;
    color: ${({color}) => color ? color : "#536DFE"};
`;