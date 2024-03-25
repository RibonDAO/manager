import Plan from "./Plan";

export default interface Offer {
  id?: number;
  active: boolean;
  currency: string;
  gateway: string;
  externalId: string;
  priceCents: number;
  subscription: boolean;
  category: string;
  plan?: Plan;
}
