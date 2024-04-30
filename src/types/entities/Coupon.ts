export default interface Coupon {
  id?: number;
  expirationDate?: string;
  link?: string;
  numberOfTickets?: number;
  availableQuantity: number;
  rewardText: string;
  status: string;
}
