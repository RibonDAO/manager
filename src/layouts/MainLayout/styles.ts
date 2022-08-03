import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.bgGray};
  box-shadow: 0px 0px 20px rgba(24, 86, 105, 0.15);
  padding-left: 8%;
`;

export const BodyContainer = styled.div``;

export const Settings = styled.img`
  ${() => css`
    cursor: pointer;
  `}
`;
