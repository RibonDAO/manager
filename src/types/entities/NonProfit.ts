import { CreateStory } from "types/apiResponses/story";
import { CreateNonProfitImpacts } from "types/apiResponses/nonProfitImpacts";
import Cause from "./Cause";
import Story from "./Story";
import { NonProfitImpact } from "./NonProfitImpact";

export default interface NonProfit {
  id: string;
  name: string;
  walletAddress: string;
  impactDescription?: string;
  status: string;
  logo?: any;
  mainImage?: any;
  backgroundImage?: any;
  coverImage?: any;
  impactTitle?: string;
  cause: Cause;
  stories: Story[];
  storiesAttributes: CreateStory[];
  createdAt: string;
  updatedAt: string;
  impactByTicket: number;
  causeId: number;
  nonProfitImpacts?: NonProfitImpact[];
  nonProfitImpactsAttributes?: CreateNonProfitImpacts[];
  confirmationImage?: any;
  logoDescription?: string;
  coverImageDescription?: string;
  mainImageDescription?: string;
  backgroundImageDescription?: string;
  confirmationImageDescription?: string;
}
