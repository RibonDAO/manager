import { AxiosResponse } from "axios";
import { apiPost } from "..";

const subscriptionsApi = {
  uploadDirectTransferSubscriptions: (
    csvContent: string,
    offerId: number,
    integrationId: number
  ): Promise<AxiosResponse<any>> =>{
    return apiPost("subscriptions/upload_csv_and_create_subscriptions", {
      csv_content: csvContent,
      offer_id: offerId,
      integration_id: integrationId,
    })
  }
};

export default subscriptionsApi;
