import { Button } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// create a component to table
export const Table = styled.table`
  min-width: 500px;
  max-width: 90%;
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

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.brand.primary[300]};
  margin: ${({ theme }) => theme.spacing(4, 8, 32, 4)};
  display: inline-block;
  vertical-align: middle;
  transform: scale(1.5);
`;

export const StatusTableCell = styled.span`
  text-transform: capitalize;
`;

export const Span = styled.span`
  margin: ${({ theme }) => theme.spacing(4, 20, 32, 4)};
  display: inline-block;
  vertical-align: middle;
  color: ${({ color, theme }) => color || theme.colors.darkGray};

  ::first-letter {
    text-transform: uppercase;
  }
`;

export const Pagination = styled(ReactPaginate).attrs({
  activeClassName: "active", // default to "disabled"
})`
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;

  li a {
    margin-left: ${({ theme }) => theme.spacing(4)};
    padding: ${({ theme }) => theme.spacing(8, 16)};
    border: 1px solid ${({ theme }) => theme.colors.neutral[500]};
    border-radius: 16px;
    cursor: pointer;
  }

  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }

  li.active a {
    min-width: 32px;
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.brand.primary[300]};
    color: ${({ theme }) => theme.colors.neutral10};
  }

  li.disabled a {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export const SearchBar = styled.input`
  width: 80%;
  height: 44px;
  padding-left: ${({ theme }) => theme.spacing(16)};
  border: 2px solid ${({ theme }) => theme.colors.neutral[500]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const AddButton = styled(Button)``;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(16)};
`;
