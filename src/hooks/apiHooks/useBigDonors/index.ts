import bigDonorsApi from "services/api/bigDonorsApi";
import { BigDonor } from "@ribon.io/shared/types";

function useBigDonors() {
  async function getBigDonors() {
    const { data: bigDonors } = await bigDonorsApi.getBigDonorsList();

    return bigDonors;
  }

  async function getBigDonor(id: string | undefined) {
    const { data: bigDonor } = await bigDonorsApi.getBigDonor(id);

    return bigDonor;
  }

  async function createBigDonor(data: BigDonor) {
    const bigDonor = bigDonorsApi.createBigDonor(data);

    return bigDonor;
  }

  async function updateBigDonor(data: BigDonor) {
    const bigDonor = bigDonorsApi.updateBigDonor(data);

    return bigDonor;
  }

  return {
    getBigDonors,
    getBigDonor,
    createBigDonor,
    updateBigDonor,
  };
}

export default useBigDonors;
