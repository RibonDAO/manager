import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardIconOn from "./assets/dashboardIconOn.svg";
import DashboardIconOff from "./assets/dashboardIconOff.svg";
import IntegrationsIconOff from "./assets/integrationsIconOff.svg";
import IntegrationsIconOn from "./assets/integrationsIconOn.svg";
import * as S from "./styles";
import NavigationLink from "./NavigationLink";

function Navigation(): JSX.Element {
  const location = useLocation();
  const { t } = useTranslation("translation", {
    keyPrefix: "menu",
  });

  function isInPath(path: string) {
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
  ];

  return (
    <S.Container>
      {routes.map((route) => (
        <NavigationLink
          key={route.path}
          to={{ pathname: route.path }}
          icon={isInPath(route.path) ? route.iconOn : route.iconOff}
          title={route.title}
          enabled={isInPath(route.path)}
          onClick={() => {}}
        />
      ))}
    </S.Container>
  );
}

export default Navigation;
