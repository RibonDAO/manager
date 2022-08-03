import styled, { css } from "styled-components";
import { Pie } from "react-chartjs-2";

export const Container = styled.div`
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
    padding: 24px;
  `}
`;

export const MainText = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-size: 12px;
    padding-bottom: 16px;
    line-height: 160%;
  `}
`;

export const MainValue = styled.p`
  ${({ theme }) => css`
    font-weight: 700;
    color: ${theme.colors.ribonBlack};
    font-size: 16px;
  `}
`;

export const Teste = styled.div`
  ${() => css`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `}
`;

export const SecondaryText = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-size: 10px;
  `}
`;

export const SecondaryLeftValue = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-weight: 700;
    font-size: 12px;
  `}
`;

export const SecondaryRightValue = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-weight: bold;
    font-size: 12px;
  `}
`;

export const Graph = styled(Pie)`
  ${() => css`
    padding: 32px 16px 0px 16px;
  `}
`;
