import styled from "styled-components";
import { defaultBodySmRegular } from "styles/typography/default";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const BoxIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerSwitch = styled.div`
  margin: ${({ theme }) => theme.spacing(0, 4)};
`;

export const Text = styled.p`
  ${defaultBodySmRegular}

  color: ${({ color }) => color};
`;
