import subscriptionsApi from "services/api/subscriptionsApi";

function useSubscriptions() {
  async function uploadDirectTransferSubscriptions(file: any) {
    console.log("file-usesubscriptions", file);
    await subscriptionsApi.uploadDirectTransferSubscriptions(file);
  }

  return {
    uploadDirectTransferSubscriptions,
  };
}

export default useSubscriptions;