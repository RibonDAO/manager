import CouponMessage from "./CouponMessage";

export default interface Coupon {
  id?: string;
  expirationDate?: string;
  link?: string;
  numberOfTickets?: number;
  availableQuantity?: number;
  status: string;
  couponMessage?: CouponMessage;
}
