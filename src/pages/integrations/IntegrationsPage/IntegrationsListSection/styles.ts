import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css`
    display: flex;
  `}
`;

export const Table = styled.table`
  ${({ theme }) => css`
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: "Inter";
    min-width: 500px;

    thead tr {
      color: ${theme.colors.ribonBlack};
      text-align: left;
      font-weight: 600;
    }

    tbody tr th {
      color: ${theme.colors.darkGray};
      text-align: left;
    }

    td,
    th {
      padding: 10px 15px;
    }

    tbody td,
    tbody th {
      font-weight: 400;
      color: #222;
    }

    thead tr,
    tbody,
    tr {
      border-bottom: 1px solid #dddddd;
    }
  `}
`;

export const ActionsTableCell = styled.div`
  ${() => css`
    display: flex;

    img {
      margin-right: 0.5rem;
    }
  `}
`;

export const StatusTableCell = styled.span`
  ${() => css`
    text-transform: capitalize;
  `}
`;
