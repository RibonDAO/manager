import { renderHook } from "@testing-library/react-hooks";
import couponsApi from "services/api/couponsApi";
import useCoupons from ".";

describe("useCoupons", () => {
  let hook: ReturnType<typeof useCoupons>;

  beforeEach(() => {
    const { result } = renderHook(() => useCoupons());
    hook = result.current;
  });

  describe("#getCoupons", () => {
    beforeEach(() => {
      couponsApi.getCouponsList = jest.fn(() => ({} as any));
    });

    it("calls getCouponsList with correct params", () => {
      hook.getCoupons();

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

  describe("#createCoupon", () => {
    const newCoupon = {
      id: "1",
      status: "active",
      expirationDate: "2022-01-01",
      couponMessageAttributes: {
        id: "1",
        reward_text: "Reward text",
      },
      ticketsQuantity: 1,
      availableQuantity: 1,
      link: "https://example.com",
    };
    beforeEach(() => {
      couponsApi.createCoupon = jest.fn(() => ({} as any));
    });

    it("calls createCoupon with correct params", () => {
      hook.createCoupon(newCoupon);

      expect(couponsApi.createCoupon).toHaveBeenCalled();
      expect(couponsApi.createCoupon).toHaveBeenCalledWith(newCoupon);
    });
  });

  describe("#updateCoupon", () => {
    const data = {
      id: "1",
      status: "active",
      expirationDate: "2022-01-01",
      couponMessageAttributes: {
        id: "1",
        reward_text: "Reward text",
      },
      ticketsQuantity: 1,
      availableQuantity: 1,
      link: "https://example.com",
    };
    beforeEach(() => {
      couponsApi.updateCoupon = jest.fn(() => ({} as any));
    });

    it("calls updateCoupon with correct params", () => {
      hook.updateCoupon(data);

      expect(couponsApi.updateCoupon).toHaveBeenCalled();
      expect(couponsApi.updateCoupon).toHaveBeenCalledWith(data.id, data);
    });
  });
});
