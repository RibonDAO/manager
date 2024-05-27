import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Title = styled.h2`
  margin: ${({ theme }) => theme.spacing(80, 0, 32)};
  text-transform: uppercase;
`;

export const Subtitle = styled.h4`
  margin: ${({ theme }) => theme.spacing(0, 0, 24)};
`;

export const PreviewSection = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
`;
