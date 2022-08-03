import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    margin-top: 16px;
  `}
`;

export const Title = styled.h1`
  ${() => css`
    text-transform: uppercase;
    margin: 4px 0;
    font-weight: 800;
    font-size: 28px;
    margin-bottom: 32px;
    margin-top: 84px;
  `}
`;

export const InfoName = styled.p`
  ${() => css`
    margin-top: 16px;
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 12px;
    font-family: "Inter";
  `}
`;

export const InfoValue = styled.p`
  ${({ theme }) => css`
    font-size: 12px;
    font-family: "Inter";
    color: ${theme.colors.darkGray};
    font-weight: 400;
  `}
`;