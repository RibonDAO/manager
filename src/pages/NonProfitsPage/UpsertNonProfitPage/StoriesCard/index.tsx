import MarkdownViewer from "components/moleculars/Markdown/Viewer";
import * as S from "./styles";

export type Props = {
  description: string;
  image: string;
};

function StoriesCard({ description, image }: Props) {
  return (
    <S.Container>
      <S.CardContainer>
        <S.LeftSection>
          <S.ItemBox>
            <S.CardImage src={image && image} />
          </S.ItemBox>
        </S.LeftSection>

        <S.RightSection>
          <S.ItemBox>
            <MarkdownViewer value={description} />
          </S.ItemBox>
        </S.RightSection>
      </S.CardContainer>
    </S.Container>
  );
}

export default StoriesCard;
