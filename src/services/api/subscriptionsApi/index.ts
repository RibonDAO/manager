import { AxiosResponse } from "axios";
import { apiPost } from "..";

const subscriptionsApi = {
  uploadDirectTransferSubscriptions: (
    csvContent: string,
    offerId: number,
    integrationId: number,
  ): Promise<AxiosResponse<any>> =>
    apiPost("subscriptions/upload_csv", {
      csv_content: csvContent,
      offer_id: offerId,
      integration_id: integrationId,
    }),
};

export default subscriptionsApi;
