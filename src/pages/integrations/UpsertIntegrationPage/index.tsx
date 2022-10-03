import { Button } from "@chakra-ui/react";
import useApiIntegrations from "hooks/apiHooks/useApiIntegrations";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import Integration from "types/entities/Integration";
import ChangeLanguageItem from "components/moleculars/ChangeLanguageItem";
import theme from "styles/theme";
import IntegrationTaskForm from "./IntegrationTaskForm";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

type FormData = {
  description: string;
  link?: string;
  linkAddress?: string;
};

function UpsertIntegrationPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "integrations.upsertIntegrationPage",
  });

  const mode = isEdit ? "edit" : "create";

  const { lightGray, darkGray, gray } = theme.colors;
  const navigate = useNavigate();
  const { id } = useParams();
  const { createApiIntegration, getApiIntegration, updateApiIntegration } =
    useApiIntegrations();
  const [integration, setIntegration] = useState<Integration>();
  const { register, setValue, getValues } = useForm<FormData>();

  const fetchIntegration = useCallback(async () => {
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

  const handleActivityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    if (integration) {
      setIntegration({
        ...integration,
        status: checked ? "active" : "inactive",
      });
    }
  };

  const handleTicketAvailabilityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;

    if (integration) {
      setIntegration({
        ...integration,
        ticketAvailabilityInMinutes: checked ? null : 0,
      });
    }
  };

  const handleSave = async () => {
    if (integration) {
      const integrationObject = {
        ...integration,
        integrationTasksAttributes: [getValues()],
      };

      await setIntegration(integrationObject);

      try {
        if (isEdit) {
          await updateApiIntegration(integration.id, integrationObject);
        } else {
          await createApiIntegration(integrationObject);
        }
        navigate("/integrations");
      } catch (e) {
        logError(e);
      }
    }
  };

  const getColorByCheckboxStatus = () => {
    if (integration) {
      return integration?.ticketAvailabilityInMinutes === null
        ? gray
        : darkGray;
    }
    return darkGray;
  };

  const handleCancel = () => {
    navigate("/integrations");
  };

  useEffect(() => {
    if (isEdit) {
      fetchIntegration();
    } else {
      const newIntegration: Integration = {
        name: "New Integration",
        status: "active",
        ticketAvailabilityInMinutes: null,
        integrationTasksAttributes: [
          {
            description: "Description",
            link: "link name",
            linkAddress: "link address",
          },
        ],
        integrationTasks: [
          {
            description: "Description",
            link: "link name",
            linkAddress: "link address",
          },
        ],
      };

      setIntegration(newIntegration);
    }
  }, []);

  useEffect(() => {
    if (integration) {
      const tasksLength = Number(integration?.integrationTasks?.length) - 1;

      setValue(
        "description",
        integration?.integrationTasks[tasksLength]?.description,
      );
      setValue("link", integration?.integrationTasks[tasksLength]?.link);
      setValue(
        "linkAddress",
        integration?.integrationTasks[tasksLength]?.linkAddress,
      );
    }
  }, [integration]);

  return (
    <>
      <S.Title>{t(`${mode}.title`)}</S.Title>
      <ChangeLanguageItem />
      <S.ContentSection>
        <S.LeftSection>
          <S.Subtitle>{t("activityStatus")}</S.Subtitle>
          <S.CheckboxContainer>
            <S.Checkbox
              type="checkbox"
              checked={integration?.status === "active"}
              value={integration?.status}
              name="status"
              onChange={handleActivityCheckboxChange}
            />
            <S.Span>
              {integration?.status} {t("integration")}
            </S.Span>{" "}
          </S.CheckboxContainer>
          <br />
          <S.Subtitle>{t("details")}</S.Subtitle>
          <S.SubtitleDescription>{t("integrationName")}</S.SubtitleDescription>
          <S.TextInput
            name="name"
            value={integration?.name}
            onChange={handleChange}
          />
          <S.Subtitle>{t("ticketAvailability")}</S.Subtitle>
          <S.TicketAvailabilityContainer color={getColorByCheckboxStatus()}>
            {t("every")}
            <S.NumberInput
              value={integration?.ticketAvailabilityInMinutes || ""}
              placeholder="000"
              type="number"
              name="ticketAvailabilityInMinutes"
              onChange={handleChange}
              disabled={integration?.ticketAvailabilityInMinutes === null}
            />
            {t("minutesAfterReceived")}
          </S.TicketAvailabilityContainer>
          <br />
          <S.CheckboxContainer>
            <S.Checkbox
              type="checkbox"
              checked={integration?.ticketAvailabilityInMinutes === null}
              name="ticketAvailability"
              onChange={handleTicketAvailabilityCheckboxChange}
            />
            <S.Span>{t("everydayAtMidnight")}</S.Span> <br />
          </S.CheckboxContainer>
          <S.ButtonContainer>
            <Button
              color={lightGray}
              backgroundColor={darkGray}
              onClick={handleSave}
            >
              {t(`${mode}.save`)}
            </Button>

            <Button
              color={darkGray}
              backgroundColor={lightGray}
              outlineColor={darkGray}
              marginLeft="8px"
              onClick={handleCancel}
            >
              {t(`${mode}.cancel`)}
            </Button>
          </S.ButtonContainer>
        </S.LeftSection>
        <S.RightSection>
          <IntegrationTaskForm register={register} />
        </S.RightSection>
      </S.ContentSection>
    </>
  );
}

UpsertIntegrationPage.defaultProps = {
  isEdit: false,
};

export default UpsertIntegrationPage;
