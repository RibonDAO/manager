import styled from "styled-components";

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing(16)};
`;

export const Title = styled.h2`
  margin: ${({ theme }) => theme.spacing(80, 0, 80)};
  text-transform: uppercase;
`;
