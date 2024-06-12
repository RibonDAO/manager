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
});
