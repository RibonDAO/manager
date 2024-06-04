import styled from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(12, 24, 24)};
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
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

export const LeftSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing(12)};
  display: flex;
`;

export const RightSection = styled.div`
  margin-left: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
`;

export const Subtitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing(12)};
`;

export const SubtitleDescription = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  font-weight: 400;
`;

export const TextInput = styled.input`
  width: 336px;
  margin: ${({ theme }) => theme.spacing(8, 0)};
  padding: ${({ theme }) => theme.spacing(8, 16)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[800]};
  border-radius: 10px;
  display: block;
  color: ${({ theme }) => theme.colors.neutral[800]};

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral[500]};
    opacity: 1;
  }
`;

export const Error = styled.span`
  color: ${({ color, theme }) => color || theme.colors.brand.tertiary[400]};

  ::first-letter {
    text-transform: uppercase;
  }
`;

export const ItemBox = styled.div`
  margin-right: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  width: 50%;
  margin-top: ${({ theme }) => theme.spacing(12)};
  display: flex;
  justify-content: flex-start;
`;
