import { Button, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import useCauses from "hooks/apiHooks/useCauses";
import { Cause , CreateNonProfit, CreateStory, NonProfitImpact, CreateNonProfitImpacts } from "@ribon.io/shared/types";
import theme from "styles/theme";
import FileUpload from "components/moleculars/FileUpload";
import InfoName from "components/moleculars/infoName";
import ModalImage from "components/moleculars/modals/ModalImage";
import WarningRedIcon from "assets/icons/warning-red-icon.svg";
import Loading from "components/moleculars/Loading";
import Dropdown from "components/atomics/Dropdown";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import { useUploadFile } from "hooks/apiHooks/useUploadFile";
import ImpactsForm from "./ImpactForm";
import ImpactPreviewer from "./ImpactPreviewer";
import StoriesForm from "./StoriesForm";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertNonProfitPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "nonProfits",
  });
  const mode = isEdit ? "edit" : "create";
  const [modalOpen, setModalOpen] = useState(false);
  const [causes, setCauses] = useState<Cause[]>([]);
  const [currentCauseId, setCurrentCauseId] = useState<number>(1);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const { getCauses } = useCauses();
  const [loading, setLoading] = useState(false);
  const { neutral } = theme.colors;
  const { tertiary } = theme.colors.brand;
  const [statusCheckbox, setStatusCheckbox] = useState(true);
  const [stories, setStories] = useState<CreateStory[]>([]);
  const [logoFile, setLogoFile] = useState<string>("");
  const [mainImageFile, setMainImageFile] = useState<string>("");
  const [backgroundImageFile, setBackgroundImageFile] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { createNonProfit, getNonProfit, updateNonProfit } = useNonProfits();
  const {
    register,
    getValues: NonProfitObject,
    setValue,
    reset,
    handleSubmit,
    formState,
  } = useForm<CreateNonProfit>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    register: registerStory,
    getValues: StoryObject,
    setValue: setValueStory,
    formState: formStateStory,
    control: controlStory,
  } = useForm<CreateStory[]>({ mode: "onChange", reValidateMode: "onChange" });

  const {
    register: registerImpact,
    reset: resetImpact,
    setValue: setValueImpact,
    formState: formStateImpact,
    getValues: ImpactObject,
    watch,
  } = useForm<NonProfitImpact>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const toast = useToast();

  const fetchNonProfit = useCallback(async () => {
    try {
      const nonProfit = await getNonProfit(id);
      reset(nonProfit);
      resetImpact(
        nonProfit.nonProfitImpacts![nonProfit.nonProfitImpacts!.length - 1],
      );

      setStories(nonProfit.stories || []);
      setCurrentCauseId(nonProfit.cause?.id);
      setCurrentUnit(
        nonProfit.nonProfitImpacts![nonProfit.nonProfitImpacts!.length - 1]
          .measurementUnit || "",
      );
    } catch (e) {
      logError(e);
    }
  }, []);

  const handleSave = async () => {
    function storyObject() {
      const allStories: any = StoryObject();

      const newStories = allStories.storiesAttributes.map((story: any) =>
        story?.image?.includes("http")
          ? {
              id: story.id,
              title: story.title,
              description: story.description,
              position: story.position,
            }
          : story,
      );

      return newStories;
    }
    function nonProfitUpdate() {
      const nonProfit = NonProfitObject();
      if (NonProfitObject().logo?.includes("http")) {
        delete nonProfit.logo;
      }
      if (NonProfitObject().backgroundImage?.includes("http")) {
        delete nonProfit.backgroundImage;
      }
      if (NonProfitObject().mainImage?.includes("http")) {
        delete nonProfit.mainImage;
      }
      return nonProfit;
    }

    if (NonProfitObject()) {
      const nonProfitObject = {
        ...nonProfitUpdate(),
        storiesAttributes: storyObject(),
        nonProfitImpactsAttributes: [ImpactObject()],
      };

      try {
        if (isEdit) {
          await updateNonProfit(nonProfitObject);
        } else {
          setModalOpen(false);
          setLoading(true);
          await createNonProfit(nonProfitObject)
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

        navigate("/ngos");
      } catch (e) {
        logError(e);
      }
    }
  };

  const handleCancel = () => {
    navigate("/ngos");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isEdit) {
      fetchNonProfit();
    } else {
      const newNonProfit: CreateNonProfit = {
        name: "New NonProfit",
        walletAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        status: "active",
        causeId: 1,
      };
      const newNonProfitImpacts: CreateNonProfitImpacts = {
        usdCentsToOneImpactUnit: "1.0",
        measurementUnit: "quantity_without_decimals",
        impactDescription: "impact,impacts",
        donorRecipient: "donor,donors",
      };
      reset(newNonProfit);
      resetImpact(newNonProfitImpacts);
    }
  }, []);

  const handleActivityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    setValue("status", checked ? "active" : "inactive");
    setStatusCheckbox(!statusCheckbox);
  };

  const handleUploadImage = (
    image: File,
    attribute: "logo" | "backgroundImage" | "mainImage",
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const logo = e.target.files![0];

    setLogoFile(URL.createObjectURL(logo));
    handleUploadImage(logo, "logo");
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mainImage = e.target.files![0];

    setMainImageFile(URL.createObjectURL(mainImage));
    handleUploadImage(mainImage, "mainImage");
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const backgroundImage = e.target.files![0];

    setBackgroundImageFile(URL.createObjectURL(backgroundImage));
    handleUploadImage(backgroundImage, "backgroundImage");
  };

  const fetchCauses = useCallback(async () => {
    try {
      const allCauses = await getCauses();
      setCauses(allCauses);
    } catch (e) {
      logError(e);
    }
  }, [setCauses]);

  useEffect(() => {
    fetchCauses();
  }, [fetchCauses]);

  const onCauseIdChanged = (causeId: number) => {
    setCurrentCauseId(causeId);
    setValue("causeId", causeId);
  };

  const causeText = (value: any) =>
    causes.find((cause) => cause.id === value)?.name ?? "";

  const watchImpactFields = watch();

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(isEdit ? handleSave : handleOpenModal)}>
        <S.ContentSection>
          <S.LeftSection>
            <S.Subtitle>{t("upsert.activityStatus")}</S.Subtitle>
            <S.CheckboxContainer>
              <S.Checkbox
                name="status"
                type="checkbox"
                onChange={handleActivityCheckboxChange}
                checked={statusCheckbox}
              />
              <S.Span>{NonProfitObject().status}</S.Span>{" "}
            </S.CheckboxContainer>

            <S.Divider />

            <S.Subtitle>{t("upsert.details")}</S.Subtitle>

            <S.DoubleItemSection>
              <S.ItemBox>
                <InfoName hasTranslation>{t("attributes.name")}</InfoName>
                <S.TextInput
                  {...register("name", {
                    required: t("upsert.required"),
                  })}
                />
                {formState?.errors.name && formState?.errors.name.type && (
                  <S.Error>{formState?.errors.name.message}</S.Error>
                )}
              </S.ItemBox>

              <S.ItemBox>
                <InfoName>{t("attributes.cause")}</InfoName>
                <Dropdown
                  values={causes.map((cause) => cause?.id)}
                  onOptionChanged={onCauseIdChanged}
                  valueText={causeText}
                  defaultValue={currentCauseId}
                  containerId="cause-dropdown"
                  name="causeId"
                />
              </S.ItemBox>
            </S.DoubleItemSection>
            <S.ItemBox>
              <InfoName>{t("attributes.address")}</InfoName>
              <S.TextInput
                {...register("walletAddress", {
                  required: t("upsert.required"),
                })}
              />
              {formState?.errors.name && formState?.errors.name.type && (
                <S.Error>{formState?.errors.name.message}</S.Error>
              )}
            </S.ItemBox>

            <S.Divider />

            <S.Subtitle>{t("upsert.impacts")}</S.Subtitle>
            <ImpactsForm
              registerImpact={registerImpact}
              setCurrentUnit={setCurrentUnit}
              currentUnit={currentUnit}
              formStateImpact={formStateImpact}
              setValueImpact={setValueImpact}
            />
            {watchImpactFields && (
              <ImpactPreviewer
                nonProfit={{
                  ...NonProfitObject(),
                  nonProfitImpacts: [watchImpactFields],
                }}
              />
            )}
            <S.Divider />

            <StoriesForm
              registerStory={registerStory}
              StoryObject={StoryObject}
              setValueStory={setValueStory}
              stories={stories}
              handleSubmitStory={handleSubmit}
              formStateStory={formStateStory}
              controlStory={controlStory}
            />
            <S.Divider />
          </S.LeftSection>

          <S.RightSection>
            <S.Subtitle>{t("attributes.imagesSection")}</S.Subtitle>

            <S.FlexRow>
              <S.ItemBox>
                <InfoName>{t("attributes.logo")}</InfoName>
                <FileUpload
                  onChange={handleLogoChange}
                  logo={NonProfitObject().logo}
                  value={logoFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "300x300" })}
                </S.ImageRecommendation>
              </S.ItemBox>

              <S.ItemBox>
                <InfoName>{t("attributes.causeCardImage")}</InfoName>
                <FileUpload
                  onChange={handleMainImageChange}
                  logo={NonProfitObject().mainImage}
                  value={mainImageFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "600x560" })}
                </S.ImageRecommendation>
              </S.ItemBox>

              <S.ItemBox>
                <InfoName>{t("attributes.backgroundImage")}</InfoName>
                <FileUpload
                  onChange={handleBackgroundImageChange}
                  logo={NonProfitObject().backgroundImage}
                  value={backgroundImageFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "300x300" })}
                </S.ImageRecommendation>
              </S.ItemBox>
            </S.FlexRow>
          </S.RightSection>
        </S.ContentSection>
        <S.ContentSection>
          <S.ButtonContainer>
            <Button
              type="submit"
              color={neutral[50]}
              backgroundColor={neutral[800]}
              value={t(`upsert.${mode}.save`)}
              _hover={{ bg: neutral[500] }}
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

export default UpsertNonProfitPage;
