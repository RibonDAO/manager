import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Cause } from "@ribon.io/shared/types";
import theme from "styles/theme";
import * as S from "./styles";

export type Props = {
  causes: Cause[];
  pools: any[];
  title: string;
  leftText: string;
  treasureBalance: any;
};

function CardTextGraph({
  causes,
  pools,
  title,
  leftText,
  treasureBalance,
}: Props): JSX.Element {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  );

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [poolsBalance, setPoolsBalance] = useState<any[]>([]);

  function updatePoolsBalance() {
    const newPoolBalances = pools.map((item) => item.poolBalance ?? null);
    setPoolsBalance(newPoolBalances);
  }

  const handleBalance = (address: string) => {
    const pool = pools?.find(
      (p) => p.address.toLowerCase() === address.toLowerCase(),
    );
    return pool?.poolBalance?.balance ?? 0;
  };

  function renderGraph() {
    const labels = causes.map((item) => item.name);

    const data = {
      labels,
      datasets: [
        {
          data: causes.map((item) =>
            handleBalance(item.pools[0]?.address ?? ""),
          ),
          backgroundColor: theme.colors.brand.primary[300],
          borderColor: theme.colors.brand.primary[300],
          label: "Causes",
          borderRadius: 4,
        },
      ],
    };
    return data;
  }

  useEffect(() => {
    updatePoolsBalance();
  }, [pools]);

  return (
    <S.Container>
      <S.MainText>{title}</S.MainText>
      <S.MainValue>{treasureBalance}</S.MainValue>
      <S.TreasureTitle>{leftText}</S.TreasureTitle>
      {poolsBalance.length > 0 && (
        <S.Graph data={renderGraph()} options={options} />
      )}
      <S.CausesSection>
        {causes.map((cause: any) => (
          <S.CauseCard key={cause.id}>
            <S.CauseTitle>{cause.name} (USDC)</S.CauseTitle>
            <S.CauseValue>
              {handleBalance(cause.pools[0]?.address ?? "")}
            </S.CauseValue>
          </S.CauseCard>
        ))}
      </S.CausesSection>
    </S.Container>
  );
}

export default CardTextGraph;
