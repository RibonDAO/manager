import { Cause } from "@ribon.io/shared/types";
import moneyFormatter from "lib/moneyFormatter";
import * as S from "./styles";

export type Props = {
  cause: Cause;
  pool: any;
};

function CauseCard({ cause, pool }: Props): JSX.Element {
  return (
    <S.CauseCard>
      <S.CauseTitle>{cause.name} (USDC)</S.CauseTitle>
      <S.CauseValue>{moneyFormatter(pool.balance)}</S.CauseValue>
    </S.CauseCard>
  );
}

export default CauseCard;
