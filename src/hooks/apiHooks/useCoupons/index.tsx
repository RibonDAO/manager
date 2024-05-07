import couponsApi from "services/api/couponsApi";
import Coupon from "types/entities/Coupon";

function useCoupons() {
  async function getCoupons() {
    const { data: coupons } = await couponsApi.getCouponsList();

    return coupons;
  }

  async function getCoupon(id: any) {
    const { data: coupon } = await couponsApi.getCoupon(id);

    return coupon;
  }

  async function createCoupon(newCoupon: Coupon) {
    const { data: coupon } = await couponsApi.createCoupon(newCoupon);

    return coupon;
  }

  async function updateCoupon(data: Coupon) {
    const { data: coupon } = await couponsApi.updateCoupon(data.id, data);

    return coupon;
  }

  return {
    getCoupon,
    getCoupons,
    createCoupon,
    updateCoupon,
  };
}

export default useCoupons;
