import { Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import theme from "styles/theme";
import WarmglowMessage from "types/entities/WarmglowMessage";
import useWarmglowMessages from "hooks/apiHooks/useWarmglowMessages";
import Dropdown from "components/atomics/Dropdown";

import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertWarmglowMessagePage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "warmglowMessages",
  });

  const mode = isEdit ? "edit" : "create";

  const { neutral } = theme.colors;
  const navigate = useNavigate();
  const { id } = useParams();
  const { getWarmglowMessage, createWarmglowMessage, updateWarmglowMessage } =
    useWarmglowMessages();

  const {
    register,
    setValue,
    getValues: warmglowMessage,
    reset,
    handleSubmit,
    formState,
  } = useForm<WarmglowMessage>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [statusWarmglowMessage, setStatusWarmglowMessage] = useState("active");

  const fetchWarmglowMessage = useCallback(async () => {
    try {
      const apiWarmglowMessage = await getWarmglowMessage(id);

      setStatusWarmglowMessage(apiWarmglowMessage.status);

      reset(apiWarmglowMessage);
    } catch (e) {
      logError(e);
    }
  }, []);

  const onStatusChanged = (status: string) => {
    setValue("status", status);
    setStatusWarmglowMessage(status);
  };

  const handleSave = async () => {
    if (warmglowMessage()) {
      const warmglowMessageObject: any = {
        id: warmglowMessage().id,
        message: warmglowMessage().message,
        status: statusWarmglowMessage,
      };

      try {
        if (isEdit) {
          await updateWarmglowMessage(warmglowMessageObject);
        } else {
          await createWarmglowMessage(warmglowMessageObject);
        }
        navigate("/warmglow_messages");
      } catch (e) {
        logError(e);
      }
    }
  };

  const handleCancel = () => {
    navigate("/warmglow_messages");
  };

  useEffect(() => {
    if (isEdit) {
      fetchWarmglowMessage();
    } else {
      const newWarmglowMessage: any = {
        name: "name",
        status: "active",
      };
      reset(newWarmglowMessage);
    }
  }, []);

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.Container>
          <S.Subtitle>{t("attributes.status")}</S.Subtitle>
          <S.StatusContainer>
            <Dropdown
              values={["active", "inactive"]}
              onOptionChanged={onStatusChanged}
              defaultValue={statusWarmglowMessage}
              containerId="status-dropdown"
              name="status"
            />
          </S.StatusContainer>
          <br />
          <S.Subtitle>{t("attributes.details")}</S.Subtitle>
          <S.ContentSection>
            <S.LeftSection>
              <S.SubtitleDescription>
                {t("attributes.message")}
              </S.SubtitleDescription>
              <S.TextInput
                type="text"
                {...register("message", { required: t("upsert.required") })}
              />
              {formState?.errors.message && formState?.errors.message.type && (
                <S.Error>{formState?.errors.message.message}</S.Error>
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

UpsertWarmglowMessagePage.defaultProps = {
  isEdit: false,
};

export default UpsertWarmglowMessagePage;
