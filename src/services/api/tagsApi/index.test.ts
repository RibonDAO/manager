import tagsApi from ".";
import api from "..";

describe("tagsApi", () => {
  describe("#getTags", () => {
    const params = { page: 3, per_page: 10 };

    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      tagsApi.getTags(params);

      expect(api.get).toHaveBeenCalledWith("/managers/v1/tags", {
        params: { params },
      });
    });
  });

  describe("#createTag", () => {
    const data = {
      name: "Tag 1",
      status: "active",
      nonProfitsIds: [1, 2],
    };

    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a post request with the correct info: url and params", () => {
      tagsApi.createTag(data);

      expect(api.post).toHaveBeenCalledWith("/managers/v1/tags", data);
    });
  });

  describe("#updateTag", () => {
    const id = 1;

    const data = {
      id: 1,
      name: "Tag 1",
      status: "active",
      nonProfitsIds: [1, 2, 3],
    };

    beforeEach(() => {
      api.put = jest.fn();
    });

    it("expects to send a put request with the correct info: url and params", () => {
      tagsApi.updateTag(1, data);

      expect(api.put).toHaveBeenCalledWith(`/managers/v1/tags/${id}`, data);
    });
  });
});
