import warmglowMessagesApi from ".";
import api from "..";

describe("warmglowMessagesApi", () => {
  describe("#getWarmglowMessages", () => {
    const params = { page: 3, per_page: 10 };

    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      warmglowMessagesApi.getWarmglowMessages(params);

      expect(api.get).toHaveBeenCalledWith("/managers/v1/warmglow_messages", {
        params: { params },
      });
    });
  });

  describe("#getWarmglowMessage", () => {
    const id = 1;

    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      warmglowMessagesApi.getWarmglowMessage(id);

      expect(api.get).toHaveBeenCalledWith(
        `/managers/v1/warmglow_messages/${id}`,
      );
    });
  });
});
