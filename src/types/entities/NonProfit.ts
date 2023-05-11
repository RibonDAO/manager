import { CreateStory, CreateNonProfitImpacts, Cause, Story, NonProfitImpact } from "@ribon.io/shared/types";

export default interface NonProfit {
  id: string;
  name: string;
  walletAddress: string;
  impactDescription?: string;
  status: string;
  logo?: any;
  mainImage?: any;
  backgroundImage?: any;
  cause: Cause;
  stories: Story[];
  storiesAttributes: CreateStory[];
  createdAt: string;
  updatedAt: string;
  impactByTicket: number;
  causeId: number;
  nonProfitImpacts?: NonProfitImpact[];
  nonProfitImpactsAttributes?: CreateNonProfitImpacts[];
}
