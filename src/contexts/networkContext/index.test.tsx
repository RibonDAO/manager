import { renderComponent, waitForPromises, renderHook } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useNetworkContext } from ".";

jest.mock("hooks/useProvider", () => ({
  useProvider: () => ({
    getNetwork: () => ({
      name: "Mumbai Testnet",
      chainId: 0x13881,
      ensAddress: "https://rpc-mumbai.maticvigil.com",
    }),
  }),
}));

function NetworkTestPage() {
  useNetworkContext();
  return <div>Network</div>;
}

describe("useNetwork", () => {
  let current: ReturnType<typeof useNetworkContext>;
  it("renders without error", async () => {
    renderComponent(<NetworkTestPage />);
    await waitForPromises();
    expectTextToBeInTheDocument("Network");
  });

  describe("getCurrentNetwork", () => {
    const payload = {
      chainName: "Mumbai Testnet",
      ribonContractAddress: "0xF02a09B21267EDB53B459ddC802C60245dEfbE34",
      donationTokenContractAddress:
        "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
      chainId: 0x13881,
      rpcUrls: "https://rpc-mumbai.maticvigil.com",
      nodeUrl:
        "https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks",
      symbolName: "MATIC",
      currencyName: "Matic",
      blockExplorerUrls: "https://mumbai.polygonscan.com/",
      defaultPoolAddress: "0x9B00b1a3C4ea8BFbBE984360513f7bE7e971e431",
      defaultIntegrationHolding: "0x9F9241629E8C1FE2b466754843A629b675Dd36Ab",
      subgraphUrl:
        "https://api.thegraph.com/subgraphs/name/ribondao/ribonsubgraph",
    };

    beforeEach(async () => {
      const { hook } = renderHook(() => useNetworkContext());
      await waitForPromises();
      current = hook.result.current;
    });

    it("returns current network", async () => {
      await current.getCurrentNetwork();
      const { currentNetwork } = current;

      expect(currentNetwork).toEqual(payload);
    });
  });
});
