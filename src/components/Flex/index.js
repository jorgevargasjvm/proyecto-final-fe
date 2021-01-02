import styled from "styled-components";

export const Flex = styled.div`
    display: flex;
`;

export const FlexGrow = styled.div`
    flex-grow: 1;
`;

export const FlexRow = styled(Flex)`
    flex-direction: flex;
`;

export const FlexCol = styled(Flex)`
    flex-direction: column;
`;