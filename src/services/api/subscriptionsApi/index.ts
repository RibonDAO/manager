import { AxiosResponse } from "axios";
import { apiPost } from "..";

const subscriptionsApi = {
  uploadDirectTransferSubscriptions: (
    csvContent: string,
    offerId: number,
    integrationId: number,
  ): Promise<AxiosResponse<any>> =>
    apiPost("subscriptions/create_direct_transfer_subscriptions", {
      csv_content: csvContent,
      offer_id: offerId,
      integration_id: integrationId,
    }),
};

export default subscriptionsApi;
