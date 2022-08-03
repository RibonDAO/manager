import Integration from "types/entities/Integration";

function integrationApiFactory(params: Partial<Integration> = {}): Integration {
  const defaultValues: Integration = {
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
  return Object.assign(defaultValues, params) as Integration;
}

export default integrationApiFactory;
