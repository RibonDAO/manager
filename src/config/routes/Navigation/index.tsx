import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardIconOn from "./assets/dashboardIconOn.svg";
import DashboardIconOff from "./assets/dashboardIconOff.svg";
import IntegrationsIconOff from "./assets/integrationsIconOff.svg";
import IntegrationsIconOn from "./assets/integrationsIconOn.svg";
import PurchasesIconOff from "./assets/purchasesIconOff.svg";
import PurchasesIconOn from "./assets/purchasesIconOn.svg";
import CausesIconOff from "./assets/causesIconOff.svg";
import CausesIconOn from "./assets/causesIconOn.svg";
import NgosIconOn from "./assets/ngosIconOn.svg";
import NgosIconOff from "./assets/ngosIconOff.svg";
import OffersIconOn from "./assets/offersIconOn.svg";
import OffersIconOff from "./assets/offersIconOff.svg";
import NewsIconOn from "./assets/newsIconOn.svg";
import NewsIconOff from "./assets/newsIconOff.svg";
import LabelIconOn from "./assets/labelIconOn.svg";
import LabelIconOff from "./assets/labelIconOff.svg";
import SettingsIconOff from "./assets/settingsIconOff.svg";
import SettingsIconOn from "./assets/settingsIconOn.svg";
import ReportIconOff from "./assets/reportsIconOff.svg";
import ReportsIconOn from "./assets/reportsIconOn.svg";

import * as S from "./styles";
import NavigationLink from "./NavigationLink";

function Navigation(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "menu",
  });

  const location = useLocation();
  const { search } = location;

  function isInPath(route: any): boolean {
    const { menuOptions, path } = route;

    if (menuOptions) {
      return menuOptions.some((menuOption: any) =>
        [menuOption.path].includes(location.pathname),
      );
    }

    return [path].includes(location.pathname);
  }

  const routes = [
    {
      path: "/dashboard",
      iconOn: DashboardIconOn,
      iconOff: DashboardIconOff,
      title: t("dashboardLabel"),
    },
    {
      path: "/integrations",
      iconOn: IntegrationsIconOn,
      iconOff: IntegrationsIconOff,
      title: t("integrationsLabel"),
    },
    {
      path: "/purchases",
      iconOn: PurchasesIconOn,
      iconOff: PurchasesIconOff,
      title: t("purchasesLabel"),
    },
    {
      path: "/causes",
      iconOn: CausesIconOn,
      iconOff: CausesIconOff,
      title: t("causesLabel"),
    },
    {
      path: "/ngos",
      iconOn: NgosIconOn,
      iconOff: NgosIconOff,
      title: t("ngosLabel"),
    },
    {
      path: "/offers",
      iconOn: OffersIconOn,
      iconOff: OffersIconOff,
      title: t("offersLabel"),
    },
    {
      path: "/news/articles",
      iconOn: NewsIconOn,
      iconOff: NewsIconOff,
      title: t("newsLabel"),
    },
    {
      path: "/impression-cards",
      iconOn: IntegrationsIconOn,
      iconOff: IntegrationsIconOff,
      title: t("impressionCardsLabel"),
    },
    {
      path: "/reports",
      iconOn: ReportsIconOn,
      iconOff: ReportIconOff,
      title: t("reportsLabel"),
    },
    {
      path: "/big-donors/index",
      iconOn: LabelIconOn,
      iconOff: LabelIconOff,
      title: t("bigDonationsLabel"),
      menuOptions: [
        {
          path: "/big-donors/index",
          title: t("donorsLabel"),
        },
        {
          path: "/big-donors/donations",
          title: t("donationsLabel"),
        },
      ],
    },
    {
      path: "/url-builder",
      iconOn: LabelIconOn,
      iconOff: LabelIconOff,
      title: t("urlBuilderLabel"),
    },
    {
      path: "/settings",
      iconOn: SettingsIconOn,
      iconOff: SettingsIconOff,
      title: t("settingsLabel"),
    },
  ];

  return (
    <S.Container>
      {routes.map((route) => (
        <NavigationLink
          key={route.path}
          to={{ pathname: route.path } as any}
          icon={isInPath(route) ? route.iconOn : route.iconOff}
          title={route.title}
          enabled={isInPath(route.path)}
          onClick={() => {}}
          menuOptions={
            route?.menuOptions?.map((option) => ({
              ...option,
              search,
            })) as any
          }
        />
      ))}
    </S.Container>
  );
}

export default Navigation;
