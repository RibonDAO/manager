import styled, { css } from "styled-components";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  flex: auto;
  width: 328px;
`;

export const Title = styled.h6`
  ${({ theme }) => css`
    margin: 8px 0 24px 0;
    color: ${theme.colors.ribonBlack};
    font-size: 14px;
    font-weight: 400;
    line-height: 23.8px;
  `}
`;

export const TitleError = styled.h6`
  ${({ theme }) => css`
    margin: 24px 0 8px 0;
    color: ${theme.colors.lgRed};
    font-size: 14px;
    font-weight: bold;
    line-height: 23.8px;
  `}
`;

export const SubTitleError = styled.h6`
  ${({ theme }) => css`
    color: ${theme.colors.lgRed};
    font-size: 14px;
    line-height: 23.8px;
  `}
`;
