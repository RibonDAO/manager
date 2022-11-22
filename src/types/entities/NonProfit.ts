import { NonProfitImpact } from "./NonProfitImpact";

export default interface NonProfit {
  id: string;
  name: string;
  walletAddress: string;
  impactDescription: string;
  status: string;
  logo?: any;
  causeCardImage?: any;
  causeId: number;
  nonProfitImpacts?: NonProfitImpact[];
}
