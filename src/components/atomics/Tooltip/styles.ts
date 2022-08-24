import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: inline-block;
    position: relative;
  `}
`;

export const TooltipTip = styled.div`
  ${({ color, theme }) => css`
    position: absolute;
    font-family: "Inter";
    border-radius: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    color: #fff;
    background: ${color || theme.colors.darkGray};
    font-size: 11px;
    font-family: sans-serif;
    line-height: 1;
    z-index: 100;
    white-space: nowrap;
    font-weight: 600;
    top: -30px;
    transition-timing-function: ease-in-out;
  `}
`;
