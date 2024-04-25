export default interface Coupon {
  id?: number;
  expirationDate: string;
  link: string;
  numberOfTickets?: string;
  rewardText: string;
  status: string;
}
