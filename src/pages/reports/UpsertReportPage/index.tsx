import { Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import theme from "styles/theme";
import useReports from "hooks/apiHooks/useReports";
import Report from "types/entities/Report";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertReportPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "reports",
  });

  const mode = isEdit ? "edit" : "create";

  const { neutral } = theme.colors;
  const navigate = useNavigate();
  const { id } = useParams();
  const { getReport, createReport, updateReport } = useReports();
  const {
    register,
    setValue,
    getValues: report,
    reset,
    handleSubmit,
    formState,
  } = useForm<Report>({ mode: "onChange", reValidateMode: "onChange" });

  const [statusCheckbox, setStatusCheckbox] = useState(true);

  const fetchReport = useCallback(async () => {
    try {
      const apiReport = await getReport(id);
      setStatusCheckbox(apiReport.active === true);
      reset(apiReport);
    } catch (e) {
      logError(e);
    }
  }, []);

  const handleActivityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    setValue("active", !!checked);
    setStatusCheckbox(!statusCheckbox);
  };

  const handleSave = async () => {
    if (report()) {
      const reportObject: any = {
        id: report().id,
        name: report().name,
        link: report().link,
        active: report().active,
      };

      try {
        if (isEdit) {
          await updateReport(reportObject);
        } else {
          await createReport(reportObject);
        }

        navigate("/reports");
      } catch (e) {
        logError(e);
      }
    }
  };

  const handleCancel = () => {
    navigate("/reports");
  };

  useEffect(() => {
    if (isEdit) {
      fetchReport();
    } else {
      const newReport: Report = {
        name: "",
        link: "",
        active: true,
      };
      reset(newReport);
    }
  }, []);

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.Container>
          <S.SubtitleDescription>
            {t("attributes.activityStatus")}
          </S.SubtitleDescription>
          <S.CheckboxContainer>
            <S.Checkbox
              name="status"
              type="checkbox"
              onChange={handleActivityCheckboxChange}
              checked={statusCheckbox}
            />
            <S.Span>
              {report().active ? t("upsert.active") : t("upsert.inactive")}
            </S.Span>
          </S.CheckboxContainer>
          <S.ContentSection>
            <S.LeftSection>
              <S.SubtitleDescription>
                {t("attributes.name")}
              </S.SubtitleDescription>
              <S.TextInput
                type="text"
                {...register("name", { required: t("upsert.required") })}
              />
              {formState?.errors.name && formState?.errors.name.type && (
                <S.Error>{formState?.errors.name.message}</S.Error>
              )}
              <S.SubtitleDescription>
                {t("attributes.link")}
              </S.SubtitleDescription>
              <S.TextInput
                type="text"
                {...register("link", { required: t("upsert.required") })}
              />
              {formState?.errors.link && formState?.errors.link.type && (
                <S.Error>{formState?.errors.link.message}</S.Error>
              )}
            </S.LeftSection>
          </S.ContentSection>
        </S.Container>
        <S.ContentSection>
          <S.ButtonContainer>
            <Button
              type="submit"
              color={neutral[50]}
              backgroundColor={neutral[800]}
              _hover={{ bg: neutral[500] }}
              disabled={!formState?.isValid}
            >
              {t(`upsert.${mode}.save`)}
            </Button>

            <Button
              color={neutral[800]}
              backgroundColor={neutral[50]}
              borderColor={neutral[800]}
              border="2px"
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

UpsertReportPage.defaultProps = {
  isEdit: false,
};

export default UpsertReportPage;
