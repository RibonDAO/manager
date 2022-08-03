import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-flow: row wrap;
    width: 256px;
    box-sizing: border-box;
    position: absolute;
    background: ${theme.colors.ribonWhite};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 16px;
    text-align: left;
  `}
`;

export const MainContent = styled.div`
  ${() => css`
    font-family: "Inter";
  `}
`;

export const MainValue = styled.p`
  ${() => css``}
`;

export const SecondaryContent = styled.div`
  ${() => css`
    font-family: "Inter";
  `}
`;

export const SecondaryValue = styled.div`
  ${() => css`
    font-family: "Inter";
  `}
`;
