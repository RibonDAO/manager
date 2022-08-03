import styled, { css } from "styled-components";

export const Title = styled.h1`
  ${() => css`
    text-transform: uppercase;
    margin: 4px 0;
    font-weight: 800;
    font-size: 28px;
    margin-bottom: 32px;
    margin-top: 84px;
  `}
`;

export const TextInput = styled.input`
  ${({ theme }) => css`
    display: block;
    margin: 4px 0;
    margin-bottom: 8px;
    margin-top: 8px;
    border: 1px solid ${theme.colors.ribonBlack};
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    color: ${theme.colors.ribonBlack};
    min-width: 400px;
  `}
`;

export const Checkbox = styled.input`
  ${({ theme }) => css`
    margin: 4px 6px 24px;

    &:checked {
      background-color: ${theme.colors.ribonBlue};
    }
  `}
`;

export const Span = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-size: 12px;
  `}
`;

export const ButtonContainer = styled.div`
  ${() => css`
    display: flex;
    margin-top: 24px;
  `}
`;
