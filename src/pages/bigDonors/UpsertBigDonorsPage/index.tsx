import { Button, useToast } from "@chakra-ui/react";
import useBigDonors from "hooks/apiHooks/useBigDonors";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import { BigDonor } from "@ribon.io/shared/types";
import theme from "styles/theme";
import Loading from "components/moleculars/Loading";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertBigDonorPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "bigDonors",
  });

  const mode = isEdit ? "edit" : "create";
  const [loading, setLoading] = useState(false);
  const { neutral } = theme.colors;
  const navigate = useNavigate();
  const { id } = useParams();
  const { createBigDonor, getBigDonor, updateBigDonor } = useBigDonors();
  const {
    register,
    getValues: BigDonorObject,
    reset,
    handleSubmit,
    formState,
  } = useForm<BigDonor>({ mode: "onChange", reValidateMode: "onChange" });

  const toast = useToast();

  const fetchBigDonor = useCallback(async () => {
    try {
      const bigDonor = await getBigDonor(id);
      reset(bigDonor);
    } catch (e) {
      logError(e);
    }
  }, []);

  function bigDonorUpdate() {
    const bigDonor = BigDonorObject();

    return bigDonor;
  }

  const handleSave = async () => {
    try {
      if (isEdit) {
        await updateBigDonor(bigDonorUpdate());
      } else {
        setLoading(true);
        await createBigDonor(BigDonorObject())
          .then((response) => {
            reset(response?.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            toast({
              description: error?.response?.data?.message,
              status: "error",
            });
            throw Error(error.response.data.formatted_message);
          });
      }

      navigate("/big-donors/index");
    } catch (e) {
      logError(e);
    }
  };

  const handleCancel = () => {
    navigate("/big-donors/index");
  };

  useEffect(() => {
    if (isEdit) {
      fetchBigDonor();
    } else {
      const newBigDonor: BigDonor = {
        name: "New Big Donor",
        email: "bigdonor@email.com",
      };
      reset(newBigDonor);
    }
  }, []);

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.ContentSection>
          <S.LeftSection>
            <S.Subtitle>{t("attributes.details")}</S.Subtitle>
            <S.SubtitleDescription>
              {t("attributes.name")}
            </S.SubtitleDescription>
            <S.TextInput
              {...register("name", { required: t("upsert.required") })}
            />
            {formState?.errors.name && formState?.errors.name.type && (
              <S.Error>{formState?.errors.name.message}</S.Error>
            )}
            <S.SubtitleDescription>
              {t("attributes.email")}
            </S.SubtitleDescription>
            <S.TextInput
              placeholder="doador@gmail.com"
              {...register("email", { required: t("upsert.required") })}
            />
          </S.LeftSection>
        </S.ContentSection>
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
      {loading && <Loading />}
    </>
  );
}

UpsertBigDonorPage.defaultProps = {
  isEdit: false,
};

export default UpsertBigDonorPage;
