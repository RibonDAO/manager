import MDEditor from "@uiw/react-md-editor";
import * as S from "./styles";

type Props = {
  value: string;
  onChange: (value: any) => void;
};

export default function MarkdownEditor({ value, onChange }: Props) {
  return (
    <S.Container>
      <MDEditor value={value} onChange={onChange} highlightEnable={false} />
    </S.Container>
  );
}
