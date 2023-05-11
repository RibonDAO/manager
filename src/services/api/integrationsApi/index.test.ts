import { IntegrationWallet } from "@ribon.io/shared/types";
import integrationsApi from ".";
import api from "..";

describe("integrationsApi", () => {
  describe("#getIntegrationsList", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      integrationsApi.getIntegrationsList();

      expect(api.get).toHaveBeenCalledWith("/api/v1/integrations");
    });
  });

  describe("#createIntegration", () => {
    const data = {
      name: "Integration 1",
      status: "active",
    };

    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a post request with the correct info: url and params", () => {
      integrationsApi.createIntegration(data);

      expect(api.post).toHaveBeenCalledWith("/api/v1/integrations", data);
    });
  });

  describe("#updateIntegration", () => {
    const id = 1;
    const wallet: IntegrationWallet = {
      publicKey: "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    };

    const data = {
      id: 1,
      name: "Integration 1",
      integrationWallet: wallet,
      uniqueAddress: "1234567890123456789012345678901234567890",
      integrationAddress: "https://dapp.ribon.io/integration/uuid",
      status: "active",
      ticketAvailabilityInMinutes: 60,
      created_at: "2020-01-01T00:00:00.000Z",
      updated_at: "2020-01-01T00:00:00.000Z",
      integrationTask: {
        id: 1,
        description: "Faça uma compra",
        link: "Comprar",
        linkAddress: "https://renner.com",
      },
    };

    beforeEach(() => {
      api.put = jest.fn();
    });

    it("expects to send a put request with the correct info: url and params", () => {
      integrationsApi.updateIntegration(1, data);

      expect(api.put).toHaveBeenCalledWith(`/api/v1/integrations/${id}`, data);
    });
  });
});
