import { AxiosResponse } from "axios";
import { apiFormDataPost } from "services/apiFormData";

const subscriptionsApi = {
  uploadDirectTransferSubscriptions: (
    file: any,
  ): Promise<AxiosResponse<any>> =>{
    console.log("file-subscriptionsApi", file)
    return apiFormDataPost("subscriptions/upload_csv_and_create_subscriptions", file)
  }
};

export default subscriptionsApi;
