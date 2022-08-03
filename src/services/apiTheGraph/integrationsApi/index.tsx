import { ApolloQueryResult } from "@apollo/client";
import { client } from "..";
import { QUERY_ALL_INTEGRATIONS } from "../querys/integration";

export const integrationsApi = {
  fetchAllIntegrations: (): Promise<ApolloQueryResult<any>> =>
    client.query({
      query: QUERY_ALL_INTEGRATIONS,
      fetchPolicy: "no-cache",
    }),
};

export default integrationsApi;
