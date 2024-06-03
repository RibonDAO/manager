import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  max-width: 600px;
`;

export const Title = styled.h2`
  margin: ${({ theme }) => theme.spacing(80, 0, 32)};
  text-transform: uppercase;
`;

export const Subtitle = styled.h4`
  margin: ${({ theme }) => theme.spacing(0, 0, 24)};
`;

export const Row = styled.p`
  border-bottom: 1px solid #ccc;
  :first-child {
    font-weight: bold;
  }
`;

export const PreviewSection = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
