import { CreateCause } from "./cause";
import { CreateNonProfitImpacts } from "./nonProfitImpacts";
import { CreateStory } from "./story";

export interface CreateNonProfit {
  id?: string;
  name: string;
  impactTitle?: string;
  walletAddress: string;
  status: string;
  logo?: any;
  backgroundImage?: any;
  mainImage?: any;
  causeId: number;
  storiesAttributes?: CreateStory[];
  nonProfitImpactsAttributes?: CreateNonProfitImpacts[];
  cause?: CreateCause;
  confirmationImage?: any;
  coverImage?: any;
  coverImageDescription?: string;
  logoDescription?: string;
  mainImageDescription?: string;
  backgroundImageDescription?: string;
  confirmationImageDescription?: string;
}
