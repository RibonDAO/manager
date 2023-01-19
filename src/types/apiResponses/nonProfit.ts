import { CreateCause } from "./cause";
import { CreateNonProfitImpacts } from "./nonProfitImpacts";
import { CreateStory } from "./story";

export interface CreateNonProfit {
  id?: string;
  name: string;
  walletAddress: string;
  status: string;
  logo?: any;
  backgroundImage?: any;
  mainImage?: any;
  causeId: number;
  storiesAttributes?: CreateStory[];
  nonProfitImpactsAttributes?: CreateNonProfitImpacts[];
  cause?: CreateCause;
}
