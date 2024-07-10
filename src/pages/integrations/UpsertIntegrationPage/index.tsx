import { Button } from "@chakra-ui/react";
import useApiIntegrations from "hooks/apiHooks/useApiIntegrations";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import Integration from "types/entities/Integration";
import IntegrationTask from "types/entities/IntegrationTask";
import theme from "styles/theme";
import FileUpload from "components/moleculars/FileUpload";
import InfoName from "components/moleculars/infoName";
import { useUploadFile } from "hooks/apiHooks/useUploadFile";
import * as S from "./styles";
import IntegrationTaskForm from "./IntegrationTaskForm";

export type Props = {
  isEdit?: boolean;
};

function UpsertIntegrationPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "integrations",
  });

  const mode = isEdit ? "edit" : "create";

  const { neutral } = theme.colors;
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    createApiIntegration,
    getApiIntegration,
    updateApiIntegration,
    getMobilityAttributes,
  } = useApiIntegrations();
  const {
    register,
    setValue,
    getValues: integration,
    reset,
    handleSubmit,
    formState,
  } = useForm<Integration>({ mode: "onChange", reValidateMode: "onChange" });
  const {
    register: registerTask,
    getValues: getValuesTask,
    formState: formStateTask,
    reset: resetTask,
    setError: setErrorTask,
    clearErrors: clearErrorsTask,
  } = useForm<IntegrationTask>({ criteriaMode: "all" });
  const [statusCheckbox, setStatusCheckbox] = useState(true);
  const [ticketAvailabilityCheckbox, setTicketAvailabilityCheckbox] =
    useState(true);
  const [logoFile, setLogoFile] = useState<string>("");
  const [onboardingImageFile, setOnboardingImageFile] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mobilityAttributes, setMobilityAttributes] = useState<string[]>([]);

  const handleUploadImage = (
    image: File,
    attribute: "logo" | "onboardingImage",
  ) => {
    try {
      setLoading(true);
      const upload = useUploadFile(image);
      upload.create((error: Error, blob: any) => {
        if (error) {
          logError(error);
          setLoading(false);
        } else {
          setValue(attribute, blob.signed_id);
          setLoading(false);
        }
      });
    } catch (e) {
      logError(e);
      setLoading(false);
    }
  };

  const fetchIntegration = useCallback(async () => {
    try {
      const apiIntegration = await getApiIntegration(id);
      const mobilityAttributesData = await getMobilityAttributes();
      setMobilityAttributes(mobilityAttributesData);
      setStatusCheckbox(apiIntegration.status === "active");
      setTicketAvailabilityCheckbox(
        apiIntegration.ticketAvailabilityInMinutes === null,
      );
      reset(apiIntegration);
      if (apiIntegration && apiIntegration.integrationTask) {
        resetTask(apiIntegration.integrationTask);
      }
    } catch (e) {
      logError(e);
    }
  }, []);

  const fetchMobilityAttributes = useCallback(async () => {
    try {
      const mobilityAttributesData = await getMobilityAttributes();
      setMobilityAttributes(mobilityAttributesData);
    } catch (e) {
      logError(e);
    }
  }, []);

  const handleActivityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    setValue("status", checked ? "active" : "inactive");
    setStatusCheckbox(!statusCheckbox);
  };

  const handleTicketAvailabilityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    setValue("ticketAvailabilityInMinutes", checked ? null : 0);
    setTicketAvailabilityCheckbox(!ticketAvailabilityCheckbox);
  };

  const handleSave = async () => {
    if (integration()) {
      const integrationObject = {
        ...integration(),
        integrationTaskAttributes: getValuesTask().description
          ? getValuesTask()
          : null,
      };

      try {
        if (isEdit) {
          await updateApiIntegration(integrationObject);
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
    if (integration()) {
      return integration().ticketAvailabilityInMinutes === null
        ? neutral[500]
        : neutral[800];
    }
    return neutral[800];
  };

  const handleCancel = () => {
    navigate("/integrations");
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const logo = e.target.files![0];

    setLogoFile(URL.createObjectURL(logo));
    handleUploadImage(logo, "logo");
  };

  const handleOnboardingImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const onboardingImage = e.target.files![0];

    setOnboardingImageFile(URL.createObjectURL(onboardingImage));
    handleUploadImage(onboardingImage, "onboardingImage");
  };

  useEffect(() => {
    fetchMobilityAttributes();
    if (isEdit) {
      fetchIntegration();
    } else {
      const newIntegration: Integration = {
        name: "New Integration",
        status: "active",
        webhookUrl: "",
        ticketAvailabilityInMinutes: null,
        integrationTask: null,
      };
      reset(newIntegration);
    }
  }, []);

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.ContentSection>
          <S.LeftSection>
            <S.Subtitle>{t("attributes.activityStatus")}</S.Subtitle>
            <S.CheckboxContainer>
              <S.Checkbox
                name="status"
                type="checkbox"
                onChange={handleActivityCheckboxChange}
                checked={statusCheckbox}
              />
              <S.Span>{t(`attributes.${integration().status}`)}</S.Span>{" "}
            </S.CheckboxContainer>
            <br />
            <S.Subtitle>{t("attributes.upsert.details")}</S.Subtitle>
            <S.SubtitleDescription>
              {t("attributes.name")}
            </S.SubtitleDescription>
            <S.TextInput
              {...register("name", { required: t("upsert.required") })}
            />
            {formState?.errors.name && formState?.errors.name.type && (
              <S.Error>{formState?.errors.name.message}</S.Error>
            )}

            <S.Subtitle>{t("attributes.upsert.onboarding")}</S.Subtitle>
            <InfoName hasTranslation>
              {t("attributes.onboardingTitle")}
            </InfoName>
            <S.TextInput {...register("onboardingTitle")} />
            <InfoName hasTranslation>
              {t("attributes.onboardingDescription")}
            </InfoName>
            <S.TextInput {...register("onboardingDescription")} />

            <S.Subtitle>{t("attributes.upsert.banner")}</S.Subtitle>
            <InfoName hasTranslation>{t("attributes.bannerTitle")}</InfoName>
            <S.TextInput {...register("bannerTitle")} />
            <InfoName hasTranslation>
              {t("attributes.bannerDescription")}
            </InfoName>
            <S.TextInput {...register("bannerDescription")} />

            <S.Subtitle>{t("attributes.logo")}</S.Subtitle>
            <FileUpload
              onChange={handleLogoChange}
              logo={integration().logo}
              value={logoFile}
            />

            <S.Subtitle>{t("attributes.onboardingImage")}</S.Subtitle>
            <FileUpload
              onChange={handleOnboardingImageChange}
              logo={integration().onboardingImage}
              value={onboardingImageFile}
            />

            <S.Subtitle>{t("attributes.webhookUrl")}</S.Subtitle>
            <S.TextInput
              placeholder="https://webhook.com"
              {...register("webhookUrl")}
            />
            <S.Subtitle>{t("attributes.ticketAvailability")}</S.Subtitle>
            <S.TicketAvailabilityContainer color={getColorByCheckboxStatus()}>
              {t("attributes.every")}
              <S.NumberInput
                placeholder="000"
                type="number"
                disabled={ticketAvailabilityCheckbox}
                {...register("ticketAvailabilityInMinutes")}
              />
              {t("attributes.minutesAfterReceived")}
            </S.TicketAvailabilityContainer>
            <br />
            <S.CheckboxContainer>
              <S.Checkbox
                type="checkbox"
                onChange={handleTicketAvailabilityCheckboxChange}
                checked={ticketAvailabilityCheckbox}
              />
              <S.Span>{t("attributes.everydayAtMidnight")}</S.Span> <br />
            </S.CheckboxContainer>
          </S.LeftSection>
          <S.RightSection>
            <IntegrationTaskForm
              register={registerTask}
              getValues={getValuesTask}
              formState={formStateTask}
              setError={setErrorTask}
              clearErrors={clearErrorsTask}
              mobilityAttributes={mobilityAttributes}
            />
          </S.RightSection>
        </S.ContentSection>
        <S.ContentSection>
          <S.ButtonContainer>
            <Button
              type="submit"
              color={neutral[50]}
              backgroundColor={neutral[800]}
              _hover={{ bg: neutral[500] }}
              disabled={
                !formState?.isValid ||
                !!formStateTask?.errors?.description ||
                loading
              }
            >
              {t(`upsert.${mode}.save`)}
            </Button>

            <Button
              color={neutral[800]}
              backgroundColor={neutral[50]}
              outlineColor={neutral[800]}
              marginLeft="8px"
              onClick={handleCancel}
            >
              {t(`upsert.${mode}.cancel`)}
            </Button>
          </S.ButtonContainer>
        </S.ContentSection>
      </form>
    </>
  );
}

UpsertIntegrationPage.defaultProps = {
  isEdit: false,
};

export default UpsertIntegrationPage;
