import couponsApi from ".";
import api from "..";

describe("couponsApi", () => {
  describe("#getCouponList", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      couponsApi.getCouponsList();

      expect(api.get).toHaveBeenCalledWith("/managers/v1/coupons");
    });
  });

  describe("#getCoupon", () => {
    const id = 1;

    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      couponsApi.getCoupon(id);

      expect(api.get).toHaveBeenCalledWith(`/managers/v1/coupons/${id}`);
    });
  });
});
