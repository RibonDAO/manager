import { gql } from "@apollo/client";

export const INTEGRATION_ID_QUERY_NAME = "INTEGRATION_ID_QUERY";
export const ALL_INTEGRATIONS_QUERY_NAME = "ALL_INTEGRATIONS_QUERY";

export const QUERY_INTEGRATION_ID = gql`
  query ${INTEGRATION_ID_QUERY_NAME}($integration: Bytes!) {
    integrations(
      where: { integration: $integration }
    ) {
      id
      balance
    }
  }
`;

export const QUERY_ALL_INTEGRATIONS = gql`
  query ${ALL_INTEGRATIONS_QUERY_NAME} {
    integrations {
      id
      balance
    }
  }
`;
