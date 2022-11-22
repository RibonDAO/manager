import Dropdown from "components/atomics/Dropdown";
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

export const LeftSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h2`
  margin: 84px 0 32px;
  text-transform: uppercase;
`;

export const Subtitle = styled.h3`
  margin-bottom: 12px;
`;

export const SubtitleDescription = styled.h4`
  margin-bottom: 4px;
  font-weight: 400;
`;

export const TextInput = styled.input`
  min-width: 400px;
  max-width: 400px;
  margin: 8px 0 30px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 10px;
  display: block;
  color: ${({ theme }) => theme.colors.darkGray};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    opacity: 1;
  }
`;

export const SelectInput = styled(Dropdown)``;

export const NumberInput = styled.input`
  margin-inline: 6px;
  width: 40px;
  padding: 8px 5px;
  border: 1.5px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 10px;
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.green30};
  margin: 5px 7px 30px 4px;
  display: inline-block;
  vertical-align: middle;
  transform: scale(1.5);
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

export const TicketAvailabilityContainer = styled.div`
  margin-bottom: 20px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  color: ${({ color, theme }) => color || theme.colors.darkGray};
`;

export const ButtonContainer = styled.div`
  margin: 24px 0;
  display: flex;
`;

export const RightSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;