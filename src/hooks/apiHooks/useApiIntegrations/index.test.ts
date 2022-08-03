import { renderHook } from "@testing-library/react-hooks";
import integrationsApi from "services/api/integrationsApi";
import useIntegrations from ".";

describe("useIntegrations", () => {
  let hook: ReturnType<typeof useIntegrations>;

  beforeEach(() => {
    const { result } = renderHook(() => useIntegrations());
    hook = result.current;
  });

  describe("#getAllIntegrations", () => {
    beforeEach(() => {
      integrationsApi.getIntegrationsList = jest.fn(() => ({} as any));
    });

    it("calls getIntegrationsList with correct params", () => {
      hook.getAllApiIntegrations();

      expect(integrationsApi.getIntegrationsList).toHaveBeenCalled();
    });
  });

  describe("#getApiIntegration", () => {
    const id = 1;
    beforeEach(() => {
      integrationsApi.getIntegration = jest.fn(() => ({} as any));
    });

    it("calls getApiIntegration with correct params", () => {
      hook.getApiIntegration(id);

      expect(integrationsApi.getIntegration).toHaveBeenCalled();
      expect(integrationsApi.getIntegration).toHaveBeenCalledWith(id);
    });
  });

  describe("#updateApiIntegration", () => {
    const id = 1;
    const data = {
      id: 1,
      name: "Integration 1",
      walletAddress: "0x1234567890123456789012345678901234567890",
      url: "https://integration.com/1",
      logo: "https://integration.com/1/logo.png",
      integrationAddress: "0x1234567890123456789012345678901234567890",
      status: "active",
      created_at: "2020-01-01T00:00:00.000Z",
      updated_at: "2020-01-01T00:00:00.000Z",
    };
    beforeEach(() => {
      integrationsApi.updateIntegration = jest.fn(() => ({} as any));
    });

    it("calls updateApiIntegration with correct params", () => {
      hook.updateApiIntegration(id, data);

      expect(integrationsApi.updateIntegration).toHaveBeenCalled();
      expect(integrationsApi.updateIntegration).toHaveBeenCalledWith(id, data);
    });
  });
});
