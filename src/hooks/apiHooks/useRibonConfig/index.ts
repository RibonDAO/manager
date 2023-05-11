import ribonConfigApi from "services/api/ribonConfigApi";
import { RibonConfig } from "@ribon.io/shared/types";

function useRibonConfig() {
  async function getConfig() {
    const { data: config } = await ribonConfigApi.getConfig();

    return config;
  }

  async function updateConfig(data: RibonConfig) {
    const { data: offer } = await ribonConfigApi.updateConfig(data.id, data);

    return offer;
  }

  return {
    getConfig,
    updateConfig,
  };
}

export default useRibonConfig;
