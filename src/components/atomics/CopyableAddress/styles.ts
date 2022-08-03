import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    cursor: pointer;

    img {
      margin-right: 0.4rem;
      max-width: 17px;
    }

    span {
      text-decoration: underline;
      color: ${theme.colors.darkGray};
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `}
`;
