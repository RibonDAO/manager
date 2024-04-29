import { renderHook } from "@testing-library/react-hooks";
import couponsApi from "services/api/couponsApi";
import useCoupons from ".";

describe("useCoupons", () => {
  let hook: ReturnType<typeof useCoupons>;

  beforeEach(() => {
    const { result } = renderHook(() => useCoupons());
    hook = result.current;
  });

  describe("#getAllCoupons", () => {
    beforeEach(() => {
      couponsApi.getCouponsList = jest.fn(() => ({} as any));
    });

    it("calls getCouponsList with correct params", () => {
      hook.getAllCoupons();

      expect(couponsApi.getCouponsList).toHaveBeenCalled();
    });
  });

  describe("#getCoupon", () => {
    const id = 1;
    beforeEach(() => {
      couponsApi.getCoupon = jest.fn(() => ({} as any));
    });

    it("calls getImpressionCard with correct params", () => {
      hook.getCoupon(id);

      expect(couponsApi.getCoupon).toHaveBeenCalled();
      expect(couponsApi.getCoupon).toHaveBeenCalledWith(id);
    });
  });
});
