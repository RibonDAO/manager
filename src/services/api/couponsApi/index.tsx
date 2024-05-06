import { AxiosResponse } from "axios";
import Coupon from "../../../types/entities/Coupon";
import { apiGet, apiPost, apiPut } from "..";

const couponsApi = {
  getCouponsList: (): Promise<AxiosResponse<Coupon>> => apiGet("coupons"),
  getCoupon: (id: any): Promise<AxiosResponse<Coupon>> =>
    apiGet(`coupons/${id}`),
  createCoupon: (data: any): Promise<AxiosResponse<Coupon>> =>
    apiPost("coupons", data),
  updateCoupon: (id: any, data: Coupon): Promise<AxiosResponse<Coupon>> =>
    apiPut(`coupons/${id}`, data),
};

export default couponsApi;
