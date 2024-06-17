import subscriptionsApi from "services/api/subscriptionsApi";

function useSubscriptions() {
  async function uploadDirectTransferSubscriptions(
    csvContent: string,
    offerId: number,
    integrationId: number,
  ) {
    await subscriptionsApi.uploadDirectTransferSubscriptions(
      csvContent,
      offerId,
      integrationId,
    );
  }

  return {
    uploadDirectTransferSubscriptions,
  };
}

export default useSubscriptions;
