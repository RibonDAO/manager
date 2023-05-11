import { Link } from "react-router-dom";
import editIcon from "assets/icons/edit-icon.svg";

import { BigDonor } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";

type Props = {
  bigDonors: BigDonor[];
  searchTerm: string;
};

function BigDonorsItems({ bigDonors, searchTerm }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "bigDonors",
  });

  function filterBigDonors(nonFilteredBigDonors: BigDonor[]) {
    return nonFilteredBigDonors.filter((bigDonorData: BigDonor) => {
      if (searchTerm === "") {
        return bigDonorData;
      } else if (
        bigDonorData?.name
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return bigDonorData;
      } else {
        return null;
      }
    });
  }

  function renderBigDonors() {
    if (filterBigDonors(bigDonors).length === 0)
      return (
        <tr key="noDonor">
          <th>{t("noBigDonors")}</th>
        </tr>
      );

    return (
      bigDonors &&
      filterBigDonors(bigDonors).map((donor: any) => (
        <tr key={donor.id}>
          <th>{donor.name}</th>
          <th>{donor.email}</th>

          <th>
            <Link to={`/big-donors/${donor.id}/edit`}>
              <img src={editIcon} alt="edit big donor info" />
            </Link>
          </th>
        </tr>
      ))
    );
  }

  return <tbody>{renderBigDonors()}</tbody>;
}

export default BigDonorsItems;
