import { renderHook } from "@testing-library/react-hooks";
import warmglowMessagesApi from "services/api/warmglowMessagesApi";
import useWarmglowMessages from ".";

describe("usewarmglowMessages", () => {
  let hook: ReturnType<typeof useWarmglowMessages>;

  beforeEach(() => {
    const { result } = renderHook(() => useWarmglowMessages());
    hook = result.current;
  });

  describe("#getwarmglowMessages", () => {
    beforeEach(() => {
      warmglowMessagesApi.getWarmglowMessages = jest.fn(() => ({} as any));
    });

    it("calls getwarmglowMessages with correct params", () => {
      hook.getWarmglowMessages();

      expect(warmglowMessagesApi.getWarmglowMessages).toHaveBeenCalled();
    });
  });

  describe("#getWarmglowMessage", () => {
    const id = 1;

    beforeEach(() => {
      warmglowMessagesApi.getWarmglowMessage = jest.fn(() => ({} as any));
    });

    it("calls getApiWargetWarmglowMessage with correct params", () => {
      hook.getWarmglowMessage(id);

      expect(warmglowMessagesApi.getWarmglowMessage).toHaveBeenCalled();
      expect(warmglowMessagesApi.getWarmglowMessage).toHaveBeenCalledWith(id);
    });
  });

  describe("#createWarmglowMessage", () => {
    const data = {
      message: "New Message",
      status: "active",
      nonProfitIds: [1, 2],
    };

    beforeEach(() => {
      warmglowMessagesApi.createWarmglowMessage = jest.fn(() => ({} as any));
    });

    it("calls createWarmglow with correct params", () => {
      hook.createWarmglowMessage(data);

      expect(warmglowMessagesApi.createWarmglowMessage).toHaveBeenCalled();
      expect(warmglowMessagesApi.createWarmglowMessage).toHaveBeenCalledWith(
        data,
      );
    });
  });

  describe("#updateWarmglowMessage", () => {
    const id = "1";
    const data = {
      id,
      message: "Message 1",
      status: "active",
      nonProfitIds: [1, 2, 3],
    };

    beforeEach(() => {
      warmglowMessagesApi.updateWarmglowMessage = jest.fn(() => ({} as any));
    });

    it("calls updateWarmglowMessage with correct params", () => {
      hook.updateWarmglowMessage(data);

      expect(warmglowMessagesApi.updateWarmglowMessage).toHaveBeenCalled();
      expect(warmglowMessagesApi.updateWarmglowMessage).toHaveBeenCalledWith(
        id,
        data,
      );
    });
  });
});
