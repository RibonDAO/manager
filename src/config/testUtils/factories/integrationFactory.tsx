import Integration from "types/apiResponses/integration";

function integrationFactory(params: Partial<Integration> = {}): Integration {
  const defaultValues: Integration = {
    id: "0x785e734ab932c0a296598ef6e309e7ec19ef09a2ddb458b6b11c9ba7a7249f9a",
    balance: "500000000000000000",
  };
  return Object.assign(defaultValues, params) as Integration;
}

export default integrationFactory;
