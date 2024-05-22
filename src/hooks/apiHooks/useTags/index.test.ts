import { renderHook } from "@testing-library/react-hooks";
import tagsApi from "services/api/tagsApi";
import useTags from ".";

describe("useTags", () => {
  let hook: ReturnType<typeof useTags>;

  beforeEach(() => {
    const { result } = renderHook(() => useTags());
    hook = result.current;
  });

  describe("#getTags", () => {
    beforeEach(() => {
      tagsApi.getTags = jest.fn(() => ({} as any));
    });

    it("calls getTags with correct params", () => {
      hook.getTags();

      expect(tagsApi.getTags).toHaveBeenCalled();
    });
  });

  describe("#getApiTag", () => {
    const id = 1;

    beforeEach(() => {
      tagsApi.getTag = jest.fn(() => ({} as any));
    });

    it("calls getApiTag with correct params", () => {
      hook.getTag(id);

      expect(tagsApi.getTag).toHaveBeenCalled();
      expect(tagsApi.getTag).toHaveBeenCalledWith(id);
    });
  });

  describe("#createTag", () => {
    const data = {
      name: "New Tag",
      status: "active",
      nonProfitIds: [1, 2],
    };

    beforeEach(() => {
      tagsApi.createTag = jest.fn(() => ({} as any));
    });

    it("calls createTag with correct params", () => {
      hook.createTag(data);

      expect(tagsApi.createTag).toHaveBeenCalled();
      expect(tagsApi.createTag).toHaveBeenCalledWith(data);
    });
  });

  describe("#updateTag", () => {
    const id = "1";
    const data = {
      id,
      name: "New Tag",
      status: "active",
      nonProfitIds: [1, 2, 3],
    };

    beforeEach(() => {
      tagsApi.updateTag = jest.fn(() => ({} as any));
    });

    it("calls updateTag with correct params", () => {
      hook.updateTag(data);

      expect(tagsApi.updateTag).toHaveBeenCalled();
      expect(tagsApi.updateTag).toHaveBeenCalledWith(id, data);
    });
  });
});
