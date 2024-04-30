import styled from "styled-components";

export const ContentSection = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-direction: row;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h2`
  margin: ${({ theme }) => theme.spacing(80, 0, 32)};
  text-transform: uppercase;
`;

export const TextInput = styled.input`
  min-width: 400px;
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing(8, 0, 12)};
  padding: ${({ theme }) => theme.spacing(8, 16)};
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 10px;
  display: block;
  color: ${({ theme }) => theme.colors.darkGray};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    opacity: 1;
  }
`;

export const NumberInput = styled.input`
  margin-inline: 6px;
  width: 60px;
  padding: ${({ theme }) => theme.spacing(8, 4)};
  border: 1.5px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 10px;
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.brand.primary[300]};
  margin: ${({ theme }) => theme.spacing(4, 8, 32, 4)};
  display: inline-block;
  vertical-align: middle;
  transform: scale(1.5);
`;

export const Span = styled.span`
  margin: ${({ theme }) => theme.spacing(4, 8, 32, 4)};
  display: inline-block;
  vertical-align: middle;
  color: ${({ color, theme }) => color || theme.colors.darkGray};

  ::first-letter {
    text-transform: uppercase;
  }
`;

export const ButtonContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(24, 0)};
  display: flex;
`;
