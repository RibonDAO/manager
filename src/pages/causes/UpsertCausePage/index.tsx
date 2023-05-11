import { Button, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import theme from "styles/theme";
import InfoName from "components/moleculars/infoName";
import ModalImage from "components/moleculars/modals/ModalImage";
import WarningRedIcon from "assets/icons/warning-red-icon.svg";
import Loading from "components/moleculars/Loading";
import useCauses from "hooks/apiHooks/useCauses";
import { CreateCause } from "@ribon.io/shared/types";
import FileUpload from "components/moleculars/FileUpload";
import { useUploadFile } from "hooks/apiHooks/useUploadFile";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertCausePage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "causes",
  });

  const [coverImageFile, setCoverImageFile] = useState<string>("");
  const [mainImageFile, setMainImageFile] = useState<string>("");
  const mode = isEdit ? "edit" : "create";
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { neutral } = theme.colors;
  const { tertiary } = theme.colors.brand;
  const navigate = useNavigate();
  const { id } = useParams();
  const { createCause, getCause, updateCause } = useCauses();
  const {
    register,
    getValues: CauseObject,
    setValue,
    reset,
    handleSubmit,
    formState,
  } = useForm<CreateCause>({ mode: "onChange", reValidateMode: "onChange" });

  const toast = useToast();

  const fetchCause = useCallback(async () => {
    try {
      const cause = await getCause(id);
      reset(cause);
    } catch (e) {
      logError(e);
    }
  }, []);

  function causeUpdate() {
    const cause = CauseObject();
    if (CauseObject().mainImage?.includes("http")) {
      delete cause.mainImage;
    }

    if (CauseObject().coverImage?.includes("http")) {
      delete cause.coverImage;
    }
    return cause;
  }

  const handleSave = async () => {
    try {
      if (isEdit) {
        await updateCause(causeUpdate());
      } else {
        setModalOpen(false);
        setLoading(true);
        await createCause(CauseObject())
          .then((response) => {
            reset(response?.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            toast({
              description: error.response.data.formatted_message,
              status: "error",
            });
            throw Error(error.response.data.formatted_message);
          });
      }

      navigate("/causes");
    } catch (e) {
      logError(e);
    }
  };

  const handleCancel = () => {
    navigate("/Causes");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isEdit) {
      fetchCause();
    } else {
      const newCause: CreateCause = {
        name: "New Cause",
      };
      reset(newCause);
    }
  }, []);

  const handleUploadImage = (
    image: File,
    attribute: "mainImage" | "coverImage",
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

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mainImage = e.target.files![0];

    setMainImageFile(URL.createObjectURL(mainImage));
    handleUploadImage(mainImage, "mainImage");
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const coverImage = e.target.files![0];

    setCoverImageFile(URL.createObjectURL(coverImage));
    handleUploadImage(coverImage, "coverImage");
  };

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(isEdit ? handleSave : handleOpenModal)}>
        <S.ContentSection>
          <S.LeftSection>
            <S.Subtitle>{t("upsert.details")}</S.Subtitle>
            <InfoName hasTranslation>{t("attributes.name")}</InfoName>
            <S.TextInput
              {...register("name", { required: t("upsert.required") })}
            />
            {formState?.errors.name && formState?.errors.name.type && (
              <S.Error>{formState?.errors.name.message}</S.Error>
            )}
          </S.LeftSection>

          <S.RightSection>
            <S.ItemBox>
              <InfoName>{t("attributes.mainImage")}</InfoName>
              <FileUpload
                onChange={handleMainImageChange}
                logo={CauseObject().mainImage}
                value={mainImageFile}
              />
            </S.ItemBox>

            <S.ItemBox>
              <InfoName>{t("attributes.coverImage")}</InfoName>
              <FileUpload
                onChange={handleCoverImageChange}
                logo={CauseObject().coverImage}
                value={coverImageFile}
              />
            </S.ItemBox>
          </S.RightSection>
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
          {!isEdit && (
            <ModalImage
              title={t("upsert.create.modal.title")}
              body={t("upsert.create.modal.body")}
              visible={modalOpen}
              image={WarningRedIcon}
              primaryButtonText={t("upsert.create.modal.confirmButton")}
              primaryButtonColor={tertiary[400]}
              primaryButtonCallback={handleSave}
              secondaryButtonText={t("upsert.create.modal.cancelButton")}
              secondaryButtonBorderColor={neutral[500]}
              secondaryButtonCallback={handleCloseModal}
            />
          )}
        </S.ContentSection>
      </form>
      {loading && <Loading />}
    </>
  );
}

UpsertCausePage.defaultProps = {
  isEdit: false,
};

export default UpsertCausePage;
