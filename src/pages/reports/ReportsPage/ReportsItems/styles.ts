import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

// create a component to table
export const Table = styled.table`
  min-width: 500px;
  margin: ${({ theme }) => theme.spacing(24, 0)};
  border-collapse: collapse;

  tr,
  thead tr,
  tbody {
    border-bottom: 1px solid #ddd;
  }

  td,
  th {
    padding: ${({ theme }) => theme.spacing(12, 16)};
  }

  tbody tr th {
    text-align: left;
    color: ${({ theme }) => theme.colors.neutral[500]};
  }

  thead tr {
    text-align: left;
    color: ${({ theme }) => theme.colors.neutral[800]};
  }
`;

export const ActionsTableCell = styled.div`
  display: flex;

  img {
    margin-right: ${({ theme }) => theme.spacing(8)};
  }
`;

export const StatusTableCell = styled.span`
  text-transform: capitalize;
`;
