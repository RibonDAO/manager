import { Button, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";
import theme from "styles/theme";
import FileUpload from "components/moleculars/FileUpload";
import InfoName from "components/moleculars/infoName";
import ModalImage from "components/moleculars/modals/ModalImage";
import WarningRedIcon from "assets/icons/warning-red-icon.svg";
import Loading from "components/moleculars/Loading";
import Dropdown from "components/atomics/Dropdown";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import { CreateNonProfit } from "types/apiResponses/nonProfit";
import { CreateStory } from "types/apiResponses/story";
import { NonProfitImpact } from "types/entities/NonProfitImpact";
import { useUploadFile } from "hooks/apiHooks/useUploadFile";
import { CreateNonProfitImpacts } from "types/apiResponses/nonProfitImpacts";
import useRibonConfig from "hooks/apiHooks/useRibonConfig";
import { RibonConfig } from "types/entities/RibonConfig";
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
  const [currentCauseId, setCurrentCauseId] = useState(1);
  const [currentUnit, setCurrentUnit] = useState("");
  const { getCauses } = useCauses();
  const [loading, setLoading] = useState(false);
  const { neutral } = theme.colors;
  const { tertiary } = theme.colors.brand;
  const [statusNonProfit, setStatusNonProfit] = useState("");
  const [stories, setStories] = useState<CreateStory[]>([]);
  const [logoFile, setLogoFile] = useState("");
  const [mainImageFile, setMainImageFile] = useState("");
  const [backgroundImageFile, setBackgroundImageFile] = useState("");
  const [config, setConfig] = useState<RibonConfig>();
  const [confirmationImageFile, setConfirmationImageFile] = useState("");
  const [coverImageFile, setCoverImageFile] = useState("");
  const [iconFile, setIconFile] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { createNonProfit, getNonProfit, updateNonProfit } = useNonProfits();

  const nonProfitForm = useForm<CreateNonProfit>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const storyForm = useForm<CreateStory[]>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const nonProfitImpactForm = useForm<NonProfitImpact>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const toast = useToast();
  const { getConfig } = useRibonConfig();
  const ticketValueInCents = config?.defaultTicketValue || 0;

  const fetchNonProfit = useCallback(async () => {
    try {
      const nonProfit = await getNonProfit(id);
      nonProfitForm.reset(nonProfit);
      nonProfitImpactForm.reset(
        nonProfit.nonProfitImpacts![nonProfit.nonProfitImpacts!.length - 1],
      );

      setStories(nonProfit.stories);
      setCurrentCauseId(nonProfit.cause?.id);
      setCurrentUnit(
        nonProfit.nonProfitImpacts![nonProfit.nonProfitImpacts!.length - 1]
          .measurementUnit,
      );
      setStatusNonProfit(nonProfit.status);
    } catch (e) {
      logError(e);
    }
  }, []);

  const handleSave = async () => {
    function storyObject() {
      const allStories: any = storyForm.getValues();

      const newStories = allStories.storiesAttributes.map((story: any) =>
        story?.image?.includes("http")
          ? {
              id: story.id,
              title: story.title,
              description: story.description,
              position: story.position,
              imageDescription: story.imageDescription,
            }
          : story,
      );

      return newStories;
    }
    function nonProfitUpdate() {
      const nonProfit = nonProfitForm.getValues();
      if (nonProfitForm.getValues().logo?.includes("http")) {
        delete nonProfit.logo;
      }
      if (nonProfitForm.getValues().backgroundImage?.includes("http")) {
        delete nonProfit.backgroundImage;
      }
      if (nonProfitForm.getValues().mainImage?.includes("http")) {
        delete nonProfit.mainImage;
      }
      if (nonProfitForm.getValues().confirmationImage?.includes("http")) {
        delete nonProfit.confirmationImage;
      }
      if (nonProfitForm.getValues().coverImage?.includes("http")) {
        delete nonProfit.coverImage;
      }
      if (nonProfitForm.getValues().icon?.includes("http")) {
        delete nonProfit.icon;
      }
      return nonProfit;
    }

    if (nonProfitForm.getValues()) {
      const nonProfitObject = {
        ...nonProfitUpdate(),
        storiesAttributes: storyObject(),
        nonProfitImpactsAttributes: [nonProfitImpactForm.getValues()],
      };

      try {
        if (isEdit) {
          await updateNonProfit(nonProfitObject);
        } else {
          setModalOpen(false);
          setLoading(true);
          await createNonProfit(nonProfitObject)
            .then((response) => {
              nonProfitForm.reset(response?.data);
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
      nonProfitForm.reset(newNonProfit);
      nonProfitImpactForm.reset(newNonProfitImpacts);
    }
  }, []);

  const onStatusChanged = (status: string) => {
    nonProfitForm.setValue("status", status);
    setStatusNonProfit(status);
  };

  const handleUploadImage = (
    image: File,
    attribute:
      | "logo"
      | "backgroundImage"
      | "mainImage"
      | "confirmationImage"
      | "coverImage"
      | "icon",
  ) => {
    try {
      setLoading(true);
      const upload = useUploadFile(image);

      upload.create((error: Error, blob: any) => {
        if (error) {
          logError(error);
          setLoading(false);
        } else {
          nonProfitForm.setValue(attribute, blob.signed_id);
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

  const handleConfirmationImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const confirmationImage = e.target.files![0];

    setConfirmationImageFile(URL.createObjectURL(confirmationImage));
    handleUploadImage(confirmationImage, "confirmationImage");
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const coverImage = e.target.files![0];

    setCoverImageFile(URL.createObjectURL(coverImage));
    handleUploadImage(coverImage, "coverImage");
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const icon = e.target.files![0];

    setIconFile(URL.createObjectURL(icon));
    handleUploadImage(icon, "icon");
  };

  const fetchCauses = useCallback(async () => {
    try {
      const allCauses = await getCauses();
      setCauses(allCauses);
    } catch (e) {
      logError(e);
    }
  }, [setCauses]);

  const fetchConfig = useCallback(async () => {
    try {
      const configData = await getConfig();
      setConfig(configData[0]);
    } catch (e) {
      logError(e);
    }
  }, [setConfig]);

  const onCauseIdChanged = (causeId: number) => {
    setCurrentCauseId(causeId);
    nonProfitForm.setValue("causeId", causeId);
  };

  const causeText = (value: any) =>
    causes.find((cause) => cause.id === value)?.name ?? "";

  const nonProfitName = nonProfitForm.watch()?.name;
  const watchStoryValues = storyForm.watch();
  const watchImpactFields = nonProfitImpactForm.watch();
  const maxLengthNonProfitName = 25;

  useEffect(() => {
    fetchCauses();
  }, [fetchCauses]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form
        onSubmit={nonProfitForm.handleSubmit(
          isEdit ? handleSave : handleOpenModal,
        )}
      >
        <S.ContentSection>
          <S.LeftSection>
            <S.Subtitle>{t("upsert.activityStatus")}</S.Subtitle>
            <S.ItemBox>
              <Dropdown
                values={["active", "inactive", "test"]}
                onOptionChanged={onStatusChanged}
                defaultValue={statusNonProfit}
                containerId="status-dropdown"
                name="status"
              />
            </S.ItemBox>

            <S.Divider />

            <S.Subtitle>{t("upsert.details")}</S.Subtitle>

            <S.DoubleItemSection>
              <S.ItemBox>
                <InfoName hasTranslation>{t("attributes.name")}</InfoName>
                <S.TextInput
                  maxLength={maxLengthNonProfitName}
                  {...nonProfitForm.register("name", {
                    required: t("upsert.required"),
                  })}
                />
                {nonProfitForm.formState?.errors.name &&
                  nonProfitForm.formState?.errors.name.type && (
                    <S.Error>
                      {nonProfitForm.formState?.errors.name.message}
                    </S.Error>
                  )}
                {nonProfitName && (
                  <S.CharLimit>
                    <S.CharLimitText>
                      {t("upsert.maxCharacters")}
                    </S.CharLimitText>
                    <S.CharLimitText>
                      {nonProfitName?.length}/{maxLengthNonProfitName}
                    </S.CharLimitText>
                  </S.CharLimit>
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
                {...nonProfitForm.register("walletAddress", {
                  required: t("upsert.required"),
                })}
              />
              {nonProfitForm.formState?.errors.name &&
                nonProfitForm.formState?.errors.name.type && (
                  <S.Error>
                    {nonProfitForm.formState?.errors.name.message}
                  </S.Error>
                )}
            </S.ItemBox>

            <S.Divider />

            <S.Subtitle>{t("upsert.impacts")}</S.Subtitle>
            {watchImpactFields &&
              nonProfitImpactForm.getValues().usdCentsToOneImpactUnit &&
              ticketValueInCents && (
                <ImpactPreviewer
                  nonProfit={{
                    ...nonProfitForm.getValues(),
                    nonProfitImpacts: [watchImpactFields],
                  }}
                  minimumNumberOfTickets={Math.round(
                    Number(
                      nonProfitImpactForm.getValues().usdCentsToOneImpactUnit,
                    ) / ticketValueInCents,
                  )}
                  usdCentsToOneImpactUnit={
                    nonProfitImpactForm.getValues().usdCentsToOneImpactUnit
                  }
                />
              )}

            <ImpactsForm
              nonProfitImpactForm={nonProfitImpactForm}
              nonProfitForm={nonProfitForm}
              setCurrentUnit={setCurrentUnit}
              currentUnit={currentUnit}
            />

            <S.Divider />

            <StoriesForm
              registerStory={storyForm.register}
              StoryObject={storyForm.getValues}
              setValueStory={storyForm.setValue}
              stories={stories}
              handleSubmitStory={nonProfitForm.handleSubmit}
              formStateStory={storyForm.formState}
              controlStory={storyForm.control}
              watchStory={watchStoryValues}
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
                  logo={nonProfitForm.getValues().logo}
                  value={logoFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "200x200" })}
                </S.ImageRecommendation>
              </S.ItemBox>
              <S.ItemBox>
                <InfoName hasTranslation>{t("attributes.altText")}</InfoName>
                <S.TextInput {...nonProfitForm.register("logoDescription")} />
                {nonProfitForm.formState?.errors.name &&
                  nonProfitForm.formState?.errors.name.type && (
                    <S.Error>
                      {nonProfitForm.formState?.errors.name.message}
                    </S.Error>
                  )}
              </S.ItemBox>
            </S.FlexRow>

            <S.FlexRow>
              <S.ItemBox>
                <InfoName>{t("attributes.causeCardImage")}</InfoName>
                <FileUpload
                  onChange={handleMainImageChange}
                  logo={nonProfitForm.getValues().mainImage}
                  value={mainImageFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "512x512" })}
                </S.ImageRecommendation>
              </S.ItemBox>
              <S.ItemBox>
                <InfoName hasTranslation>{t("attributes.altText")}</InfoName>
                <S.TextInput
                  {...nonProfitForm.register("mainImageDescription")}
                />
                {nonProfitForm.formState?.errors.name &&
                  nonProfitForm.formState?.errors.name.type && (
                    <S.Error>
                      {nonProfitForm.formState?.errors.name.message}
                    </S.Error>
                  )}
              </S.ItemBox>
            </S.FlexRow>
            <S.FlexRow>
              <S.ItemBox>
                <InfoName>{t("attributes.backgroundImage")}</InfoName>
                <FileUpload
                  onChange={handleBackgroundImageChange}
                  logo={nonProfitForm.getValues().backgroundImage}
                  value={backgroundImageFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "656x272" })}
                </S.ImageRecommendation>
              </S.ItemBox>
              <S.ItemBox>
                <InfoName hasTranslation>{t("attributes.altText")}</InfoName>
                <S.TextInput
                  {...nonProfitForm.register("backgroundImageDescription")}
                />
                {nonProfitForm.formState?.errors.name &&
                  nonProfitForm.formState?.errors.name.type && (
                    <S.Error>
                      {nonProfitForm.formState?.errors.name.message}
                    </S.Error>
                  )}
              </S.ItemBox>
            </S.FlexRow>
            <S.FlexRow>
              <S.ItemBox>
                <InfoName>{t("attributes.confirmationImage")}</InfoName>
                <FileUpload
                  onChange={handleConfirmationImageChange}
                  logo={nonProfitForm.getValues().confirmationImage}
                  value={confirmationImageFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "400x400" })}
                </S.ImageRecommendation>
              </S.ItemBox>
              <S.ItemBox>
                <InfoName hasTranslation>{t("attributes.altText")}</InfoName>
                <S.TextInput
                  {...nonProfitForm.register("confirmationImageDescription")}
                />
                {nonProfitForm.formState?.errors.name &&
                  nonProfitForm.formState?.errors.name.type && (
                    <S.Error>
                      {nonProfitForm.formState?.errors.name.message}
                    </S.Error>
                  )}
              </S.ItemBox>
            </S.FlexRow>

            <S.FlexRow>
              <S.ItemBox>
                <InfoName>{t("attributes.coverImage")}</InfoName>
                <FileUpload
                  onChange={handleCoverImageChange}
                  logo={nonProfitForm.getValues().coverImage}
                  value={coverImageFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "512x512" })}
                </S.ImageRecommendation>
              </S.ItemBox>
              <S.ItemBox>
                <InfoName hasTranslation>{t("attributes.altText")}</InfoName>
                <S.TextInput
                  {...nonProfitForm.register("coverImageDescription")}
                />
                {nonProfitForm.formState?.errors.name &&
                  nonProfitForm.formState?.errors.name.type && (
                    <S.Error>
                      {nonProfitForm.formState?.errors.name.message}
                    </S.Error>
                  )}
              </S.ItemBox>
            </S.FlexRow>

            <S.FlexRow>
              <S.ItemBox>
                <InfoName>{t("attributes.icon")}</InfoName>
                <FileUpload
                  onChange={handleIconChange}
                  logo={nonProfitForm.getValues().icon}
                  value={iconFile}
                />
                <S.ImageRecommendation>
                  {t("attributes.imageRecommendation", { size: "600x560" })}
                </S.ImageRecommendation>
              </S.ItemBox>
              <S.ItemBox>
                <InfoName hasTranslation>{t("attributes.altText")}</InfoName>
                <S.TextInput {...nonProfitForm.register("iconDescription")} />
                {nonProfitForm.formState?.errors.name &&
                  nonProfitForm.formState?.errors.name.type && (
                    <S.Error>
                      {nonProfitForm.formState?.errors.name.message}
                    </S.Error>
                  )}
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
