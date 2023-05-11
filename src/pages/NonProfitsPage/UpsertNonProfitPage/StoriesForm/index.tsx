import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import FileUpload from "components/moleculars/FileUpload";
import InfoName from "components/moleculars/infoName";
import { useTranslation } from "react-i18next";
import { CreateStory } from "@ribon.io/shared/types";
import useStories from "hooks/apiHooks/useStories";
import { useUploadFile } from "hooks/apiHooks/useUploadFile";
import theme from "styles/theme";
import { logError } from "services/crashReport";
import * as S from "./styles";

export type Props = {
  registerStory: any;
  StoryObject: any;
  setValueStory: any;
  handleSubmitStory: any;
  formStateStory: any;
  controlStory: any;
  stories: CreateStory[];
};

function StoriesForm({
  registerStory,
  StoryObject,
  setValueStory,
  controlStory,
  stories,
}: Props) {
  const [files, setFiles] = useState<any>({});
  const { t } = useTranslation("translation", {
    keyPrefix: "nonProfits.upsert.storiesForm",
  });
  const { neutral } = theme.colors;
  const { fields, append, remove } = useFieldArray({
    name: "storiesAttributes",
    control: controlStory,
  });
  const { deleteStory } = useStories();

  const handleUploadStoryImage = (image: File, index: number) => {
    try {
      const upload = useUploadFile(image);

      upload.create((error: Error, blob: any) => {
        if (error) {
          logError(error);
        } else {
          setValueStory(`storiesAttributes.${index}.image`, blob.signed_id);
        }
      });
    } catch (e) {
      logError(e);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const image = e.target.files![0];
    setFiles({ ...files, [index]: URL.createObjectURL(image) });
    handleUploadStoryImage(image, index);
  };

  useEffect(() => {
    if (fields.length === 0) {
      stories
        .sort(
          (story1, story2) => Number(story1.position) - Number(story2.position),
        )
        .forEach((story) => {
          append(story);
        });
    }
  }, [stories]);

  function handleDeleteStory(index: number) {
    if (StoryObject(`storiesAttributes.${index}.id`)) {
      deleteStory(StoryObject(`storiesAttributes.${index}.id`));
    }

    remove(index);
  }

  return (
    <S.Container>
      <S.FormContainer>
        <S.ButtonContainer>
          <Button
            type="button"
            color={neutral[800]}
            backgroundColor={neutral[50]}
            borderColor={neutral[800]}
            border="2px"
            _hover={{ bg: neutral[500] }}
            onClick={() =>
              append({
                title: "Story",
                description: "Story description",
                image: null,
                active: true,
                position: fields.length + 1,
              })
            }
          >
            + Add Story
          </Button>
        </S.ButtonContainer>

        {fields.map((field, index) => (
          <div key={field.id}>
            <S.LeftSection>
              <S.ItemBox>
                {files && (
                  <FileUpload
                    onChange={(e) => handleImageChange(e, index)}
                    logo={StoryObject(`storiesAttributes.${index}.image`)}
                    value={files[index]}
                  />
                )}
              </S.ItemBox>
            </S.LeftSection>

            <S.RightSection>
              <InfoName hasTranslation>{t("title")}</InfoName>
              <S.TextInput
                {...registerStory(`storiesAttributes.${index}.title`)}
                placeholder={t("title")}
              />

              <InfoName hasTranslation>{t("description")}</InfoName>
              <S.TextInput
                {...registerStory(`storiesAttributes.${index}.description`)}
                placeholder={t("description")}
              />

              <InfoName hasTranslation>{t("position")}</InfoName>
              <S.TextInput
                {...registerStory(`storiesAttributes.${index}.position`)}
                placeholder={t("position")}
              />

              <S.ButtonContainer>
                <Button
                  type="button"
                  color={neutral[50]}
                  backgroundColor={neutral[800]}
                  _hover={{ bg: neutral[500] }}
                  onClick={() => handleDeleteStory(index)}
                >
                  Delete Story
                </Button>
              </S.ButtonContainer>
            </S.RightSection>
          </div>
        ))}
      </S.FormContainer>
    </S.Container>
  );
}

export default StoriesForm;
