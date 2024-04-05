import { Link } from "react-router-dom";
import infoIcon from "assets/icons/info-icon.svg";
import editIcon from "assets/icons/edit-icon.svg";
import CopyableAddress from "components/atomics/CopyableAddress";
import theme from "styles/theme";
import { useTranslation } from "react-i18next";
import Report from "types/entities/Report";
import * as S from "./styles";

type Props = {
  reports: Report[];
};

function ReportsItems({ reports }: Props) {
  const { primary, tertiary } = theme.colors.brand;

  const { t } = useTranslation("translation", {
    keyPrefix: "reports",
  });

  function renderReports() {
    return reports?.map((report: Report) => (
      <tr key={report.id}>
        <th>{report.name}</th>
        <th>
          <CopyableAddress text={report.link} />
        </th>
        <th>
          {" "}
          <S.StatusTableCell
            style={{ color: report?.active ? primary[300] : tertiary[400] }}
          >
            {report?.active ? t("attributes.active") : t("attributes.inactive")}
          </S.StatusTableCell>
        </th>
        <th>
          <S.ActionsTableCell>
            <Link to={`/reports/${report.id}`}>
              <img src={infoIcon} alt="view report info" />
            </Link>

            <Link to={`/reports/${report.id}/edit`}>
              <img src={editIcon} alt="edit report info" />
            </Link>
          </S.ActionsTableCell>
        </th>
      </tr>
    ));
  }

  return <tbody>{renderReports()}</tbody>;
}

export default ReportsItems;
