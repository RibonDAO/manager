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

  describe("#createWarmglowMessage", () => {
    const data = {
      message: "Message 1",
      status: "active",
    };

    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a post request with the correct info: url and params", () => {
      warmglowMessagesApi.createWarmglowMessage(data);

      expect(api.post).toHaveBeenCalledWith(
        "/managers/v1/warmglow_messages",
        data,
      );
    });
  });

  describe("#updateWarmglowMessage", () => {
    const id = 1;

    const data = {
      id: 1,
      message: "Message 1",
      status: "active",
    };

    beforeEach(() => {
      api.put = jest.fn();
    });

    it("expects to send a put request with the correct info: url and params", () => {
      warmglowMessagesApi.updateWarmglowMessage(1, data);

      expect(api.put).toHaveBeenCalledWith(
        `/managers/v1/warmglow_messages/${id}`,
        data,
      );
    });
  });
});
