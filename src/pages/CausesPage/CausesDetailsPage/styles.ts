import styled from "styled-components";
import { defaultSubtitleSmall } from "styles/typography/default";

export const Container = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    flex-direction: row;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin: 84px 0 32px;
  text-transform: uppercase;
`;

export const InfoValue = styled.p`
  color: ${({ theme }) => theme.colors.gray30};
`;

export const RightSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const LeftSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const CausesCardContainer = styled.div``;

export const Subtitle = styled.h4``;

export const SubtitleInfo = styled.h2`
  color: ${({ theme }) => theme.colors.green30};
  margin-bottom: 16px;
`;

export const CardProject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  width: 200px;
  min-height: 40px;
  justify-content: space-between;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow};
`;

export const ArrowOutward = styled.img``;

export const CardProjectInfo = styled.h4`
  ${defaultSubtitleSmall}
  color: ${({ theme }) => theme.colors.gray30};
`;