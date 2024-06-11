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

export const Input = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  input:not(:last-child) {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
`;

export const Image = styled.img`
  width: "300px";
  height: "auto";
  margin: "16px";
`;

export const PlaceHoldTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
