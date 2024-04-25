import couponsApi from "services/api/couponsApi";

function useCoupons() {
  async function getAllCoupons() {
    const { data: coupons } = await couponsApi.getCouponsList();

    return coupons;
  }

  async function getCoupon(id: any) {
    const { data: coupon } = await couponsApi.getCoupon(id);

    return coupon;
  }

  return {
    getCoupon,
    getAllCoupons,
  };
}

export default useCoupons;
