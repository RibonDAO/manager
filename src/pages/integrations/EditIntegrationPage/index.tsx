import { Button } from "@chakra-ui/react";
import useApiIntegrations from "hooks/apiHooks/useApiIntegrations";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import Integration from "types/entities/Integration";
import theme from "styles/theme";
import * as S from "./styles";

function EditIntegrationPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "integrations.editIntegrationPage",
  });
  const { bgGray, ribonBlack } = theme.colors;
  const navigate = useNavigate();

  const { id } = useParams();
  const { getApiIntegration, updateApiIntegration } = useApiIntegrations();
  const [integration, setIntegration] = useState<Integration>();

  const fetchAllDonations = useCallback(async () => {
    try {
      const apiIntegration = await getApiIntegration(id);
      setIntegration(apiIntegration);
    } catch (e) {
      logError(e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (integration) {
      setIntegration({ ...integration, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (integration) {
      setIntegration({
        ...integration,
        status: checked ? "active" : "inactive",
      });
    }
  };

  const handleSave = async () => {
    if (integration) {
      try {
        await updateApiIntegration(integration.id, integration);
        navigate("/integrations");
      } catch (e) {
        logError(e);
      }
    }
  };

  const handleCancel = () => {
    navigate("/integrations");
  };

  useEffect(() => {
    fetchAllDonations();
  }, []);

  return (
    <>
      <S.Title>{t("title")}</S.Title>
      <S.TextInput
        name="name"
        value={integration?.name}
        onChange={handleChange}
      />
      <S.Checkbox
        type="checkbox"
        checked={integration?.status === "active"}
        value={integration?.status}
        name="status"
        onChange={handleCheckboxChange}
      />
      <S.Span>{integration?.status} integration</S.Span> <br />
      <S.ButtonContainer>
        <Button
          color={bgGray}
          backgroundColor={ribonBlack}
          onClick={handleSave}
        >
          {t("save")}
        </Button>

        <Button
          color={ribonBlack}
          backgroundColor={bgGray}
          outlineColor={ribonBlack}
          marginLeft="8px"
          onClick={handleCancel}
        >
          {t("cancel")}
        </Button>
      </S.ButtonContainer>
    </>
  );
}

export default EditIntegrationPage;
