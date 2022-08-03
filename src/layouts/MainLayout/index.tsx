import React from "react";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
};
function MainLayout({ children }: Props): JSX.Element {
  return (
    <S.Container>
      <S.BodyContainer>{children}</S.BodyContainer>
    </S.Container>
  );
}

export default MainLayout;
