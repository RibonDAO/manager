import { renderHook } from "@testing-library/react-hooks";
import nonProfitsApi from "services/api/nonProfitsApi";
import useNonProfits from ".";

describe("useNonProfits", () => {
  let hook: ReturnType<typeof useNonProfits>;

  beforeEach(() => {
    const { result } = renderHook(() => useNonProfits());
    hook = result.current;
  });

  describe("#getNonProfitsList", () => {
    beforeEach(() => {
      nonProfitsApi.getNonProfitsList = jest.fn(() => ({} as any));
    });

    it("calls getNonProfitsList with correct params", () => {
      hook.getNonProfits();

      expect(nonProfitsApi.getNonProfitsList).toHaveBeenCalled();
    });
  });

  describe("#getApiNonProfit", () => {
    const id = 1;

    beforeEach(() => {
      nonProfitsApi.getNonProfit = jest.fn(() => ({} as any));
    });

    it("calls getApiNonProfit with correct params", () => {
      hook.getNonProfit(id);

      expect(nonProfitsApi.getNonProfit).toHaveBeenCalled();
      expect(nonProfitsApi.getNonProfit).toHaveBeenCalledWith(id);
    });
  });

  describe("#createApiNonProfit", () => {
    const data = {
      name: "New NonProfit",
      walletAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      status: "active",
      impactDescription: "Impact Description",
      causeId: 1,
    };

    beforeEach(() => {
      nonProfitsApi.createNonProfit = jest.fn(() => ({} as any));
    });

    it("calls createApiNonProfit with correct params", () => {
      hook.createNonProfit(data);

      expect(nonProfitsApi.createNonProfit).toHaveBeenCalled();
      expect(nonProfitsApi.createNonProfit).toHaveBeenCalledWith(data);
    });
  });

  describe("#updateApiNonProfit", () => {
    const id = 1;
    const data = {
      id,
      name: "New NonProfit",
      walletAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      status: "active",
      impactDescription: "Impact Description",
      causeId: 1,
    };

    beforeEach(() => {
      nonProfitsApi.updateNonProfit = jest.fn(() => ({} as any));
    });

    it("calls updateApiNonProfit with correct params", () => {
      hook.updateNonProfit(data);

      expect(nonProfitsApi.updateNonProfit).toHaveBeenCalled();
      expect(nonProfitsApi.updateNonProfit).toHaveBeenCalledWith(id, data);
    });
  });
});
