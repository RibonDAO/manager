import styled from "styled-components";

export const ContentSection = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.green30};
  margin: 5px 7px 30px 4px;
  display: inline-block;
  vertical-align: middle;
  transform: scale(1.5);
`;

export const Title = styled.h2`
  margin: 84px 0 32px;
  text-transform: uppercase;
`;

export const Divider = styled.hr`
  margin: 8px 0;
  border: none;
`;

export const Subtitle = styled.h3`
  margin-bottom: 12px;
`;

export const SubtitleDescription = styled.h4`
  margin-bottom: 4px;
  font-weight: 400;
`;

export const TextInput = styled.input`
  width: 100%;
  margin: 8px 0 30px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 4px;
  display: block;
  color: ${({ theme }) => theme.colors.darkGray};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    opacity: 1;
  }
`;

export const AreaInput = styled.textarea`
  min-width: 274px;
  max-width: 274px;
  margin: 8px 0 30px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 4px;
  display: block;
  color: ${({ theme }) => theme.colors.darkGray};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    opacity: 1;
  }
`;

export const Span = styled.span`
  margin: 5px 7px 30px 4px;
  display: inline-block;
  vertical-align: middle;
  color: ${({ color, theme }) => color || theme.colors.darkGray};

  ::first-letter {
    text-transform: uppercase;
  }
`;

export const Error = styled.span`
  margin-top: -20px;
  color: ${({ color, theme }) => color || theme.colors.red30};

  ::first-letter {
    text-transform: uppercase;
  }
`;

export const ButtonContainer = styled.div`
  margin: 24px 0;
  display: flex;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FlexRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const DoubleItemSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ItemBox = styled.div`
  margin-right: 16px;
  display: flex;
  flex-direction: column;
`;

export const ImageRecommendation = styled.h6`
  font-weight: 400;
  font-size: 12px;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.gray30};
`;
